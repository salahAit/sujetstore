<script lang="ts">
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';
	import {
		Printer,
		Palette,
		Type,
		LayoutTemplate,
		Sparkles,
		Upload,
		Eye,
		Save,
		Trash2,
		Cpu,
		Play,
		CheckCircle2,
		AlertTriangle,
		Loader2,
		RefreshCw,
		Download,
		Plus,
		Layers,
		FileText,
		HardDrive,
		RotateCcw
	} from 'lucide-svelte';
	import type {
		HeaderLayout,
		StyleScopeType,
		TypstStyleConfig,
		TypstStyleProfileRecord
	} from '#lib/server/print-style';
	import type { BatchRebuildScope, RebuildJobState } from '#lib/server/typst-batch-ram';

	let { data, form } = $props();

	const SCOPE_TYPE_LABELS: Record<StyleScopeType, string> = {
		global: 'الكل (Global)',
		language: 'لغة معينة',
		level: 'طور محدد',
		year: 'سنة محددة',
		subject: 'مادة محددة',
		doc_type: 'نوع موضوع'
	};

	const LANGUAGE_OPTIONS: Array<{ value: 'ar' | 'fr' | 'en'; label: string }> = [
		{ value: 'ar', label: 'العربية (AR)' },
		{ value: 'fr', label: 'الفرنسية (FR)' },
		{ value: 'en', label: 'الإنجليزية (EN)' }
	];

	const DOC_TYPE_OPTIONS: Array<{ value: 'exam' | 'test'; label: string }> = [
		{ value: 'exam', label: 'اختبارات (Exam)' },
		{ value: 'test', label: 'فروض وتقويمات (Test)' }
	];

	const ACCENT_PRESETS = [
		{ name: 'زمردي رسمي', hex: '#064E3B' },
		{ name: 'أزرق أكاديمي', hex: '#1E3A8A' },
		{ name: 'أزرق SujetStore', hex: '#2563EB' },
		{ name: 'بنفسجي ثانوي', hex: '#5B21B6' },
		{ name: 'عنابي كلاسيكي', hex: '#881337' },
		{ name: 'رمادي فحمي', hex: '#0F172A' }
	];

	const HEADER_LAYOUTS: Array<{
		id: HeaderLayout;
		title: string;
		desc: string;
	}> = [
		{
			id: 'classic_ministry',
			title: 'رسمي كلاسيكي',
			desc: 'ترويسة جزائرية تقليدية متوازنة مع الشعار في الوسط وشريط العنوان المؤطّر.'
		},
		{
			id: 'modern_sujetstore',
			title: 'SujetStore عصري',
			desc: 'بطاقة علوية عصرية بلون الهوية مع شريط جانبي بارز ورمز QR مدمج.'
		},
		{
			id: 'minimal',
			title: 'مختصر',
			desc: 'ترويسة مدمجة وأنيقة توفر أكبر مساحة ممكنة لتمارين وجداول الموضوع.'
		}
	];

	// Core reactive state initialized cleanly and synced from server data
	let profiles = $state<TypstStyleProfileRecord[]>([]);
	let fonts = $state<string[]>([]);
	let logos = $state<string[]>([]);
	let recentJobs = $state<RebuildJobState[]>([]);
	let initialized = $state(false);

	// Active profile editor state
	let editingProfileId = $state<number | null>(null);
	let scopeType = $state<StyleScopeType>('global');
	let scopeValue = $state<string>('default');
	let labelAr = $state<string>('الإعداد العام الافتراضي لجميع المواضيع');
	let isActive = $state<boolean>(true);
	let draft = $state<TypstStyleConfig>({
		bodyFont: 'Arabic Transparent',
		headingFont: 'Arabic Transparent',
		ltrBodyFont: 'EB Garamond',
		ltrHeadingFont: 'Montserrat',
		bodySizePt: 11,
		headingSizePt: 13.5,
		tableFontSizePt: 10,
		lineLeadingEm: 0.72,
		marginMm: 14,
		headerLayout: 'classic_ministry',
		showLogo: true,
		logoPath: '/logo.png',
		logoWidthMm: 16,
		showQr: true,
		qrUrl: 'https://sujetstore.com',
		accentColor: '#064E3B',
		headerArRight: 'الجمهورية الجزائرية الديمقراطية الشعبية',
		headerArLeft: 'منصة SujetStore التعليمية',
		headerFrLeft: 'Plateforme éducative algérienne',
		headerEnLeft: 'Algerian Educational Platform',
		footerAr: 'منصة SujetStore — بالتوفيق لجميع التلاميذ',
		footerFr: 'SujetStore.com — Bonne chance à tous les élèves',
		footerEn: 'SujetStore.com — Best of luck to all students',
		showBorder: false
	});

	let activeEditorTab = $state<'typography' | 'branding' | 'texts'>('typography');
	let savingProfile = $state(false);
	let toastMessage = $state<{ kind: 'success' | 'error'; text: string } | null>(null);

	// Asset upload state
	let uploadingFont = $state(false);
	let uploadingLogo = $state(false);
	let fontFileInput: HTMLInputElement | undefined = $state();
	let logoFileInput: HTMLInputElement | undefined = $state();

	// Live preview state
	let previewLang = $state<'ar' | 'fr' | 'en'>('ar');
	let previewLevel = $state<'primaire' | 'moyen' | 'secondaire'>('moyen');
	let previewLoading = $state(false);
	let previewError = $state<string | null>(null);
	let previewSvgPages = $state<string[]>([]);
	let previewElapsedMs = $state<number | null>(null);
	let previewRamDisk = $state<boolean>(true);
	let downloadingPdf = $state(false);

	// Batch RAM Rebuilder state
	let rebuildMode = $state<'all' | 'language' | 'level' | 'year' | 'subject' | 'doc_type'>('all');
	let rebuildLanguage = $state<'ar' | 'fr' | 'en'>('ar');
	let rebuildLevelId = $state<string>('moyen');
	let rebuildYearId = $state<string>('4am');
	let rebuildSubjectId = $state<string>('MAT-B');
	let rebuildDocType = $state<'exam' | 'test'>('exam');
	let rebuildLimit = $state<string>('');
	let rebuildWorkers = $state<number>(10);
	let matchingTargetsCount = $state<number>(0);
	let countingTargets = $state<boolean>(false);
	let startingRebuild = $state<boolean>(false);
	let activeJob = $state<RebuildJobState | null>(null);
	let pollTimer: ReturnType<typeof setInterval> | null = null;

	function showToast(kind: 'success' | 'error', text: string) {
		toastMessage = { kind, text };
	}

	function getGlobalBaseConfig(list: TypstStyleProfileRecord[]): TypstStyleConfig {
		const globalProf = list.find((p) => p.scopeType === 'global' && p.scopeValue === 'default');
		return {
			...data.defaultStyle,
			...(globalProf?.config ?? {})
		};
	}

	function selectProfile(profile: TypstStyleProfileRecord) {
		editingProfileId = profile.id;
		scopeType = profile.scopeType;
		scopeValue = profile.scopeValue;
		labelAr = profile.labelAr;
		isActive = profile.isActive;
		const base = getGlobalBaseConfig(profiles);
		draft = {
			...base,
			...profile.config
		};

		// Automatically align preview context with the chosen profile scope
		if (profile.scopeType === 'language') {
			if (profile.scopeValue === 'fr' || profile.scopeValue === 'en' || profile.scopeValue === 'ar') {
				previewLang = profile.scopeValue;
			}
		} else if (profile.scopeType === 'level') {
			if (
				profile.scopeValue === 'primaire' ||
				profile.scopeValue === 'moyen' ||
				profile.scopeValue === 'secondaire'
			) {
				previewLevel = profile.scopeValue;
			}
		}
		void runLivePreview();
	}

	function startNewScopedProfile(nextScopeType: StyleScopeType = 'language') {
		editingProfileId = null;
		scopeType = nextScopeType;
		isActive = true;
		draft = getGlobalBaseConfig(profiles);
		applyDefaultScopeValue(nextScopeType);
	}

	function applyDefaultScopeValue(type: StyleScopeType) {
		if (type === 'global') {
			scopeValue = 'default';
			labelAr = 'الإعداد العام الافتراضي لجميع المواضيع';
		} else if (type === 'language') {
			scopeValue = 'en';
			labelAr = 'تخصيص مواضيع اللغة الإنجليزية';
		} else if (type === 'level') {
			scopeValue = data.levels[0]?.id ?? 'primaire';
			const lv = data.levels.find((l) => l.id === scopeValue);
			labelAr = `تخصيص طور ${lv?.nameAr ?? scopeValue}`;
		} else if (type === 'year') {
			scopeValue = data.years[0]?.id ?? '4am';
			const yr = data.years.find((y) => y.id === scopeValue);
			labelAr = `تخصيص ${yr?.nameAr ?? scopeValue}`;
		} else if (type === 'subject') {
			scopeValue = data.subjects[0]?.id ?? 'MAT-B';
			const sub = data.subjects.find((s) => s.id === scopeValue);
			labelAr = `تخصيص مادة ${sub?.nameAr ?? scopeValue}`;
		} else if (type === 'doc_type') {
			scopeValue = 'exam';
			labelAr = 'تخصيص الاختبارات الفصلية';
		}
	}

	function handleScopeTypeChange(nextType: StyleScopeType) {
		scopeType = nextType;
		editingProfileId = null;
		applyDefaultScopeValue(nextType);
	}

	function handleScopeValueChange(nextVal: string) {
		scopeValue = nextVal;
		const existing = profiles.find((p) => p.scopeType === scopeType && p.scopeValue === nextVal);
		if (existing) {
			selectProfile(existing);
			return;
		}
		editingProfileId = null;
		if (scopeType === 'language') {
			const opt = LANGUAGE_OPTIONS.find((o) => o.value === nextVal);
			labelAr = `تخصيص مواضيع ${opt?.label ?? nextVal}`;
		} else if (scopeType === 'level') {
			const lv = data.levels.find((l) => l.id === nextVal);
			labelAr = `تخصيص طور ${lv?.nameAr ?? nextVal}`;
		} else if (scopeType === 'year') {
			const yr = data.years.find((y) => y.id === nextVal);
			labelAr = `تخصيص ${yr?.nameAr ?? nextVal}`;
		} else if (scopeType === 'subject') {
			const sub = data.subjects.find((s) => s.id === nextVal);
			labelAr = `تخصيص مادة ${sub?.nameAr ?? nextVal}`;
		} else if (scopeType === 'doc_type') {
			const dt = DOC_TYPE_OPTIONS.find((d) => d.value === nextVal);
			labelAr = `تخصيص ${dt?.label ?? nextVal}`;
		}
	}

	function resetDraftToDefaults() {
		draft = { ...data.defaultStyle };
		void runLivePreview();
	}

	async function runLivePreview(includePdf = false) {
		if (includePdf) {
			downloadingPdf = true;
		} else {
			previewLoading = true;
		}
		previewError = null;

		try {
			const res = await fetch('/api/admin/print-studio/preview', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					style: draft,
					language: previewLang,
					levelId: previewLevel,
					includePdf
				})
			});
			const payload = await res.json();
			if (!res.ok || !payload.success) {
				previewError = payload.error || 'فشل توليد المعاينة الحية';
				return;
			}
			previewSvgPages = Array.isArray(payload.svgPages) ? payload.svgPages : [];
			previewElapsedMs = typeof payload.elapsedMs === 'number' ? payload.elapsedMs : null;
			previewRamDisk = payload.ramDisk !== false;

			if (includePdf && typeof payload.pdfBase64 === 'string' && payload.pdfBase64.length > 0) {
				const bytes = Uint8Array.from(atob(payload.pdfBase64), (c) => c.charCodeAt(0));
				const blob = new Blob([bytes], { type: 'application/pdf' });
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `sujetstore-preview-${previewLang}-${previewLevel}.pdf`;
				a.click();
				setTimeout(() => URL.revokeObjectURL(url), 4000);
			}
		} catch (err: any) {
			previewError = err?.message || 'تعذّر الاتصال بخادم المعاينة';
		} finally {
			previewLoading = false;
			downloadingPdf = false;
		}
	}

	async function uploadAsset(kind: 'font' | 'logo', file: File) {
		if (kind === 'font') uploadingFont = true;
		else uploadingLogo = true;

		try {
			const fd = new FormData();
			fd.set('kind', kind);
			fd.set('file', file);
			const res = await fetch('/api/admin/print-studio/upload-asset', {
				method: 'POST',
				body: fd
			});
			const payload = await res.json();
			if (!res.ok || !payload.ok) {
				showToast('error', payload.error || 'فشل رفع الملف');
				return;
			}
			if (kind === 'font') {
				if (Array.isArray(payload.fonts)) fonts = payload.fonts;
				if (typeof payload.fontFamily === 'string' && payload.fontFamily) {
					if (previewLang === 'ar') {
						draft.bodyFont = payload.fontFamily;
						draft.headingFont = payload.fontFamily;
					} else {
						draft.ltrBodyFont = payload.fontFamily;
						draft.ltrHeadingFont = payload.fontFamily;
					}
				}
				showToast('success', `تم رفع الخط «${payload.fontFamily}» ومزامنته مع الذاكرة الحية /dev/shm`);
				void runLivePreview();
			} else {
				if (Array.isArray(payload.logos)) logos = payload.logos;
				if (typeof payload.path === 'string') {
					draft.logoPath = payload.path;
					draft.showLogo = true;
				}
				showToast('success', 'تم رفع الشعار الجديد وتفعيله في المعاينة');
				void runLivePreview();
			}
		} catch (err: any) {
			showToast('error', err?.message || 'حدث خطأ أثناء رفع الملف');
		} finally {
			if (kind === 'font') uploadingFont = false;
			else uploadingLogo = false;
		}
	}

	function handleFontUpload(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (file) void uploadAsset('font', file);
		input.value = '';
	}

	function handleLogoUpload(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (file) void uploadAsset('logo', file);
		input.value = '';
	}

	function buildCurrentRebuildScope(): BatchRebuildScope {
		const scope: BatchRebuildScope = {};
		if (rebuildMode === 'all') scope.all = true;
		else if (rebuildMode === 'language') scope.language = rebuildLanguage;
		else if (rebuildMode === 'level') scope.levelId = rebuildLevelId;
		else if (rebuildMode === 'year') scope.yearId = rebuildYearId;
		else if (rebuildMode === 'subject') scope.subjectId = rebuildSubjectId;
		else if (rebuildMode === 'doc_type') scope.docType = rebuildDocType;

		const parsedLimit = Number(rebuildLimit);
		if (rebuildLimit.trim() !== '' && Number.isFinite(parsedLimit) && parsedLimit > 0) {
			scope.limit = Math.floor(parsedLimit);
		}
		return scope;
	}

	async function refreshTargetCount() {
		countingTargets = true;
		try {
			const scope = buildCurrentRebuildScope();
			const params = new URLSearchParams({ countOnly: '1' });
			if (scope.all) params.set('all', '1');
			if (scope.language) params.set('language', scope.language);
			if (scope.levelId) params.set('levelId', scope.levelId);
			if (scope.yearId) params.set('yearId', scope.yearId);
			if (scope.subjectId) params.set('subjectId', scope.subjectId);
			if (scope.docType) params.set('docType', scope.docType);
			if (scope.limit) params.set('limit', String(scope.limit));

			const res = await fetch(`/api/admin/print-studio/rebuild?${params.toString()}`);
			if (res.ok) {
				const payload = await res.json();
				matchingTargetsCount = Number(payload.totalTargets) || 0;
			}
		} catch {
			// Ignore transient error
		} finally {
			countingTargets = false;
		}
	}

	function stopPolling() {
		if (pollTimer) {
			clearInterval(pollTimer);
			pollTimer = null;
		}
	}

	function startPollingJob(jobId: string) {
		stopPolling();
		const pollOnce = async () => {
			try {
				const res = await fetch(`/api/admin/print-studio/rebuild?jobId=${encodeURIComponent(jobId)}`);
				if (!res.ok) return;
				const status = (await res.json()) as RebuildJobState;
				activeJob = status;
				const idx = recentJobs.findIndex((j) => j.jobId === status.jobId);
				if (idx >= 0) {
					recentJobs[idx] = status;
				} else {
					recentJobs = [status, ...recentJobs].slice(0, 10);
				}
				if (status.status !== 'running') {
					stopPolling();
				}
			} catch {
				// Ignore transient polling error
			}
		};
		void pollOnce();
		pollTimer = setInterval(pollOnce, 600);
	}

	async function launchBatchRebuild() {
		startingRebuild = true;
		try {
			const scope = buildCurrentRebuildScope();
			const res = await fetch('/api/admin/print-studio/rebuild', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ scope, workers: rebuildWorkers })
			});
			const payload = await res.json();
			if (!res.ok || !payload.ok) {
				showToast('error', payload.error || 'تعذّر بدء إعادة البناء المتوازي');
				return;
			}
			showToast(
				'success',
				`تم تشغيل إعادة البناء المتوازي لـ ${payload.totalTargets} موضوع على ${payload.workers} نواة في RAM`
			);
			startPollingJob(payload.jobId);
		} catch (err: any) {
			showToast('error', err?.message || 'حدث خطأ أثناء تشغيل المهمة');
		} finally {
			startingRebuild = false;
		}
	}

	let activeJobProgressPct = $derived.by(() => {
		if (!activeJob || activeJob.totalTargets <= 0) return 0;
		const done = activeJob.completed + activeJob.failed;
		return Math.min(100, Math.round((done / activeJob.totalTargets) * 100));
	});

	let serializedDraftJson = $derived(JSON.stringify(draft));

	// Initial hydration & live first preview
	$effect(() => {
		if (!initialized && data) {
			profiles = [...data.profiles];
			fonts = [...data.fonts];
			logos = [...data.logos];
			recentJobs = [...data.recentJobs];
			matchingTargetsCount = data.totalExamDocs;
			previewRamDisk = data.ramInfo?.isRamDisk ?? true;

			const initialProfile =
				data.profiles.find((p) => p.scopeType === 'global' && p.scopeValue === 'default') ??
				data.profiles[0];

			if (initialProfile) {
				editingProfileId = initialProfile.id;
				scopeType = initialProfile.scopeType;
				scopeValue = initialProfile.scopeValue;
				labelAr = initialProfile.labelAr;
				isActive = initialProfile.isActive;
				draft = {
					...data.defaultStyle,
					...initialProfile.config
				};
			} else {
				draft = { ...data.defaultStyle };
			}

			const runningJob = data.recentJobs.find((j) => j.status === 'running');
			if (runningJob) {
				activeJob = runningJob;
				startPollingJob(runningJob.jobId);
			} else if (data.recentJobs.length > 0) {
				activeJob = data.recentJobs[0];
			}

			initialized = true;
			void runLivePreview();
		}
	});

	// Refresh target count when rebuild scope changes
	$effect(() => {
		if (!initialized) return;
		// Track dependencies explicitly
		void rebuildMode;
		void rebuildLanguage;
		void rebuildLevelId;
		void rebuildYearId;
		void rebuildSubjectId;
		void rebuildDocType;
		void rebuildLimit;
		void refreshTargetCount();
	});

	// Sync form action results
	$effect(() => {
		if (!form) return;
		if ('success' in form && form.success) {
			if (Array.isArray(form.profiles)) {
				profiles = form.profiles;
			}
			if ('savedProfile' in form && form.savedProfile) {
				editingProfileId = form.savedProfile.id;
			}
			if (typeof form.message === 'string') {
				showToast('success', form.message);
			}
		} else if ('error' in form && typeof form.error === 'string') {
			showToast('error', form.error);
		}
	});

	onDestroy(() => {
		stopPolling();
	});
