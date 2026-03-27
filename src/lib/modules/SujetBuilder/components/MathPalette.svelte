<script lang="ts">
	let {
		value = $bindable(),
		inputRef,
		onchange,
		isTextMode = false
	}: {
		value: string;
		inputRef?: HTMLInputElement | HTMLTextAreaElement | null;
		onchange?: () => void;
		isTextMode?: boolean;
	} = $props();

	let activeCategory = $state('basic');

	type SymbolEntry = { label: string; template: string; tooltip?: string };

	const categories: { id: string; name: string; symbols: SymbolEntry[] }[] = [
		{
			id: 'basic',
			name: 'عمليات',
			symbols: [
				{ label: '+', template: '+' },
				{ label: '−', template: '-' },
				{ label: '×', template: 'times', tooltip: 'ضرب' },
				{ label: '÷', template: 'div', tooltip: 'قسمة' },
				{ label: '±', template: 'plus.minus' },
				{ label: '=', template: '=' },
				{ label: '≠', template: '!=' },
				{ label: '<', template: '<' },
				{ label: '>', template: '>' },
				{ label: '≤', template: '<=' },
				{ label: '≥', template: '>=' },
				{ label: '≈', template: 'approx' },
				{ label: '∞', template: 'infinity' },
				{ label: '…', template: 'dots' },
				{ label: '·', template: 'dot' }
			]
		},
		{
			id: 'fractions',
			name: 'كسور وجذور',
			symbols: [
				{ label: 'a/b', template: 'frac(a, b)', tooltip: 'كسر' },
				{ label: '√', template: 'sqrt(x)', tooltip: 'جذر تربيعي' },
				{ label: '∛', template: 'root(3, x)', tooltip: 'جذر تكعيبي' },
				{ label: 'xⁿ', template: 'x^n', tooltip: 'قوة' },
				{ label: 'xₙ', template: 'x_n', tooltip: 'مؤشر سفلي' },
				{ label: '|x|', template: 'abs(x)', tooltip: 'قيمة مطلقة' },
				{ label: 'x̄', template: 'overline(x)', tooltip: 'خط علوي' },
				{ label: 'x⃗', template: 'vec(x)', tooltip: 'متجه' },
				{ label: 'x̂', template: 'hat(x)', tooltip: 'قبعة' }
			]
		},
		{
			id: 'geometry',
			name: 'هندسة',
			symbols: [
				{ label: '∠', template: 'angle', tooltip: 'زاوية' },
				{ label: '∥', template: 'parallel', tooltip: 'توازي' },
				{ label: '⊥', template: 'perp', tooltip: 'تعامد' },
				{ label: '△', template: 'triangle.t', tooltip: 'مثلث' },
				{ label: '°', template: 'degree', tooltip: 'درجة' },
				{ label: '○', template: 'circle.stroked.small', tooltip: 'دائرة' },
				{ label: '□', template: 'square.stroked', tooltip: 'مربع' },
				{ label: '≅', template: 'tilde.equiv', tooltip: 'تطابق' },
				{ label: '∼', template: 'tilde', tooltip: 'تشابه' },
				{ label: '[AB]', template: '[A B]', tooltip: 'قطعة مستقيمة' },
				{ label: '(AB)', template: '(A B)', tooltip: 'مستقيم' },
				{ label: 'AB̂', template: 'hat(A B)', tooltip: 'قوس' }
			]
		},
		{
			id: 'algebra',
			name: 'جبر وتحليل',
			symbols: [
				{ label: '∑', template: 'sum_(i=1)^(n)', tooltip: 'مجموع' },
				{ label: '∏', template: 'product_(i=1)^(n)', tooltip: 'جداء' },
				{ label: '∫', template: 'integral_(a)^(b)', tooltip: 'تكامل' },
				{ label: 'lim', template: 'lim_(x arrow 0)', tooltip: 'نهاية' },
				{ label: '→', template: 'arrow.r', tooltip: 'سهم يمين' },
				{ label: '←', template: 'arrow.l', tooltip: 'سهم يسار' },
				{ label: '⇒', template: 'arrow.r.double', tooltip: 'يستلزم' },
				{ label: '⇔', template: 'arrow.l.r.double', tooltip: 'تكافؤ' },
				{ label: '∈', template: 'in', tooltip: 'ينتمي' },
				{ label: '∉', template: 'in.not', tooltip: 'لا ينتمي' },
				{ label: '⊂', template: 'subset', tooltip: 'مجموعة جزئية' },
				{ label: '∪', template: 'union', tooltip: 'اتحاد' },
				{ label: '∩', template: 'inter', tooltip: 'تقاطع' },
				{ label: '∅', template: 'emptyset', tooltip: 'مجموعة خالية' },
				{ label: 'ℕ', template: 'NN', tooltip: 'أعداد طبيعية' },
				{ label: 'ℤ', template: 'ZZ', tooltip: 'أعداد صحيحة' },
				{ label: 'ℝ', template: 'RR', tooltip: 'أعداد حقيقية' }
			]
		},
		{
			id: 'structures',
			name: 'بنى خاصة',
			symbols: [
				{ label: '(┤)', template: 'mat(a, b; c, d)', tooltip: 'مصفوفة 2×2' },
				{ label: '(┤)₃', template: 'mat(a, b, c; d, e, f; g, h, i)', tooltip: 'مصفوفة 3×3' },
				{ label: '{┤', template: 'cases(a &"إذا" b, c &"إذا" d)', tooltip: 'نظام حالات' },
				{ label: 'sys', template: 'cases(a = b, c = d)', tooltip: 'جملة معادلات' },
				{ label: '(a,b)', template: '(a, b)', tooltip: 'ثنائية مرتبة' },
				{ label: '[a;b]', template: '[a ; b]', tooltip: 'مجال' },
				{ label: 'binom', template: 'binom(n, k)', tooltip: 'تركيبة' },
				{ label: 'f(x)', template: 'f(x) =', tooltip: 'دالة' }
			]
		},
		{
			id: 'greek',
			name: 'يونانية',
			symbols: [
				{ label: 'α', template: 'alpha' },
				{ label: 'β', template: 'beta' },
				{ label: 'γ', template: 'gamma' },
				{ label: 'δ', template: 'delta' },
				{ label: 'ε', template: 'epsilon' },
				{ label: 'θ', template: 'theta' },
				{ label: 'λ', template: 'lambda' },
				{ label: 'μ', template: 'mu' },
				{ label: 'π', template: 'pi' },
				{ label: 'σ', template: 'sigma' },
				{ label: 'φ', template: 'phi' },
				{ label: 'ω', template: 'omega' },
				{ label: 'Δ', template: 'Delta' },
				{ label: 'Σ', template: 'Sigma' },
				{ label: 'Ω', template: 'Omega' },
				{ label: 'Π', template: 'Pi' }
			]
		}
	];

	function insertSymbol(template: string) {
		const finalText = isTextMode ? `$${template}$` : template;

		if (inputRef) {
			const start = inputRef.selectionStart || 0;
			const end = inputRef.selectionEnd || 0;
			value = value.substring(0, start) + finalText + value.substring(end);
			onchange?.();

			setTimeout(() => {
				inputRef?.focus();
				const newPos = start + finalText.length;
				inputRef?.setSelectionRange(newPos, newPos);
			}, 0);
		} else {
			value += finalText;
			onchange?.();
		}
	}
</script>

<div class="mt-2 rounded-lg border border-border/60 bg-muted/20 overflow-hidden">
	<div class="flex items-center gap-1 overflow-x-auto border-b border-border/40 bg-muted/30 px-2 py-1.5 hide-scrollbar">
		{#each categories as cat}
			<button
				type="button"
				class="whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-bold transition-all {activeCategory === cat.id
					? 'bg-background text-foreground shadow-sm'
					: 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}"
				onclick={() => (activeCategory = cat.id)}
			>
				{cat.name}
			</button>
		{/each}
	</div>

	<!-- Symbols Grid -->
	<div class="flex flex-wrap gap-1.5 p-3">
		{#each categories.find((c) => c.id === activeCategory)?.symbols ?? [] as sym}
			<button
				type="button"
				class="group relative flex min-w-[44px] items-center justify-center rounded-md border border-border/50 bg-background px-3 py-2 text-base font-semibold text-foreground shadow-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary hover:shadow-md active:scale-95"
				onclick={() => insertSymbol(sym.template)}
				title={sym.tooltip ? `${sym.tooltip}\n${sym.template}` : sym.template}
			>
				{sym.label}
			</button>
		{/each}
	</div>
</div>
