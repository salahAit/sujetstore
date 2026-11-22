import type { ExerciseBlock } from '../../../SujetBuilder/types';
import type { Difficulty, GeneratedExerciseInstance, ParameterizedTemplate } from '../../types';
import { buildUniqueMcqOptions, roundTo, SeededRng, simplifyFraction } from '../../rng';
import { saveSvgAsset, svgBarChart, svgCartesianPlane } from '../../svg-helpers';

// ===========================================================================
// Helpers for 1AS TCL — Trimester 3 Templates (Dual Syntax: KaTeX vs Typst)
// ===========================================================================

const DIFF_SALT: Record<Difficulty, number> = {
	easy: 29,
	medium: 61,
	hard: 109
};

function makeRng(seed: number, salt: number, difficulty: Difficulty): SeededRng {
	const s = Math.trunc(seed);
	return new SeededRng(((s * 997 + salt * 139 + DIFF_SALT[difficulty]) >>> 0) || 1);
}

function linearStr(a: number, b: number): string {
	const head = a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`;
	if (b === 0) return head;
	return b > 0 ? `${head} + ${b}` : `${head} - ${Math.abs(b)}`;
}

function buildMcqData(
	correctText: string,
	correctFeedback: string,
	distractors: { text: string; diagnosticFeedback: string }[],
	rng: SeededRng
) {
	const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
	const diagnosticFeedback = mcq.options.map((opt, idx) =>
		idx === mcq.correctIndices[0]
			? correctFeedback
			: opt.diagnosticFeedback || 'راجع خطوات الحساب وتحقق من النتيجة.'
	);
	return {
		options: mcq.options,
		correctIndex: mcq.correctIndices[0],
		correctIndices: mcq.correctIndices,
		correctIndexes: mcq.correctIndices,
		diagnosticFeedback,
		shuffle: false
	};
}

function buildPieChartSvg(title: string, items: Array<{ label: string; count: number; deg: number; color: string }>): string {
	const w = 380;
	const h = 210;
	const cx = 112;
	const cy = 112;
	const r = 72;
	const parts: string[] = [];
	parts.push(`<text x="190" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${title}</text>`);

	let startDeg = -90;
	items.forEach((s, idx) => {
		const endDeg = startDeg + s.deg;
		const a1 = (startDeg * Math.PI) / 180;
		const a2 = (endDeg * Math.PI) / 180;
		const x1 = cx + r * Math.cos(a1);
		const y1 = cy + r * Math.sin(a1);
		const x2 = cx + r * Math.cos(a2);
		const y2 = cy + r * Math.sin(a2);
		const largeArc = s.deg > 180 ? 1 : 0;
		parts.push(`<path d="M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z" fill="${s.color}" stroke="#ffffff" stroke-width="2"/>`);

		const mid = ((startDeg + endDeg) / 2) * (Math.PI / 180);
		const tx = cx + r * 0.58 * Math.cos(mid);
		const ty = cy + r * 0.58 * Math.sin(mid) + 4;
		parts.push(`<text x="${tx.toFixed(1)}" y="${ty.toFixed(1)}" text-anchor="middle" font-size="10" font-weight="bold" fill="#ffffff">${s.deg}°</text>`);

		const ly = 58 + idx * 34;
		parts.push(`<rect x="220" y="${ly - 12}" width="14" height="14" rx="3" fill="${s.color}"/>`);
		parts.push(`<text x="242" y="${ly}" font-size="11" font-weight="bold" fill="#0f172a">${s.label}: ${s.count} (${s.deg}°)</text>`);
		startDeg = endDeg;
	});

	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="background:#ffffff;font-family:Cairo,Arial,sans-serif">${parts.join('')}</svg>`;
}

// ===========================================================================
// 1. Statistics: Frequencies, Cumulative Ascending & Descending
// ===========================================================================

