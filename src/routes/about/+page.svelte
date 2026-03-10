<script lang="ts">
	import { BookOpen, Target, Users, Zap, Award, Sparkles, Heart, CheckCircle } from 'lucide-svelte';
</script>

<svelte:head>
	<title>من نحن - SujetStore</title>
	<meta
		name="description"
		content="تعرف على SujetStore، المنصة التعليمية الأولى في الجزائر لتقديم الفروض والاختبارات لجميع المراحل الدراسية."
	/>
	<meta property="og:title" content="من نحن - SujetStore" />
	<meta
		property="og:description"
		content="رسالتنا هي تسهيل وصول التلميذ الجزائري إلى الموارد التعليمية المنظمة والموثوقة."
	/>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
	<!-- Hero Section -->
	<div class="mb-16 text-center">
		<h1
			class="from-primary to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl lg:text-6xl"
		>
			عن منصة SujetStore
		</h1>
		<p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg sm:text-xl">
			وجهتك الأولى للنجاح والتفوق. المنصة التعليمية الجزائرية الشاملة التي توفر لك أحدث الفروض
			والاختبارات والدروس لجميع الأطوار التعليمية.
		</p>
	</div>

	<!-- Stats & Core Value -->
	<div class="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
		<div class="bg-card flex flex-col items-center rounded-2xl border p-6 text-center shadow-sm">
			<div
				class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-blue-500"
			>
				<BookOpen size={28} />
			</div>
			<h3 class="mb-2 text-xl font-bold">محتوى غني</h3>
			<p class="text-muted-foreground text-sm">
				آلاف الوثائق، الفروض، الاختبارات والملخصات المحدثة باستمرار والموافقة للمنهاج الجزائري.
			</p>
		</div>

		<div class="bg-card flex flex-col items-center rounded-2xl border p-6 text-center shadow-sm">
			<div
				class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500"
			>
				<Target size={28} />
			</div>
			<h3 class="mb-2 text-xl font-bold">تنظيم محكم</h3>
			<p class="text-muted-foreground text-sm">
				تصنيف دقيق حسب الطور، السنة، المادة، والفصل الدراسي لتسهيل البحث والوصول للمعلومة.
			</p>
		</div>

		<div class="bg-card flex flex-col items-center rounded-2xl border p-6 text-center shadow-sm">
			<div
				class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-500"
			>
				<Zap size={28} />
			</div>
			<h3 class="mb-2 text-xl font-bold">سرعة وأداء</h3>
			<p class="text-muted-foreground text-sm">
				تجربة مستخدم حديثة وسريعة جداً، تدعم الوضع الليلي، والبحث الفوري، وحفظ المفضلة.
			</p>
		</div>
	</div>

	<!-- Our Mission -->
	<section class="mb-20">
		<div class="bg-muted overflow-hidden rounded-3xl">
			<div class="grid grid-cols-1 lg:grid-cols-2">
				<div class="p-8 sm:p-12 lg:p-16">
					<div
						class="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
					>
						<Sparkles size={16} /> <span>رسالتنا</span>
					</div>
					<h2 class="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
						دعم التلميذ الجزائري نحو التفوق
					</h2>
					<p class="text-muted-foreground leading-relaxed">
						نؤمن في SujetStore أن الوصول الممتاز إلى الموارد التعليمية حق لكل تلميذ. تهدف المنصة إلى
						القضاء على فوضى البحث عن الاختبارات في شبكات التواصل الاجتماعي ومجموعات الدردشة، وتقديم
						منصة متخصصة، نظيفة وخالية من المشتتات.
					</p>
					<ul class="mt-8 space-y-4">
						<li class="flex items-center gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-600"
							>
								<CheckCircle size={14} />
							</div>
							<span class="font-medium">مجانية بالكامل للطلاب</span>
						</li>
						<li class="flex items-center gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-600"
							>
								<CheckCircle size={14} />
							</div>
							<span class="font-medium">تحديثات دورية للمحتوى والإجابات</span>
						</li>
						<li class="flex items-center gap-3">
							<div
								class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-600"
							>
								<CheckCircle size={14} />
							</div>
							<span class="font-medium">سرعة تحميل حتى في اتصالات الإنترنت الضعيفة</span>
						</li>
					</ul>
				</div>
				<div class="bg-primary/5 flex items-center justify-center p-8 lg:p-0">
					<!-- Illustration or Icon grid -->
					<div class="relative flex h-64 w-64 items-center justify-center object-cover">
						<div class="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl"></div>
						<div
							class="bg-primary text-primary-foreground relative flex h-32 w-32 items-center justify-center rounded-full shadow-2xl"
						>
							<Award size={64} />
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Call to Action -->
	<section class="text-center">
		<h2 class="mb-4 text-2xl font-bold sm:text-3xl">جاهز للبدء في المراجعة؟</h2>
		<p class="text-muted-foreground mx-auto mb-8 max-w-xl text-lg">
			اختر مستواك الدراسي وابدأ رحلة التفوق والنجاح مع مكتبتنا الشاملة.
		</p>
		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="/"
				class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold shadow-sm transition-colors"
			>
				تصفح المستويات
			</a>
		</div>
	</section>

	<!-- Footer note -->
	<section class="text-muted-foreground mt-20 border-t pt-8 text-center text-sm text-balance">
		<p class="flex items-center justify-center gap-2">
			صُنع بـ <Heart size={16} class="fill-current text-red-500" /> من أجل تلاميذ وأساتذة الجزائر
		</p>
	</section>
</div>