</script>

<svelte:head>
	<title>استوديو الطباعة والهوية البصرية (Typst Studio) — SujetStore Admin</title>
</svelte:head>

<div class="mx-auto max-w-[1560px] space-y-6" dir="rtl">
	<!-- Top Hero Header -->
	<div
		class="bg-card border-border flex flex-col justify-between gap-4 rounded-2xl border p-5 shadow-sm lg:flex-row lg:items-center"
	>
		<div class="space-y-1">
			<div class="flex flex-wrap items-center gap-2.5">
				<div
					class="bg-primary/15 text-primary flex h-10 w-10 items-center justify-center rounded-xl"
				>
					<Printer size={22} />
				</div>
				<h1 class="text-xl font-extrabold sm:text-2xl">
					استوديو الهوية البصرية والطباعة <span class="text-primary">(Typst Print Studio)</span>
				</h1>
			</div>
			<p class="text-muted-foreground text-sm">
				تحكّم مركزي في خطوط وهوامش وترويسات وشعارات كل مواضيع PDF مع معاينة SVG فورية وإعادة بناء
				متوازية في الذاكرة الحية (RAM).
			</p>
		</div>

		<div class="flex flex-wrap items-center gap-2 text-xs font-bold">
			<span
				class="inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 {data.ramInfo.isRamDisk
					? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
					: 'border-amber-500/30 bg-amber-500/10 text-amber-500'}"
			>
				<HardDrive size={14} />
				{data.ramInfo.isRamDisk ? 'RAM tmpfs (/dev/shm)' : 'تخزين مؤقت (/tmp)'}
			</span>
			<span
				class="bg-background border-border text-foreground inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5"
			>
				<FileText size={14} class="text-primary" />
				{data.totalExamDocs.toLocaleString('ar-DZ')} موضوع منشور
			</span>
			<span
				class="bg-background border-border text-foreground inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5"
			>
				<Layers size={14} class="text-blue-500" />
				{profiles.length} ملف تنسيق
			</span>
		</div>
	</div>

	{#if toastMessage}
		<div
			class="flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-bold {toastMessage.kind ===
			'success'
				? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
				: 'border-red-500/30 bg-red-500/10 text-red-500'}"
		>
			<div class="flex items-center gap-2">
				{#if toastMessage.kind === 'success'}
					<CheckCircle2 size={18} />
				{:else}
					<AlertTriangle size={18} />
				{/if}
				<span>{toastMessage.text}</span>
			</div>
			<button
				type="button"
				onclick={() => (toastMessage = null)}
				class="text-xs opacity-70 hover:opacity-100"
			>
				إغلاق
			</button>
		</div>
	{/if}

	<!-- Profile Scope Bar -->
	<section class="bg-card border-border space-y-4 rounded-2xl border p-4 sm:p-5">
		<div class="flex flex-wrap items-center justify-between gap-3">
			<div>
				<h2 class="flex items-center gap-2 text-base font-extrabold">
					<Layers size={18} class="text-primary" />
					ملفات الهوية والتخصيص حسب النطاق
				</h2>
				<p class="text-muted-foreground text-xs">
					تُدمج الإعدادات تلقائياً بترتيب: الكل (Global) ← اللغة ← الطور ← السنة ← المادة ← نوع الموضوع
				</p>
			</div>
			<button
				type="button"
				onclick={() => startNewScopedProfile('language')}
				class="border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition"
			>
				<Plus size={15} />
				تخصيص جديد لنطاق
			</button>
		</div>

		<div class="flex flex-wrap gap-2">
			{#each profiles as profile (profile.id)}
				{@const selected =
					editingProfileId === profile.id ||
					(scopeType === profile.scopeType && scopeValue === profile.scopeValue)}
				<div
					class="flex items-center gap-1 rounded-xl border px-3 py-2 text-xs transition {selected
						? 'border-primary bg-primary/10 text-primary font-extrabold'
						: 'border-border bg-background/60 text-foreground hover:bg-muted/50 font-semibold'}"
				>
					<button
						type="button"
						onclick={() => selectProfile(profile)}
						class="flex items-center gap-2 text-right"
					>
						<span
							class="inline-block h-2.5 w-2.5 rounded-full"
							style="background-color: {profile.config.accentColor || '#064E3B'}"
						></span>
						<span>{profile.labelAr}</span>
						<span class="bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 text-[10px]">
							{SCOPE_TYPE_LABELS[profile.scopeType]}: {profile.scopeValue}
						</span>
					</button>
					{#if !(profile.scopeType === 'global' && profile.scopeValue === 'default')}
						<form method="POST" action="?/deleteProfile" use:enhance class="mr-1 inline">
							<input type="hidden" name="id" value={profile.id} />
							<button
								type="submit"
								title="حذف هذا التخصيص"
								class="text-muted-foreground rounded p-1 hover:bg-red-500/15 hover:text-red-500"
							>
								<Trash2 size={13} />
							</button>
						</form>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Main 2-Column Studio Grid: Editor (Right) + Sticky Live Preview (Left) -->
	<div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
		<!-- Editor Controls Column -->
		<div class="space-y-6 xl:col-span-7">
			<form
				method="POST"
				action="?/saveProfile"
				use:enhance={() => {
					savingProfile = true;
					return async ({ update }) => {
						await update({ reset: false });
						savingProfile = false;
					};
				}}
				class="bg-card border-border space-y-5 rounded-2xl border p-5 shadow-sm"
			>
				<input type="hidden" name="scopeType" value={scopeType} />
				<input type="hidden" name="scopeValue" value={scopeValue} />
				<input type="hidden" name="isActive" value={isActive ? 'true' : 'false'} />
				<input type="hidden" name="configJson" value={serializedDraftJson} />

				<!-- Scope Definition Row -->
				<div class="bg-background/70 border-border grid grid-cols-1 gap-3 rounded-xl border p-4 sm:grid-cols-3">
					<div>
						<label for="scopeTypeSelect" class="mb-1 block text-xs font-bold">نوع النطاق</label>
						<select
							id="scopeTypeSelect"
							value={scopeType}
							onchange={(e) => handleScopeTypeChange(e.currentTarget.value as StyleScopeType)}
							class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
						>
							<option value="global">الكل (Global)</option>
							<option value="language">لغة معينة (عربي / فرنسي / إنجليزي)</option>
							<option value="level">طور محدد (ابتدائي / متوسط / ثانوي)</option>
							<option value="year">سنة محددة (1AP – 3AS)</option>
							<option value="subject">مادة محددة</option>
							<option value="doc_type">نوع موضوع (اختبار / فرض)</option>
						</select>
					</div>

					<div>
						<label for="scopeValueSelect" class="mb-1 block text-xs font-bold">القيمة المستهدفة</label>
						{#if scopeType === 'global'}
							<input
								id="scopeValueSelect"
								type="text"
								value="default (الكل)"
								disabled
								class="bg-muted/60 border-border text-muted-foreground w-full rounded-xl border px-3 py-2 text-xs font-bold"
							/>
						{:else if scopeType === 'language'}
							<select
								id="scopeValueSelect"
								value={scopeValue}
								onchange={(e) => handleScopeValueChange(e.currentTarget.value)}
								class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
							>
								{#each LANGUAGE_OPTIONS as opt}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						{:else if scopeType === 'level'}
							<select
								id="scopeValueSelect"
								value={scopeValue}
								onchange={(e) => handleScopeValueChange(e.currentTarget.value)}
								class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
							>
								{#each data.levels as lv}
									<option value={lv.id}>{lv.nameAr} ({lv.id})</option>
								{/each}
							</select>
						{:else if scopeType === 'year'}
							<select
								id="scopeValueSelect"
								value={scopeValue}
								onchange={(e) => handleScopeValueChange(e.currentTarget.value)}
								class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
							>
								{#each data.years as yr}
									<option value={yr.id}>{yr.nameAr} ({yr.id})</option>
								{/each}
							</select>
						{:else if scopeType === 'subject'}
							<select
								id="scopeValueSelect"
								value={scopeValue}
								onchange={(e) => handleScopeValueChange(e.currentTarget.value)}
								class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
							>
								{#each data.subjects as sub}
									<option value={sub.id}>{sub.nameAr} ({sub.id})</option>
								{/each}
							</select>
						{:else}
							<select
								id="scopeValueSelect"
								value={scopeValue}
								onchange={(e) => handleScopeValueChange(e.currentTarget.value)}
								class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
							>
								{#each DOC_TYPE_OPTIONS as dt}
									<option value={dt.value}>{dt.label}</option>
								{/each}
							</select>
						{/if}
					</div>

					<div>
						<label for="labelArInput" class="mb-1 block text-xs font-bold">اسم الملف (بالعربية)</label>
						<input
							id="labelArInput"
							name="labelAr"
							type="text"
							bind:value={labelAr}
							class="bg-card border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
						/>
					</div>
				</div>

				<!-- Editor Section Tabs -->
				<div class="border-border flex flex-wrap gap-2 border-b pb-3">
					<button
						type="button"
						onclick={() => (activeEditorTab = 'typography')}
						class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition {activeEditorTab ===
						'typography'
							? 'bg-primary text-primary-foreground shadow-sm'
							: 'bg-muted/50 text-muted-foreground hover:text-foreground'}"
					>
						<Type size={15} />
						الخطوط والقياسات
					</button>
					<button
						type="button"
						onclick={() => (activeEditorTab = 'branding')}
						class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition {activeEditorTab ===
						'branding'
							? 'bg-primary text-primary-foreground shadow-sm'
							: 'bg-muted/50 text-muted-foreground hover:text-foreground'}"
					>
						<Palette size={15} />
						الترويسة والشعار والألوان
					</button>
					<button
						type="button"
						onclick={() => (activeEditorTab = 'texts')}
						class="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition {activeEditorTab ===
						'texts'
							? 'bg-primary text-primary-foreground shadow-sm'
							: 'bg-muted/50 text-muted-foreground hover:text-foreground'}"
					>
						<LayoutTemplate size={15} />
						نصوص الترويسة والتذييل
					</button>
				</div>

				<!-- TAB 1: TYPOGRAPHY & METRICS -->
				{#if activeEditorTab === 'typography'}
					<div class="space-y-5">
						<div class="flex flex-wrap items-center justify-between gap-2">
							<h3 class="text-sm font-extrabold">اختيار الخطوط العربية واللاتينية</h3>
							<div>
								<input
									bind:this={fontFileInput}
									type="file"
									accept=".ttf,.otf"
									onchange={handleFontUpload}
									class="sr-only"
								/>
								<button
									type="button"
									disabled={uploadingFont}
									onclick={() => fontFileInput?.click()}
									class="border-border bg-background hover:bg-muted/60 inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition disabled:opacity-60"
								>
									{#if uploadingFont}
										<Loader2 size={14} class="animate-spin" />
										جارٍ رفع الخط...
									{:else}
										<Upload size={14} class="text-primary" />
										رفع خط مخصص (.ttf / .otf)
									{/if}
								</button>
							</div>
						</div>

						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<div>
								<label for="bodyFontSelect" class="mb-1 block text-xs font-bold">
									خط المتن العربي (Body Font)
								</label>
								<select
									id="bodyFontSelect"
									bind:value={draft.bodyFont}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
								>
									{#each fonts as f}
										<option value={f}>{f}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="headingFontSelect" class="mb-1 block text-xs font-bold">
									خط العناوين العربية (Heading Font)
								</label>
								<select
									id="headingFontSelect"
									bind:value={draft.headingFont}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
								>
									{#each fonts as f}
										<option value={f}>{f}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="ltrBodyFontSelect" class="mb-1 block text-xs font-bold" dir="ltr">
									LTR Body Font (FR / EN)
								</label>
								<select
									id="ltrBodyFontSelect"
									dir="ltr"
									bind:value={draft.ltrBodyFont}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
								>
									{#each fonts as f}
										<option value={f}>{f}</option>
									{/each}
								</select>
							</div>

							<div>
								<label for="ltrHeadingFontSelect" class="mb-1 block text-xs font-bold" dir="ltr">
									LTR Heading Font (FR / EN)
								</label>
								<select
									id="ltrHeadingFontSelect"
									dir="ltr"
									bind:value={draft.ltrHeadingFont}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
								>
									{#each fonts as f}
										<option value={f}>{f}</option>
									{/each}
								</select>
							</div>
						</div>

						<!-- Metric Sliders -->
						<div class="bg-background/60 border-border grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-2">
							<div>
								<div class="mb-1 flex items-center justify-between text-xs font-bold">
									<label for="bodySizePt">حجم خط المتن</label>
									<span class="text-primary font-mono">{draft.bodySizePt} pt</span>
								</div>
								<input
									id="bodySizePt"
									type="range"
									min="8.5"
									max="20"
									step="0.5"
									bind:value={draft.bodySizePt}
									class="accent-primary w-full"
								/>
							</div>

							<div>
								<div class="mb-1 flex items-center justify-between text-xs font-bold">
									<label for="headingSizePt">حجم خط العناوين</label>
									<span class="text-primary font-mono">{draft.headingSizePt} pt</span>
								</div>
								<input
									id="headingSizePt"
									type="range"
									min="10"
									max="24"
									step="0.5"
									bind:value={draft.headingSizePt}
									class="accent-primary w-full"
								/>
							</div>

							<div>
								<div class="mb-1 flex items-center justify-between text-xs font-bold">
									<label for="tableFontSizePt">حجم خط الجداول</label>
									<span class="text-primary font-mono">{draft.tableFontSizePt} pt</span>
								</div>
								<input
									id="tableFontSizePt"
									type="range"
									min="7.5"
									max="16"
									step="0.5"
									bind:value={draft.tableFontSizePt}
									class="accent-primary w-full"
								/>
							</div>

							<div>
								<div class="mb-1 flex items-center justify-between text-xs font-bold">
									<label for="lineLeadingEm">تباعد الأسطر (Leading)</label>
									<span class="text-primary font-mono">{draft.lineLeadingEm} em</span>
								</div>
								<input
									id="lineLeadingEm"
									type="range"
									min="0.5"
									max="1.4"
									step="0.02"
									bind:value={draft.lineLeadingEm}
									class="accent-primary w-full"
								/>
							</div>

							<div class="sm:col-span-2">
								<div class="mb-1 flex items-center justify-between text-xs font-bold">
									<label for="marginMm">هوامش الصفحة (A4 Margin)</label>
									<span class="text-primary font-mono">{draft.marginMm} mm</span>
								</div>
								<input
									id="marginMm"
									type="range"
									min="8"
									max="26"
									step="1"
									bind:value={draft.marginMm}
									class="accent-primary w-full"
								/>
							</div>
						</div>
					</div>

				<!-- TAB 2: BRANDING, LAYOUT, LOGO, QR & COLORS -->
				{:else if activeEditorTab === 'branding'}
					<div class="space-y-5">
						<!-- Header Layout 3-card selector -->
						<div>
							<p class="mb-2 text-xs font-extrabold">نمط ترويسة الموضوع (Header Layout)</p>
							<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
								{#each HEADER_LAYOUTS as hl}
									<label
										class="cursor-pointer rounded-xl border p-3.5 transition {draft.headerLayout ===
										hl.id
											? 'border-primary bg-primary/10'
											: 'border-border bg-background/50 hover:bg-muted/40'}"
									>
										<input
											type="radio"
											name="headerLayoutRadio"
											value={hl.id}
											bind:group={draft.headerLayout}
											class="sr-only"
										/>
										<div class="text-sm font-extrabold">{hl.title}</div>
										<p class="text-muted-foreground mt-1 text-[11px] leading-relaxed">{hl.desc}</p>
									</label>
								{/each}
							</div>
						</div>

						<!-- Accent Color Picker + Presets -->
						<div class="bg-background/60 border-border space-y-3 rounded-xl border p-4">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<label for="accentColorPicker" class="text-xs font-extrabold">
									اللون الرئيسي للهوية (Accent Color)
								</label>
								<div class="flex items-center gap-2">
									<input
										id="accentColorPicker"
										type="color"
										bind:value={draft.accentColor}
										class="border-border h-8 w-10 cursor-pointer rounded-lg border bg-transparent p-0.5"
									/>
									<input
										type="text"
										dir="ltr"
										bind:value={draft.accentColor}
										class="bg-card border-border w-24 rounded-lg border px-2 py-1 text-center font-mono text-xs font-bold"
									/>
								</div>
							</div>
							<div class="flex flex-wrap gap-2">
								{#each ACCENT_PRESETS as preset}
									<button
										type="button"
										onclick={() => (draft.accentColor = preset.hex)}
										class="border-border bg-card hover:bg-muted/60 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition"
									>
										<span
											class="inline-block h-3 w-3 rounded-full"
											style="background-color: {preset.hex}"
										></span>
										{preset.name}
									</button>
								{/each}
							</div>
						</div>

						<!-- Toggles: Logo, QR, Border -->
						<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
							<label
								class="border-border bg-background/60 flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-bold"
							>
								<span>إظهار الشعار (Logo)</span>
								<input type="checkbox" bind:checked={draft.showLogo} class="accent-primary h-4 w-4" />
							</label>
							<label
								class="border-border bg-background/60 flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-bold"
							>
								<span>إظهار رمز QR</span>
								<input type="checkbox" bind:checked={draft.showQr} class="accent-primary h-4 w-4" />
							</label>
							<label
								class="border-border bg-background/60 flex cursor-pointer items-center justify-between rounded-xl border p-3 text-xs font-bold"
							>
								<span>إطار محيط بالصفحة</span>
								<input
									type="checkbox"
									bind:checked={draft.showBorder}
									class="accent-primary h-4 w-4"
								/>
							</label>
						</div>

						<!-- Logo Gallery + Upload + Width -->
						<div class="bg-background/60 border-border space-y-3 rounded-xl border p-4">
							<div class="flex flex-wrap items-center justify-between gap-2">
								<span class="text-xs font-extrabold">اختيار أو رفع شعار الطباعة (PNG / WebP)</span>
								<div>
									<input
										bind:this={logoFileInput}
										type="file"
										accept=".png,.webp,image/png,image/webp"
										onchange={handleLogoUpload}
										class="sr-only"
									/>
									<button
										type="button"
										disabled={uploadingLogo}
										onclick={() => logoFileInput?.click()}
										class="border-border bg-card hover:bg-muted/60 inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition disabled:opacity-60"
									>
										{#if uploadingLogo}
											<Loader2 size={14} class="animate-spin" />
											جارٍ الرفع...
										{:else}
											<Upload size={14} class="text-primary" />
											رفع شعار جديد
										{/if}
									</button>
								</div>
							</div>

							<div class="flex flex-wrap gap-2.5">
								{#each logos as lp}
									<button
										type="button"
										onclick={() => {
											draft.logoPath = lp;
											draft.showLogo = true;
										}}
										class="flex flex-col items-center gap-1 rounded-xl border p-2 transition {draft.logoPath ===
										lp
											? 'border-primary bg-primary/10'
											: 'border-border bg-card hover:bg-muted/50'}"
									>
										<img src={lp} alt={lp} class="h-10 w-10 object-contain" />
										<span class="max-w-[96px] truncate font-mono text-[10px]">{lp.split('/').pop()}</span>
									</button>
								{/each}
							</div>

							<div class="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
								<div>
									<div class="mb-1 flex items-center justify-between text-xs font-bold">
										<label for="logoWidthMm">عرض الشعار في الصفحة</label>
										<span class="text-primary font-mono">{draft.logoWidthMm} mm</span>
									</div>
									<input
										id="logoWidthMm"
										type="range"
										min="10"
										max="34"
										step="1"
										bind:value={draft.logoWidthMm}
										class="accent-primary w-full"
									/>
								</div>

								<div>
									<label for="qrUrlInput" class="mb-1 block text-xs font-bold">رابط رمز QR</label>
									<input
										id="qrUrlInput"
										type="url"
										dir="ltr"
										bind:value={draft.qrUrl}
										placeholder="https://sujetstore.com"
										class="bg-card border-border w-full rounded-xl border px-3 py-1.5 text-xs"
									/>
								</div>
							</div>
						</div>
					</div>

				<!-- TAB 3: HEADER & FOOTER TEXTS -->
				{:else}
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<label for="headerArRight" class="mb-1 block text-xs font-bold">
								الترويسة العربية — السطر الأول (يمين / أعلى)
							</label>
							<input
								id="headerArRight"
								type="text"
								bind:value={draft.headerArRight}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>
						<div>
							<label for="headerArLeft" class="mb-1 block text-xs font-bold">
								الترويسة العربية — السطر الثاني (اسم المنصة)
							</label>
							<input
								id="headerArLeft"
								type="text"
								bind:value={draft.headerArLeft}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>
						<div class="sm:col-span-2">
							<label for="footerAr" class="mb-1 block text-xs font-bold">تذييل الصفحة العربية</label>
							<input
								id="footerAr"
								type="text"
								bind:value={draft.footerAr}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>

						<div>
							<label for="headerFrLeft" class="mb-1 block text-xs font-bold" dir="ltr">
								En-tête Français
							</label>
							<input
								id="headerFrLeft"
								type="text"
								dir="ltr"
								bind:value={draft.headerFrLeft}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>
						<div>
							<label for="headerEnLeft" class="mb-1 block text-xs font-bold" dir="ltr">
								English Header Subtitle
							</label>
							<input
								id="headerEnLeft"
								type="text"
								dir="ltr"
								bind:value={draft.headerEnLeft}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>
						<div>
							<label for="footerFr" class="mb-1 block text-xs font-bold" dir="ltr">
								Pied de page Français
							</label>
							<input
								id="footerFr"
								type="text"
								dir="ltr"
								bind:value={draft.footerFr}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>
						<div>
							<label for="footerEn" class="mb-1 block text-xs font-bold" dir="ltr">
								English Footer
							</label>
							<input
								id="footerEn"
								type="text"
								dir="ltr"
								bind:value={draft.footerEn}
								class="bg-background border-border w-full rounded-xl border px-3 py-2 text-sm"
							/>
						</div>
					</div>
				{/if}

				<!-- Action Buttons Bar -->
				<div class="border-border flex flex-wrap items-center justify-between gap-3 border-t pt-4">
					<div class="flex flex-wrap items-center gap-2">
						<button
							type="button"
							disabled={previewLoading}
							onclick={() => runLivePreview(false)}
							class="border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-extrabold transition disabled:opacity-60"
						>
							{#if previewLoading}
								<Loader2 size={16} class="animate-spin" />
								جارٍ المعاينة...
							{:else}
								<Eye size={16} />
								معاينة حية فورية
							{/if}
						</button>

						<button
							type="submit"
							disabled={savingProfile}
							class="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-extrabold shadow-sm transition hover:opacity-90 disabled:opacity-60"
						>
							{#if savingProfile}
								<Loader2 size={16} class="animate-spin" />
								جارٍ الحفظ...
							{:else}
								<Save size={16} />
								حفظ ملف التنسيق
							{/if}
						</button>
					</div>

					<button
						type="button"
						onclick={resetDraftToDefaults}
						class="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition"
					>
						<RotateCcw size={14} />
						استعادة الافتراضي
					</button>
				</div>
			</form>

			<!-- In-RAM Multi-Core Batch Rebuilder Panel -->
			<section class="bg-card border-border space-y-5 rounded-2xl border p-5 shadow-sm">
				<div class="flex flex-wrap items-start justify-between gap-3">
					<div>
						<h2 class="flex items-center gap-2 text-base font-extrabold">
							<Cpu size={19} class="text-emerald-500" />
							تطبيق وإعادة بناء المواضيع في الذاكرة الحية (RAM)
						</h2>
						<p class="text-muted-foreground mt-0.5 text-xs">
							إعادة تصريف المواضيع المنشورة وتصحيحاتها مباشرةً داخل
							<code class="text-foreground font-mono">/dev/shm</code> بدون كتابة مؤقتة على القرص الصلب،
							ثم رفعها مباشرة إلى RustFS S3 و<code class="text-foreground font-mono">MEDIA_ROOT</code>.
						</p>
					</div>
					<span
						class="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-extrabold text-emerald-500"
					>
						{#if countingTargets}
							جارٍ الحساب...
						{:else}
							المواضيع المطابقة: {matchingTargetsCount.toLocaleString('ar-DZ')}
						{/if}
					</span>
				</div>

				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
					<div>
						<label for="rebuildModeSelect" class="mb-1 block text-xs font-bold">نطاق إعادة البناء</label>
						<select
							id="rebuildModeSelect"
							bind:value={rebuildMode}
							class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
						>
							<option value="all">جميع المواضيع المنشورة (الكل)</option>
							<option value="language">حسب اللغة (عربي / فرنسي / إنجليزي)</option>
							<option value="level">حسب الطور التعليمي</option>
							<option value="year">حسب السنة الدراسية</option>
							<option value="subject">حسب المادة الدراسية</option>
							<option value="doc_type">حسب النوع (اختبار / فرض)</option>
						</select>
					</div>

					{#if rebuildMode !== 'all'}
						<div>
							<label for="rebuildFilterVal" class="mb-1 block text-xs font-bold">تحديد النطاق</label>
							{#if rebuildMode === 'language'}
								<select
									id="rebuildFilterVal"
									bind:value={rebuildLanguage}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
								>
									{#each LANGUAGE_OPTIONS as opt}
										<option value={opt.value}>{opt.label}</option>
									{/each}
								</select>
							{:else if rebuildMode === 'level'}
								<select
									id="rebuildFilterVal"
									bind:value={rebuildLevelId}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
								>
									{#each data.levels as lv}
										<option value={lv.id}>{lv.nameAr}</option>
									{/each}
								</select>
							{:else if rebuildMode === 'year'}
								<select
									id="rebuildFilterVal"
									bind:value={rebuildYearId}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
								>
									{#each data.years as yr}
										<option value={yr.id}>{yr.nameAr}</option>
									{/each}
								</select>
							{:else if rebuildMode === 'subject'}
								<select
									id="rebuildFilterVal"
									bind:value={rebuildSubjectId}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
								>
									{#each data.subjects as sub}
										<option value={sub.id}>{sub.nameAr} ({sub.id})</option>
									{/each}
								</select>
							{:else}
								<select
									id="rebuildFilterVal"
									bind:value={rebuildDocType}
									class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs font-bold"
								>
									{#each DOC_TYPE_OPTIONS as dt}
										<option value={dt.value}>{dt.label}</option>
									{/each}
								</select>
							{/if}
						</div>
					{/if}

					<div>
						<label for="rebuildLimitInput" class="mb-1 block text-xs font-bold">
							حد أقصى للتجربة (اختياري)
						</label>
						<input
							id="rebuildLimitInput"
							type="number"
							min="1"
							max="5000"
							placeholder="فارغ = كل النطاق"
							bind:value={rebuildLimit}
							class="bg-background border-border w-full rounded-xl border px-3 py-2 text-xs"
						/>
					</div>
				</div>

				<!-- Workers Slider -->
				<div class="bg-background/60 border-border rounded-xl border p-4">
					<div class="mb-1.5 flex items-center justify-between text-xs font-extrabold">
						<label for="workersRange">عدد الأنوية المتوازية (vCPU Workers)</label>
						<span class="text-emerald-500 font-mono">{rebuildWorkers} / 12 vCPU</span>
					</div>
					<input
						id="workersRange"
						type="range"
						min="2"
						max="12"
						step="1"
						bind:value={rebuildWorkers}
						class="accent-emerald-500 w-full"
					/>
					<div class="text-muted-foreground mt-1 flex justify-between text-[11px]">
						<span>2 نواة (هادئ)</span>
						<span>10 أنوية (الافتراضي الموصى به على 14 vCPU)</span>
						<span>12 نواة (أقصى سرعة)</span>
					</div>
				</div>

				<div class="flex flex-wrap items-center gap-3">
					<button
						type="button"
						disabled={startingRebuild || matchingTargetsCount === 0 || activeJob?.status === 'running'}
						onclick={launchBatchRebuild}
						class="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
					>
						{#if startingRebuild || activeJob?.status === 'running'}
							<Loader2 size={16} class="animate-spin" />
							جارٍ إعادة البناء المتوازي...
						{:else}
							<Play size={16} />
							بدء إعادة البناء المتوازي ({matchingTargetsCount} موضوع)
						{/if}
					</button>
				</div>

				<!-- Live Progress & Telemetry -->
				{#if activeJob}
					<div class="bg-background border-border space-y-4 rounded-xl border p-4">
						<div class="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
							<div class="flex items-center gap-2">
								<span
									class="inline-block h-2.5 w-2.5 rounded-full {activeJob.status === 'running'
										? 'animate-pulse bg-emerald-500'
										: activeJob.status === 'done'
											? 'bg-blue-500'
											: 'bg-red-500'}"
								></span>
								<span>المهمة: <code class="font-mono">{activeJob.jobId}</code></span>
								<span class="text-muted-foreground">({activeJob.workers} vCPU)</span>
							</div>
							<span class="font-mono text-sm font-extrabold text-emerald-500">
								{activeJobProgressPct}%
							</span>
						</div>

						<!-- Progress bar -->
						<div class="bg-muted h-3 w-full overflow-hidden rounded-full">
							<div
								class="h-full rounded-full transition-all duration-300 {activeJob.status === 'error'
									? 'bg-red-500'
									: 'bg-emerald-500'}"
								style="width: {activeJobProgressPct}%"
							></div>
						</div>

						<!-- KPI Stats -->
						<div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
							<div class="bg-card border-border rounded-xl border p-3 text-center">
								<div class="text-muted-foreground text-[11px]">السرعة الفورية</div>
								<div class="mt-0.5 font-mono text-base font-extrabold text-emerald-500">
									{activeJob.pdfsPerSec} <span class="text-[10px]">PDF/s</span>
								</div>
							</div>
							<div class="bg-card border-border rounded-xl border p-3 text-center">
								<div class="text-muted-foreground text-[11px]">المُنجز</div>
								<div class="mt-0.5 font-mono text-base font-extrabold">
									{activeJob.completed} / {activeJob.totalTargets}
								</div>
							</div>
							<div class="bg-card border-border rounded-xl border p-3 text-center">
								<div class="text-muted-foreground text-[11px]">ملفات PDF</div>
								<div class="mt-0.5 font-mono text-base font-extrabold text-blue-500">
									{activeJob.pdfsCompiled}
								</div>
							</div>
							<div class="bg-card border-border rounded-xl border p-3 text-center">
								<div class="text-muted-foreground text-[11px]">الزمن المنقضي</div>
								<div class="mt-0.5 font-mono text-base font-extrabold">
									{(activeJob.elapsedMs / 1000).toFixed(1)}s
								</div>
							</div>
						</div>

						{#if activeJob.failed > 0}
							<div class="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-500">
								عدد الإخفاقات: {activeJob.failed}
							</div>
						{/if}

						{#if activeJob.recentLogs.length > 0}
							<div
								dir="ltr"
								class="max-h-40 overflow-y-auto rounded-xl bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-emerald-300"
							>
								{#each activeJob.recentLogs as line}
									<div class="truncate">{line}</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				{#if recentJobs.length > 1}
					<div class="space-y-2">
						<p class="text-muted-foreground text-xs font-bold">سجل عمليات إعادة البناء الأخيرة</p>
						<div class="flex flex-wrap gap-2">
							{#each recentJobs.slice(0, 5) as job (job.jobId)}
								<button
									type="button"
									onclick={() => (activeJob = job)}
									class="border-border bg-background hover:bg-muted/50 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition"
								>
									<span class="font-mono">{job.jobId}</span> • {job.completed}/{job.totalTargets} ({job.pdfsPerSec}
									PDF/s)
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</section>
		</div>

		<!-- Sticky Live SVG Preview Column (Left in RTL) -->
		<div class="xl:col-span-5">
			<div class="bg-card border-border sticky top-4 space-y-4 rounded-2xl border p-4 shadow-sm sm:p-5">
				<div class="flex flex-wrap items-center justify-between gap-2">
					<h2 class="flex items-center gap-2 text-base font-extrabold">
						<Sparkles size={18} class="text-primary" />
						معاينة حية للورقة (A4 SVG)
					</h2>
					<div class="flex items-center gap-1.5">
						{#if previewElapsedMs !== null}
							<span
								class="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-500"
							>
								{previewElapsedMs} ms {previewRamDisk ? '• RAM' : ''}
							</span>
						{/if}
						<button
							type="button"
							disabled={previewLoading}
							onclick={() => runLivePreview(false)}
							title="تحديث المعاينة"
							class="border-border bg-background hover:bg-muted/60 rounded-lg border p-1.5 transition disabled:opacity-50"
						>
							<RefreshCw size={14} class={previewLoading ? 'animate-spin' : ''} />
						</button>
						<button
							type="button"
							disabled={downloadingPdf}
							onclick={() => runLivePreview(true)}
							title="تنزيل PDF للمعاينة"
							class="border-border bg-background hover:bg-muted/60 inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition disabled:opacity-50"
						>
							{#if downloadingPdf}
								<Loader2 size={13} class="animate-spin" />
							{:else}
								<Download size={13} />
							{/if}
							PDF
						</button>
					</div>
				</div>

				<!-- Preview Language & Level Switchers -->
				<div class="flex flex-wrap items-center justify-between gap-2">
					<div class="bg-background border-border flex rounded-xl border p-1 text-xs font-bold">
						{#each LANGUAGE_OPTIONS as opt}
							<button
								type="button"
								onclick={() => {
									previewLang = opt.value;
									void runLivePreview(false);
								}}
								class="rounded-lg px-2.5 py-1 transition {previewLang === opt.value
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								{opt.value === 'ar' ? 'عربي' : opt.value === 'fr' ? 'فرنسي' : 'إنجليزي'}
							</button>
						{/each}
					</div>

					<div class="bg-background border-border flex rounded-xl border p-1 text-xs font-bold">
						{#each [
							{ id: 'primaire', label: 'ابتدائي' },
							{ id: 'moyen', label: 'متوسط' },
							{ id: 'secondaire', label: 'ثانوي' }
						] as lv}
							<button
								type="button"
								onclick={() => {
									previewLevel = lv.id as 'primaire' | 'moyen' | 'secondaire';
									void runLivePreview(false);
								}}
								class="rounded-lg px-2.5 py-1 transition {previewLevel === lv.id
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'}"
							>
								{lv.label}
							</button>
						{/each}
					</div>
				</div>

				<!-- SVG A4 Sheet Container -->
				<div
					class="border-border relative min-h-[540px] overflow-hidden rounded-xl border bg-slate-200/80 p-3 dark:bg-slate-900/80"
				>
					{#if previewLoading && previewSvgPages.length === 0}
						<div class="flex h-[520px] flex-col items-center justify-center gap-3 text-slate-600 dark:text-slate-300">
							<Loader2 size={28} class="text-primary animate-spin" />
							<span class="text-xs font-bold">جارٍ تصريف ورقة المعاينة في الذاكرة الحية...</span>
						</div>
					{:else if previewError}
						<div class="flex h-[520px] flex-col items-center justify-center gap-2 p-4 text-center text-red-500">
							<AlertTriangle size={28} />
							<p class="text-sm font-bold">تعذّر تصريف المعاينة</p>
							<pre class="max-w-full overflow-x-auto rounded-lg bg-black/20 p-2 text-[11px]">{previewError}</pre>
						</div>
					{:else if previewSvgPages.length > 0}
						<div class="space-y-4 {previewLoading ? 'opacity-60 transition-opacity' : ''}">
							{#each previewSvgPages as svgMarkup, idx (idx)}
								<div
									class="typst-svg-sheet mx-auto overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/10"
								>
									{@html svgMarkup}
								</div>
							{/each}
						</div>
					{:else}
						<div class="text-muted-foreground flex h-[520px] flex-col items-center justify-center gap-2 text-xs">
							<Eye size={26} />
							<span>اضغط «معاينة حية فورية» لمشاهدة الورقة</span>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.typst-svg-sheet :global(svg) {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
