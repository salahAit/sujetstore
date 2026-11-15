<script lang="ts">
	import { Calculator, Award, GraduationCap, Plus, Trash2, Target, Sparkles } from 'lucide-svelte';

	let { data }: { data: any } = $props();

	type TabId = 'trimester' | 'bem' | 'bac';
	let activeTab = $state<TabId>('trimester');

	// ============================================================
	// 1. Trimester Average Calculator (Algerian Official Formula)
	// ============================================================
	interface SubjectRow {
		id: string;
		name: string;
		coef: number;
		evalGrade: number; // التقويم المستمر (/20)
		testGrade: number; // الفرض (/20)
		examGrade: number; // الاختبار (/20)
		hasTest: boolean;
	}

	const MIDDLE_DEFAULT_ROWS: SubjectRow[] = [
		{ id: 'mat', name: 'الرياضيات', coef: 4, evalGrade: 14, testGrade: 13, examGrade: 14, hasTest: true },
		{ id: 'ara', name: 'اللغة العربية', coef: 5, evalGrade: 15, testGrade: 14, examGrade: 14, hasTest: true },
		{ id: 'phy', name: 'الفيزياء والتكنولوجيا', coef: 2, evalGrade: 13, testGrade: 12, examGrade: 13, hasTest: true },
		{ id: 'sci', name: 'العلوم الطبيعية', coef: 2, evalGrade: 14, testGrade: 14, examGrade: 13, hasTest: true },
		{ id: 'fr', name: 'اللغة الفرنسية', coef: 3, evalGrade: 12, testGrade: 11, examGrade: 12, hasTest: true },
		{ id: 'en', name: 'اللغة الإنجليزية', coef: 2, evalGrade: 14, testGrade: 13, examGrade: 14, hasTest: true },
		{ id: 'hg', name: 'التاريخ والجغرافيا', coef: 3, evalGrade: 15, testGrade: 14, examGrade: 15, hasTest: true },
		{ id: 'isl', name: 'التربية الإسلامية', coef: 2, evalGrade: 16, testGrade: 15, examGrade: 16, hasTest: true },
		{ id: 'civ', name: 'التربية المدنية', coef: 1, evalGrade: 16, testGrade: 15, examGrade: 16, hasTest: true }
	];

	let trimesterRows = $state<SubjectRow[]>(structuredClone(MIDDLE_DEFAULT_ROWS));

	// Target Exam Score Solver
	let solverEval = $state(14);
	let solverTest = $state(13);
	let solverTarget = $state(15);
	let solverNeededExam = $derived(
		Math.round(((solverTarget * 3 - (solverEval + solverTest) / 2) / 2) * 100) / 100
	);

	function calcSubjectAvg(r: SubjectRow): number {
		const cc = Math.min(20, Math.max(0, Number(r.evalGrade) || 0));
		const t = Math.min(20, Math.max(0, Number(r.testGrade) || 0));
		const ex = Math.min(20, Math.max(0, Number(r.examGrade) || 0));
		if (r.hasTest) {
			return ((cc + t) / 2 + ex * 2) / 3;
		}
		return (cc + ex * 2) / 3;
	}

	let trimesterTotalWeighted = $derived(
		trimesterRows.reduce((s, r) => s + calcSubjectAvg(r) * Math.max(1, Number(r.coef) || 1), 0)
	);
	let trimesterTotalCoef = $derived(
		trimesterRows.reduce((s, r) => s + Math.max(1, Number(r.coef) || 1), 0)
	);
	let trimesterAverage = $derived(
		trimesterTotalCoef > 0 ? trimesterTotalWeighted / trimesterTotalCoef : 0
	);

	function addCustomSubject() {
		trimesterRows = [
			...trimesterRows,
			{
				id: `c-${Date.now()}`,
				name: 'مادة إضافية',
				coef: 1,
				evalGrade: 14,
				testGrade: 14,
				examGrade: 14,
				hasTest: true
			}
		];
	}

	function removeRow(id: string) {
		trimesterRows = trimesterRows.filter((r) => r.id !== id);
	}

	// ============================================================
	// 2. BEM Official Simulator
	// ============================================================
	let bemSubjects = $state([
		{ name: 'اللغة العربية', coef: 5, grade: 14 },
		{ name: 'الرياضيات', coef: 4, grade: 13 },
		{ name: 'اللغة الفرنسية', coef: 3, grade: 12 },
		{ name: 'التاريخ والجغرافيا', coef: 3, grade: 14 },
		{ name: 'اللغة الإنجليزية', coef: 2, grade: 14 },
		{ name: 'علوم الفيزياء والتكنولوجيا', coef: 2, grade: 13 },
		{ name: 'علوم الطبيعة والحياة', coef: 2, grade: 14 },
		{ name: 'التربية الإسلامية', coef: 2, grade: 16 },
		{ name: 'التربية المدنية', coef: 1, grade: 15 },
		{ name: 'التربية البدنية / الفنية', coef: 1, grade: 17 }
	]);
	let yearlyControlAvg = $state(13.5);
	let includeYearlyRescue = $state(false);

	let bemCoefSum = $derived(bemSubjects.reduce((s, b) => s + b.coef, 0));
	let bemPointsSum = $derived(
		bemSubjects.reduce((s, b) => s + Math.min(20, Math.max(0, Number(b.grade) || 0)) * b.coef, 0)
	);
	let bemExamAverage = $derived(bemCoefSum > 0 ? bemPointsSum / bemCoefSum : 0);
	let bemAdmissionAverage = $derived(
		includeYearlyRescue ? (bemExamAverage + Math.min(20, Math.max(0, Number(yearlyControlAvg) || 0))) / 2 : bemExamAverage
	);

	// ============================================================
	// 3. BAC Official Simulator
	// ============================================================
	const BAC_PRESETS: Record<string, { label: string; subjects: { name: string; coef: number; grade: number }[] }> = {
		sci_exp: {
			label: 'علوم تجريبية',
			subjects: [
				{ name: 'علوم الطبيعة والحياة', coef: 6, grade: 14 },
				{ name: 'العلوم الفيزيائية', coef: 5, grade: 13 },
				{ name: 'الرياضيات', coef: 5, grade: 13 },
				{ name: 'اللغة العربية', coef: 3, grade: 13 },
				{ name: 'اللغة الفرنسية', coef: 2, grade: 12 },
				{ name: 'اللغة الإنجليزية', coef: 2, grade: 13 },
				{ name: 'التاريخ والجغرافيا', coef: 2, grade: 14 },
				{ name: 'العلوم الإسلامية', coef: 2, grade: 16 },
				{ name: 'الفلسفة', coef: 2, grade: 12 }
			]
		},
		math: {
			label: 'رياضيات',
			subjects: [
				{ name: 'الرياضيات', coef: 7, grade: 15 },
				{ name: 'العلوم الفيزيائية', coef: 6, grade: 14 },
				{ name: 'اللغة العربية', coef: 3, grade: 13 },
				{ name: 'علوم الطبيعة والحياة', coef: 2, grade: 13 },
				{ name: 'اللغة الفرنسية', coef: 2, grade: 12 },
				{ name: 'اللغة الإنجليزية', coef: 2, grade: 13 },
				{ name: 'التاريخ والجغرافيا', coef: 2, grade: 13 },
				{ name: 'العلوم الإسلامية', coef: 2, grade: 15 },
				{ name: 'الفلسفة', coef: 2, grade: 12 }
			]
		},
		tech_math: {
			label: 'تقني رياضي',
			subjects: [
				{ name: 'التكنولوجيا (الهندسة)', coef: 7, grade: 14 },
				{ name: 'الرياضيات', coef: 6, grade: 14 },
				{ name: 'العلوم الفيزيائية', coef: 6, grade: 13 },
				{ name: 'اللغة العربية', coef: 3, grade: 13 },
				{ name: 'اللغة الفرنسية', coef: 2, grade: 12 },
				{ name: 'اللغة الإنجليزية', coef: 2, grade: 12 },
				{ name: 'التاريخ والجغرافيا', coef: 2, grade: 13 },
				{ name: 'العلوم الإسلامية', coef: 2, grade: 15 },
				{ name: 'الفلسفة', coef: 2, grade: 11 }
			]
		},
		lit_phil: {
			label: 'آداب وفلسفة',
			subjects: [
				{ name: 'اللغة العربية', coef: 6, grade: 14 },
				{ name: 'الفلسفة', coef: 6, grade: 13 },
				{ name: 'التاريخ والجغرافيا', coef: 4, grade: 14 },
				{ name: 'اللغة الفرنسية', coef: 3, grade: 12 },
				{ name: 'اللغة الإنجليزية', coef: 3, grade: 12 },
				{ name: 'الرياضيات', coef: 2, grade: 11 },
				{ name: 'العلوم الإسلامية', coef: 2, grade: 15 }
			]
		},
		gest: {
			label: 'تسيير واقتصاد',
			subjects: [
				{ name: 'التسيير المحاسبي والمالي', coef: 6, grade: 14 },
				{ name: 'الاقتصاد والمناجمنت', coef: 5, grade: 14 },
				{ name: 'الرياضيات', coef: 5, grade: 13 },
				{ name: 'التاريخ والجغرافيا', coef: 4, grade: 13 },
				{ name: 'اللغة العربية', coef: 3, grade: 13 },
				{ name: 'القانون', coef: 2, grade: 14 },
				{ name: 'اللغة الفرنسية', coef: 2, grade: 12 },
				{ name: 'اللغة الإنجليزية', coef: 2, grade: 12 },
				{ name: 'الفلسفة', coef: 2, grade: 11 },
				{ name: 'العلوم الإسلامية', coef: 2, grade: 15 }
			]
		}
	};

	let selectedBacStream = $state<string>('sci_exp');
	let bacSubjects = $state(structuredClone(BAC_PRESETS.sci_exp.subjects));

	function selectBacStream(key: string) {
		selectedBacStream = key;
		bacSubjects = structuredClone(BAC_PRESETS[key].subjects);
	}

	let bacCoefSum = $derived(bacSubjects.reduce((s, b) => s + b.coef, 0));
	let bacPointsSum = $derived(
		bacSubjects.reduce((s, b) => s + Math.min(20, Math.max(0, Number(b.grade) || 0)) * b.coef, 0)
	);
	let bacAverage = $derived(bacCoefSum > 0 ? bacPointsSum / bacCoefSum : 0);

	function getMention(avg: number): { label: string; cls: string } {
		if (avg >= 18) return { label: 'ممتاز 🏆', cls: 'bg-amber-500/15 text-amber-500 border-amber-500/30' };
		if (avg >= 16) return { label: 'جيد جداً 🌟', cls: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30' };
		if (avg >= 14) return { label: 'جيد 👏', cls: 'bg-blue-500/15 text-blue-500 border-blue-500/30' };
		if (avg >= 12) return { label: 'قريب من الجيد 👍', cls: 'bg-cyan-500/15 text-cyan-500 border-cyan-500/30' };
		if (avg >= 10) return { label: 'مقبول (ناجح) ✓', cls: 'bg-teal-500/15 text-teal-500 border-teal-500/30' };
		return { label: 'دون المعدل (يحتاج اجتهاداً)', cls: 'bg-rose-500/15 text-rose-500 border-rose-500/30' };
	}
</script>

<svelte:head>
	<title>حاسبة المعدل ومحاكي الشهادات الرسمية - SujetStore</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
	<div class="mb-8 text-center">
		<span class="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500">
			<Sparkles size={14} /> بدون إنترنت أو تسجيل • النظام الجزائري الرسمي
		</span>
		<h1 class="text-3xl font-extrabold">حاسبة المعدل ومحاكي الشهادات الرسمية</h1>
		<p class="text-muted-foreground mt-2 text-sm">
			احسب معدلك الفصلي بدقة حسب المنهاج الجزائري أو حاكِ نتائجك في شهادة التعليم المتوسط (BEM) والبكالوريا (BAC)
		</p>
	</div>

	<!-- Tabs -->
	<div class="mb-6 flex flex-wrap justify-center gap-2">
		<button
			onclick={() => (activeTab = 'trimester')}
			class="flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition {activeTab === 'trimester'
				? 'bg-primary text-primary-foreground border-primary shadow-lg'
				: 'bg-card hover:bg-accent'}"
		>
			<Calculator size={18} /> حاسبة المعدل الفصلي
		</button>
		<button
			onclick={() => (activeTab = 'bem')}
			class="flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition {activeTab === 'bem'
				? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
				: 'bg-card hover:bg-accent'}"
		>
			<Award size={18} /> محاكي شهادة المتوسط (BEM)
		</button>
		<button
			onclick={() => (activeTab = 'bac')}
			class="flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition {activeTab === 'bac'
				? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
				: 'bg-card hover:bg-accent'}"
		>
			<GraduationCap size={18} /> محاكي البكالوريا (BAC)
		</button>
	</div>

	{#if activeTab === 'trimester'}
		{@const mention = getMention(trimesterAverage)}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div class="bg-card overflow-hidden rounded-2xl border shadow-sm lg:col-span-2">
				<div class="flex items-center justify-between border-b p-4">
					<h2 class="text-base font-extrabold">نقاط المواد (الطور المتوسط / الثانوي)</h2>
					<button
						onclick={addCustomSubject}
						class="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-bold hover:bg-accent"
					>
						<Plus size={14} /> إضافة مادة
					</button>
				</div>

				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead class="bg-muted/50 text-xs">
							<tr>
								<th class="p-3 text-right font-bold">المادة</th>
								<th class="p-3 text-center font-bold">المعامل</th>
								<th class="p-3 text-center font-bold">التقويم</th>
								<th class="p-3 text-center font-bold">الفرض</th>
								<th class="p-3 text-center font-bold">الاختبار</th>
								<th class="p-3 text-center font-bold">المعدل</th>
								<th class="p-2"></th>
							</tr>
						</thead>
						<tbody class="divide-y">
							{#each trimesterRows as row}
								{@const subjAvg = calcSubjectAvg(row)}
								<tr>
									<td class="p-2.5">
										<input
											type="text"
											bind:value={row.name}
											class="bg-transparent text-sm font-bold outline-none focus:underline"
										/>
									</td>
									<td class="p-2 text-center">
										<input
											type="number"
											min="1"
											max="9"
											bind:value={row.coef}
											class="bg-muted/50 w-14 rounded-lg border px-2 py-1 text-center text-xs font-bold"
											dir="ltr"
										/>
									</td>
									<td class="p-2 text-center">
										<input
											type="number"
											min="0"
											max="20"
											step="0.25"
											bind:value={row.evalGrade}
											class="bg-muted/50 w-16 rounded-lg border px-2 py-1 text-center text-xs font-bold"
											dir="ltr"
										/>
									</td>
									<td class="p-2 text-center">
										<input
											type="number"
											min="0"
											max="20"
											step="0.25"
											bind:value={row.testGrade}
											class="bg-muted/50 w-16 rounded-lg border px-2 py-1 text-center text-xs font-bold"
											dir="ltr"
										/>
									</td>
									<td class="p-2 text-center">
										<input
											type="number"
											min="0"
											max="20"
											step="0.25"
											bind:value={row.examGrade}
											class="bg-muted/50 w-16 rounded-lg border px-2 py-1 text-center text-xs font-bold"
											dir="ltr"
										/>
									</td>
									<td class="p-2 text-center font-extrabold {subjAvg >= 10 ? 'text-emerald-500' : 'text-rose-500'}">
										{subjAvg.toFixed(2)}
									</td>
									<td class="p-2">
										<button
											onclick={() => removeRow(row.id)}
											class="text-muted-foreground hover:text-destructive p-1"
											title="حذف"
										>
											<Trash2 size={14} />
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<div class="space-y-5">
				<div class="bg-card rounded-2xl border p-6 text-center shadow-sm">
					<p class="text-muted-foreground text-xs font-bold">المعدل الفصلي التقديري</p>
					<p class="my-3 text-5xl font-black {trimesterAverage >= 10 ? 'text-emerald-500' : 'text-rose-500'}" dir="ltr">
						{trimesterAverage.toFixed(2)}
					</p>
					<span class="inline-block rounded-full border px-4 py-1 text-xs font-extrabold {mention.cls}">
						{mention.label}
					</span>
					<div class="text-muted-foreground mt-4 flex justify-between border-t pt-3 text-xs">
						<span>مجموع النقاط: <strong>{trimesterTotalWeighted.toFixed(2)}</strong></span>
						<span>مجموع المعاملات: <strong>{trimesterTotalCoef}</strong></span>
					</div>
				</div>

				<!-- Target Score Solver -->
				<div class="bg-card rounded-2xl border p-5 shadow-sm">
					<h3 class="mb-3 flex items-center gap-2 text-sm font-extrabold">
						<Target size={16} class="text-blue-500" /> كم أحتاج في الاختبار لتحقيق هدفي؟
					</h3>
					<div class="space-y-3 text-xs">
						<div class="grid grid-cols-3 gap-2">
							<div>
								<label for="solver-eval" class="mb-1 block font-bold">التقويم</label>
								<input id="solver-eval" type="number" min="0" max="20" step="0.5" bind:value={solverEval} class="bg-background w-full rounded-lg border px-2 py-1.5 text-center font-bold" dir="ltr" />
							</div>
							<div>
								<label for="solver-test" class="mb-1 block font-bold">الفرض</label>
								<input id="solver-test" type="number" min="0" max="20" step="0.5" bind:value={solverTest} class="bg-background w-full rounded-lg border px-2 py-1.5 text-center font-bold" dir="ltr" />
							</div>
							<div>
								<label for="solver-target" class="mb-1 block font-bold">الهدف</label>
								<input id="solver-target" type="number" min="1" max="20" step="0.5" bind:value={solverTarget} class="bg-background w-full rounded-lg border px-2 py-1.5 text-center font-bold" dir="ltr" />
							</div>
						</div>
						<div class="bg-muted/40 rounded-xl p-3 text-center">
							{#if solverNeededExam > 20}
								<p class="font-bold text-rose-500">تحتاج إلى {solverNeededExam}/20 (فوق 20، خفّض الهدف قليلاً)</p>
							{:else if solverNeededExam <= 0}
								<p class="font-bold text-emerald-500">أنت مضمون لتحقيق هذا الهدف حتى بعلامة 0!</p>
							{:else}
								<p class="font-bold">
									تحتاج إلى <span class="text-lg font-black text-blue-500">{solverNeededExam}</span> / 20 في الاختبار
								</p>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else if activeTab === 'bem'}
		{@const bemMention = getMention(bemAdmissionAverage)}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div class="bg-card overflow-hidden rounded-2xl border shadow-sm lg:col-span-2">
				<div class="border-b p-4">
					<h2 class="text-base font-extrabold">مواد ومعاملات شهادة التعليم المتوسط (BEM)</h2>
				</div>
				<div class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
					{#each bemSubjects as subj}
						<div class="bg-muted/30 flex items-center justify-between gap-3 rounded-xl border p-3">
							<div>
								<p class="text-sm font-bold">{subj.name}</p>
								<p class="text-muted-foreground text-xs">المعامل: {subj.coef}</p>
							</div>
							<input
								type="number"
								min="0"
								max="20"
								step="0.25"
								bind:value={subj.grade}
								class="bg-background w-20 rounded-xl border px-2.5 py-2 text-center text-sm font-extrabold"
								dir="ltr"
							/>
						</div>
					{/each}
				</div>
			</div>

			<div class="space-y-4">
				<div class="bg-card rounded-2xl border p-6 text-center shadow-sm">
					<p class="text-muted-foreground text-xs font-bold">معدل شهادة BEM المتوقع</p>
					<p class="my-3 text-5xl font-black {bemAdmissionAverage >= 10 ? 'text-emerald-500' : 'text-rose-500'}" dir="ltr">
						{bemAdmissionAverage.toFixed(2)}
					</p>
					<span class="inline-block rounded-full border px-4 py-1 text-xs font-extrabold {bemMention.cls}">
						{bemMention.label}
					</span>

					<div class="mt-5 space-y-2 border-t pt-4 text-right text-xs">
						<label class="flex cursor-pointer items-center gap-2 font-bold">
							<input type="checkbox" bind:checked={includeYearlyRescue} class="h-4 w-4 rounded" />
							<span>حساب معدل القبول (الشهادة + المعدل السنوي) ÷ 2</span>
						</label>
						{#if includeYearlyRescue}
							<div class="pt-1">
								<label for="yearly-control-avg" class="mb-1 block font-bold">المعدل السنوي للمراقبة المستمرة (/20)</label>
								<input
									id="yearly-control-avg"
									type="number"
									min="0"
									max="20"
									step="0.01"
									bind:value={yearlyControlAvg}
									class="bg-background w-full rounded-xl border px-3 py-2 text-center font-bold"
									dir="ltr"
								/>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{:else}
		{@const bacMention = getMention(bacAverage)}
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
			<div class="bg-card overflow-hidden rounded-2xl border shadow-sm lg:col-span-2">
				<div class="flex flex-wrap items-center justify-between gap-3 border-b p-4">
					<h2 class="text-base font-extrabold">محاكي البكالوريا — اختر الشعبة:</h2>
					<div class="flex flex-wrap gap-1.5">
						{#each Object.entries(BAC_PRESETS) as [key, preset]}
							<button
								onclick={() => selectBacStream(key)}
								class="rounded-xl border px-3 py-1.5 text-xs font-bold transition {selectedBacStream === key
									? 'bg-indigo-600 text-white border-indigo-600'
									: 'bg-background hover:bg-accent'}"
							>
								{preset.label}
							</button>
						{/each}
					</div>
				</div>
				<div class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
					{#each bacSubjects as subj}
						<div class="bg-muted/30 flex items-center justify-between gap-3 rounded-xl border p-3">
							<div>
								<p class="text-sm font-bold">{subj.name}</p>
								<p class="text-muted-foreground text-xs">المعامل: {subj.coef}</p>
							</div>
							<input
								type="number"
								min="0"
								max="20"
								step="0.25"
								bind:value={subj.grade}
								class="bg-background w-20 rounded-xl border px-2.5 py-2 text-center text-sm font-extrabold"
								dir="ltr"
							/>
						</div>
					{/each}
				</div>
			</div>

			<div class="bg-card h-fit rounded-2xl border p-6 text-center shadow-sm">
				<p class="text-muted-foreground text-xs font-bold">معدل البكالوريا ({BAC_PRESETS[selectedBacStream].label})</p>
				<p class="my-3 text-5xl font-black {bacAverage >= 10 ? 'text-emerald-500' : 'text-rose-500'}" dir="ltr">
					{bacAverage.toFixed(2)}
				</p>
				<span class="inline-block rounded-full border px-4 py-1 text-xs font-extrabold {bacMention.cls}">
					{bacMention.label}
				</span>
				<div class="text-muted-foreground mt-4 flex justify-between border-t pt-3 text-xs">
					<span>المجموع: <strong>{bacPointsSum.toFixed(2)}</strong></span>
					<span>المعاملات: <strong>{bacCoefSum}</strong></span>
				</div>
			</div>
		</div>
	{/if}
</div>
