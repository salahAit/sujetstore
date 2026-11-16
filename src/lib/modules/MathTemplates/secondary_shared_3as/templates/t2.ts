import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate, QuizQuestionPayload } from '../../types';
import type { ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, gcd, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset } from '../../svg-helpers';
import { svgComplexPlane, svgFunctionCurvePlot, svgProbabilityTree } from '../../svg-secondary';

// ═══════════════════════════════════════════════════════════════════════════════
// Dual-Syntax Formatting Helpers (KaTeX for Quiz/Hints/Steps vs Typst for Sujet)
// Strictly Western digits 0-9; zero LaTeX commands inside sujetExercise.
// ═══════════════════════════════════════════════════════════════════════════════

function comb(n: number, k: number): number {
	if (k < 0 || k > n) return 0;
	if (k === 0 || k === n) return 1;
	const r = Math.min(k, n - k);
	let res = 1;
	for (let i = 1; i <= r; i++) {
		res = Math.round((res * (n - r + i)) / i);
	}
	return res;
}

function intPow(base: number, exp: number): number {
	let res = 1;
	for (let i = 0; i < exp; i++) res *= base;
	return res;
}

function fracKatex(num: number, den: number): string {
	const [sn, sd] = simplifyFraction(num, den);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-\\frac{${Math.abs(sn)}}{${sd}}` : `\\frac{${sn}}{${sd}}`;
}

function fracTypst(num: number, den: number): string {
	const [sn, sd] = simplifyFraction(num, den);
	if (sd === 1) return `${sn}`;
	return sn < 0 ? `-frac(${Math.abs(sn)}, ${sd})` : `frac(${sn}, ${sd})`;
}

function rawFracKatex(num: number, den: number): string {
	if (den === 1) return `${num}`;
	return num < 0 ? `-\\frac{${Math.abs(num)}}{${den}}` : `\\frac{${num}}{${den}}`;
}

function rawFracTypst(num: number, den: number): string {
	if (den === 1) return `${num}`;
	return num < 0 ? `-frac(${Math.abs(num)}, ${den})` : `frac(${num}, ${den})`;
}

function signedConst(c: number): string {
	if (c === 0) return '';
	return c > 0 ? ` + ${c}` : ` - ${Math.abs(c)}`;
}

function linearKatex(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a}${v}`;
	if (!head) return `${b}`;
	return `${head}${signedConst(b)}`;
}

function linearTypst(a: number, b: number, v = 'x'): string {
	let head = '';
	if (a === 1) head = v;
	else if (a === -1) head = `-${v}`;
	else if (a !== 0) head = `${a} ${v}`;
	if (!head) return `${b}`;
	return `${head}${signedConst(b)}`;
}