const tplStatsCumulativeFreq: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t3_stats_cumulative_freq',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'السلاسل الإحصائية: التكرارات والتواترات المجمعة الصاعدة والنازلة',
	curriculumLessonId: 'lesson_1as_tcl_t3_statistics_frequencies_cumulative',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 11, difficulty);

		const datasets: Record<Difficulty, Array<{ ctx: string; unit: string; values: number[]; freqs: number[] }>> = {
			easy: [
				{ ctx: 'عدد الكتب المقروءة خلال الشهر لدى تلاميذ قسم', unit: 'كتب', values: [1, 2, 3, 4], freqs: [4, 7, 6, 3] },
				{ ctx: 'عدد ساعات المطالعة الأسبوعية لتلاميذ ثانوية', unit: 'ساعات', values: [2, 4, 6, 8], freqs: [5, 8, 4, 3] }
			],
			medium: [
				{ ctx: 'علامات تلاميذ في فرض التعبير الكتابي', unit: 'نقاط', values: [8, 10, 12, 14, 16], freqs: [3, 6, 8, 5, 3] },
				{ ctx: 'عدد القصص المستعارة في فصل دراسي', unit: 'قصص', values: [1, 2, 3, 4, 5], freqs: [4, 5, 7, 6, 3] }
			],
			hard: [
				{ ctx: 'علامات قسم الآداب في مادة اللغة العربية', unit: 'نقاط', values: [9, 11, 13, 15, 17], freqs: [4, 8, 12, 10, 6] },
				{ ctx: 'عدد الصفحات المقروءة يومياً من معجم أو كتاب', unit: 'صفحة', values: [10, 15, 20, 25, 30], freqs: [6, 10, 14, 12, 8] }
			]
		};

		const ds = rng.pick(datasets[difficulty]);
		const N = ds.freqs.reduce((acc, f) => acc + f, 0);
		const cumUp: number[] = [];
		const cumDown: number[] = [];
		let runUp = 0;
		for (let i = 0; i < ds.freqs.length; i++) {
			runUp += ds.freqs[i];
			cumUp.push(runUp);
		}
		let runDown = N;
		for (let i = 0; i < ds.freqs.length; i++) {
			cumDown.push(runDown);
			runDown -= ds.freqs[i];
		}
		const relFreqs = ds.freqs.map((f) => roundTo(f / N, 2));

		const targetIdx = Math.min(2, ds.values.length - 1);
		const targetVal = ds.values[targetIdx];
		const targetCumUp = cumUp[targetIdx];
		const targetCumDown = cumDown[targetIdx];

		const qd = buildMcqData(
			`$${targetCumUp}$`,
			`إجابة صحيحة! التكرار المجمع الصاعد للقيمة $${targetVal}$ هو مجموع التكرارات الموافقة للقيم $\\leq ${targetVal}$، أي $${ds.freqs.slice(0, targetIdx + 1).join(' + ')} = ${targetCumUp}$.`,
			[
				{
					text: `$${ds.freqs[targetIdx]}$`,
					diagnosticFeedback: `هذا تكرار القيمة $${targetVal}$ فقط، وليس التكرار المجمع الصاعد.`
				},
				{
					text: `$${targetCumDown}$`,
					diagnosticFeedback: `هذا يمثل التكرار المجمع **النازل** للقيمة $${targetVal}$ (الذين قيمتهم $\\geq ${targetVal}$).`
				},
				{
					text: `$${cumUp[targetIdx - 1]}$`,
					diagnosticFeedback: `أغفلت إضافة تكرار القيمة $${targetVal}$ نفسها (${ds.freqs[targetIdx]}).`
				},
				{
					text: `$${N}$`,
					diagnosticFeedback: `$${N}$ هو الحجم الكلي للسلسلة (التكرار المجمع الصاعد لآخر قيمة).`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `الجدول التالي يعطي توزيع ${ds.ctx}:`,
			content: [
				{
					type: 'table',
					headerBackground: true,
					headers: [`القيمة $x_i$ (${ds.unit})`, ...ds.values.map((v) => `$${v}$`)],
					cells: [],
					rows: [[`التكرار $n_i$`, ...ds.freqs.map((f) => `$${f}$`)]]
				},
				{
					type: 'text',
					content: `1) احسب الحجم الكلي $N$ لهذه السلسلة الإحصائية.`,
					answer: `1) الحجم الكلي: $N = ${ds.freqs.join(' + ')} = ${N}$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `2) أنجز جدول التكرارات المجمعة الصاعدة والتكرارات المجمعة النازلة.`,
					answer: `2) - التكرارات المجمعة الصاعدة: [ ${cumUp.join(' ؛ ')} ]\n\n- التكرارات المجمعة النازلة: [ ${cumDown.join(' ؛ ')} ]`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) احسب التواتر $f_i$ لكل قيمة مع كتابته على شكل عدد عشري، ثم تحقق من مجموع التواترات.`,
					answer: `3) التواترات الموافقة $f_i = frac(n_i, ${N})$ هي: [ ${relFreqs.join(' ؛ ')} ] ، ومجموعها يساوي $1$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) كم فرداً قيمته $${targetVal}$ على الأكثر؟ وكم فرداً قيمته $${targetVal}$ على الأقل؟`,
					answer: `4) - عدد الأفراد بقيمة $${targetVal}$ على الأكثر (ت. م. صاعد): $${targetCumUp}$ .\n\n- عدد الأفراد بقيمة $${targetVal}$ على الأقل (ت. م. نازل): $${targetCumDown}$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في السلسلة الإحصائية ذات القيم $[${ds.values.join(' ; ')}]$ والتكرارات $[${ds.freqs.join(' ; ')}]$، ما هو التكرار المجمع الصاعد الموافق للقيمة $${targetVal}$ ؟`,
				questionTextAr: `ما هو التكرار المجمع الصاعد للقيمة $${targetVal}$ ؟`,
				questionData: qd,
				explanation: `التكرار المجمع الصاعد للقيمة $${targetVal}$ يساوي مجموع تكراراتها وتكرارات القيم الأصغر منها: $${ds.freqs.slice(0, targetIdx + 1).join(' + ')} = ${targetCumUp}$ .`
			},
			sujetExercise,
			hints: [
				`الحجم الكلي $N$ هو مجموع كل التكرارات.`,
				`التكرار المجمع الصاعد يبدأ بالتكرار الأول وينتهي بالعدد $N$.`,
				`التكرار المجمع النازل يبدأ بالعدد $N$ وينتهي بالتكرار الأخير.`
			],
			solutionStepsAr: [
				`الحجم الكلي $N = ${N}$.`,
				`التكرارات المجمعة الصاعدة $[${cumUp.join(' ; ')}]$ والنازلة $[${cumDown.join(' ; ')}]$.`,
				`عدد الأفراد بقيمة $${targetVal}$ على الأكثر هو $${targetCumUp}$ وبقيمة $${targetVal}$ على الأقل هو $${targetCumDown}$.`
			],
			finalAnswer: `${targetCumUp}`
		};
	}
};

// ===========================================================================
// 2. Statistics Position Indicators: Mean, Median, Mode & Range
// ===========================================================================