function quadKatex(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a}${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB}${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0 || parts.length === 0) {
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`);
	}
	return parts.join(' ');
}

function quadTypst(a: number, b: number, c: number, v = 'x'): string {
	const parts: string[] = [];
	if (a !== 0) {
		if (a === 1) parts.push(`${v}^2`);
		else if (a === -1) parts.push(`-${v}^2`);
		else parts.push(`${a} ${v}^2`);
	}
	if (b !== 0) {
		const absB = Math.abs(b);
		const term = absB === 1 ? v : `${absB} ${v}`;
		if (parts.length === 0) parts.push(b < 0 ? `-${term}` : term);
		else parts.push(b < 0 ? `- ${term}` : `+ ${term}`);
	}
	if (c !== 0 || parts.length === 0) {
		if (parts.length === 0) parts.push(`${c}`);
		else parts.push(c < 0 ? `- ${Math.abs(c)}` : `+ ${c}`);
	}
	return parts.join(' ');
}

function cubicKatex(c2: number, c1: number, c0: number, v = 'z'): string {
	const parts: string[] = [`${v}^3`];
	if (c2 !== 0) {
		const abs2 = Math.abs(c2);
		const t2 = abs2 === 1 ? `${v}^2` : `${abs2}${v}^2`;
		parts.push(c2 < 0 ? `- ${t2}` : `+ ${t2}`);
	}
	if (c1 !== 0) {
		const abs1 = Math.abs(c1);
		const t1 = abs1 === 1 ? v : `${abs1}${v}`;
		parts.push(c1 < 0 ? `- ${t1}` : `+ ${t1}`);
	}
	if (c0 !== 0) {
		parts.push(c0 < 0 ? `- ${Math.abs(c0)}` : `+ ${c0}`);
	}
	return parts.join(' ');
}

function cubicTypst(c2: number, c1: number, c0: number, v = 'z'): string {
	const parts: string[] = [`${v}^3`];
	if (c2 !== 0) {
		const abs2 = Math.abs(c2);
		const t2 = abs2 === 1 ? `${v}^2` : `${abs2} ${v}^2`;
		parts.push(c2 < 0 ? `- ${t2}` : `+ ${t2}`);
	}
	if (c1 !== 0) {
		const abs1 = Math.abs(c1);
		const t1 = abs1 === 1 ? v : `${abs1} ${v}`;
		parts.push(c1 < 0 ? `- ${t1}` : `+ ${t1}`);
	}
	if (c0 !== 0) {
		parts.push(c0 < 0 ? `- ${Math.abs(c0)}` : `+ ${c0}`);
	}
	return parts.join(' ');
}

function complexAlgKatex(re: number, im: number): string {
	if (re === 0 && im === 0) return '0';
	if (im === 0) return `${re}`;
	const absIm = Math.abs(im);
	const imUnit = absIm === 1 ? 'i' : `${absIm}i`;
	if (re === 0) return im < 0 ? `-${imUnit}` : imUnit;
	return im < 0 ? `${re} - ${imUnit}` : `${re} + ${imUnit}`;
}

function complexAlgTypst(re: number, im: number): string {
	if (re === 0 && im === 0) return '0';
	if (im === 0) return `${re}`;
	const absIm = Math.abs(im);
	const imUnit = absIm === 1 ? 'i' : `${absIm} i`;
	if (re === 0) return im < 0 ? `-${imUnit}` : imUnit;
	return im < 0 ? `${re} - ${imUnit}` : `${re} + ${imUnit}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Counting & Discrete Random Variable Law (C_n^p, E(X), V(X), sum p_i = 1)
// ═══════════════════════════════════════════════════════════════════════════════

const countingRandomVarTemplate: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t2_counting_random_var',
	grade: '3as_se',
	trimesterId: 't2',
	domain: 'probability',
	titleAr: 'التحليل التوفيقي والمتغير العشوائي المتقطع (السحب في آن واحد، الأمل والتباين)',
	curriculumLessonId: 'lesson_3as_se_t2_counting_combinatorics_random_variables',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			const pairs: [number, number][] = [
				[3, 2],
				[3, 3],
				[4, 2],
				[4, 3],
				[4, 4],
				[5, 3],
				[5, 4],
				[5, 5],
				[6, 3],
				[6, 4]
			];
			const [red, white] = rng.pick(pairs);
			const totalBalls = red + white;
			const drawCount = 2;
			const omega = comb(totalBalls, drawCount);

			const nums = [0, 1, 2].map((i) => comb(red, i) * comb(white, drawCount - i));
			// Sum of numerators equals C_N^2 by Vandermonde identity
			const eNumRaw = nums.reduce((acc, num, i) => acc + i * num, 0);
			const [eNum, eDen] = simplifyFraction(eNumRaw, omega);
			const ex2NumRaw = nums.reduce((acc, num, i) => acc + i * i * num, 0);
			// V(X) = E(X^2) - (E(X))^2 = (ex2NumRaw * omega - eNumRaw^2) / omega^2
			const [vNum, vDen] = simplifyFraction(ex2NumRaw * omega - eNumRaw * eNumRaw, omega * omega);
			const sigmaApprox = roundTo(Math.sqrt(vNum / vDen), 2);

			const sameColorNum = comb(red, 2) + comb(white, 2);
			const [pSameNum, pSameDen] = simplifyFraction(sameColorNum, omega);

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `يحتوي كيس على $${red}$ كرات حمراء و $${white}$ كرات بيضاء، لا نفرق بينها عند اللمس. نسحب عشوائياً وفي آن واحد كرتين ($2$) من الكيس.`,
				content: [
					{
						type: 'text',
						content: `1) احسب عدد الحالات الممكنة للسحب $upright("Card")(Omega)$، ثم احسب احتمال الحادثة $A$: «سحب كرتين من نفس اللون».`,
						answer: `1) السحب في آن واحد لكرتين من بين $${totalBalls}$ كرات هو توفيقة:\n$upright("Card")(Omega) = C_(${totalBalls})^2 = frac(${totalBalls} times ${totalBalls - 1}, 2) = ${omega}$.\nاحتمال الحادثة $A$ (كرتان حمراوان أو كرتان بيضاوان):\n$P(A) = frac(C_(${red})^2 + C_(${white})^2, C_(${totalBalls})^2) = frac(${comb(red, 2)} + ${comb(white, 2)}, ${omega}) = ${fracTypst(pSameNum, pSameDen)}$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) ليكن $X$ المتغير العشوائي الذي يرفق بكل سحبة عدد الكرات الحمراء المسحوبة. عيّن مجموعة قيم $X$، ثم عرّف قانون احتماله وتحقق أن $sum_(i=0)^2 P(X = x_i) = 1$.`,
						answer: `2) مجموعة قيم المتغير العشوائي هي $X(Omega) = {0, 1, 2}$:\n- $P(X = 0) = frac(C_(${white})^2, C_(${totalBalls})^2) = ${rawFracTypst(nums[0], omega)} = ${fracTypst(nums[0], omega)}$.\n- $P(X = 1) = frac(C_(${red})^1 times C_(${white})^1, C_(${totalBalls})^2) = ${rawFracTypst(nums[1], omega)} = ${fracTypst(nums[1], omega)}$.\n- $P(X = 2) = frac(C_(${red})^2, C_(${totalBalls})^2) = ${rawFracTypst(nums[2], omega)} = ${fracTypst(nums[2], omega)}$.\nالتحقق من المجموع: $sum_(i=0)^2 P(X = x_i) = frac(${nums[0]} + ${nums[1]} + ${nums[2]}, ${omega}) = frac(${omega}, ${omega}) = 1$.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['$x_i$', '$0$', '$1$', '$2$', 'المجموع'],
						cells: [
							{ content: '$P(X = x_i)$', bold: true },
							{ content: '...', answer: `$${fracTypst(nums[0], omega)}$` },
							{ content: '...', answer: `$${fracTypst(nums[1], omega)}$` },
							{ content: '...', answer: `$${fracTypst(nums[2], omega)}$` },
							{ content: '$1$', answer: '$1$' }
						],
						headerBackground: true
					},
					{
						type: 'text',
						content: `3) احسب الأمل الرياضياتي $E(X)$ والتباين $V(X)$ ثم استنتج الانحراف المعياري $sigma(X)$ (مدوراً إلى $10^(-2)$).`,
						answer: `3) حساب الأمل الرياضياتي والتباين:\n- $E(X) = 0 times ${rawFracTypst(nums[0], omega)} + 1 times ${rawFracTypst(nums[1], omega)} + 2 times ${rawFracTypst(nums[2], omega)} = ${rawFracTypst(eNumRaw, omega)} = ${fracTypst(eNum, eDen)}$.\n- $E(X^2) = 0^2 times ${rawFracTypst(nums[0], omega)} + 1^2 times ${rawFracTypst(nums[1], omega)} + 2^2 times ${rawFracTypst(nums[2], omega)} = ${rawFracTypst(ex2NumRaw, omega)}$.\n- $V(X) = E(X^2) - [E(X)]^2 = ${rawFracTypst(ex2NumRaw, omega)} - (${fracTypst(eNum, eDen)})^2 = ${fracTypst(vNum, vDen)}$.\n- الانحراف المعياري: $sigma(X) = sqrt(V(X)) = sqrt(${fracTypst(vNum, vDen)}) approx ${sigmaApprox}$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `يحتوي كيس على $${red}$ كرات حمراء و $${white}$ كرات بيضاء لا نفرق بينها عند اللمس. نسحب عشوائياً وفي آن واحد كرتين ($2$) من الكيس. ما هو عدد السحبات الممكنة $\\text{Card}(\\Omega) = C_{${totalBalls}}^{2}$؟`,
					questionTextAr: `كيس به $${red}$ كرات حمراء و $${white}$ بيضاء. احسب عدد الحالات الممكنة لسحب كرتين في آن واحد $C_{${totalBalls}}^{2}$:`,
					questionData: {
						answer: omega,
						displayTemplate: `C_${totalBalls}^2 = ?`,
						variables: [],
						tolerance: 0
					},
					explanation: `بما أن السحب يتم في آن واحد، فإن عدد الحالات الممكنة هو التوفيقة $C_{${totalBalls}}^{2} = \\frac{${totalBalls} \\times ${totalBalls - 1}}{2} = ${omega}$.`
				},
				sujetExercise,
				hints: [
					`السحب في آن واحد لا يراعي الترتيب وبدون تكرار، فنستعمل التوفيقات $C_{${totalBalls}}^{2}$.`,
					`قيم المتغير العشوائي $X$ هي $\\{0, 1, 2\\}$، وتحقّق دوماً أن $\\sum_{i=0}^{2} P(X = x_i) = 1$.`,
					`استعمل دستور كونيغ-هيغنز لحساب التباين: $V(X) = E(X^2) - [E(X)]^2$.`
				],
				solutionStepsAr: [
					`عدد المخارج الممكنة: $\\text{Card}(\\Omega) = C_{${totalBalls}}^{2} = ${omega}$، و $P(A) = ${fracKatex(pSameNum, pSameDen)}$.`,
					`قانون الاحتمال: $P(X=0) = ${fracKatex(nums[0], omega)}$، $P(X=1) = ${fracKatex(nums[1], omega)}$، $P(X=2) = ${fracKatex(nums[2], omega)}$، ومجموعها يساوي $1$.`,
					`الأمل الرياضياتي $E(X) = ${fracKatex(eNum, eDen)}$ والتباين $V(X) = ${fracKatex(vNum, vDen)}$.`
				],
				finalAnswer: `${omega}`
			};
		}

		if (difficulty === 'medium') {
			const pairs: [number, number][] = [
				[3, 4],
				[4, 3],
				[4, 4],
				[4, 5],
				[5, 3],
				[5, 4],
				[5, 5],
				[6, 3],
				[3, 5],
				[6, 4]
			];
			const [red, white] = rng.pick(pairs);
			const totalBalls = red + white;
			const drawCount = 3;
			const omega = comb(totalBalls, drawCount);

			const nums = [0, 1, 2, 3].map((i) => comb(red, i) * comb(white, drawCount - i));
			const eNumRaw = nums.reduce((acc, num, i) => acc + i * num, 0);
			const [eNum, eDen] = simplifyFraction(eNumRaw, omega);
			const ex2NumRaw = nums.reduce((acc, num, i) => acc + i * i * num, 0);
			const [vNum, vDen] = simplifyFraction(ex2NumRaw * omega - eNumRaw * eNumRaw, omega * omega);
			const sigmaApprox = roundTo(Math.sqrt(vNum / vDen), 2);

			const sameColorNum = comb(red, 3) + comb(white, 3);
			const [pSameNum, pSameDen] = simplifyFraction(sameColorNum, omega);
			const atLeastOneRedNum = omega - nums[0];
			const [pAtLeastNum, pAtLeastDen] = simplifyFraction(atLeastOneRedNum, omega);

			const correctText = `$${fracKatex(eNum, eDen)}$`;
			const mcq = buildUniqueMcqOptions(
				correctText,
				[
					{
						text: `$${fracKatex(red, totalBalls)}$`,
						diagnosticFeedback: `هذا احتمال سحب كرة حمراء واحدة فقط؛ عند سحب $3$ كرات يكون $E(X) = 3 \\times \\frac{${red}}{${totalBalls}}$.`
					},
					{
						text: `$${fracKatex(3 * white, totalBalls)}$`,
						diagnosticFeedback: 'انتبه: حسبت الأمل الرياضياتي لعدد الكرات البيضاء بدل الكرات الحمراء.'
					},
					{
						text: `$${fracKatex(eNum + eDen, eDen)}$`,
						diagnosticFeedback: 'راجع جمع البسوط في حساب $\\sum_{i=0}^{3} x_i P(X = x_i)$.'
					},
					{
						text: `$${fracKatex(eNum + 1, eDen + 1)}$`,
						diagnosticFeedback: 'تحقق من المقام المشترك $\\text{Card}(\\Omega)$ عند حساب الأمل الرياضياتي.'
					},
					{
						text: `$${fracKatex(3 * white + 1, totalBalls)}$`,
						diagnosticFeedback: 'انتبه إلى عدد الكرات الحمراء وتوزيع احتمال المتغير $X$.'
					}
				],
				rng
			);

			const sujetExercise: ExerciseBlock = {
				points: this.defaultPoints,
				instruction: `يحتوي صندوق على $${red}$ كرات حمراء و $${white}$ كرات بيضاء، متماثلة ولا نفرق بينها عند اللمس. نسحب عشوائياً وفي آن واحد $3$ كرات من الصندوق.`,
				content: [
					{
						type: 'text',
						content: `1) احسب عدد الحالات الممكنة $upright("Card")(Omega)$، ثم احسب احتمال الحادثتين:\n- $A$: «سحب $3$ كرات من نفس اللون».\n- $B$: «سحب كرة حمراء واحدة على الأقل».`,
						answer: `1) عدد السحبات الممكنة: $upright("Card")(Omega) = C_(${totalBalls})^3 = ${omega}$.\n- $P(A) = frac(C_(${red})^3 + C_(${white})^3, C_(${totalBalls})^3) = frac(${comb(red, 3)} + ${comb(white, 3)}, ${omega}) = ${fracTypst(pSameNum, pSameDen)}$.\n- الحادثة العكسية $overline(B)$ هي عدم سحب أي كرة حمراء ($3$ كرات بيضاء): $P(B) = 1 - P(overline(B)) = 1 - frac(C_(${white})^3, ${omega}) = 1 - frac(${nums[0]}, ${omega}) = ${fracTypst(pAtLeastNum, pAtLeastDen)}$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: `2) نعرّف المتغير العشوائي $X$ الذي يرفق بكل سحبة عدد الكرات الحمراء المسحوبة. عيّن قانون احتمال $X$ في جدول، وتحقق أن مجموع الاحتمالات يساوي $1$.`,
						answer: `2) قيم $X$ الممكنة هي $X(Omega) = {0, 1, 2, 3}$:\n- $P(X = 0) = frac(C_(${white})^3, ${omega}) = ${rawFracTypst(nums[0], omega)} = ${fracTypst(nums[0], omega)}$.\n- $P(X = 1) = frac(C_(${red})^1 times C_(${white})^2, ${omega}) = ${rawFracTypst(nums[1], omega)} = ${fracTypst(nums[1], omega)}$.\n- $P(X = 2) = frac(C_(${red})^2 times C_(${white})^1, ${omega}) = ${rawFracTypst(nums[2], omega)} = ${fracTypst(nums[2], omega)}$.\n- $P(X = 3) = frac(C_(${red})^3, ${omega}) = ${rawFracTypst(nums[3], omega)} = ${fracTypst(nums[3], omega)}$.\nالتحقق: $sum_(i=0)^3 P(X = i) = frac(${nums[0]} + ${nums[1]} + ${nums[2]} + ${nums[3]}, ${omega}) = frac(${omega}, ${omega}) = 1$.`,
						mark: '1.5'
					},
					{
						type: 'table',
						headers: ['$x_i$', '$0$', '$1$', '$2$', '$3$'],
						cells: [
							{ content: '$P(X = x_i)$', bold: true },
							{ content: '...', answer: `$${fracTypst(nums[0], omega)}$` },
							{ content: '...', answer: `$${fracTypst(nums[1], omega)}$` },
							{ content: '...', answer: `$${fracTypst(nums[2], omega)}$` },
							{ content: '...', answer: `$${fracTypst(nums[3], omega)}$` }
						],
						headerBackground: true
					},
					{
						type: 'text',
						content: `3) احسب الأمل الرياضياتي $E(X)$ والتباين $V(X)$ والانحراف المعياري $sigma(X)$ (مدوراً إلى $10^(-2)$).`,
						answer: `3) الحساب:\n- $E(X) = sum_(i=0)^3 i P(X = i) = frac(0 times ${nums[0]} + 1 times ${nums[1]} + 2 times ${nums[2]} + 3 times ${nums[3]}, ${omega}) = ${rawFracTypst(eNumRaw, omega)} = ${fracTypst(eNum, eDen)}$.\n- $E(X^2) = frac(0 + 1 times ${nums[1]} + 4 times ${nums[2]} + 9 times ${nums[3]}, ${omega}) = ${rawFracTypst(ex2NumRaw, omega)}$.\n- $V(X) = E(X^2) - [E(X)]^2 = ${rawFracTypst(ex2NumRaw, omega)} - (${fracTypst(eNum, eDen)})^2 = ${fracTypst(vNum, vDen)}$.\n- $sigma(X) = sqrt(V(X)) approx ${sigmaApprox}$.`,
						mark: '1.25'
					}
				]
			};

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `يحتوي صندوق على $${red}$ كرات حمراء و $${white}$ كرات بيضاء لا نفرق بينها عند اللمس. نسحب عشوائياً وفي آن واحد $3$ كرات، ونسمي $X$ المتغير العشوائي الذي يحسب عدد الكرات الحمراء المسحوبة. ما هي القيمة المضبوطة للأمل الرياضياتي $E(X)$؟`,
					questionTextAr: `صندوق به $${red}$ كرات حمراء و $${white}$ بيضاء. نسحب $3$ كرات في آن واحد. ما قيمة $E(X)$ لعدد الكرات الحمراء؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `قانون احتمال $X$ يحقق $P(X=i) = \\frac{C_{${red}}^{i} C_{${white}}^{3-i}}{C_{${totalBalls}}^{3}}$، ومنه $E(X) = \\sum_{i=0}^{3} i P(X=i) = \\frac{${eNumRaw}}{${omega}} = ${fracKatex(eNum, eDen)}$.`
				},
				sujetExercise,
				hints: [
					`لحساب احتمال «كرة حمراء على الأقل»، استعمل الحادثة العكسية: $P(B) = 1 - P(X = 0)$.`,
					`لكل $i \\in \\{0, 1, 2, 3\\}$، لدينا $P(X = i) = \\frac{C_{${red}}^{i} \\times C_{${white}}^{3-i}}{C_{${totalBalls}}^{3}}$.`,
					`تأكد أن مجموع بسوط الاحتمالات يساوي $C_{${totalBalls}}^{3} = ${omega}$ قبل حساب $E(X)$ و $V(X)$.`
				],
				solutionStepsAr: [
					`$\\text{Card}(\\Omega) = C_{${totalBalls}}^{3} = ${omega}$، $P(A) = ${fracKatex(pSameNum, pSameDen)}$، و $P(B) = ${fracKatex(pAtLeastNum, pAtLeastDen)}$.`,
					`قانون الاحتمال على $\\{0, 1, 2, 3\\}$ يحقق $\\sum_{i=0}^{3} P(X=i) = \\frac{${omega}}{${omega}} = 1$.`,
					`$E(X) = ${fracKatex(eNum, eDen)}$، $V(X) = ${fracKatex(vNum, vDen)}$، و $\\sigma(X) \\approx ${sigmaApprox}$.`
				],
				finalAnswer: `${eNum}/${eDen}`
			};
		}

		// HARD: Algebraic gain random variable Y = alpha * i - beta * (3 - i) = (alpha + beta)X - 3*beta
		const configs: { red: number; white: number; winDA: number; loseDA: number }[] = [
			{ red: 4, white: 3, winDA: 20, loseDA: 10 },
			{ red: 3, white: 5, winDA: 30, loseDA: 10 },
			{ red: 5, white: 4, winDA: 20, loseDA: 15 },
			{ red: 4, white: 5, winDA: 30, loseDA: 10 },
			{ red: 3, white: 4, winDA: 25, loseDA: 15 },
			{ red: 5, white: 3, winDA: 15, loseDA: 20 },
			{ red: 4, white: 4, winDA: 20, loseDA: 10 },
			{ red: 6, white: 4, winDA: 20, loseDA: 15 },
			{ red: 3, white: 6, winDA: 40, loseDA: 10 }
		];
		const cfg = rng.pick(configs);
		const { red, white, winDA, loseDA } = cfg;
		const totalBalls = red + white;
		const omega = comb(totalBalls, 3);
		const stepGain = winDA + loseDA;

		const yVals = [0, 1, 2, 3].map((i) => stepGain * i - 3 * loseDA);
		const nums = [0, 1, 2, 3].map((i) => comb(red, i) * comb(white, 3 - i));

		const eyNumRaw = yVals.reduce((acc, y, i) => acc + y * nums[i], 0);
		const [eyNum, eyDen] = simplifyFraction(eyNumRaw, omega);

		// Also compute V(X) and deduce V(Y) = stepGain^2 * V(X)
		const exNumRaw = nums.reduce((acc, num, i) => acc + i * num, 0);
		const ex2NumRaw = nums.reduce((acc, num, i) => acc + i * i * num, 0);
		const [vyNum, vyDen] = simplifyFraction(
			stepGain * stepGain * (ex2NumRaw * omega - exNumRaw * exNumRaw),
			omega * omega
		);

		const gameNatureAr =
			eyNum > 0
				? 'مربحة للاعب (في صالح اللاعب لأن $E(Y) > 0$)'
				: eyNum < 0
					? 'غير مربحة للاعب (ليست في صالح اللاعب لأن $E(Y) < 0$)'
					: 'عادلة تماماً لأن $E(Y) = 0$';

		const mcq = buildUniqueMcqOptions(
			`$${fracKatex(eyNum, eyDen)}\\text{ DA}$`,
			[
				{
					text: `$${fracKatex(winDA * exNumRaw, omega)}\\text{ DA}$`,
					diagnosticFeedback: 'نسيت طرح الخسارة الموافقة للكرات البيضاء المسحوبة $(3 - X)$.'
				},
				{
					text: `$${fracKatex(yVals[0] + yVals[1] + yVals[2] + yVals[3], 4)}\\text{ DA}$`,
					diagnosticFeedback: 'حذار: الأمل الرياضياتي ليس الوسط الحسابي البسيط لقيم $Y$، بل مجموع $y_i P(Y = y_i)$.'
				},
				{
					text: `$${fracKatex(-eyNum, eyDen)}\\text{ DA}$`,
					diagnosticFeedback: 'تحقق من إشارة الربح الجبري لكل قيمة $y_i = ' + stepGain + 'i - ' + 3 * loseDA + '$.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يحتوي صندوق على $${red}$ كرات حمراء و $${white}$ كرات بيضاء لا نفرق بينها عند اللمس. يقترح نادٍ ثقافي لعبة يسحب فيها المشارك $3$ كرات في آن واحد: يربح $${winDA}$ دج عن كل كرة حمراء مسحوبة، ويخسر $${loseDA}$ دج عن كل كرة بيضاء مسحوبة. نرمز بـ $X$ إلى عدد الكرات الحمراء المسحوبة وبـ $Y$ إلى الربح الجبري الصافي للاعب بالدينار.`,
			content: [
				{
					type: 'text',
					content: `1) بيّن أنه من أجل كل مخرج، يرتبط $Y$ بـ $X$ بالعلاقة $Y = ${stepGain} X - ${3 * loseDA}$، ثم استنتج مجموعة القيم الممكنة للمتغير العشوائي $Y$.`,
					answer: `1) إذا سحب اللاعب $X$ كرات حمراء فإنه يسحب $(3 - X)$ كرات بيضاء، فيكون ربحه الجبري:\n$Y = ${winDA} X - ${loseDA}(3 - X) = (${winDA} + ${loseDA})X - ${3 * loseDA} = ${stepGain} X - ${3 * loseDA}$.\nبما أن $X(Omega) = {0, 1, 2, 3}$، فإن $Y(Omega) = {${yVals.join(', ')}}$.`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) عيّن قانون الاحتمال للمتغير العشوائي $Y$، وتحقّق أن $sum_(i=0)^3 P(Y = y_i) = 1$.`,
					answer: `2) لدينا $upright("Card")(Omega) = C_(${totalBalls})^3 = ${omega}$، ومن أجل كل $i in {0, 1, 2, 3}$: $P(Y = y_i) = P(X = i) = frac(C_(${red})^i times C_(${white})^(3-i), ${omega})$:\n- $P(Y = ${yVals[0]}) = ${rawFracTypst(nums[0], omega)} = ${fracTypst(nums[0], omega)}$\n- $P(Y = ${yVals[1]}) = ${rawFracTypst(nums[1], omega)} = ${fracTypst(nums[1], omega)}$\n- $P(Y = ${yVals[2]}) = ${rawFracTypst(nums[2], omega)} = ${fracTypst(nums[2], omega)}$\n- $P(Y = ${yVals[3]}) = ${rawFracTypst(nums[3], omega)} = ${fracTypst(nums[3], omega)}$\nالتحقق: $sum_(i=0)^3 P(Y = y_i) = frac(${nums[0]} + ${nums[1]} + ${nums[2]} + ${nums[3]}, ${omega}) = frac(${omega}, ${omega}) = 1$.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) احسب الأمل الرياضياتي $E(Y)$ والتباين $V(Y)$، ثم فسّر النتيجة بخصوص عدالة اللعبة.`,
					answer: `3) حساب $E(Y)$ و $V(Y)$:\n- $E(Y) = sum_(i=0)^3 y_i P(Y = y_i) = frac((${yVals[0]})(${nums[0]}) + (${yVals[1]})(${nums[1]}) + (${yVals[2]})(${nums[2]}) + (${yVals[3]})(${nums[3]}), ${omega}) = ${rawFracTypst(eyNumRaw, omega)} = ${fracTypst(eyNum, eyDen)}$ دج.\n- بخاصية خطية الأمل والتباين ($Y = ${stepGain} X - ${3 * loseDA}$): $V(Y) = (${stepGain})^2 V(X) = ${fracTypst(vyNum, vyDen)}$.\n- التفسير: اللعبة ${gameNatureAr}.`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `صندوق به $${red}$ كرات حمراء و $${white}$ كرات بيضاء. نسحب $3$ كرات في آن واحد: كل كرة حمراء تربح $+${winDA}\\text{ DA}$ وكل كرة بيضاء تخسر $-${loseDA}\\text{ DA}$. ليكن $Y$ المتغير العشوائي الممثل للربح الجبري الصافي. ما قيمة الأمل الرياضياتي $E(Y)$؟`,
				questionTextAr: `ما هو الأمل الرياضياتي $E(Y)$ للربح الجبري عند سحب $3$ كرات ($+${winDA}\\text{ DA}$ للحمراء و $-${loseDA}\\text{ DA}$ للبيضاء)؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $Y = ${stepGain}X - ${3 * loseDA}$ مع $E(X) = \\frac{3 \\times ${red}}{${totalBalls}} = ${fracKatex(3 * red, totalBalls)}$، ومنه $E(Y) = ${stepGain} E(X) - ${3 * loseDA} = ${fracKatex(eyNum, eyDen)}\\text{ DA}$.`
			},
			sujetExercise,
			hints: [
				`اكتب الربح الجبري بدلالة عدد الكرات الحمراء $X$: $Y = ${winDA}X - ${loseDA}(3 - X) = ${stepGain}X - ${3 * loseDA}$.`,
				`احتمال كل قيمة $y_i$ يساوي احتمال الحادثة الموافقة $(X = i)$ أي $\\frac{C_{${red}}^{i} C_{${white}}^{3-i}}{C_{${totalBalls}}^{3}}$.`,
				`استعمل خطية الأمل $E(aX + b) = a E(X) + b$ و $V(aX + b) = a^2 V(X)$ للتحقق من حساباتك.`
			],
			solutionStepsAr: [
				`العلاقة الجبرية: $Y = ${stepGain}X - ${3 * loseDA}$، وقيمه $\\{${yVals.join(' ; ')}\\}$.`,
				`قانون الاحتمال يحقق $\\sum_{i=0}^{3} P(Y = y_i) = \\frac{${omega}}{${omega}} = 1$.`,
				`$E(Y) = ${fracKatex(eyNum, eyDen)}\\text{ DA}$ و $V(Y) = ${fracKatex(vyNum, vyDen)}$.`
			],
			finalAnswer: `${eyNum}/${eyDen} DA`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Conditional Probability, Tree, Total Prob, Bayes & Binomial Law B(n, p)
//    Uses saveSvgAsset + svgProbabilityTree
// ═══════════════════════════════════════════════════════════════════════════════

const condProbBinomialTemplate: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t2_cond_prob_binomial',
	grade: '3as_se',
	trimesterId: 't2',
	domain: 'probability',
	titleAr: 'الاحتمالات الشرطية، شجرة الاحتمالات، دستور الاحتمالات الكلية وقانون ثنائي الحد',
	curriculumLessonId: 'lesson_3as_se_t2_conditional_probability_binomial_law',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Triples (a, u, v) in {1..9}^3, u != v, where P(A)=a/10, P_A(B)=u/10, P_{A'}(B)=v/10
		// Chosen so P(B) = (a*u + (10-a)*v)/100 simplifies to a clean fraction 1/5, 1/4, 3/10, 2/5, 1/2
		const treePool: { a: number; u: number; v: number }[] = [
			{ a: 5, u: 3, v: 1 }, // P(B) = 20/100 = 1/5
			{ a: 2, u: 6, v: 1 }, // P(B) = 20/100 = 1/5
			{ a: 7, u: 1, v: 6 }, // P(B) = 25/100 = 1/4
			{ a: 3, u: 6, v: 1 }, // P(B) = 25/100 = 1/4
			{ a: 4, u: 6, v: 1 }, // P(B) = 30/100 = 3/10
			{ a: 6, u: 1, v: 6 }, // P(B) = 30/100 = 3/10
			{ a: 8, u: 2, v: 7 }, // P(B) = 30/100 = 3/10
			{ a: 2, u: 7, v: 2 }, // P(B) = 30/100 = 3/10
			{ a: 4, u: 7, v: 2 }, // P(B) = 40/100 = 2/5
			{ a: 6, u: 6, v: 1 }, // P(B) = 40/100 = 2/5
			{ a: 6, u: 7, v: 2 }, // P(B) = 50/100 = 1/2
			{ a: 8, u: 6, v: 1 }  // P(B) = 50/100 = 1/2
		];
		const { a, u, v } = rng.pick(treePool);
		const aBar = 10 - a;
		const uBar = 10 - u;
		const vBar = 10 - v;

		const pabHundred = a * u; // 100 * P(A cap B)
		const paBarbHundred = aBar * v; // 100 * P(A' cap B)
		const pbHundred = pabHundred + paBarbHundred; // 100 * P(B)
		const pbDecimal = roundTo(pbHundred / 100, 2);

		const [pBNum, pBDen] = simplifyFraction(pbHundred, 100);
		const qBNum = pBDen - pBNum; // 1 - p = qBNum / pBDen
		const [bayesNum, bayesDen] = simplifyFraction(pabHundred, pbHundred); // P_B(A)

		const nTrials = difficulty === 'easy' ? rng.pick([3, 4]) : difficulty === 'medium' ? rng.pick([4, 5]) : rng.pick([5, 6]);
		const kSuccess = difficulty === 'easy' ? 1 : 2;

		// Exact Binomial probability P(X = kSuccess) = C_n^k * pBNum^k * qBNum^(n-k) / pBDen^n
		const binomDen = intPow(pBDen, nTrials);
		const pkRawNum = comb(nTrials, kSuccess) * intPow(pBNum, kSuccess) * intPow(qBNum, nTrials - kSuccess);
		const [pkNum, pkDen] = simplifyFraction(pkRawNum, binomDen);

		// P(X >= 1) = 1 - P(X = 0) = 1 - (qBNum / pBDen)^n
		const pAtLeastOneRawNum = binomDen - intPow(qBNum, nTrials);
		const [pGe1Num, pGe1Den] = simplifyFraction(pAtLeastOneRawNum, binomDen);

		// E(X) = n * p, V(X) = n * p * (1 - p)
		const [exNum, exDen] = simplifyFraction(nTrials * pBNum, pBDen);
		const [vxNum, vxDen] = simplifyFraction(nTrials * pBNum * qBNum, pBDen * pBDen);

		// Threshold m_0 in N* such that 1 - (1 - p)^m >= 0.99 <=> (1 - p)^m <= 0.01
		const qFloat = qBNum / pBDen;
		const minThresholdM = Math.ceil(Math.log(0.01) / Math.log(qFloat));

		const treeSvg = svgProbabilityTree({
			rootLabel: 'Ω',
			firstLevel: [
				{
					label: 'A',
					probLabel: `0.${a}`,
					children: [
						{ label: 'B', probLabel: `0.${u}` },
						{ label: "B'", probLabel: `0.${uBar}` }
					]
				},
				{
					label: "A'",
					probLabel: `0.${aBar}`,
					children: [
						{ label: 'B', probLabel: `0.${v}` },
						{ label: "B'", probLabel: `0.${vBar}` }
					]
				}
			]
		});
		const imageUrl = saveSvgAsset(`3as_shared_t2_prob_tree_${difficulty}_${seed}`, treeSvg);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${pbDecimal}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في تجربة عشوائية ممثلة بشجرة الاحتمالات الموزونة المرفقة، لدينا $P(A) = 0.${a}$، $P_A(B) = 0.${u}$ و $P_{\\overline{A}}(B) = 0.${v}$. بتطبيق دستور الاحتمالات الكلية، احسب القيمة العشرية المضبوطة للاحتمال $P(B)$.`,
				questionTextAr: `لدينا $P(A) = 0.${a}$، $P_A(B) = 0.${u}$ و $P_{\\overline{A}}(B) = 0.${v}$. احسب $P(B)$:`,
				imageUrl,
				imageCaption: "شجرة الاحتمالات الموزونة (حيث A' و B' تمثلان الحادثتين العكسيتين)",
				questionData: {
					answer: pbDecimal,
					displayTemplate: 'P(B) = ?',
					variables: [],
					tolerance: 0.001
				},
				explanation: `حسب دستور الاحتمالات الكلية: $P(B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B) = 0.${a} \\times 0.${u} + 0.${aBar} \\times 0.${v} = ${(pabHundred / 100).toFixed(2)} + ${(paBarbHundred / 100).toFixed(2)} = ${pbDecimal}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${bayesNum}/${bayesDen}`;
			const mcq = buildUniqueMcqOptions(
				`$${fracKatex(bayesNum, bayesDen)}$`,
				[
					{
						text: `$${fracKatex(pabHundred, 100)}$`,
						diagnosticFeedback: 'هذا احتمال التقاطع $P(A \\cap B)$ فقط؛ يجب قسمته على $P(B)$ لإيجاد الاحتمال الشرطي $P_B(A)$.'
					},
					{
						text: `$${fracKatex(u, 10)}$`,
						diagnosticFeedback: 'انتبه: خلطت بين $P_A(B)$ والاحتمال العكسي $P_B(A)$.'
					},
					{
						text: `$${fracKatex(paBarbHundred, pbHundred)}$`,
						diagnosticFeedback: 'هذه قيمة $P_B(\\overline{A})$ وليست $P_B(A)$.'
					},
					{
						text: `$${fracKatex(pabHundred + 5, pbHundred)}$`,
						diagnosticFeedback: 'تحقق من ضرب احتمالي المسار $P(A) \\times P_A(B)$ في البسط.'
					},
					{
						text: `$${fracKatex(Math.max(1, bayesNum - 1), bayesDen + 1)}$`,
						diagnosticFeedback: 'راجع اختزال الكسر $\\frac{P(A \\cap B)}{P(B)}$ حسب دستور بيز.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر حادثتين $A$ و $B$ حيث $P(A) = 0.${a}$، $P_A(B) = 0.${u}$ و $P_{\\overline{A}}(B) = 0.${v}$. علماً أن الحادثة $B$ قد تحققت، ما هو الاحتمال الشرطي $P_B(A)$؟`,
				questionTextAr: `ما هي القيمة المضبوطة للاحتمال الشرطي العكسي $P_B(A)$؟`,
				imageUrl,
				imageCaption: "شجرة الاحتمالات الموزونة للتجربة",
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $P(A \\cap B) = 0.${a} \\times 0.${u} = ${fracKatex(pabHundred, 100)}$ و $P(B) = ${fracKatex(pBNum, pBDen)}$، ومنه حسب دستور بيز: $P_B(A) = \\frac{P(A \\cap B)}{P(B)} = \\frac{${pabHundred}}{${pbHundred}} = ${fracKatex(bayesNum, bayesDen)}$.`
			};
		} else {
			finalAnswer = `${minThresholdM}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في التجربة الممثلة بالشجرة المرفقة ($P(A) = 0.${a}$، $P_A(B) = 0.${u}$، $P_{\\overline{A}}(B) = 0.${v}$)، نجد $P(B) = ${pbDecimal}$. نكرر هذه التجربة $m$ مرة في شروط متماثلة ومستقلة. عيّن أصغر عدد طبيعي $m$ بحيث يكون احتمال تحقق الحادثة $B$ مرة واحدة على الأقل أكبر من أو يساوي $0.99$ (أي $1 - (${roundTo(1 - pbDecimal, 2)})^m \\ge 0.99$).`,
				questionTextAr: `ما هو أصغر عدد طبيعي $m$ من التكرارات المستقلة يحقق $1 - (1 - P(B))^m \\ge 0.99$؟`,
				imageUrl,
				imageCaption: "شجرة الاحتمالات وتكرار برنولي المستقل",
				questionData: {
					answer: minThresholdM,
					displayTemplate: 'm = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نحل المتراجحة $1 - (${roundTo(qFloat, 2)})^m \\ge 0.99 \\iff (${roundTo(qFloat, 2)})^m \\le 0.01$. بإدخال الدالة $\\ln$ (ومع الانتباه أن $\\ln(${roundTo(qFloat, 2)}) < 0$ يقلب المتباينة): $m \\ge \\frac{\\ln(0.01)}{\\ln(${roundTo(qFloat, 2)})} \\approx ${roundTo(Math.log(0.01) / Math.log(qFloat), 2)}$، إذن أصغر عدد طبيعي هو $m = ${minThresholdM}$.`
			};
		}

		const extraHardLineQ =
			difficulty === 'hard'
				? `\n- عيّن أصغر عدد طبيعي غير معدوم $m$ من السحبات المستقلة بحيث يكون احتمال تحقق $B$ مرة واحدة على الأقل أكبر من أو يساوي $0.99$.`
				: '';
		const extraHardLineA =
			difficulty === 'hard'
				? `\n- حل المتراجحة $1 - (${fracTypst(qBNum, pBDen)})^m >= 0.99 arrow.l.r.double (${fracTypst(qBNum, pBDen)})^m <= 0.01 arrow.l.r.double m >= frac(ln(0.01), ln(${roundTo(qFloat, 2)})) approx ${roundTo(Math.log(0.01) / Math.log(qFloat), 2)}$، ومنه أصغر عدد طبيعي هو $m = ${minThresholdM}$.`
				: '';

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `ينتج مصنع قطعاً إلكترونية عبر خطي إنتاج $A$ و $overline(A)$، حيث يوفر الخط $A$ نسبة $${a * 10}%$ من الإنتاج الكلي ($P(A) = 0.${a}$) ويوفر الخط $overline(A)$ الباقي ($P(overline(A)) = 0.${aBar}$). أظهرت مراقبة الجودة أن احتمال مطابقة القطعة للمعايير (الحادثة $B$) هو $P_A (B) = 0.${u}$ إذا أُنتجت في الخط $A$، وهو $P_(overline(A)) (B) = 0.${v}$ إذا أُنتجت في الخط $overline(A)$. نختار قطعة واحدة عشوائياً من إنتاج المصنع.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) أنشئ شجرة الاحتمالات الموزونة المترجمة للوضعية، ثم احسب $P(A sect B)$ و $P(overline(A) sect B)$ واستنتج بدستور الاحتمالات الكلية أن $P(B) = ${fracTypst(pBNum, pBDen)}$.`,
							answer: `1) من شجرة الاحتمالات الموزونة:\n- $P(A sect B) = P(A) times P_A (B) = 0.${a} times 0.${u} = ${fracTypst(pabHundred, 100)}$.\n- $P(overline(A) sect B) = P(overline(A)) times P_(overline(A)) (B) = 0.${aBar} times 0.${v} = ${fracTypst(paBarbHundred, 100)}$.\n- حسب دستور الاحتمالات الكلية: $P(B) = P(A sect B) + P(overline(A) sect B) = frac(${pabHundred} + ${paBarbHundred}, 100) = frac(${pbHundred}, 100) = ${fracTypst(pBNum, pBDen)} = ${pbDecimal}$.`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: "شجرة الاحتمالات الموزونة (A' و B' الحادثتان العكسيتان)"
						}
					]
				},
				{
					type: 'text',
					content: `2) علماً أن القطعة المختارة مطابقة للمعايير ($B$)، احسب احتمال أن تكون من إنتاج الخط $A$ (أي $P_B (A)$). هل الحادثتان $A$ و $B$ مستقلتان؟ علّل.`,
					answer: `2) حساب الاحتمال الشرطي العكسي (بيز):\n$P_B (A) = frac(P(A sect B), P(B)) = frac(${pabHundred}, ${pbHundred}) = ${fracTypst(bayesNum, bayesDen)}$.\nبما أن $P_A (B) = 0.${u}$ و $P(B) = ${pbDecimal}$ فإن $P_A (B) != P(B)$، ومنه الحادثتان $A$ و $B$ غير مستقلتين.`,
					mark: '1.25'
				},
				{
					type: 'text',
					content: `3) نسحب الآن $${nTrials}$ قطع على التوالي وبإرجاع (تكرارات مستقلة)، وليكن $X$ المتغير العشوائي الذي يحصي عدد القطع المطابقة للمعايير:\n- برّر أن $X$ يتبع قانون ثنائي الحد $cal(B)(${nTrials}, ${fracTypst(pBNum, pBDen)})$، ثم احسب $P(X = ${kSuccess})$ و $P(X >= 1)$.\n- احسب الأمل الرياضياتي $E(X)$ والتباين $V(X)$.${extraHardLineQ}`,
					answer: `3) قانون ثنائي الحد:\n- التجربة عبارة عن تكرار $${nTrials}$ محاولات برنولي متماثلة ومستقلة، احتمال النجاح في كل منها $p = P(B) = ${fracTypst(pBNum, pBDen)}$، إذن $X$ يتبع قانون ثنائي الحد $cal(B)(${nTrials}, ${fracTypst(pBNum, pBDen)})$.\n- $P(X = ${kSuccess}) = C_(${nTrials})^(${kSuccess}) (${fracTypst(pBNum, pBDen)})^(${kSuccess}) (${fracTypst(qBNum, pBDen)})^(${nTrials - kSuccess}) = ${fracTypst(pkNum, pkDen)}$.\n- $P(X >= 1) = 1 - P(X = 0) = 1 - (${fracTypst(qBNum, pBDen)})^(${nTrials}) = ${fracTypst(pGe1Num, pGe1Den)}$.\n- $E(X) = n p = ${nTrials} times ${fracTypst(pBNum, pBDen)} = ${fracTypst(exNum, exDen)}$ ، و $V(X) = n p (1 - p) = ${fracTypst(vxNum, vxDen)}$.${extraHardLineA}`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				'مجموع احتمالات الفروع الصادرة عن كل عقدة في شجرة الاحتمالات يساوي $1$ دائماً.',
				`استعمل دستور الاحتمالات الكلية: $P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$، ثم $P_B(A) = \\frac{P(A \\cap B)}{P(B)}$.`,
				`في قانون ثنائي الحد $\\mathcal{B}(n, p)$، لدينا $P(X = k) = C_n^k p^k (1 - p)^{n-k}$ و $E(X) = np$ و $V(X) = np(1 - p)$.`
			],
			solutionStepsAr: [
				`دستور الاحتمالات الكلية: $P(B) = 0.${a} \\times 0.${u} + 0.${aBar} \\times 0.${v} = ${fracKatex(pBNum, pBDen)} = ${pbDecimal}$.`,
				`الاحتمال العكسي: $P_B(A) = \\frac{P(A \\cap B)}{P(B)} = ${fracKatex(bayesNum, bayesDen)}$، وبما أن $P_A(B) \\neq P(B)$ فالحادثتان غير مستقلتين.`,
				`قانون ثنائي الحد $\\mathcal{B}(${nTrials}, ${fracKatex(pBNum, pBDen)})$: $P(X = ${kSuccess}) = ${fracKatex(pkNum, pkDen)}$، $E(X) = ${fracKatex(exNum, exDen)}$، و $V(X) = ${fracKatex(vxNum, vxDen)}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Complex Equations in C, Exponential Form r e^(i*theta) & De Moivre Powers
// ═══════════════════════════════════════════════════════════════════════════════

interface ComplexEquationSpec {
	family: 'pi_4' | '3pi_4' | 'pi_3' | '2pi_3';
	k: number;
	quadB: number; // z^2 + quadB * z + quadC = 0
	quadC: number;
	delta: number; // quadB^2 - 4*quadC < 0
	deltaRootKatex: string;
	deltaRootTypst: string;
	z1Katex: string;
	z2Katex: string;
	z1Typst: string;
	z2Typst: string;
	rKatex: string;
	rTypst: string;
	thetaNum: number;
	thetaDen: number;
	realPeriod: number; // smallest n >= 1 such that (z1/r)^n in R
	negRealConditionKatex: string;
	negRealConditionTypst: string;
}

function buildComplexSpec(family: 'pi_4' | '3pi_4' | 'pi_3' | '2pi_3', k: number): ComplexEquationSpec {
	if (family === 'pi_4') {
		// z1 = k(1 + i), z2 = k(1 - i) => z^2 - 2k z + 2k^2 = 0, Delta = -4k^2 = (2k i)^2
		return {
			family,
			k,
			quadB: -2 * k,
			quadC: 2 * k * k,
			delta: -4 * k * k,
			deltaRootKatex: `${2 * k}i`,
			deltaRootTypst: `${2 * k} i`,
			z1Katex: complexAlgKatex(k, k),
			z2Katex: complexAlgKatex(k, -k),
			z1Typst: complexAlgTypst(k, k),
			z2Typst: complexAlgTypst(k, -k),
			rKatex: k === 1 ? '\\sqrt{2}' : `${k}\\sqrt{2}`,
			rTypst: k === 1 ? 'sqrt(2)' : `${k} sqrt(2)`,
			thetaNum: 1,
			thetaDen: 4,
			realPeriod: 4,
			negRealConditionKatex: 'n = 4 + 8m',
			negRealConditionTypst: 'n = 4 + 8 m'
		};
	}
	if (family === '3pi_4') {
		// z1 = k(-1 + i), z2 = k(-1 - i) => z^2 + 2k z + 2k^2 = 0, Delta = -4k^2
		return {
			family,
			k,
			quadB: 2 * k,
			quadC: 2 * k * k,
			delta: -4 * k * k,
			deltaRootKatex: `${2 * k}i`,
			deltaRootTypst: `${2 * k} i`,
			z1Katex: complexAlgKatex(-k, k),
			z2Katex: complexAlgKatex(-k, -k),
			z1Typst: complexAlgTypst(-k, k),
			z2Typst: complexAlgTypst(-k, -k),
			rKatex: k === 1 ? '\\sqrt{2}' : `${k}\\sqrt{2}`,
			rTypst: k === 1 ? 'sqrt(2)' : `${k} sqrt(2)`,
			thetaNum: 3,
			thetaDen: 4,
			realPeriod: 4,
			negRealConditionKatex: 'n = 4 + 8m',
			negRealConditionTypst: 'n = 4 + 8 m'
		};
	}
	if (family === 'pi_3') {
		// z1 = k(1 + i sqrt(3)), z2 = k(1 - i sqrt(3)) => z^2 - 2k z + 4k^2 = 0, Delta = -12k^2 = (2k sqrt(3) i)^2
		const imStrK = k === 1 ? 'i\\sqrt{3}' : `${k}i\\sqrt{3}`;
		const imStrT = k === 1 ? 'i sqrt(3)' : `${k} i sqrt(3)`;
		return {
			family,
			k,
			quadB: -2 * k,
			quadC: 4 * k * k,
			delta: -12 * k * k,
			deltaRootKatex: `${2 * k}i\\sqrt{3}`,
			deltaRootTypst: `${2 * k} i sqrt(3)`,
			z1Katex: `${k} + ${imStrK}`,
			z2Katex: `${k} - ${imStrK}`,
			z1Typst: `${k} + ${imStrT}`,
			z2Typst: `${k} - ${imStrT}`,
			rKatex: `${2 * k}`,
			rTypst: `${2 * k}`,
			thetaNum: 1,
			thetaDen: 3,
			realPeriod: 3,
			negRealConditionKatex: 'n = 3 + 6m',
			negRealConditionTypst: 'n = 3 + 6 m'
		};
	}
	// family === '2pi_3': z1 = k(-1 + i sqrt(3)), z2 = k(-1 - i sqrt(3)) => z^2 + 2k z + 4k^2 = 0
	const imStrK = k === 1 ? 'i\\sqrt{3}' : `${k}i\\sqrt{3}`;
	const imStrT = k === 1 ? 'i sqrt(3)' : `${k} i sqrt(3)`;
	return {
		family,
		k,
		quadB: 2 * k,
		quadC: 4 * k * k,
		delta: -12 * k * k,
		deltaRootKatex: `${2 * k}i\\sqrt{3}`,
		deltaRootTypst: `${2 * k} i sqrt(3)`,
		z1Katex: `-${k} + ${imStrK}`,
		z2Katex: `-${k} - ${imStrK}`,
		z1Typst: `-${k} + ${imStrT}`,
		z2Typst: `-${k} - ${imStrT}`,
		rKatex: `${2 * k}`,
		rTypst: `${2 * k}`,
		thetaNum: 2,
		thetaDen: 3,
		realPeriod: 3,
		negRealConditionKatex: 'n = 3 + 6m',
		negRealConditionTypst: 'n = 3 + 6 m'
	};
}

const complexEquationsTemplate: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t2_complex_equations',
	grade: '3as_se',
	trimesterId: 't2',
	domain: 'complex',
	titleAr: 'المعادلات في مجموعة الأعداد المركبة، الشكل الأسي ودستور موافر',
	curriculumLessonId: 'lesson_3as_se_t2_complex_algebraic_equations',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// For hard difficulty we ask when (z1/r)^n is strictly negative real (-1):
		// e^{i*2pi*n/3} is a cube root of unity and never equals -1, so reserve '2pi_3' for easy/medium.
		const family =
			difficulty === 'hard'
				? rng.pick(['pi_4', '3pi_4', 'pi_3'] as const)
				: rng.pick(['pi_4', '3pi_4', 'pi_3', '2pi_3'] as const);
		const k = difficulty === 'easy' ? rng.pick([1, 2, 3]) : rng.pick([1, 2, 3, 4]);
		const spec = buildComplexSpec(family, k);

		const thetaKatex =
			spec.thetaNum === 1 ? `\\frac{\\pi}{${spec.thetaDen}}` : `\\frac{${spec.thetaNum}\\pi}{${spec.thetaDen}}`;
		const thetaTypst =
			spec.thetaNum === 1 ? `frac(pi, ${spec.thetaDen})` : `frac(${spec.thetaNum} pi, ${spec.thetaDen})`;

		// Year-like large power divisible by 2 * thetaDen so (z1/r)^powerExp = 1
		const powerExp = spec.thetaDen === 4 ? rng.pick([2024, 2032, 1448]) : rng.pick([2022, 2028, 1446]);

		if (difficulty === 'easy') {
			const quadEqK = `${quadKatex(1, spec.quadB, spec.quadC, 'z')} = 0`;
			const quadEqT = `${quadTypst(1, spec.quadB, spec.quadC, 'z')} = 0`;

			const mcq = buildUniqueMcqOptions(
				`$z_1 = ${spec.rKatex}e^{i${thetaKatex}}$`,
				[
					{
						text: `$z_1 = ${spec.rKatex}e^{-i${thetaKatex}}$`,
						diagnosticFeedback: 'انتبه لإشارة الجزء التخيلي الموجب لـ $z_1$: هذه الكتابة الأسية للعدد المرافق $z_2 = \\overline{z_1}$.'
					},
					{
						text: `$z_1 = ${spec.quadC}e^{i${thetaKatex}}$`,
						diagnosticFeedback: 'حذار: وضعت مربع الطويلة $|z_1|^2$ مكان الطويلة $r = |z_1|$.'
					},
					{
						text: `$z_1 = ${spec.rKatex}e^{i\\frac{\\pi}{${spec.thetaDen === 4 ? 3 : 4}}}$`,
						diagnosticFeedback: `راجع حساب $\\cos\\theta = \\frac{\\text{Re}(z_1)}{r}$ و $\\sin\\theta = \\frac{\\text{Im}(z_1)}{r}$.`
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نعتبر في مجموعة الأعداد المركبة $\\mathbb{C}$ المعادلة $${quadEqK}$، ونرمز بـ $z_1$ إلى الحل الذي جزؤه التخيلي موجب تماماً. ما هو الشكل الأسي للعدد المركب $z_1$؟`,
					questionTextAr: `ما هو الشكل الأسي للحل $z_1$ ($\\text{Im}(z_1) > 0$) للمعادلة $${quadEqK}$؟`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `المميز $\\Delta = (${spec.quadB})^2 - 4(${spec.quadC}) = ${spec.delta} = (${spec.deltaRootKatex})^2$، ومنه $z_1 = ${spec.z1Katex}$. طويلته $r = ${spec.rKatex}$ وعمدته $\\theta = ${thetaKatex}$، إذن $z_1 = ${spec.rKatex}e^{i${thetaKatex}}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر في مجموعة الأعداد المركبة $bb(C)$ المعادلة ذات المجهول $z$: $(E) : ${quadEqT}$.`,
					content: [
						{
							type: 'text',
							content: `1) حل في المجموعة $bb(C)$ المعادلة $(E)$ (يُرمز بـ $z_1$ للحل الذي جزؤه التخيلي موجب وبـ $z_2$ للحل الآخر).`,
							answer: `1) نحسب المميز $Delta = (${spec.quadB})^2 - 4(1)(${spec.quadC}) = ${spec.delta} = (${spec.deltaRootTypst})^2$.\nللمعادلة حلان مركبان مترافقان هما:\n$z_1 = frac(${-spec.quadB} + ${spec.deltaRootTypst}, 2) = ${spec.z1Typst}$ و $z_2 = overline(z_1) = ${spec.z2Typst}$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) احسب الطويلة $r = |z_1|$ وعمدة للعدد $z_1$، ثم اكتب كلاً من $z_1$ و $z_2$ على الشكل المثلثي ثم الأسي.`,
							answer: `2) الطويلة: $r = |z_1| = sqrt(${spec.quadC}) = ${spec.rTypst}$.\nبما أن $cos theta = frac(upright("Re")(z_1), r)$ و $sin theta = frac(upright("Im")(z_1), r)$، نجد عمدة $z_1$ هي $theta = ${thetaTypst} + 2 k pi$ ($k in bb(Z)$).\n- الشكل المثلثي والأسي لـ $z_1$: $z_1 = ${spec.rTypst} (cos(${thetaTypst}) + i sin(${thetaTypst})) = ${spec.rTypst} e^(i ${thetaTypst})$.\n- وبما أن $z_2 = overline(z_1)$ فإن: $z_2 = ${spec.rTypst} e^(-i ${thetaTypst})$.`,
							mark: '1.25'
						},
						{
							type: 'text',
							content: `3) باستعمال دستور موافر، عيّن قيم العدد الطبيعي غير المعدوم $n$ حتى يكون العدد $(frac(z_1, ${spec.rTypst}))^n$ عدداً حقيقياً، ثم احسب $(frac(z_1, ${spec.rTypst}))^(${powerExp})$.`,
							answer: `3) لدينا $frac(z_1, ${spec.rTypst}) = e^(i ${thetaTypst})$، وحسب دستور موافر:\n$(frac(z_1, ${spec.rTypst}))^n = e^(i n ${thetaTypst}) = cos(n ${thetaTypst}) + i sin(n ${thetaTypst})$.\nيكون هذا العدد حقيقياً إذا وفقط إذا انعدم جزؤه التخيلي:\n$sin(n ${thetaTypst}) = 0 arrow.l.r.double n ${thetaTypst} = m pi arrow.l.r.double n = ${spec.realPeriod} m$ مع $m in bb(N)^*$ (لأن العددين ${spec.thetaNum} و ${spec.thetaDen} أوليان فيما بينهما).\nوبما أن $${powerExp} = ${2 * spec.thetaDen} times ${powerExp / (2 * spec.thetaDen)}$، فإن $(frac(z_1, ${spec.rTypst}))^(${powerExp}) = cos(${(powerExp * spec.thetaNum) / spec.thetaDen} pi) + i sin(${(powerExp * spec.thetaNum) / spec.thetaDen} pi) = 1$.`,
							mark: '1.25'
						}
					]
				},
				hints: [
					`احسب المميز $\\Delta = b^2 - 4ac = ${spec.delta} < 0$ واكتبه على الشكل $(${spec.deltaRootKatex})^2$.`,
					`لحساب الشكل الأسي، استخرج أولاً الطويلة $r = |z_1| = ${spec.rKatex}$ عاملاً مشتركاً.`,
					`بتطبيق دستور موافر، يكون $e^{i n \\theta} \\in \\mathbb{R}$ إذا وفقط إذا كان $\\sin(n\\theta) = 0$ أي $n\\theta = m\\pi$.`
				],
				solutionStepsAr: [
					`المميز $\\Delta = ${spec.delta} = (${spec.deltaRootKatex})^2$، والجذران $z_1 = ${spec.z1Katex}$ و $z_2 = ${spec.z2Katex}$.`,
					`الشكل الأسي: $z_1 = ${spec.rKatex}e^{i${thetaKatex}}$ و $z_2 = ${spec.rKatex}e^{-i${thetaKatex}}$.`,
					`شرط الحقيقية: $\\sin\\left(n${thetaKatex}\\right) = 0 \\iff n = ${spec.realPeriod}m$ ($m \\in \\mathbb{N}^*$).`
				],
				finalAnswer: `z1 = ${spec.rTypst} exp(i*${spec.thetaNum}*pi/${spec.thetaDen})`
			};
		}

		// MEDIUM & HARD: Cubic polynomial P(z) = (z - z0)(z^2 + quadB*z + quadC) = z^3 + c2 z^2 + c1 z + c0
		const z0 = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
		const c2 = spec.quadB - z0;
		const c1 = spec.quadC - z0 * spec.quadB;
		const c0 = -z0 * spec.quadC;

		const polyK = cubicKatex(c2, c1, c0, 'z');
		const polyT = cubicTypst(c2, c1, c0, 'z');
		const factorLinT = z0 > 0 ? `z - ${z0}` : `z + ${Math.abs(z0)}`;
		const quadPartT = quadTypst(1, spec.quadB, spec.quadC, 'z');

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'medium') {
			finalAnswer = `${spec.realPeriod}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر في $\\mathbb{C}$ كثير الحدود $P(z) = ${polyK}$ حيث $P(${z0}) = 0$، وجذراه غير الحقيقيين هما $z_1 = ${spec.z1Katex}$ و $z_2 = \\overline{z_1}$ ذوا الطويلة $r = ${spec.rKatex}$. ما هو أصغر عدد طبيعي غير معدوم $n$ يجعل العدد $\\left(\\frac{z_1}{r}\\right)^n$ عدداً حقيقياً؟`,
				questionTextAr: `ليكن $z_1 = ${spec.z1Katex}$ وطويلته $r = ${spec.rKatex}$. عيّن أصغر عدد طبيعي $n \\ge 1$ يحقق $\\left(\\frac{z_1}{r}\\right)^n \\in \\mathbb{R}$:`,
				questionData: {
					answer: spec.realPeriod,
					displayTemplate: 'n_min = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $\\frac{z_1}{r} = e^{i${thetaKatex}}$. حسب دستور موافر، $\\left(\\frac{z_1}{r}\\right)^n = e^{i n${thetaKatex}} \\in \\mathbb{R} \\iff \\sin\\left(n${thetaKatex}\\right) = 0 \\iff n = ${spec.realPeriod}m$ ($m \\in \\mathbb{N}^*$). أصغر قيمة موجبة هي $n = ${spec.realPeriod}$.`
			};
		} else {
			finalAnswer = spec.negRealConditionTypst;
			const mcq = buildUniqueMcqOptions(
				`$${spec.negRealConditionKatex}\\; (m \\in \\mathbb{N})$`,
				[
					{
						text: `$n = ${spec.realPeriod}m\\; (m \\in \\mathbb{N}^*)$`,
						diagnosticFeedback: 'هذا الشرط يعطي الأعداد الحقيقية الموجبة والسالبة معاً، بينما المطلوب أن يكون حقيقياً سالباً تماماً ($e^{i n\\theta} = -1$).'
					},
					{
						text: `$n = ${2 * spec.realPeriod}m\\; (m \\in \\mathbb{N}^*)$`,
						diagnosticFeedback: `من أجل $n = ${2 * spec.realPeriod}m$ يكون $\\left(\\frac{z_1}{r}\\right)^n = +1 > 0$ (حقيقياً موجباً وليس سالباً).`
					},
					{
						text: `$n = ${spec.realPeriod === 4 ? 2 : 1} + ${spec.realPeriod}m\\; (m \\in \\mathbb{N})$`,
						diagnosticFeedback: 'تحقق من شرط الحقيقي السالب: يجب أن يكون $n\\theta = \\pi + 2m\\pi$ وليس $\\frac{\\pi}{2} + m\\pi$.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `نعتبر العدد المركب $z_1 = ${spec.z1Katex}$ ذا الطويلة $r = ${spec.rKatex}$ والعمدة $\\theta = ${thetaKatex}$. ما هي مجموعة قيم العدد الطبيعي $n$ التي يكون من أجلها $\\left(\\frac{z_1}{r}\\right)^n$ عدداً حقيقياً سالباً تماماً؟`,
				questionTextAr: `من أجل أي قيم للعدد الطبيعي $n$ يكون $\\left(\\frac{z_1}{r}\\right)^n \\in \\mathbb{R}_-^*$ حيث $z_1 = ${spec.rKatex}e^{i${thetaKatex}}$؟`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يكون $e^{i n${thetaKatex}}$ حقيقياً سالباً تماماً إذا وفقط إذا كان $e^{i n${thetaKatex}} = -1 = e^{i\\pi}$، أي $n${thetaKatex} = \\pi + 2k\\pi$، ومنه $n = ${spec.realPeriod} + ${2 * spec.realPeriod}m$ ($m \\in \\mathbb{N}$).`
			};
		}

		const thirdQContent =
			difficulty === 'hard'
				? `3) عيّن قيم العدد الطبيعي $n$ حتى يكون $(frac(z_1, ${spec.rTypst}))^n$ عدداً حقيقياً سالباً تماماً، ثم احسب المجموع $S = (frac(z_1, ${spec.rTypst}))^(${powerExp}) + (frac(z_2, ${spec.rTypst}))^(${powerExp})$.`
				: `3) عيّن قيم العدد الطبيعي غير المعدوم $n$ حتى يكون $(frac(z_1, ${spec.rTypst}))^n$ عدداً حقيقياً، ثم احسب $(frac(z_1, ${spec.rTypst}))^(${powerExp})$.`;

		const thirdQAnswer =
			difficulty === 'hard'
				? `3) حسب دستور موافر: $(frac(z_1, ${spec.rTypst}))^n = e^(i n ${thetaTypst})$. يكون حقيقياً سالباً تماماً إذا وفقط إذا كان $e^(i n ${thetaTypst}) = -1$، أي $n ${thetaTypst} = pi + 2 k pi$، ومنه $${spec.negRealConditionTypst}$ مع $m in bb(N)$.\nوبما أن $${powerExp}$ مضاعف لـ $${2 * spec.thetaDen}$، فإن $(frac(z_1, ${spec.rTypst}))^(${powerExp}) = 1$ و $(frac(z_2, ${spec.rTypst}))^(${powerExp}) = 1$، ومنه $S = 1 + 1 = 2$.`
				: `3) حسب دستور موافر: $(frac(z_1, ${spec.rTypst}))^n = cos(n ${thetaTypst}) + i sin(n ${thetaTypst})$.\nينتمي إلى $bb(R)$ إذا وفقط إذا كان $sin(n ${thetaTypst}) = 0 arrow.l.r.double n = ${spec.realPeriod} m$ ($m in bb(N)^*$).\nومن أجل $n = ${powerExp}$ نجد $(frac(z_1, ${spec.rTypst}))^(${powerExp}) = 1$.`;

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `من أجل كل عدد مركب $z$، نضع: $P(z) = ${polyT}$.`,
				content: [
					{
						type: 'text',
						content: `1) تحقّق أن $P(${z0}) = 0$، ثم عيّن العددين الحقيقيين $a$ و $b$ بحيث يكون من أجل كل $z in bb(C)$: $P(z) = (${factorLinT})(z^2 + a z + b)$، وحل في $bb(C)$ المعادلة $P(z) = 0$.`,
						answer: `1) بالتعويض نجد $P(${z0}) = (${z0})^3 + (${c2})(${z0})^2 + (${c1})(${z0}) + (${c0}) = 0$.\nبالمطابقة أو القسمة الإقليدية نجد $a = ${spec.quadB}$ و $b = ${spec.quadC}$، أي $P(z) = (${factorLinT})(${quadPartT})$.\nحل المعادلة $${quadPartT} = 0$: المميز $Delta = ${spec.delta} = (${spec.deltaRootTypst})^2$، فنجد:\n$z_0 = ${z0}$ ، $z_1 = ${spec.z1Typst}$ ، و $z_2 = ${spec.z2Typst}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) اكتب الجذرين غير الحقيقيين $z_1$ ($upright("Im")(z_1) > 0$) و $z_2$ على الشكل المثلثي ثم على الشكل الأسي.`,
						answer: `2) لدينا $r = |z_1| = |z_2| = sqrt(${spec.quadC}) = ${spec.rTypst}$، وعمدة $z_1$ هي $theta = ${thetaTypst}$:\n- $z_1 = ${spec.rTypst} (cos(${thetaTypst}) + i sin(${thetaTypst})) = ${spec.rTypst} e^(i ${thetaTypst})$.\n- $z_2 = overline(z_1) = ${spec.rTypst} (cos(-${thetaTypst}) + i sin(-${thetaTypst})) = ${spec.rTypst} e^(-i ${thetaTypst})$.`,
						mark: '1.25'
					},
					{
						type: 'text',
						content: thirdQContent,
						answer: thirdQAnswer,
						mark: '1.25'
					}
				]
			},
			hints: [
				`انشر $(z - (${z0}))(z^2 + az + b)$ وطابق المعاملات مع $P(z)$ لإيجاد $a = ${spec.quadB}$ و $b = ${spec.quadC}$.`,
				`استخرج الطويلة $r = ${spec.rKatex}$ لكتابة $z_1$ على الشكل الأسي $r e^{i\\theta}$.`,
				`استعمل دستور موافر: $(e^{i\\theta})^n = e^{i n\\theta} = \\cos(n\\theta) + i\\sin(n\\theta)$.`
			],
			solutionStepsAr: [
				`تحليل كثير الحدود: $P(z) = (z - (${z0}))(${quadKatex(1, spec.quadB, spec.quadC, 'z')})$، والحلول هي $${z0}$، $${spec.z1Katex}$، $${spec.z2Katex}$.`,
				`الشكل الأسي: $z_1 = ${spec.rKatex}e^{i${thetaKatex}}$ و $z_2 = ${spec.rKatex}e^{-i${thetaKatex}}$.`,
				difficulty === 'hard'
					? `شرط الحقيقي السالب: $${spec.negRealConditionKatex}$ ($m \\in \\mathbb{N}$)، و $S = 2$.`
					: `شرط الحقيقية: $n = ${spec.realPeriod}m$ ($m \\in \\mathbb{N}^*$).`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Complex Plane Geometry, Loci & Familiar Transformations ONLY
//    (Translation, Homothety, Rotation)
//    Uses saveSvgAsset + svgComplexPlane
// ═══════════════════════════════════════════════════════════════════════════════

const complexLociTransformsTemplate: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t2_complex_loci_transforms',
	grade: '3as_se',
	trimesterId: 't2',
	domain: 'complex',
	titleAr: 'التفسير الهندسي للأعداد المركبة، مجموعات النقط والتحويلات المألوفة',
	curriculumLessonId: 'lesson_3as_se_t2_complex_familiar_transformations',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		const centers: [number, number][] = [
			[0, 0],
			[1, 0],
			[-1, 0],
			[0, 1],
			[1, -1],
			[-1, -1],
			[0, -1]
		];
		const vectors: [number, number][] = [
			[2, 1],
			[3, 1],
			[2, -1],
			[1, 2],
			[3, -1],
			[2, 2],
			[1, -2]
		];
		const [xA, yA] = rng.pick(centers);
		const [u, v] = rng.pick(vectors);

		// B = A + (u, v); C is image of B by rotation of center A and angle +pi/2: zC - zA = i(zB - zA) = -v + i*u
		const xB = xA + u;
		const yB = yA + v;
		const xC = xA - v;
		const yC = yA + u;

		// D is image of C by translation of vector AB: zD = zC + (zB - zA), making ABDC a square
		const xD = xC + u;
		const yD = yC + v;

		const distSq = u * u + v * v;
		const rCircle = rng.pick([2, 3]);
		const homothetyK = difficulty === 'hard' ? rng.pick([-2, 2, 3]) : 2;
		const homothetyConstRe = (1 - homothetyK) * xA;
		const homothetyConstIm = (1 - homothetyK) * yA;

		// Rotation R(A, +pi/2): z' - zA = i(z - zA) <=> z' = i*z + (xA + yA) + i(yA - xA)
		const rotShiftRe = xA + yA;
		const rotShiftIm = yA - xA;

		const maxCoord = Math.max(
			Math.abs(xA) + rCircle + 1,
			Math.abs(yA) + rCircle + 1,
			Math.abs(xB) + 1,
			Math.abs(yB) + 1,
			Math.abs(xC) + 1,
			Math.abs(yC) + 1,
			Math.abs(xD) + 1,
			Math.abs(yD) + 1,
			5
		);

		const planeSvg = svgComplexPlane({
			range: maxCoord,
			points: [
				{ re: xA, im: yA, label: 'A', color: '#dc2626' },
				{ re: xB, im: yB, label: 'B', color: '#1d4ed8' },
				{ re: xC, im: yC, label: 'C', color: '#15803d' },
				{ re: xD, im: yD, label: 'D', color: '#7c3aed' }
			],
			segments: [
				{ from: [xA, yA], to: [xB, yB], color: '#1d4ed8' },
				{ from: [xA, yA], to: [xC, yC], color: '#15803d' },
				{ from: [xB, yB], to: [xD, yD], color: '#94a3b8' },
				{ from: [xC, yC], to: [xD, yD], color: '#94a3b8' }
			],
			circles: [{ cx: xA, cy: yA, r: rCircle, color: '#2563eb' }]
		});
		const imageUrl = saveSvgAsset(`3as_shared_t2_complex_plane_${difficulty}_${seed}`, planeSvg);

		const zAK = complexAlgKatex(xA, yA);
		const zBK = complexAlgKatex(xB, yB);
		const zCK = complexAlgKatex(xC, yC);
		const zDK = complexAlgKatex(xD, yD);

		const zAT = complexAlgTypst(xA, yA);
		const zBT = complexAlgTypst(xB, yB);
		const zCT = complexAlgTypst(xC, yC);
		const zDT = complexAlgTypst(xD, yD);

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = 'مثلث قائم ومتساوي الساقين في A';
			const mcq = buildUniqueMcqOptions(
				'مثلث قائم ومتساوي الساقين في $A$',
				[
					{
						text: 'مثلث متقايس الأضلاع',
						diagnosticFeedback: 'في المثلث متقايس الأضلاع تكون النسبة $e^{\\pm i\\frac{\\pi}{3}}$ وليس $i = e^{i\\frac{\\pi}{2}}$.'
					},
					{
						text: 'النقط $A$، $B$، $C$ في استقامية',
						diagnosticFeedback: 'تكون النقط في استقامية عندما تكون النسبة عدداً حقيقياً، أما هنا فالنسبة $i$ تخيلية صرفة.'
					},
					{
						text: 'مثلث قائم في $B$ غير متساوي الساقين',
						diagnosticFeedback: 'مقام النسبة وبسطها يشتركان في النقطة $A$، وطويلة النسبة $|i| = 1$ تعني $AC = AB$.'
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في المستوي المركب المنسوب إلى معلم متعامد ومتجانس مباشر $(O ; \\vec{u}, \\vec{v})$، نعتبر النقط $A(${zAK})$، $B(${zBK})$ و $C(${zCK})$. بحساب النسبة $\\frac{z_C - z_A}{z_B - z_A}$، ما هي الطبيعة الهندسية الدقيقة للمثلث $ABC$؟`,
				questionTextAr: `ما طبيعة المثلث $ABC$ حيث $z_A = ${zAK}$، $z_B = ${zBK}$، $z_C = ${zCK}$؟`,
				imageUrl,
				imageCaption: 'تمثيل النقط A, B, C, D ومجموعة النقط في المستوي المركب',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `لدينا $z_B - z_A = ${complexAlgKatex(u, v)}$ و $z_C - z_A = ${complexAlgKatex(-v, u)} = i(${complexAlgKatex(u, v)})$، ومنه $\\frac{z_C - z_A}{z_B - z_A} = i = e^{i\\frac{\\pi}{2}}$. إذن $AC = AB$ و $(\\overrightarrow{AB}, \\overrightarrow{AC}) = \\frac{\\pi}{2} + 2k\\pi$، فالمثلث $ABC$ قائم ومتساوي الساقين في $A$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${xD + yD}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في المستوي المركب، نعتبر النقط $A(${zAK})$، $B(${zBK})$ و $C(${zCK})$، ولتكن $D$ صورة النقطة $C$ بالانسحاب الذي شعاعه $\\overrightarrow{AB}$ (بحيث يصبح الرباعي $ABDC$ مربعاً). إذا كانت $z_D = x_D + i y_D$ لاحقة النقطة $D$، فاحسب المجموع $x_D + y_D$.`,
				questionTextAr: `النقطة $D$ صورة $C(${zCK})$ بالانسحاب ذي الشعاع $\\overrightarrow{AB}$ حيث $A(${zAK})$ و $B(${zBK})$. احسب $\\text{Re}(z_D) + \\text{Im}(z_D)$:`,
				imageUrl,
				imageCaption: 'المربع ABDC في المستوي المركب',
				questionData: {
					answer: xD + yD,
					displayTemplate: 'x_D + y_D = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `عبارة الانسحاب ذي الشعاع $\\overrightarrow{AB}$ تعطي $z_D = z_C + (z_B - z_A) = (${zCK}) + (${complexAlgKatex(u, v)}) = ${zDK}$. إذن $x_D = ${xD}$ و $y_D = ${yD}$، ومنه $x_D + y_D = ${xD + yD}$.`
			};
		} else {
			const rImage = Math.abs(homothetyK) * rCircle;
			finalAnswer = `${rImage}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `في المستوي المركب، لتكن $(\\Gamma)$ مجموعة النقط $M(z)$ التي تحقق $|z - (${zAK})| = ${rCircle}$، وليكن $h$ التحاكي الذي مركزه $A(${zAK})$ ونسبته العدد الحقيقي $k = ${homothetyK}$ (ذو الكتابة المركبة $z' - z_A = ${homothetyK}(z - z_A)$). ما هو نصف قطر الدائرة $(\\Gamma')$ صورة $(\\Gamma)$ بالتحاكي $h$؟`,
				questionTextAr: `ما نصف قطر الدائرة $(\\Gamma')$ صورة الدائرة $|z - (${zAK})| = ${rCircle}$ بالتحاكي الذي مركزه $A$ ونسبته $k = ${homothetyK}$؟`,
				imageUrl,
				imageCaption: 'الدائرة (Γ) ذات المركز A في المستوي المركب',
				questionData: {
					answer: rImage,
					displayTemplate: "R' = ?",
					variables: [],
					tolerance: 0
				},
				explanation: `المجموعة $(\\Gamma)$ دائرة مركزها $A$ ونصف قطرها $R = ${rCircle}$. صورة دائرة بتحاكٍ نسبته $k = ${homothetyK}$ هي دائرة نصف قطرها $R' = |k| \\times R = |${homothetyK}| \\times ${rCircle} = ${rImage}$.`
			};
		}

		const rotFormulaT =
			rotShiftRe === 0 && rotShiftIm === 0
				? 'z\' = i z'
				: `z' = i z + (${complexAlgTypst(rotShiftRe, rotShiftIm)})`;

		const homothetyFormulaT =
			homothetyConstRe === 0 && homothetyConstIm === 0
				? `z' = ${homothetyK} z`
				: `z' = ${homothetyK} z + (${complexAlgTypst(homothetyConstRe, homothetyConstIm)})`;

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `في المستوي المركب المنسوب إلى معلم متعامد ومتجانس مباشر $(O ; arrow(u), arrow(v))$، نعتبر النقط $A$، $B$ و $C$ ذات اللواحق على الترتيب:\n$z_A = ${zAT}$ ، $z_B = ${zBT}$ ، $z_C = ${zCT}$.`,
			content: [
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `1) احسب النسبة $frac(z_C - z_A, z_B - z_A)$ واكتبها على الشكل الأسي، ثم استنتج الطبيعة الهندسية للمثلث $A B C$.`,
							answer: `1) نحسب الفرقين: $z_B - z_A = ${complexAlgTypst(u, v)}$ و $z_C - z_A = ${complexAlgTypst(-v, u)}$.\nنلاحظ أن $z_C - z_A = i(${complexAlgTypst(u, v)}) = i(z_B - z_A)$، ومنه:\n$frac(z_C - z_A, z_B - z_A) = i = e^(i frac(pi, 2))$.\nبما أن الطويلة $|i| = 1$ والعمدة $frac(pi, 2)$، فإن $A C = A B = sqrt(${distSq})$ و $(arrow(A B), arrow(A C)) = frac(pi, 2) + 2 k pi$، إذن المثلث $A B C$ قائم ومتساوي الساقين في $A$ (مباشر).`,
							mark: '1.25'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'تمثيل النقط A, B, C, D والدائرة (Γ) في المستوي المركب'
						}
					]
				},
				{
					type: 'text',
					content: `2) اكتب العبارة المركبة للدوران $R$ الذي مركزه $A$ وزاويته $frac(pi, 2)$ وتحقّق أن $R(B) = C$، ثم عيّن لاحقة النقطة $D$ صورة $C$ بالانسحاب $t$ ذي الشعاع $arrow(A B)$ واستنتج طبيعة الرباعي $A B D C$.`,
					answer: `2) العبارة المركبة للدوران $R(A, frac(pi, 2))$: $z' - z_A = e^(i frac(pi, 2)) (z - z_A) = i(z - z_A)$، أي $${rotFormulaT}$.\nمن أجل $z = z_B$ نجد $z' - z_A = i(z_B - z_A) = z_C - z_A arrow.r.double z' = z_C$، أي $R(B) = C$.\nالانسحاب $t$ ذو الشعاع $arrow(A B)$ يرفق بـ $C$ النقطة $D$ حيث: $z_D = z_C + (z_B - z_A) = (${zCT}) + (${complexAlgTypst(u, v)}) = ${zDT}$.\nبما أن $arrow(C D) = arrow(A B)$ فـ $A B D C$ متوازي أضلاع، وبما أن $A B = A C$ والزاوية $hat(B A C) = frac(pi, 2)$، فإن الرباعي $A B D C$ مربع.`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) عيّن طبيعة وعناصر مجموعة النقط $(Gamma)$ ذات المعادلة $|z - (${zAT})| = ${rCircle}$، ومجموعة النقط $(Delta)$ ذات المعادلة $|z - (${zAT})| = |overline(z) - overline((${zBT}))|$، ثم عيّن صورة $(Gamma)$ بالتحاكي $h$ ذي العبارة المركبة $${homothetyFormulaT}$ (أي $z' - z_A = ${homothetyK}(z - z_A)$).`,
					answer: `3) تعيين مجموعات النقط وصورتها:\n- $(Gamma)$: $|z - z_A| = ${rCircle} arrow.l.r.double A M = ${rCircle}$، فهي الدائرة التي مركزها $A$ ونصف قطرها $R = ${rCircle}$.\n- $(Delta)$: بما أن $|overline(z) - overline(z_B)| = |overline(z - z_B)| = |z - z_B|$، فإن المعادلة تكافئ $A M = B M$، أي أن $(Delta)$ هي المستقيم المحوري للقطعة $[A B]$.\n- التحاكي $h$ مركزه النقطة الصامدة $A$ ونسبته الحقيقية $k = ${homothetyK}$؛ إذن صورة الدائرة $(Gamma)$ بالتحاكي $h$ هي الدائرة $(Gamma')$ التي مركزها $h(A) = A$ ونصف قطرها $R' = |${homothetyK}| times ${rCircle} = ${Math.abs(homothetyK) * rCircle}$.`,
					mark: '1.25'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`احسب $z_B - z_A$ و $z_C - z_A$ وتحقق أن $z_C - z_A = i(z_B - z_A)$.`,
				`العبارة المركبة للدوران الذي مركزه $A$ وزاويته $\\frac{\\pi}{2}$ هي $z' - z_A = i(z - z_A)$، وللانسحاب ذي الشعاع $\\overrightarrow{AB}$ هي $z' = z + (z_B - z_A)$.`,
				`استعمل خاصية الطويلة $|\\overline{w}| = |w|$ لتبسيط معادلة $(\\Delta)$، وتذكّر أن التحاكي ذا النسبة الحقيقية $k$ يضرب أنصاف الأقطار في $|k|$.`
			],
			solutionStepsAr: [
				`النسبة $\\frac{z_C - z_A}{z_B - z_A} = i = e^{i\\frac{\\pi}{2}}$، فالمثلث $ABC$ قائم ومتساوي الساقين في $A$.`,
				`بالانسحاب ذي الشعاع $\\overrightarrow{AB}$: $z_D = ${zDK}$، والرباعي $ABDC$ مربع.`,
				`$(\\Gamma)$ دائرة مركزها $A$ ونصف قطرها $${rCircle}$، $(\\Delta)$ محور القطعة $[AB]$، وصورة $(\\Gamma)$ بالتحاكي $h(A, ${homothetyK})$ دائرة مركزها $A$ ونصف قطرها $${Math.abs(homothetyK) * rCircle}$.`
			],
			finalAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Composite Primitives (u'e^u, u'/u), Initial Condition F(x_0)=y_0 & y'=ay+b