const tplStatsMeanMedianMode: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t3_stats_mean_median_mode',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'مؤشرات الموقع في الإحصاء: الوسط الحسابي والوسيط والمنوال والمدى',
	curriculumLessonId: 'lesson_1as_tcl_t3_statistics_position_indicators',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 22, difficulty);

		const datasets: Record<Difficulty, Array<{ values: number[]; freqs: number[] }>> = {
			easy: [
				{ values: [8, 10, 12, 14, 16], freqs: [2, 7, 3, 3, 5] }, // N=20, sum=244, mean=12.2, med=12, mode=10
				{ values: [10, 12, 14, 16, 18], freqs: [3, 6, 4, 5, 2] } // N=20, sum=274, mean=13.7, med=14, mode=12
			],
			medium: [
				{ values: [7, 9, 11, 13, 15], freqs: [3, 9, 4, 5, 4] }, // N=25, sum=271, mean=10.84, med=11, mode=9
				{ values: [8, 11, 13, 15, 18], freqs: [2, 8, 5, 6, 4] } // N=25, sum=331, mean=13.24, med=13, mode=11
			],
			hard: [
				{ values: [6, 9, 12, 15, 18], freqs: [4, 11, 6, 9, 10] }, // N=40, sum=510, mean=12.75, med=12, mode=9
				{ values: [8, 10, 13, 16, 19], freqs: [5, 12, 7, 8, 8] } // N=40, sum=531, mean=13.275->13.28, med=13, mode=10
			]
		};

		const ds = rng.pick(datasets[difficulty]);
		const N = ds.freqs.reduce((s, f) => s + f, 0);
		const sumNx = ds.values.reduce((s, v, i) => s + v * ds.freqs[i], 0);
		const meanVal = roundTo(sumNx / N, 2);
		const rangeVal = ds.values[ds.values.length - 1] - ds.values[0];

		let maxFreq = -1;
		let modeVal = ds.values[0];
		ds.freqs.forEach((f, i) => {
			if (f > maxFreq) {
				maxFreq = f;
				modeVal = ds.values[i];
			}
		});

		const cumUp: number[] = [];
		let acc = 0;
		for (const f of ds.freqs) {
			acc += f;
			cumUp.push(acc);
		}
		const valAtRank = (rank: number) => {
			for (let i = 0; i < cumUp.length; i++) {
				if (cumUp[i] >= rank) return ds.values[i];
			}
			return ds.values[ds.values.length - 1];
		};
		const medianVal =
			N % 2 === 1
				? valAtRank((N + 1) / 2)
				: roundTo((valAtRank(N / 2) + valAtRank(N / 2 + 1)) / 2, 2);

		const barSvg = svgBarChart(
			ds.values.map((v, i) => ({ label: `${v}`, value: ds.freqs[i] })),
			maxFreq + 2
		);
		const svgPath = saveSvgAsset(`1as_tcl_t3_stats_pos_${difficulty}_s${seed}`, barSvg);

		const simpleMean = roundTo(ds.values.reduce((s, v) => s + v, 0) / ds.values.length, 2);
		const qd = buildMcqData(
			`$${meanVal}$`,
			`إجابة صحيحة! $\\bar{x} = \\frac{\\sum n_i x_i}{N} = \\frac{${sumNx}}{${N}} = ${meanVal}$.`,
			[
				{
					text: `$${simpleMean}$`,
					diagnosticFeedback: 'خطأ شائع: حسبت متوسط القيم الخمس دون أخذ التكرارات في الحسبان.'
				},
				{
					text: `$${modeVal}$`,
					diagnosticFeedback: `$${modeVal}$ هو **المنوال** (القيمة الأكثر تكراراً) وليس الوسط الحسابي.`
				},
				{
					text: `$${roundTo(meanVal + 1.2, 2)}$`,
					diagnosticFeedback: 'راجع جداء كل قيمة في تكرارها ثم القسمة على الحجم الكلي $N$.'
				},
				{
					text: `$${rangeVal}$`,
					diagnosticFeedback: `$${rangeVal}$ يمثل **المدى** ($x_{\\max} - x_{\\min}$) وليس الوسط الحسابي.`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `تمثل السلسلة التالية علامات $${N}$ تلميذاً في فرض محروس لمادة التاريخ والجغرافيا:`,
			content: [
				{
					type: 'table',
					headerBackground: true,
					headers: [`العلامة $x_i$`, ...ds.values.map((v) => `$${v}$`)],
					cells: [],
					rows: [[`التكرار $n_i$`, ...ds.freqs.map((f) => `$${f}$`)]]
				},
				{
					type: 'image',
					src: svgPath,
					caption: 'مخطط التكرارات بالأعمدة'
				},
				{
					type: 'text',
					content: `1) حدد منوال هذه السلسلة الإحصائية واحسب مداها $E$ .`,
					answer: `1) - المنوال هو العلامة ذات أكبر تكرار ($${maxFreq}$)، أي $${modeVal}$ .\n\n- المدى: $E = ${ds.values[ds.values.length - 1]} - ${ds.values[0]} = ${rangeVal}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احسب الوسط الحسابي المتوازن $macron(x)$ لهذه السلسلة (مدوراً إلى $0.01$ عند الاقتضاء).`,
					answer: `2) $macron(x) = frac(sum n_i x_i, N) = frac(${ds.values.map((v, i) => `${ds.freqs[i]} times ${v}`).join(' + ')}, ${N}) = frac(${sumNx}, ${N}) = ${meanVal}$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) شكّل سطر التكرارات المجمعة الصاعدة، ثم عيّن الوسيط $M e$ مع التبرير.`,
					answer: `3) التكرارات المجمعة الصاعدة هي: [ ${cumUp.join(' ؛ ')} ] .\n\n${N % 2 === 1 ? `بما أن $N = ${N}$ فردي فرتبة الوسيط هي $${(N + 1) / 2}$ وتوافق العلامة $M e = ${medianVal}$ .` : `بما أن $N = ${N}$ زوجي فالوسيط هو معدل القيمتين الـ $${N / 2}$ والـ $${N / 2 + 1}$ ، أي $M e = ${medianVal}$ .`}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) ما هو عدد التلاميذ الذين تحصلوا على علامة أكبر من أو تساوي الوسيط؟`,
					answer: `4) نجمع تكرارات القيم الأكبر من أو تساوي $${medianVal}$، فنجد $${ds.freqs.filter((_, i) => ds.values[i] >= medianVal).reduce((a, b) => a + b, 0)}$ تلميذاً.`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في السلسلة الإحصائية ذات العلامات $[${ds.values.join(' ; ')}]$ والتكرارات $[${ds.freqs.join(' ; ')}]$، ما هو الوسط الحسابي المتوازن $\\bar{x}$ ؟`,
				questionTextAr: `ما هو الوسط الحسابي المتوازن $\\bar{x}$ ؟`,
				imageUrl: svgPath,
				imageCaption: 'مخطط التكرارات',
				questionData: qd,
				explanation: `نحسب مجموع الجداءات $\\sum n_i x_i = ${sumNx}$ ونقسمه على الحجم الكلي $N = ${N}$ فنحصل على $\\bar{x} = \\frac{${sumNx}}{${N}} = ${meanVal}$ .`
			},
			sujetExercise,
			hints: [
				`المنوال هو القيمة الموافقة لأكبر تكرار، والمدى هو الفرق بين أكبر قيمة وأصغر قيمة.`,
				`في الوسط الحسابي نضرب كل قيمة في تكرارها ثم نقسم المجموع على الحجم الكلي $N$.`,
				`نستخرج الوسيط من سطر التكرار المجمع الصاعد حسب رتبة منتصف السلسلة.`
			],
			solutionStepsAr: [
				`المنوال هو $${modeVal}$ والمدى هو $${rangeVal}$.`,
				`الوسط الحسابي $\\bar{x} = \\frac{${sumNx}}{${N}} = ${meanVal}$.`,
				`الوسيط هو $Me = ${medianVal}$.`
			],
			finalAnswer: `${meanVal}`
		};
	}
};

// ===========================================================================
// 3. Statistical Charts: Bar Charts, Pie Sectors & Histograms
// ===========================================================================

const tplStatsChartsPieHistogram: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t3_stats_charts_pie_histogram',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'probability',
	titleAr: 'التمثيلات البيانية الإحصائية: القطاعات الدائرية والأعمدة والمدرج التكراري',
	curriculumLessonId: 'lesson_1as_tcl_t3_statistical_charts_diagrams',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 33, difficulty);

		const pieCases: Record<
			Difficulty,
			Array<{
				N: number;
				cats: Array<{ label: string; count: number; color: string }>;
			}>
		> = {
			easy: [
				{
					N: 60,
					cats: [
						{ label: 'الشعر', count: 15, color: '#2563eb' },
						{ label: 'القصة', count: 20, color: '#16a34a' },
						{ label: 'المسرح', count: 10, color: '#f59e0b' },
						{ label: 'المقال', count: 15, color: '#dc2626' }
					]
				},
				{
					N: 90,
					cats: [
						{ label: 'الشعر', count: 30, color: '#2563eb' },
						{ label: 'القصة', count: 25, color: '#16a34a' },
						{ label: 'المسرح', count: 20, color: '#f59e0b' },
						{ label: 'المقال', count: 15, color: '#dc2626' }
					]
				}
			],
			medium: [
				{
					N: 120,
					cats: [
						{ label: 'الأدب', count: 40, color: '#2563eb' },
						{ label: 'التاريخ', count: 30, color: '#16a34a' },
						{ label: 'الفلسفة', count: 20, color: '#f59e0b' },
						{ label: 'اللغات', count: 30, color: '#dc2626' }
					]
				},
				{
					N: 180,
					cats: [
						{ label: 'الأدب', count: 65, color: '#2563eb' },
						{ label: 'التاريخ', count: 45, color: '#16a34a' },
						{ label: 'الفلسفة', count: 35, color: '#f59e0b' },
						{ label: 'اللغات', count: 35, color: '#dc2626' }
					]
				}
			],
			hard: [
				{
					N: 72,
					cats: [
						{ label: 'الرواية', count: 24, color: '#2563eb' },
						{ label: 'السيرة', count: 18, color: '#16a34a' },
						{ label: 'النقد', count: 12, color: '#f59e0b' },
						{ label: 'المعاجم', count: 18, color: '#dc2626' }
					]
				},
				{
					N: 144,
					cats: [
						{ label: 'الرواية', count: 48, color: '#2563eb' },
						{ label: 'السيرة', count: 36, color: '#16a34a' },
						{ label: 'النقد', count: 28, color: '#f59e0b' },
						{ label: 'المعاجم', count: 32, color: '#dc2626' }
					]
				}
			]
		};

		const pc = rng.pick(pieCases[difficulty]);
		const items = pc.cats.map((c) => ({
			...c,
			deg: Math.round((c.count / pc.N) * 360),
			pct: roundTo((c.count / pc.N) * 100, 1)
		}));
		const target = items[0];
		const halfDeg = Math.round(target.deg / 2);

		const pieSvg = buildPieChartSvg(`توزيع ${pc.N} كتاباً أو تلميذاً حسب الاختصاص`, items);
		const svgPath = saveSvgAsset(`1as_tcl_t3_pie_${difficulty}_s${seed}`, pieSvg);

		const qd = buildMcqData(
			`$${target.deg}^\\circ$`,
			`إجابة صحيحة! $\\alpha = \\frac{${target.count}}{${pc.N}} \\times 360^\\circ = ${target.deg}^\\circ$.`,
			[
				{
					text: `$${halfDeg}^\\circ$`,
					diagnosticFeedback: 'استعملت زاوية نصف القرص ($180^\\circ$) بدلاً من القرص الكامل ($360^\\circ$).'
				},
				{
					text: `$${target.count}^\\circ$`,
					diagnosticFeedback: 'التكرار نفسه لا يساوي قيس الزاوية؛ يجب ضرب التواتر في $360^\\circ$.'
				},
				{
					text: `$${Math.round(target.pct)}^\\circ$`,
					diagnosticFeedback: 'الرقم يمثل النسبة المئوية وليس قيس الزاوية بالدرجات.'
				},
				{
					text: `$${target.deg + 30}^\\circ$`,
					diagnosticFeedback: 'تحقق من التناسبية: $\\alpha = \\frac{n_i}{N} \\times 360^\\circ$.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `يمثل الجدول التالي توزيع $${pc.N}$ كتاباً في مكتبة حسب المجال المعرفي:`,
			content: [
				{
					type: 'table',
					headerBackground: true,
					headers: ['المجال', ...items.map((it) => it.label), 'المجموع'],
					cells: [],
					rows: [['عدد الكتب $n_i$', ...items.map((it) => `$${it.count}$`), `$${pc.N}$`]]
				},
				{
					type: 'image',
					src: svgPath,
					caption: 'التمثيل بالقطاعات الدائرية'
				},
				{
					type: 'text',
					content: `1) احسب النسبة المئوية لكل مجال من المجالات الأربعة.`,
					answer: `1) النسب المئوية هي:\n\n${items.map((it) => `- ${it.label}: $${it.pct}$%`).join('\n\n')}`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احسب قيس زاوية القطاع الدائري الموافق لكل مجال في قرص كامل ($360°$)، ثم تحقق من المجموع.`,
					answer: `2) باستعمال $alpha_i = frac(n_i, ${pc.N}) times 360°$:\n\n${items.map((it) => `- ${it.label}: $${it.deg}°$`).join('\n\n')}\n\nالمجموع: $${items.map((it) => `${it.deg}°`).join(' + ')} = 360°$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `3) لو مثّلنا هذه السلسلة في نصف قرص دائري ($180°$)، ما قيس زاوية القطاع الموافق لـ «${target.label}»؟`,
					answer: `3) في نصف قرص: $alpha = frac(${target.count}, ${pc.N}) times 180° = ${halfDeg}°$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) اذكر التمثيل البياني الأنسب لو كانت المعطيات مجمعة في فئات مستمرة مثل أعمار الكتب بالسنوات $[0 ; 5[$ و $[5 ; 10[$ .`,
					answer: `4) التمثيل الأنسب للفئات المستمرة هو **المدرج التكراري** (مستطيلات متلاصقة).`,
					mark: '1'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في سلسلة إحصائية حجمها الكلي $N = ${pc.N}$، ما هو قيس زاوية القطاع الدائري في قرص كامل لفئة «${target.label}» التي تكرارها $n = ${target.count}$ ؟`,
				questionTextAr: `ما هو قيس زاوية القطاع الدائري الموافق لتكرار $${target.count}$ من $${pc.N}$ ؟`,
				imageUrl: svgPath,
				imageCaption: 'المخطط بالقطاعات الدائرية',
				questionData: qd,
				explanation: `قيس الزاوية في القرص الكامل هو $\\alpha = \\frac{${target.count}}{${pc.N}} \\times 360^\\circ = ${target.deg}^\\circ$ .`
			},
			sujetExercise,
			hints: [
				`الزاوية في القرص الكامل تساوي $\\frac{n_i}{N} \\times 360^\\circ$.`,
				`يجب أن يكون مجموع زوايا القطاعات مساوياً لـ $360^\\circ$.`,
				`في نصف القرص نضرب التواتر في $180^\\circ$ بدلاً من $360^\\circ$.`
			],
			solutionStepsAr: [
				`حساب النسب المئوية: ${items.map((it) => `${it.label} (${it.pct}%)`).join('، ')}.`,
				`زوايا القطاعات في قرص كامل: ${items.map((it) => `${it.deg}°`).join('، ')}.`,
				`زاوية نصف القرص لـ ${target.label} هي ${halfDeg}°.`,
			],
			finalAnswer: `${target.deg}°`
		};
	}
};

// ===========================================================================
// 4. Coordinate Plane, Vectors, Midpoint & Distance
// ===========================================================================

const tplCartesianVectorsDistance: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t3_cartesian_vectors_distance',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'المعلم في المستوي: إحداثيات شعاع ومنتصف قطعة والمسافة بين نقطتين',
	curriculumLessonId: 'lesson_1as_tcl_t3_coordinate_plane_vectors_midpoint_distance',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 44, difficulty);

		// Pythagorean triples for (dx, dy) so AB is an exact integer
		const triples: Record<Difficulty, Array<[number, number, number]>> = {
			easy: [
				[3, 4, 5],
				[4, 3, 5]
			],
			medium: [
				[3, -4, 5],
				[-3, 4, 5],
				[6, 8, 10]
			],
			hard: [
				[6, -8, 10],
				[-6, 8, 10],
				[5, 12, 13]
			]
		};
		const [dx, dy, distAB] = rng.pick(triples[difficulty]);

		const ax = rng.int(-2, 2);
		const ay = rng.int(-2, 2);
		const bx = ax + dx;
		const by = ay + dy;

		// Choose C so midpoint of [AC] is integer (same parity as A) and D = A + C - B stays compact
		const cx = ax + rng.pick([-2, 2, 4]);
		const cy = ay + rng.pick([-2, 2, 4]);
		// Ensure C is not collinear with A, B
		const finalCy = dx * (cy - ay) === dy * (cx - ax) ? cy + 2 : cy;
		const mx = (ax + cx) / 2;
		const my = (ay + finalCy) / 2;
		// Parallelogram ABCD -> vec(AB) = vec(DC) => D = C - AB
		const dxPt = cx - dx;
		const dyPt = finalCy - dy;

		const allX = [ax, bx, cx, dxPt];
		const allY = [ay, by, finalCy, dyPt];
		const xMin = Math.min(...allX) - 1;
		const xMax = Math.max(...allX) + 1;
		const yMin = Math.min(...allY) - 1;
		const yMax = Math.max(...allY) + 1;

		const planeSvg = svgCartesianPlane({
			xMin,
			xMax,
			yMin,
			yMax,
			points: [
				{ x: ax, y: ay, label: `A(${ax},${ay})`, color: '#dc2626' },
				{ x: bx, y: by, label: `B(${bx},${by})`, color: '#2563eb' },
				{ x: cx, y: finalCy, label: `C(${cx},${finalCy})`, color: '#16a34a' },
				{ x: mx, y: my, label: `I(${mx},${my})`, color: '#7c3aed' }
			],
			vectors: [{ x1: ax, y1: ay, x2: bx, y2: by, label: 'AB', color: '#2563eb' }]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t3_vec_${difficulty}_s${seed}`, planeSvg);

		const qd = buildMcqData(
			`$${distAB}$`,
			`إجابة صحيحة! $AB = \\sqrt{(${dx})^2 + (${dy})^2} = \\sqrt{${dx * dx} + ${dy * dy}} = \\sqrt{${distAB * distAB}} = ${distAB}$.`,
			[
				{
					text: `$${distAB * distAB}$`,
					diagnosticFeedback: 'هذا هو مربع المسافة $AB^2$، نسيت أخذ الجذر التربيعي في النهاية.'
				},
				{
					text: `$${Math.abs(dx) + Math.abs(dy)}$`,
					diagnosticFeedback: 'المسافة تحسب بدستور فيثاغورث $\\sqrt{dx^2 + dy^2}$ وليس بجمع $|dx| + |dy|$.'
				},
				{
					text: `$${Math.abs(dx + dy)}$`,
					diagnosticFeedback: 'انتبه: نربع كل مركبة أولاً ثم نجمع ونأخذ الجذر التربيعي.'
				},
				{
					text: `$${distAB + 2}$`,
					diagnosticFeedback: 'تحقق من مربعي مركبتي الشعاع $\\overrightarrow{AB}$.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `في المستوي المنسوب إلى معلم متعامد ومتجانس $(O ; arrow(i), arrow(j))$ ، نعتبر النقط: $A(${ax} ; ${ay})$ ، $B(${bx} ; ${by})$ ، و $C(${cx} ; ${finalCy})$ .`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: 'النقط والشعاع في المعلم المتعامد والمتجانس'
				},
				{
					type: 'text',
					content: `1) احسب مركبتي الشعاع $arrow(A B)$ .`,
					answer: `1) $arrow(A B)(${bx} - (${ax}) ; ${by} - (${ay})) = (${dx} ; ${dy})$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `2) احسب المسافة $A B$ .`,
					answer: `2) $A B = sqrt((${dx})^2 + (${dy})^2) = sqrt(${dx * dx} + ${dy * dy}) = sqrt(${distAB * distAB}) = ${distAB}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `3) احسب إحداثيي النقطة $I$ منتصف القطعة $[A C]$ .`,
					answer: `3) $x_I = frac(${ax} + ${cx}, 2) = ${mx}$ و $y_I = frac(${ay} + ${finalCy}, 2) = ${my}$ ، إذن $I(${mx} ; ${my})$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) عيّن إحداثيي النقطة $D$ حتى يكون الرباعي $A B C D$ متوازي أضلاع.`,
					answer: `4) يكون $A B C D$ متوازي أضلاع إذا وفقط إذا كان $arrow(A B) = arrow(D C)$ ، أي:\n\n$(${dx} ; ${dy}) = (${cx} - x_D ; ${finalCy} - y_D)$ ومنه $x_D = ${cx} - (${dx}) = ${dxPt}$ و $y_D = ${finalCy} - (${dy}) = ${dyPt}$ ، أي $D(${dxPt} ; ${dyPt})$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في معلم متعامد ومتجانس، لتكن النقطتان $A(${ax} ; ${ay})$ و $B(${bx} ; ${by})$ . ما هي المسافة $AB$ ؟`,
				questionTextAr: `ما هي المسافة $AB$ ؟`,
				imageUrl: svgPath,
				imageCaption: 'تمثيل النقطتين في المعلم',
				questionData: qd,
				explanation: `نحسب مركبتي الشعاع $\\overrightarrow{AB}(${dx} ; ${dy})$ ، ثم المسافة $AB = \\sqrt{(${dx})^2 + (${dy})^2} = \\sqrt{${distAB * distAB}} = ${distAB}$ .`
			},
			sujetExercise,
			hints: [
				`مركبتا $\\overrightarrow{AB}$ هما $(x_B - x_A ; y_B - y_A)$.`,
				`المسافة $AB$ تعطى بالقانون $\\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$.`,
				`في متوازي الأضلاع $ABCD$ يتحقق تساوي الشعاعين $\\overrightarrow{AB} = \\overrightarrow{DC}$.`
			],
			solutionStepsAr: [
				`$\\overrightarrow{AB}(${dx} ; ${dy})$ والمسافة $AB = ${distAB}$.`,
				`منتصف $[AC]$ هو $I(${mx} ; ${my})$.`,
				`إحداثيا النقطة $D$ هما $D(${dxPt} ; ${dyPt})$.`
			],
			finalAnswer: `${distAB}`
		};
	}
};

// ===========================================================================
// 5. Equation of a Line, Slope, Y-Intercept & Parallelism
// ===========================================================================

const tplLineEquationParallelism: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t3_line_equation_parallelism',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'geometry',
	titleAr: 'معادلة مستقيم: معامل التوجيه والترتيب إلى المبدأ وتوازي مستقيمين',
	curriculumLessonId: 'lesson_1as_tcl_t3_line_equation_slope_parallelism',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 55, difficulty);

		const a = difficulty === 'easy' ? rng.pick([1, 2]) : rng.pick([-2, -1, 2, 3]);
		const b = rng.pick([-2, -1, 1, 2, 3]);
		const xA = rng.pick([-1, 0, 1]);
		const xB = xA + rng.pick([2, 3]);
		const yA = a * xA + b;
		const yB = a * xB + b;

		// Point C not on (AB) for parallel line (d')
		const xC = rng.pick([0, 1, 2]);
		const yC = a * xC + b + rng.pick([2, 3]);
		const bPrime = yC - a * xC;

		// Test point E on (AB)
		const xE = xB + 1;
		const yE = a * xE + b;

		// Intersecting line (d''): y = a2 * x + b2 meeting (AB) at integer point x = xInt
		const a2 = a > 0 ? -1 : 1;
		const xInt = rng.pick([1, 2]);
		const yInt = a * xInt + b;
		const b2 = yInt - a2 * xInt;

		const eqAB = `y = ${linearStr(a, b)}`;
		const eqPar = `y = ${linearStr(a, bPrime)}`;
		const eqInt = `y = ${linearStr(a2, b2)}`;

		const planeSvg = svgCartesianPlane({
			xMin: Math.min(-2, xA - 1),
			xMax: Math.max(4, xB + 1),
			yMin: Math.min(-3, yA - 1, yB - 1),
			yMax: Math.max(5, yC + 1, yB + 1),
			lines: [
				{ a, b, label: `(AB): ${eqAB}`, color: '#2563eb' },
				{ a, b: bPrime, label: `(d'): ${eqPar}`, color: '#16a34a' }
			],
			points: [
				{ x: xA, y: yA, label: `A(${xA},${yA})`, color: '#2563eb' },
				{ x: xB, y: yB, label: `B(${xB},${yB})`, color: '#2563eb' },
				{ x: xC, y: yC, label: `C(${xC},${yC})`, color: '#16a34a' }
			]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t3_line_${difficulty}_s${seed}`, planeSvg);

		const qd = buildMcqData(
			`$${eqAB}$`,
			`إجابة صحيحة! معامل التوجيه $a = \\frac{${yB} - (${yA})}{${xB} - (${xA})} = ${a}$ وبالتعويض بـ $A$ نجد $b = ${b}$.`,
			[
				{
					text: `$y = ${linearStr(-a, b)}$`,
					diagnosticFeedback: 'انتبه لإشارة معامل التوجيه $a = \\frac{y_B - y_A}{x_B - x_A}$.'
				},
				{
					text: `$y = ${linearStr(a, -b)}$`,
					diagnosticFeedback: 'تحقق من إشارة الترتيب إلى المبدأ $b$ عند حل $y_A = a x_A + b$.'
				},
				{
					text: `$y = ${linearStr(b, a)}$`,
					diagnosticFeedback: 'عكست بين معامل التوجيه $a$ والترتيب إلى المبدأ $b$.'
				},
				{
					text: `$y = ${linearStr(a + 1, b)}$`,
					diagnosticFeedback: 'تحقق من قسمة فرق التراتيب على فرق الفواصل.'
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			instruction: `في معلم متعامد ومتجانس، نعتبر النقط $A(${xA} ; ${yA})$ و $B(${xB} ; ${yB})$ و $C(${xC} ; ${yC})$ .`,
			content: [
				{
					type: 'image',
					src: svgPath,
					caption: 'المستقيم (AB) والمستقيم الموازي (d\')'
				},
				{
					type: 'text',
					content: `1) احسب معامل التوجيه $a$ للمستقيم $(A B)$، ثم أوجد معادلته المختصرة من الشكل $y = a x + b$ .`,
					answer: `1) $a = frac(${yB} - (${yA}), ${xB} - (${xA})) = frac(${yB - yA}, ${xB - xA}) = ${a}$ .\n\nنعوض $A(${xA} ; ${yA})$: $${yA} = ${a}(${xA}) + b arrow.r.double b = ${b}$ .\n\nمعادلة $(A B)$ هي: $${eqAB}$ .`,
					mark: '2'
				},
				{
					type: 'text',
					content: `2) تحقق مما إذا كانت النقطة $E(${xE} ; ${yE})$ تنتمي إلى المستقيم $(A B)$ .`,
					answer: `2) نعوض $x = ${xE}$ في معادلة $(A B)$: $${a}(${xE}) + (${b}) = ${yE} = y_E$ .\n\nإذن النقطة $E(${xE} ; ${yE})$ تنتمي إلى المستقيم $(A B)$ .`,
					mark: '1'
				},
				{
					type: 'text',
					content: `3) أوجد المعادلة المختصرة للمستقيم $(d')$ الذي يشمل $C(${xC} ; ${yC})$ ويوازي المستقيم $(A B)$ .`,
					answer: `3) بما أن $(d') parallel (A B)$ فلهما نفس معامل التوجيه $a = ${a}$ .\n\nنعوض $C(${xC} ; ${yC})$: $${yC} = ${a}(${xC}) + b' arrow.r.double b' = ${bPrime}$ .\n\nمعادلة $(d')$ هي: $${eqPar}$ .`,
					mark: '1.5'
				},
				{
					type: 'text',
					content: `4) ليكن المستقيم $(d'')$ ذا المعادلة $${eqInt}$ . برّر أنه يقطع $(A B)$، ثم عيّن إحداثيي نقطة تقاطعهما $K$ .`,
					answer: `4) بما أن معاملي التوجيه مختلفان ($${a} != ${a2}$) فالمستقيمان متقاطعان.\n\nنحل: $${linearStr(a, b)} = ${linearStr(a2, b2)} arrow.r.double ${a - a2}x = ${b2 - b} arrow.r.double x = ${xInt}$ ، ثم $y = ${yInt}$ .\n\nنقطة التقاطع هي $K(${xInt} ; ${yInt})$ .`,
					mark: '1.5'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `ما هي المعادلة المختصرة للمستقيم $(AB)$ المار بالنقطتين $A(${xA} ; ${yA})$ و $B(${xB} ; ${yB})$ ؟`,
				questionTextAr: `ما هي المعادلة المختصرة للمستقيم $(AB)$ ؟`,
				imageUrl: svgPath,
				imageCaption: 'المستقيمان المتوازيان في المعلم',
				questionData: qd,
				explanation: `نحسب معامل التوجيه $a = \\frac{${yB} - (${yA})}{${xB} - (${xA})} = ${a}$، ثم نعوض إحداثيي $A$ فنجد $b = ${b}$، ومنه $${eqAB}$ .`
			},
			sujetExercise,
			hints: [
				`معامل التوجيه هو $a = \\frac{y_B - y_A}{x_B - x_A}$ (التراتيب في البسط والفواصل في المقام).`,
				`المستقيمان المتوازيان لهما نفس معامل التوجيه.`,
				`لإيجاد نقطة التقاطع نحل المعادلة $a x + b = a'' x + b''$.`
			],
			solutionStepsAr: [
				`معادلة المستقيم $(AB)$ هي $${eqAB}$.`,
				`النقطة $E(${xE} ; ${yE})$ تنتمي إلى $(AB)$، ومعادلة الموازي $(d')$ هي $${eqPar}$.`,
				`نقطة تقاطع $(AB)$ و $(d'')$ هي $K(${xInt} ; ${yInt})$.`
			],
			finalAnswer: eqAB
		};
	}
};