// ═══════════════════════════════════════════════════════════════════════════════

const primitiveDiffEqTemplate: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t2_primitive_diff_eq',
	grade: '3as_se',
	trimesterId: 't2',
	domain: 'analysis',
	titleAr: 'الدوال الأصلية للدوال المركبة، الشرط الابتدائي والمعادلات التفاضلية',
	curriculumLessonId: 'lesson_3as_se_t2_primitive_functions',
	defaultPoints: 4,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		if (difficulty === 'easy') {
			// f(x) = m*(2x + p)*e^(x^2 + p*x) + 2*q*x on R
			// F(x) = m*e^(x^2 + p*x) + q*x^2 + C ; F_0(0) = y0 => m + C = y0 => C = y0 - m
			const m = rng.pick([1, 2, 3, -1, -2]);
			const p = rng.pick([-3, -2, -1, 1, 2, 3]);
			const q = rng.pick([1, 2, 3]);
			const y0 = rng.pick([-2, -1, 0, 1, 2, 4, 5]);
			const cInit = y0 - m;

			// Diff eq: y' = aDiff * y + bDiff with bDiff = -aDiff * eqConst => equilibrium d = eqConst
			const aDiff = rng.pick([-3, -2, 2, 3]);
			const eqConst = rng.pick([-2, -1, 1, 2, 3]);
			const bDiff = -aDiff * eqConst;
			const y1 = rng.pick([0, 1, 2, 4]);
			const kDiff = y1 - eqConst; // y(x) = kDiff * e^(aDiff * x) + eqConst

			const uExpK = quadKatex(1, p, 0, 'x');
			const uExpT = quadTypst(1, p, 0, 'x');
			const uPrimeK = linearKatex(2, p, 'x');
			const uPrimeT = linearTypst(2, p, 'x');
			const mPrefK = m === 1 ? '' : m === -1 ? '-' : `${m}`;
			const mPrefT = m === 1 ? '' : m === -1 ? '-' : `${m} `;

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'calculated',
					questionText: `لتكن الدالة $f(x) = ${mPrefK}(${uPrimeK})e^{${uExpK}} + ${2 * q}x$ المعرفة على $\\mathbb{R}$، ولتكن $F_0(x) = ${mPrefK}e^{${uExpK}} + ${q === 1 ? '' : q}x^2 + C$ الدالة الأصلية الوحيدة لـ $f$ على $\\mathbb{R}$ التي تحقق الشرط الابتدائي $F_0(0) = ${y0}$. احسب قيمة الثابت الحقيقي $C$.`,
					questionTextAr: `عيّن قيمة الثابت $C$ في الدالة الأصلية $F_0(x) = ${mPrefK}e^{${uExpK}} + ${q === 1 ? '' : q}x^2 + C$ علماً أن $F_0(0) = ${y0}$:`,
					questionData: {
						answer: cInit,
						displayTemplate: 'C = ?',
						variables: [],
						tolerance: 0
					},
					explanation: `نعوّض $x = 0$ في عبارة $F_0(x)$: بما أن $e^0 = 1$ فإن $F_0(0) = ${m}(1) + 0 + C = ${m} + C$. ومن الشرط $F_0(0) = ${y0}$ نجد $C = ${y0} - (${m}) = ${cInit}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `أجب عن الجزأين المستقلين التاليين حول الدوال الأصلية والمعادلات التفاضلية على $bb(R)$:`,
					content: [
						{
							type: 'text',
							content: `1) نعتبر الدالة $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${mPrefT}(${uPrimeT}) e^(${uExpT}) + ${2 * q} x$.\nعيّن مجموعة الدوال الأصلية للدالة $f$ على $bb(R)$.`,
							answer: `1) نضع $u(x) = ${uExpT}$ فيكون $u'(x) = ${uPrimeT}$، فتُكتب $f(x) = ${m} u'(x) e^(u(x)) + ${2 * q} x$.\nإذن مجموعة الدوال الأصلية لـ $f$ على $bb(R)$ هي الدوال $F$ المعرفة بـ:\n$F(x) = ${mPrefT}e^(${uExpT}) + ${q === 1 ? '' : `${q} `}x^2 + C$ حيث $C in bb(R)$.`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) عيّن الدالة الأصلية الوحيدة $F_0$ للدالة $f$ على $bb(R)$ التي تحقق الشرط الابتدائي $F_0(0) = ${y0}$.`,
							answer: `2) لدينا $F_0(0) = ${y0} arrow.l.r.double ${m} e^0 + 0 + C = ${y0} arrow.l.r.double ${m} + C = ${y0} arrow.l.r.double C = ${cInit}$.\nومنه $F_0(x) = ${mPrefT}e^(${uExpT}) + ${q === 1 ? '' : `${q} `}x^2${signedConst(cInit)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) حل في $bb(R)$ المعادلة التفاضلية $(E) : y' = ${linearTypst(aDiff, bDiff, 'y')}$، ثم عيّن الحل الخاص $y$ الذي يحقق $y(0) = ${y1}$.`,
							answer: `3) المعادلة من الشكل $y' = a y + b$ مع $a = ${aDiff}$ و $b = ${bDiff}$، حلولها العامة على $bb(R)$ هي:\n$y(x) = K e^(${aDiff} x) - frac(${bDiff}, ${aDiff}) = K e^(${aDiff} x)${signedConst(eqConst)}$ ($K in bb(R)$).\nبتعويض الشرط الابتدائي $y(0) = ${y1}$: $K + (${eqConst}) = ${y1} arrow.r.double K = ${kDiff}$، إذن الحل الخاص هو $y(x) = ${kDiff} e^(${aDiff} x)${signedConst(eqConst)}$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`لاحظ أن مشتقة $u(x) = ${uExpK}$ هي $u'(x) = ${uPrimeK}$، ودالة أصلية لـ $u'e^u$ هي $e^u$.`,
					`عند حساب $F_0(0)$ لا تنسَ أن $e^0 = 1$ وليس $0$!`,
					`حلول المعادلة التفاضلية $y' = ay + b$ ($a \\neq 0$) هي $y(x) = K e^{ax} - \\frac{b}{a}$.`
				],
				solutionStepsAr: [
					`الدوال الأصلية العامة: $F(x) = ${mPrefK}e^{${uExpK}} + ${q === 1 ? '' : q}x^2 + C$ ($C \\in \\mathbb{R}$).`,
					`من $F_0(0) = ${m} + C = ${y0}$ نجد $C = ${cInit}$.`,
					`حل المعادلة التفاضلية الخاص: $y(x) = ${kDiff}e^{${aDiff}x}${signedConst(eqConst)}$.`
				],
				finalAnswer: `${cInit}`
			};
		}

		if (difficulty === 'medium') {
			// u(x) = (x + h)^2 + 1 = x^2 + 2h x + (h^2 + 1) >= 1 > 0 on R
			// f(x) = aLin + kLog * (2x + 2h) / (x^2 + 2h x + h^2 + 1)
			// F_0(-h) = y0 => aLin*(-h) + kLog*ln(1) + C = y0 => C = y0 + aLin*h
			const h = rng.pick([-2, -1, 1, 2, 3]);
			const aLin = rng.pick([-2, -1, 1, 2, 3]);
			const kLog = rng.pick([1, 2, 3, 4]);
			const y0 = rng.pick([-1, 0, 1, 2, 3, 5]);
			const bCoef = 2 * h;
			const cCoef = h * h + 1;
			const x0 = -h;
			const cInit = y0 + aLin * h;

			const aDiff = rng.pick([-4, -3, -2, 2, 3]);
			const eqConst = rng.pick([-2, -1, 1, 2]);
			const bDiff = -aDiff * eqConst;
			const y1 = rng.pick([0, 1, 3]);
			const kDiff = y1 - eqConst;

			const uQuadK = quadKatex(1, bCoef, cCoef, 'x');
			const uQuadT = quadTypst(1, bCoef, cCoef, 'x');
			const numLogK = linearKatex(2 * kLog, kLog * bCoef, 'x');
			const numLogT = linearTypst(2 * kLog, kLog * bCoef, 'x');
			const aLinTermK = aLin === 1 ? 'x' : aLin === -1 ? '-x' : `${aLin}x`;
			const aLinTermT = aLin === 1 ? 'x' : aLin === -1 ? '-x' : `${aLin} x`;
			const kPrefK = kLog === 1 ? '' : `${kLog}`;
			const kPrefT = kLog === 1 ? '' : `${kLog} `;

			const correctF0Text = `$F_0(x) = ${aLinTermK} + ${kPrefK}\\ln(${uQuadK})${signedConst(cInit)}$`;
			const mcq = buildUniqueMcqOptions(
				correctF0Text,
				[
					{
						text: `$F_0(x) = ${aLinTermK} + ${2 * kLog}\\ln(${uQuadK})${signedConst(cInit)}$`,
						diagnosticFeedback: `انتبه: مشتقة المقام $u(x) = ${uQuadK}$ هي $2x${signedConst(bCoef)}$، لذا معامل $\\ln(u(x))$ هو $${kLog}$ وليس $${2 * kLog}$.`
					},
					{
						text: `$F_0(x) = ${aLinTermK} + ${kPrefK}\\ln(${uQuadK})${signedConst(y0 - aLin * h)}$`,
						diagnosticFeedback: `راجع التعويض عند $x_0 = ${x0}$: لدينا $a x_0 + C = ${y0} \\implies C = ${y0} - (${aLin})(${x0}) = ${cInit}$.`
					},
					{
						text: `$F_0(x) = ${aLinTermK} - \\frac{${kLog}}{(${uQuadK})^2}${signedConst(cInit + kLog)}$`,
						diagnosticFeedback: 'خلطت بين حساب المشتقة وتعيين الدالة الأصلية للشكل $\\frac{u\'(x)}{u(x)}$.'
					}
				],
				rng
			);

			return {
				templateId: this.id,
				seed,
				grade: '3as_se',
				trimesterId: 't2',
				difficulty,
				domain: this.domain,
				titleAr: this.titleAr,
				quizQuestion: {
					type: 'mcq',
					questionText: `نعتبر الدالة $f(x) = ${aLin} + \\frac{${numLogK}}{${uQuadK}}$ المعرفة على $\\mathbb{R}$. ما هي عبارة الدالة الأصلية الوحيدة $F_0$ للدالة $f$ على $\\mathbb{R}$ التي تحقق $F_0(${x0}) = ${y0}$؟`,
					questionTextAr: `عيّن الدالة الأصلية $F_0$ لـ $f(x) = ${aLin} + \\frac{${numLogK}}{${uQuadK}}$ على $\\mathbb{R}$ علماً أن $F_0(${x0}) = ${y0}$:`,
					questionData: {
						options: mcq.options,
						correctIndices: mcq.correctIndices,
						correctIndexes: mcq.correctIndices
					},
					explanation: `المقام $u(x) = (x${signedConst(h)})^2 + 1 > 0$ على $\\mathbb{R}$ ومشتقته $u'(x) = ${linearKatex(2, bCoef, 'x')}$، فتُكتب $f(x) = ${aLin} + ${kLog}\\frac{u'(x)}{u(x)}$. إذن $F_0(x) = ${aLinTermK} + ${kPrefK}\\ln(${uQuadK}) + C$. وبما أن $u(${x0}) = 1$ فإن $\\ln(u(${x0})) = 0$، ومنه $${aLin * x0} + C = ${y0} \\implies C = ${cInit}$.`
				},
				sujetExercise: {
					points: this.defaultPoints,
					instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${aLin} + frac(${numLogT}, ${uQuadT})$.`,
					content: [
						{
							type: 'text',
							content: `1) تحقّق أنه من أجل كل $x in bb(R)$: $${uQuadT} = (x${signedConst(h)})^2 + 1 > 0$، ثم عيّن مجموعة الدوال الأصلية للدالة $f$ على $bb(R)$.`,
							answer: `1) بالنشر: $(x${signedConst(h)})^2 + 1 = x^2${signedConst(bCoef)} x + ${h * h} + 1 = ${uQuadT} >= 1 > 0$ على $bb(R)$.\nنضع $u(x) = ${uQuadT}$ فنجد $u'(x) = ${linearTypst(2, bCoef, 'x')}$، فتُكتب $f(x) = ${aLin} + ${kLog} frac(u'(x), u(x))$.\nبما أن $u(x) > 0$ على $bb(R)$، فإن الدوال الأصلية لـ $f$ على $bb(R)$ هي:\n$F(x) = ${aLinTermT} + ${kPrefT}ln(${uQuadT}) + C$ ($C in bb(R)$).`,
							mark: '1.5'
						},
						{
							type: 'text',
							content: `2) عيّن الدالة الأصلية الوحيدة $F_0$ للدالة $f$ على $bb(R)$ التي تنعدم (أو تأخذ القيمة $${y0}$) عند $x_0 = ${x0}$ أي $F_0(${x0}) = ${y0}$.`,
							answer: `2) نعوّض $x_0 = ${x0}$: لدينا $u(${x0}) = (${x0}${signedConst(h)})^2 + 1 = 1$ ومنه $ln(1) = 0$.\nإذن $F_0(${x0}) = ${aLin}(${x0}) + 0 + C = ${y0} arrow.r.double C = ${y0} - (${aLin * x0}) = ${cInit}$.\nوبالتالي: $F_0(x) = ${aLinTermT} + ${kPrefT}ln(${uQuadT})${signedConst(cInit)}$.`,
							mark: '1'
						},
						{
							type: 'text',
							content: `3) حل على $bb(R)$ المعادلة التفاضلية $y' = ${linearTypst(aDiff, bDiff, 'y')}$ مع الشرط الابتدائي $y(0) = ${y1}$.`,
							answer: `3) الحل العام للمعادلة $y' = ${aDiff} y${signedConst(bDiff)}$ هو $y(x) = K e^(${aDiff} x) - frac(${bDiff}, ${aDiff}) = K e^(${aDiff} x)${signedConst(eqConst)}$.\nمن $y(0) = ${y1}$ نجد $K + (${eqConst}) = ${y1} arrow.r.double K = ${kDiff}$، أي $y(x) = ${kDiff} e^(${aDiff} x)${signedConst(eqConst)}$.`,
							mark: '1.5'
						}
					]
				},
				hints: [
					`أكمل المربع في المقام: $u(x) = (x${signedConst(h)})^2 + 1 > 0$، ثم قارن البسط بمشتقة المقام $u'(x) = ${linearKatex(2, bCoef, 'x')}$.`,
					`دالة أصلية لـ $\\frac{u'(x)}{u(x)}$ عندما $u(x) > 0$ هي $\\ln(u(x))$، ولاحظ أن $\\ln(1) = 0$ عند $x_0 = ${x0}$.`,
					`المعادلة التفاضلية $y' = ay + b$ تقبل حلولاً من الشكل $y(x) = K e^{ax} - \\frac{b}{a}$.`
				],
				solutionStepsAr: [
					`$u(x) = ${uQuadK} > 0$ و $f(x) = ${aLin} + ${kLog}\\frac{u'(x)}{u(x)}$، ومنه $F(x) = ${aLinTermK} + ${kPrefK}\\ln(${uQuadK}) + C$.`,
					`شرط القيمة الابتدائية $F_0(${x0}) = ${y0}$ يعطي $C = ${cInit}$.`,
					`الحل الخاص للمعادلة التفاضلية: $y(x) = ${kDiff}e^{${aDiff}x}${signedConst(eqConst)}$.`
				],
				finalAnswer: `C = ${cInit}`
			};
		}

		// HARD: Undetermined coefficients G(x) = (alpha*x + beta)*e^(k*x) + logarithmic rational term + initial condition
		const kExp = rng.pick([-2, -1, 1, 2]);
		const alpha = rng.pick([-2, -1, 1, 2, 3]);
		const beta = rng.pick([-3, -2, -1, 1, 2, 3]);
		// G'(x) = (kExp*alpha*x + (alpha + kExp*beta))*e^(kExp*x)
		const pCoef = kExp * alpha;
		const qCoef = alpha + kExp * beta;
		const mLog = rng.pick([1, 2, 3]);
		const y0 = rng.pick([-2, 0, 1, 3, 4]);
		// F(x) = (alpha*x + beta)*e^(kExp*x) + mLog*ln(x^2 + 1) + C
		// F_0(0) = beta + 0 + C = y0 => C = y0 - beta
		const cInit = y0 - beta;

		const expArgK = kExp === 1 ? 'x' : kExp === -1 ? '-x' : `${kExp}x`;
		const expArgT = kExp === 1 ? 'x' : kExp === -1 ? '-x' : `${kExp} x`;

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'calculated',
				questionText: `لتكن الدالة $g(x) = (${linearKatex(pCoef, qCoef, 'x')})e^{${expArgK}}$ المعرفة على $\\mathbb{R}$، ولتكن $G(x) = (\\alpha x + \\beta)e^{${expArgK}}$ دالة أصلية لـ $g$ على $\\mathbb{R}$. احسب المجموع $\\alpha + \\beta$.`,
				questionTextAr: `إذا كانت $G(x) = (\\alpha x + \\beta)e^{${expArgK}}$ دالة أصلية لـ $g(x) = (${linearKatex(pCoef, qCoef, 'x')})e^{${expArgK}}$، فاحسب $\\alpha + \\beta$:`,
				questionData: {
					answer: alpha + beta,
					displayTemplate: 'α + β = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `نشتق $G(x)$: $G'(x) = (\\alpha + (${kExp})(\\alpha x + \\beta))e^{${expArgK}} = (${kExp}\\alpha x + \\alpha + (${kExp})\\beta)e^{${expArgK}}$. بالمطابقة مع $g(x)$ نجد $${kExp}\\alpha = ${pCoef} \\implies \\alpha = ${alpha}$، و $\\alpha + (${kExp})\\beta = ${qCoef} \\implies \\beta = ${beta}$، ومنه $\\alpha + \\beta = ${alpha + beta}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `نعتبر الدالة العددية $f$ المعرفة على $bb(R)$ بـ: $f(x) = (${linearTypst(pCoef, qCoef, 'x')}) e^(${expArgT}) + frac(${2 * mLog} x, x^2 + 1)$.`,
				content: [
					{
						type: 'text',
						content: `1) عيّن العددين الحقيقيين $alpha$ و $beta$ بحيث تكون الدالة $G(x) = (alpha x + beta) e^(${expArgT})$ دالة أصلية للدالة $x arrow.r.bar (${linearTypst(pCoef, qCoef, 'x')}) e^(${expArgT})$ على $bb(R)$.`,
						answer: `1) الدالة $G$ قابلة للاشتقاق على $bb(R)$ ومشتقتها:\n$G'(x) = [alpha + (${kExp})(alpha x + beta)] e^(${expArgT}) = (${kExp} alpha x + alpha + (${kExp}) beta) e^(${expArgT})$.\nبالمطابقة مع $(${linearTypst(pCoef, qCoef, 'x')}) e^(${expArgT})$ نجد:\n$${kExp} alpha = ${pCoef} arrow.r.double alpha = ${alpha}$ ، و $alpha + (${kExp}) beta = ${qCoef} arrow.r.double beta = ${beta}$.\nإذن $G(x) = (${linearTypst(alpha, beta, 'x')}) e^(${expArgT})$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `2) استنتج مجموعة الدوال الأصلية للدالة $f$ على $bb(R)$، ثم عيّن الدالة الأصلية الوحيدة $F_0$ التي تحقق $F_0(0) = ${y0}$.`,
						answer: `2) نلاحظ أن $frac(${2 * mLog} x, x^2 + 1) = ${mLog} frac(2 x, x^2 + 1)$ مع $x^2 + 1 > 0$ على $bb(R)$.\nإذن الدوال الأصلية لـ $f$ على $bb(R)$ هي: $F(x) = (${linearTypst(alpha, beta, 'x')}) e^(${expArgT}) + ${mLog === 1 ? '' : `${mLog} `}ln(x^2 + 1) + C$ ($C in bb(R)$).\nالشرط الابتدائي: $F_0(0) = ${beta} e^0 + 0 + C = ${y0} arrow.r.double C = ${y0} - (${beta}) = ${cInit}$.\nومنه $F_0(x) = (${linearTypst(alpha, beta, 'x')}) e^(${expArgT}) + ${mLog === 1 ? '' : `${mLog} `}ln(x^2 + 1)${signedConst(cInit)}$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `3) تحقّق أن الدالة $G$ حل على $bb(R)$ للمعادلة التفاضلية $y' - (${kExp}) y = ${alpha} e^(${expArgT})$، وحل المعادلة المتجانسة المرفقة $y' - (${kExp}) y = 0$.`,
						answer: `3) من السؤال الأول: $G'(x) - (${kExp}) G(x) = (${linearTypst(pCoef, qCoef, 'x')} - (${kExp})(${linearTypst(alpha, beta, 'x')})) e^(${expArgT}) = ${alpha} e^(${expArgT})$، فالدالة $G$ حل خاص.\nحلول المعادلة المتجانسة $y' = ${kExp} y$ على $bb(R)$ هي الدوال $y_0(x) = K e^(${expArgT})$ حيث $K in bb(R)$.`,
						mark: '1'
					}
				]
			},
			hints: [
				`اشتق الجداء $G(x) = (\\alpha x + \\beta)e^{${expArgK}}$ باستعمال قاعدة $(uv)' = u'v + uv'$ ثم طابق المعاملات.`,
				`الحد الثاني يكتب على الشكل $${mLog}\\frac{u'(x)}{u(x)}$ مع $u(x) = x^2 + 1 > 0$.`,
				`عند التعويض بـ $x = 0$ تذكّر أن $e^0 = 1$ و $\\ln(1) = 0$.`
			],
			solutionStepsAr: [
				`بالمطابقة نجد $\\alpha = ${alpha}$ و $\\beta = ${beta}$ أي $G(x) = (${linearKatex(alpha, beta, 'x')})e^{${expArgK}}$.`,
				`الدالة الأصلية التي تحقق $F_0(0) = ${y0}$ هي $F_0(x) = (${linearKatex(alpha, beta, 'x')})e^{${expArgK}} + ${mLog === 1 ? '' : mLog}\\ln(x^2 + 1)${signedConst(cInit)}$.`,
				`تحقيق المعادلة التفاضلية وحل المتجانسة $y(x) = K e^{${expArgK}}$.`
			],
			finalAnswer: `${alpha + beta}`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 6. Comprehensive BAC Analytical Study + Tangent + Primitives Problem (7 pts)
//    Official BAC Exercise 4 heading: "التمرين الرابع: المسألة الشاملة"
//    Uses saveSvgAsset + svgFunctionCurvePlot
// ═══════════════════════════════════════════════════════════════════════════════

const bacProblemSynthesisTemplate: ParameterizedTemplate = {
	id: 'tpl_3as_shared_t2_bac_problem_synthesis',
	grade: '3as_se',
	trimesterId: 't2',
	domain: 'integration',
	isIntegration: true,
	defaultPoints: 7,
	titleAr: 'المسألة الشاملة: الدراسة التحليلية لدالة أسية، المماس والدوال الأصلية',
	curriculumLessonId: 'lesson_3as_se_t2_integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = new SeededRng(seed);

		// Auxiliary g(x) = 1 + (x + a)*e^x on R (a in {1, 2, 3}):
		// g'(x) = (x + a + 1)*e^x, min at x_min = -(a + 1), min value 1 - e^(-(a + 1)) > 0 => g(x) > 0 on R!
		// Main f(x) = m*x + beta + m*(x + c)*e^x where c = a - 1 in {0, 1, 2}:
		// f'(x) = m + m*(x + c + 1)*e^x = m * g(x) > 0 on R!
		// Oblique asymptote (Delta) at -oo: y = m*x + beta; intersects (C_f) at I(-c, -m*c + beta).
		// Tangent (T) at x = 0: y = m*(1 + a)*x + (beta + m*c).
		// Tangent (T') parallel to (Delta): f'(x) = m <=> g(x) = 1 <=> x = -a.
		// Primitive of h(x) = m*(x + c)*e^x is H(x) = (lambda*x + mu)*e^x with lambda = m, mu = m*(c - 1).
		// Primitive of f(x): F(x) = (m/2)*x^2 + beta*x + (lambda*x + mu)*e^x + K, with F_0(0) = y0 => K = y0 - mu.
		const m = difficulty === 'easy' ? 1 : difficulty === 'medium' ? rng.pick([1, 2]) : 2;
		const a = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([1, 2, 3]);
		const beta = rng.pick([-2, -1, 0, 1, 2]);
		const y0 = rng.pick([-2, -1, 0, 1, 2, 3, 4]);

		const c = a - 1; // 0, 1, or 2
		const xMinAux = -(a + 1);
		const fAt0 = beta + m * c;
		const slopeAt0 = m * (1 + a);
		const xIntersect = -c;
		const yIntersect = -m * c + beta;

		const lambda = m;
		const mu = m * (c - 1);
		const kConst = y0 - mu;

		const fnEval = (x: number) => m * x + beta + m * (x + c) * Math.exp(x);
		const yPlotMin = Math.min(-4, yIntersect - 2, fnEval(-3.5) - 1);
		const yPlotMax = Math.max(6, fAt0 + 4);

		const curveSvg = svgFunctionCurvePlot({
			xMin: -4,
			xMax: 1.6,
			yMin: Math.floor(yPlotMin),
			yMax: Math.ceil(yPlotMax),
			fn: fnEval,
			curveLabel: '(C_f)',
			asymptotes: [
				{
					kind: 'oblique',
					a: m,
					b: beta,
					label: `y = ${linearTypst(m, beta, 'x').replace(/\s+/g, '')}`,
					color: '#dc2626'
				}
			],
			tangents: [
				{
					x: 0,
					y: fAt0,
					slope: slopeAt0,
					halfSpan: 0.75,
					color: '#059669'
				}
			],
			points: [
				{ x: xIntersect, y: yIntersect, label: `I(${xIntersect},${yIntersect})`, color: '#dc2626' },
				{ x: 0, y: fAt0, label: `A(0,${fAt0})`, color: '#15803d' }
			],
			width: 390,
			height: 260
		});
		const imageUrl = saveSvgAsset(`3as_shared_t2_bac_curve_${difficulty}_${seed}`, curveSvg);

		const mPrefK = m === 1 ? '' : `${m}`;
		const mPrefT = m === 1 ? '' : `${m} `;
		const expFactorK = c === 0 ? `${mPrefK}x e^x` : `${mPrefK}(x + ${c})e^x`;
		const expFactorT = c === 0 ? `${mPrefT}x e^x` : `${mPrefT}(x + ${c}) e^x`;
		const fExprK = `${linearKatex(m, beta, 'x')} + ${expFactorK}`;
		const fExprT = `${linearTypst(m, beta, 'x')} + ${expFactorT}`;
		const deltaLineK = `y = ${linearKatex(m, beta, 'x')}`;
		const deltaLineT = `y = ${linearTypst(m, beta, 'x')}`;
		const tangentLineK = `y = ${linearKatex(slopeAt0, fAt0, 'x')}`;
		const tangentLineT = `y = ${linearTypst(slopeAt0, fAt0, 'x')}`;

		const quadTermK = m === 2 ? 'x^2' : '\\frac{1}{2}x^2';
		const quadTermT = m === 2 ? 'x^2' : 'frac(1, 2) x^2';
		const betaXTermT =
			beta === 0 ? '' : beta === 1 ? ' + x' : beta === -1 ? ' - x' : beta > 0 ? ` + ${beta} x` : ` - ${Math.abs(beta)} x`;
		const primExpPartT = `(${linearTypst(lambda, mu, 'x')}) e^x`;

		let quizQuestion: QuizQuestionPayload;
		let finalAnswer: string;

		if (difficulty === 'easy') {
			finalAnswer = `${slopeAt0}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر على $\\mathbb{R}$ الدالة المساعدة $g(x) = 1 + (x + ${a})e^x$ والدالة الرئيسية $f(x) = ${fExprK}$ حيث $f'(x) = ${mPrefK}g(x)$. احسب معامل توجيه المماس $(T)$ للمنحنى $(C_f)$ عند النقطة ذات الفاصلة $x_0 = 0$ (أي $f'(0)$).`,
				questionTextAr: `لدينا $f(x) = ${fExprK}$ و $f'(x) = ${mPrefK}(1 + (x + ${a})e^x)$. احسب $f'(0)$:`,
				imageUrl,
				imageCaption: 'المنحنى البياني (C_f) والمستقيم المقارب المائل (Δ) والمماس (T)',
				questionData: {
					answer: slopeAt0,
					displayTemplate: "f'(0) = ?",
					variables: [],
					tolerance: 0
				},
				explanation: `لدينا $f'(x) = ${mPrefK}g(x) = ${mPrefK}(1 + (x + ${a})e^x)$، ومنه عند $x_0 = 0$: $f'(0) = ${m}(1 + ${a} \\times e^0) = ${m} \\times ${1 + a} = ${slopeAt0}$.`
			};
		} else if (difficulty === 'medium') {
			finalAnswer = `${kConst}`;
			quizQuestion = {
				type: 'calculated',
				questionText: `نعتبر الدالة $f(x) = ${fExprK}$ المعرفة على $\\mathbb{R}$، وتُعطى دوالها الأصلية على الشكل $F(x) = ${quadTermK}${beta === 0 ? '' : beta > 0 ? ` + ${beta === 1 ? '' : beta}x` : ` - ${Math.abs(beta) === 1 ? '' : Math.abs(beta)}x`} + (${linearKatex(lambda, mu, 'x')})e^x + K$. عيّن قيمة الثابت $K$ للدالة الأصلية الوحيدة $F_0$ التي تحقق الشرط الابتدائي $F_0(0) = ${y0}$.`,
				questionTextAr: `في عبارة الدالة الأصلية $F_0(x)$ للدالة $f(x) = ${fExprK}$، احسب قيمة الثابت $K$ التي تحقق $F_0(0) = ${y0}$:`,
				imageUrl,
				imageCaption: 'المنحنى البياني (C_f) للدالة المدروسة في المسألة الشاملة',
				questionData: {
					answer: kConst,
					displayTemplate: 'K = ?',
					variables: [],
					tolerance: 0
				},
				explanation: `بتعويض $x = 0$ في عبارة $F_0(x)$ مع $e^0 = 1$: $F_0(0) = 0 + 0 + (${mu})(1) + K = ${mu} + K$. ومن الشرط $F_0(0) = ${y0}$ نستنتج $K = ${y0} - (${mu}) = ${kConst}$.`
			};
		} else {
			finalAnswer = `x = ${-a}`;
			const mcq = buildUniqueMcqOptions(
				`$x_1 = ${-a}$`,
				[
					{
						text: `$x_1 = ${-c}$`,
						diagnosticFeedback: `الفاصلة $x = ${-c}$ هي فاصلة تقاطع $(C_f)$ مع المستقيم المقارب $(\\Delta)$ وليست فاصلة التماس الموازي لـ $(\\Delta)$.`
					},
					{
						text: `$x_1 = ${xMinAux}$`,
						diagnosticFeedback: `الفاصلة $x = ${xMinAux}$ تعدم مشتقة الدالة المساعدة $g'(x)$ ولا تحقق $g(x) = 1$.`
					},
					{
						text: `$x_1 = ${a}$`,
						diagnosticFeedback: `انتبه للإشارة عند حل المعادلة $(x + ${a})e^x = 0 \\iff x = -${a}$.`
					}
				],
				rng
			);
			quizQuestion = {
				type: 'mcq',
				questionText: `في المسألة الشاملة، نعتبر الدالة $f(x) = ${fExprK}$ ذات المستقيم المقارب المائل $(\\Delta) : ${deltaLineK}$ بجوار $-\\infty$، علماً أن $f'(x) = ${m}(1 + (x + ${a})e^x)$. ما هي فاصلة النقطة الوحيدة من $(C_f)$ التي يقبل عندها المنحنى مماساً $(T')$ موازياً للمستقيم $(\\Delta)$؟`,
				questionTextAr: `عيّن فاصلة النقطة من $(C_f)$ التي يكون عندها المماس موازياً للمستقيم المقارب $(\\Delta) : ${deltaLineK}$:`,
				imageUrl,
				imageCaption: 'المنحنى (C_f) والمستقيم المقارب المائل (Δ)',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `يكون المماس موازياً لـ $(\\Delta)$ إذا وفقط إذا كان لهما نفس معامل التوجيه $${m}$، أي $f'(x) = ${m} \\iff ${m}(1 + (x + ${a})e^x) = ${m} \\iff (x + ${a})e^x = 0$. وبما أن $e^x > 0$ دوماً، نجد $x_1 = ${-a}$.`
			};
		}

		const sujetExercise: ExerciseBlock = {
			customTitle: 'التمرين الرابع: المسألة الشاملة',
			points: this.defaultPoints,
			instruction: `تتكوّن المسألة من ثلاثة أجزاء مترابطة لدراسة دالة عددية أسية وتعيين دوالها الأصلية على $bb(R)$ في مستوٍ منسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$.`,
			content: [
				{
					type: 'text',
					content: `الجزء الأول: دراسة الدالة المساعدة $g$ (نقطتان)\nنعتبر الدالة العددية $g$ المعرفة على $bb(R)$ بـ: $g(x) = 1 + (x + ${a}) e^x$.\n1) احسب $lim_(x arrow.r -oo) g(x)$ و $lim_(x arrow.r +oo) g(x)$.\n2) ادرس اتجاه تغير الدالة $g$ على $bb(R)$، ثم بيّن أنه من أجل كل عدد حقيقي $x$ فإن $g(x) > 0$.`,
					answer: `الجزء الأول:\n1) حساب النهايات:\n- بجوار $-oo$: بنهاية التزايد المقارن $lim_(x arrow.r -oo) x e^x = 0$ و $lim_(x arrow.r -oo) e^x = 0$، نجد $lim_(x arrow.r -oo) g(x) = 1$.\n- بجوار $+oo$: $lim_(x arrow.r +oo) (x + ${a}) = +oo$ و $lim_(x arrow.r +oo) e^x = +oo$، ومنه $lim_(x arrow.r +oo) g(x) = +oo$.\n2) اتجاه التغير وإشارة $g(x)$:\n- $g$ قابلة للاشتقاق على $bb(R)$ ومشتقتها: $g'(x) = 1 times e^x + (x + ${a}) e^x = (x + ${a + 1}) e^x$.\n- بما أن $e^x > 0$، فإشارة $g'(x)$ من إشارة $(x + ${a + 1})$: سالبة على $]-oo, ${xMinAux}[$ وموجبة على $]${xMinAux}, +oo[$.\n- تقبل $g$ قيمة حدية صغرى مطلقة على $bb(R)$ هي $g(${xMinAux}) = 1 - e^(${xMinAux})$. وبما أن $${xMinAux} < 0$ فإن $0 < e^(${xMinAux}) < 1$، ومنه $g(${xMinAux}) > 0$. إذن من أجل كل $x in bb(R)$: $g(x) > 0$.`,
					mark: '2'
				},
				{
					type: 'columns',
					widths: ['1.35fr', '1fr'],
					children: [
						{
							type: 'text',
							content: `الجزء الثاني: الدراسة التحليلية والبيانية للدالة $f$ (3 نقاط)\nنعتبر الدالة $f$ المعرفة على $bb(R)$ بـ: $f(x) = ${fExprT}$، وليكن $(C_f)$ تمثيلها البياني.\n1) احسب نهايتي $f$ عند $-oo$ وعند $+oo$، وبيّن أن المستقيم $(Delta) : ${deltaLineT}$ مقارب مائل لـ $(C_f)$ بجوار $-oo$، ثم ادرس الوضع النسبي لـ $(C_f)$ و $(Delta)$.\n2) بيّن أنه من أجل كل $x in bb(R)$: $f'(x) = ${mPrefT}g(x)$، واستنتج اتجاه تغير الدالة $f$.\n3) اكتب معادلة المماس $(T)$ للمنحنى $(C_f)$ عند الفاصلة $x_0 = 0$، وعيّن فاصلة النقطة التي يقبل عندها $(C_f)$ مماساً $(T')$ موازياً لـ $(Delta)$.`,
							answer: `الجزء الثاني:\n1) $lim_(x arrow.r -oo) f(x) = -oo$ و $lim_(x arrow.r +oo) f(x) = +oo$.\nلدينا $lim_(x arrow.r -oo) [f(x) - (${linearTypst(m, beta, 'x')})] = lim_(x arrow.r -oo) ${expFactorT} = 0$ (بالتزايد المقارن)، فالمستقيم $(Delta) : ${deltaLineT}$ مقارب مائل لـ $(C_f)$ بجوار $-oo$.\nإشارة الفرق $f(x) - y = ${expFactorT}$ من إشارة $(x${c === 0 ? '' : ` + ${c}`})$: المنحنى $(C_f)$ يقع تحت $(Delta)$ على $]-oo, ${xIntersect}[$، ويقطعه في $I(${xIntersect}, ${yIntersect})$، ويقع فوقه على $]${xIntersect}, +oo[$.\n2) من أجل كل $x in bb(R)$: $f'(x) = ${m} + ${m}[1 times e^x + (x${c === 0 ? '' : ` + ${c}`}) e^x] = ${m}[1 + (x + ${a}) e^x] = ${mPrefT}g(x) > 0$، فالدالة $f$ متزايدة تماماً على $bb(R)$.\n3) المماس $(T)$ عند $x_0 = 0$: $f(0) = ${fAt0}$ و $f'(0) = ${slopeAt0}$، فمعادلته $${tangentLineT}$.\nموازٍ لـ $(Delta)$ يعني $f'(x) = ${m} arrow.l.r.double g(x) = 1 arrow.l.r.double (x + ${a}) e^x = 0 arrow.l.r.double x_1 = ${-a}$.`,
							mark: '3'
						},
						{
							type: 'image',
							src: imageUrl,
							caption: 'المنحنى البياني (C_f) والمستقيم المقارب (Δ) والمماس (T)'
						}
					]
				},
				{
					type: 'text',
					content: `الجزء الثالث: الدوال الأصلية والشرط الابتدائي (نقطتان)\n1) عيّن العددين الحقيقيين $lambda$ و $mu$ بحيث تكون الدالة $H(x) = (lambda x + mu) e^x$ دالة أصلية للدالة $h(x) = ${expFactorT}$ على $bb(R)$.\n2) استنتج عبارة الدوال الأصلية للدالة $f$ على $bb(R)$، ثم عيّن الدالة الأصلية الوحيدة $F_0$ للدالة $f$ على $bb(R)$ التي تحقق الشرط الابتدائي $F_0(0) = ${y0}$.`,
					answer: `الجزء الثالث:\n1) نشتق $H(x)$ على $bb(R)$: $H'(x) = (lambda + lambda x + mu) e^x = (lambda x + lambda + mu) e^x$.\nبالمطابقة مع $h(x) = (${linearTypst(m, m * c, 'x')}) e^x$ نجد: $lambda = ${lambda}$ و $lambda + mu = ${m * c} arrow.r.double mu = ${mu}$.\nإذن $H(x) = ${primExpPartT}$.\n2) الدوال الأصلية للدالة $f$ على $bb(R)$ هي:\n$F(x) = ${quadTermT}${betaXTermT} + ${primExpPartT} + K$ حيث $K in bb(R)$.\nتعيين $F_0$ التي تحقق $F_0(0) = ${y0}$: نعوّض $x = 0$ فنجد $0 + (${mu}) e^0 + K = ${y0} arrow.r.double K = ${y0} - (${mu}) = ${kConst}$.\nومنه: $F_0(x) = ${quadTermT}${betaXTermT} + ${primExpPartT}${signedConst(kConst)}$.`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '3as_se',
			trimesterId: 't2',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion,
			sujetExercise,
			hints: [
				`في الجزء الأول، ادرس إشارة $g'(x) = (x + ${a + 1})e^x$ واستنتج أن القيمة الحدية الصغرى $g(${xMinAux}) = 1 - e^{${xMinAux}} > 0$.`,
				`في الجزء الثاني، استعمل نهاية التزايد المقارن $\\lim_{x \\to -\\infty} x e^x = 0$ لإثبات أن $(\\Delta) : ${deltaLineK}$ مقارب مائل بجوار $-\\infty$.`,
				`في الجزء الثالث، طابق $H'(x) = (\\lambda x + \\lambda + \\mu)e^x$ مع $${expFactorK}$ لتجد $\\lambda = ${lambda}$ و $\\mu = ${mu}$، ثم عوّض $x = 0$ في $F_0(0) = ${y0}$.`
			],
			solutionStepsAr: [
				`الجزء 1: $g'(x) = (x + ${a + 1})e^x$، والقيمة الحدية الصغرى $g(${xMinAux}) = 1 - e^{${xMinAux}} > 0$، ومنه $g(x) > 0$ على $\\mathbb{R}$.`,
				`الجزء 2: $(\\Delta) : ${deltaLineK}$ مقارب مائل بجوار $-\\infty$، $f'(x) = ${mPrefK}g(x) > 0$، المماس عند $0$ هو $${tangentLineK}$، والمماس الموازي لـ $(\\Delta)$ عند $x_1 = ${-a}$.`,
				`الجزء 3: $\\lambda = ${lambda}$، $\\mu = ${mu}$، وثابت الدالة الأصلية الوحيدة $F_0(0) = ${y0}$ هو $K = ${kConst}$.`
			],
			finalAnswer
		};
	}
};

export const SHARED_TEMPLATES_3AS_T2: ParameterizedTemplate[] = [
	countingRandomVarTemplate,
	condProbBinomialTemplate,
	complexEquationsTemplate,
	complexLociTransformsTemplate,
	primitiveDiffEqTemplate,
	bacProblemSynthesisTemplate
];