// ===========================================================================
// 6. Integration Problem (المسألة الشاملة — 8 Points)
// ===========================================================================

const tplT3IntegrationProblem: ParameterizedTemplate = {
	id: 'tpl_1as_tcl_t3_integration_problem',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'integration',
	titleAr: 'المسألة الشاملة: إحصاء زوار معرض الكتاب وتهيئة ساحته في المعلم',
	curriculumLessonId: 'lesson_1as_tcl_t3_line_equation_slope_parallelism',
	defaultPoints: 8,
	isIntegration: true,
	generate(seed: number, difficulty: Difficulty = 'medium'): GeneratedExerciseInstance {
		const rng = makeRng(seed, 66, difficulty);

		// Part 1: Statistics on 4 book stalls (total N = 60 or 90)
		const statConfigs = [
			{ N: 60, counts: [15, 20, 10, 15], prices: [2, 3, 4, 5] }, // sum = 30+60+40+75 = 205 -> mean = 3.42
			{ N: 90, counts: [30, 15, 30, 15], prices: [1, 2, 3, 4] }, // sum = 30+30+90+60 = 210 -> mean = 2.33
			{ N: 60, counts: [10, 20, 20, 10], prices: [2, 4, 6, 8] } // sum = 20+80+120+80 = 300 -> mean = 5
		];
		const sc = rng.pick(statConfigs);
		const labels = ['جناح الشعر', 'جناح القصة', 'جناح التاريخ', 'جناح المعاجم'];
		const degs = sc.counts.map((c) => Math.round((c / sc.N) * 360));
		const sumBookCount = sc.counts.reduce((s, c, i) => s + c * sc.prices[i], 0);
		const meanBooks = roundTo(sumBookCount / sc.N, 2);

		// Part 2 & 3: Geometry in coordinate plane (A, B, C, D parallelogram with integer AB = 5)
		const ax = 0;
		const ay = 1;
		const bx = 3;
		const by = 5; // AB = 5, slope = 4/3? Let's use integer slope: (2, 4) -> slope 2! Wait: let's keep AB nice and slope integer!
		// Wait: if AB = (2, 4) then AB = sqrt(20) = 2*sqrt(5), slope = 2! Or if AB = (3, 4) then AB = 5, slope = 4/3.
		// Let's use A(0, 1), B(2, 5) -> AB = (2, 4), slope = 2 (clean integer slope!), midpoint of [AC] with C(4, 3): I(2, 2), D = C - AB = (2, -1)
		const ptA = { x: 0, y: 1 };
		const ptB = { x: 2, y: 5 };
		const ptC = { x: 4, y: 3 };
		const vecAB = { x: ptB.x - ptA.x, y: ptB.y - ptA.y }; // (2, 4)
		const abSq = vecAB.x * vecAB.x + vecAB.y * vecAB.y; // 20 = 4 * 5 -> 2*sqrt(5)
		const midAC = { x: (ptA.x + ptC.x) / 2, y: (ptA.y + ptC.y) / 2 }; // (2, 2)
		const ptD = { x: ptC.x - vecAB.x, y: ptC.y - vecAB.y }; // (2, -1)
		// Line (AB): slope a = 4/2 = 2, y = 2x + 1
		// Parallel line through C(4, 3): y = 2x + b' => 3 = 8 + b' => b' = -5 => y = 2x - 5

		const planeSvg = svgCartesianPlane({
			xMin: -1,
			xMax: 5,
			yMin: -2,
			yMax: 6,
			lines: [
				{ a: 2, b: 1, label: '(AB): y=2x+1', color: '#2563eb' },
				{ a: 2, b: -5, label: '(DC): y=2x-5', color: '#16a34a' }
			],
			points: [
				{ x: ptA.x, y: ptA.y, label: 'A(0,1)', color: '#dc2626' },
				{ x: ptB.x, y: ptB.y, label: 'B(2,5)', color: '#2563eb' },
				{ x: ptC.x, y: ptC.y, label: 'C(4,3)', color: '#16a34a' },
				{ x: ptD.x, y: ptD.y, label: 'D(2,-1)', color: '#7c3aed' }
			]
		});
		const svgPath = saveSvgAsset(`1as_tcl_t3_int_plane_${difficulty}_s${seed}`, planeSvg);

		const qd = buildMcqData(
			`$${meanBooks}$`,
			`إجابة صحيحة! $\\bar{x} = \\frac{${sumBookCount}}{${sc.N}} = ${meanBooks}$ كتاباً.`,
			[
				{
					text: `$${roundTo(sc.prices.reduce((a, b) => a + b, 0) / 4, 2)}$`,
					diagnosticFeedback: 'حسبت المتوسط البسيط لأرقام الأجنحة دون أخذ تكرارات الزوار بعين الاعتبار.'
				},
				{
					text: `$${degs[1]}^\\circ$`,
					diagnosticFeedback: 'هذه زاوية قطاع دائري وليست الوسط الحسابي.'
				},
				{
					text: `$${roundTo(meanBooks + 1, 2)}$`,
					diagnosticFeedback: 'تحقق من مجموع الجداءات $\\sum n_i x_i$ قبل القسمة على $N$.'
				},
				{
					text: `$${sc.N}$`,
					diagnosticFeedback: `$${sc.N}$ هو الحجم الكلي للزوار وليس الوسط الحسابي.`
				}
			],
			rng
		);

		const sujetExercise: ExerciseBlock = {
			points: this.defaultPoints,
			customTitle: 'المسألة الشاملة (8 نقاط)',
			instruction: `نظمت الثانوية معرضاً للكتاب في حديقتها الثقافية. نستعرض في الجزء الأول إحصاءات الزوار وفي الجزء الثاني مخطط الساحة في المعلم.`,
			content: [
				{
					type: 'table',
					headerBackground: true,
					headers: ['الجناح', ...labels],
					cells: [],
					rows: [
						['عدد الكتب المقتناة $x_i$', ...sc.prices.map((p) => `$${p}$`)],
						['عدد الزوار $n_i$', ...sc.counts.map((c) => `$${c}$`)]
					]
				},
				{
					type: 'text',
					content: `*الجزء الأول: الدراسة الإحصائية (3 نقاط)*\n\n1) احسب الحجم الكلي للزوار $N$، ثم احسب الوسط الحسابي $macron(x)$ لعدد الكتب المقتناة لكل زائر.\n\n2) أنجز حساب زوايا القطاعات الدائرية بالدرجات لتمثيل توزيع الزوار على الأجنحة الأربعة في قرص كامل ($360°$).`,
					answer: `1) الحجم الكلي: $N = ${sc.counts.join(' + ')} = ${sc.N}$ زائراً.\n\nالوسط الحسابي: $macron(x) = frac(${sumBookCount}, ${sc.N}) = ${meanBooks}$ .\n\n2) زوايا القطاعات ($frac(n_i, ${sc.N}) times 360°$):\n\n${labels.map((l, i) => `- ${l}: $${degs[i]}°$`).join('\n\n')}`,
					mark: '3'
				},
				{
					type: 'image',
					src: svgPath,
					caption: 'مخطط الساحة المربعة في المعلم المتعامد والمتجانس'
				},
				{
					type: 'text',
					content: `*الجزء الثاني: الإحداثيات والأشعة والمسافة (3 نقاط)*\n\nفي معلم متعامد ومتجانس (وحدته $10 upright("m")$)، نضع أركان منصة المعرض في النقط $A(0 ; 1)$ ، $B(2 ; 5)$ و $C(4 ; 3)$ .\n\n1) احسب مركبتي الشعاع $arrow(A B)$ والطول $A B$ على الشكل $k sqrt(5)$ .\n\n2) عيّن إحداثيي النقطة $I$ منتصف القطر $[A C]$ ، ثم أوجد إحداثيي النقطة $D$ حتى يكون $A B C D$ متوازي أضلاع.`,
					answer: `1) $arrow(A B)(2 ; 4)$ ، والطول $A B = sqrt(2^2 + 4^2) = sqrt(${abSq}) = 2 sqrt(5)$ (أي $20 sqrt(5) upright("m")$ في الواقع).\n\n2) - المنتصف: $I(frac(0 + 4, 2) ; frac(1 + 3, 2)) = I(2 ; 2)$ .\n\n- من $arrow(D C) = arrow(A B)$ نجد $D(4 - 2 ; 3 - 4) = D(2 ; -1)$ .`,
					mark: '3'
				},
				{
					type: 'text',
					content: `*الجزء الثالث: معادلات الممرات والتوازي (2 نقطتان)*\n\n1) أوجد المعادلة المختصرة للممر المستقيم $(A B)$ .\n\n2) استنتج معادلة الممر المقابل $(D C)$ الموازي للممر $(A B)$ والمار من $C(4 ; 3)$ .`,
					answer: `1) معامل التوجيه: $a = frac(5 - 1, 2 - 0) = 2$ . وبما أن $A(0 ; 1)$ تنتمي للمستقيم فإن $b = 1$ ، فمعادلة $(A B)$ هي: $y = 2x + 1$ .\n\n2) للمستقيم الموازي $(D C)$ نفس معامل التوجيه $a = 2$ . نعوض $C(4 ; 3)$: $3 = 2(4) + b' arrow.r.double b' = -5$ ، فمعادلته هي: $y = 2x - 5$ .`,
					mark: '2'
				}
			]
		};

		return {
			templateId: this.id,
			seed,
			grade: '1as_tcl',
			trimesterId: 't3',
			difficulty,
			domain: this.domain,
			titleAr: this.titleAr,
			quizQuestion: {
				type: 'mcq',
				questionText: `في المسألة الشاملة لمعرض الكتاب ($N = ${sc.N}$ زائراً، عدد الكتب $[${sc.prices.join(' ; ')}]$ والتكرارات $[${sc.counts.join(' ; ')}]$)، ما هو الوسط الحسابي $\\bar{x}$ لعدد الكتب المقتناة؟`,
				questionTextAr: `ما هو الوسط الحسابي $\\bar{x}$ لعدد الكتب المقتناة؟`,
				imageUrl: svgPath,
				imageCaption: 'مخطط المعرض في المعلم',
				questionData: qd,
				explanation: `نحسب $\\bar{x} = \\frac{\\sum n_i x_i}{N} = \\frac{${sumBookCount}}{${sc.N}} = ${meanBooks}$ كتاباً.`
			},
			sujetExercise,
			hints: [
				`الوسط الحسابي هو $\\frac{\\sum n_i x_i}{N}$ وزاوية القطاع هي $\\frac{n_i}{N} \\times 360^\\circ$.`,
				`المسافة $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2}$ وشرط متوازي الأضلاع $\\overrightarrow{AB} = \\overrightarrow{DC}$.`,
				`معادلة المستقيم $(AB)$ تكتب $y = ax + b$ والمستقيم الموازي له يحافظ على معامل التوجيه $a$.`
			],
			solutionStepsAr: [
				`الوسط الحسابي $\\bar{x} = ${meanBooks}$ وزوايا القطاعات: $${degs.join('° ; ')}°$.`,
				`الطول $AB = 2\\sqrt{5}$، المنتصف $I(2 ; 2)$، والنقطة $D(2 ; -1)$.`,
				`معادلة $(AB)$ هي $y = 2x + 1$ ومعادلة الموازي $(DC)$ هي $y = 2x - 5$.`
			],
			finalAnswer: `${meanBooks}`
		};
	}
};

export const TEMPLATES_1AS_TCL_T3: ParameterizedTemplate[] = [
	tplStatsCumulativeFreq,
	tplStatsMeanMedianMode,
	tplStatsChartsPieHistogram,
	tplCartesianVectorsDistance,
	tplLineEquationParallelism,
	tplT3IntegrationProblem
];
