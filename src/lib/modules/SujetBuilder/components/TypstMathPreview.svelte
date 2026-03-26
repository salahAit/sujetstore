<script lang="ts">
	import katex from 'katex';
	import 'katex/dist/katex.min.css';

	let {
		content = '',
		isTextMode = false
	}: {
		content: string;
		isTextMode?: boolean;
	} = $props();

	// Convert common Typst math to KaTeX
	function typstToKatex(input: string): string {
		if (!input.trim()) return '';
		let s = input;

		// Fractions: frac(a, b) → \frac{a}{b}
		s = s.replace(/frac\(([^,]+),\s*([^)]+)\)/g, '\\frac{$1}{$2}');
		// Square root: sqrt(x) → \sqrt{x}
		s = s.replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}');
		// Absolute value: abs(x) → |x|
		s = s.replace(/abs\(([^)]+)\)/g, '\\left|$1\\right|');
		// Vector: vec(x) → \vec{x}
		s = s.replace(/vec\(([^)]+)\)/g, '\\vec{$1}');
		// Overline: overline(x) → \overline{x}
		s = s.replace(/overline\(([^)]+)\)/g, '\\overline{$1}');
		// Hat: hat(x) → \hat{x}
		s = s.replace(/hat\(([^)]+)\)/g, '\\hat{$1}');
		// Matrix: mat(a, b; c, d) → \begin{pmatrix} a & b \\ c & d \end{pmatrix}
		s = s.replace(/mat\(([^)]+)\)/g, (_m, inner) => {
			const rows = inner.split(';').map((r: string) => r.trim().split(',').map((c: string) => c.trim()).join(' & ')).join(' \\\\ ');
			return `\\begin{pmatrix} ${rows} \\end{pmatrix}`;
		});
		// Cases: cases(a => b, c => d) → \begin{cases} b & a \\ d & c \end{cases}
		s = s.replace(/cases\(([^)]+)\)/g, (_m, inner) => {
			const items = inner.split(',').map((item: string) => item.trim()).join(' \\\\ ');
			return `\\begin{cases} ${items} \\end{cases}`;
		});

		// Powers: x^y (already LaTeX-compatible for simple cases)
		// Subscripts: x_y → x_{y}
		s = s.replace(/([a-zA-Z0-9])_([a-zA-Z0-9]+)/g, '$1_{$2}');
		s = s.replace(/([a-zA-Z0-9])\^([a-zA-Z0-9]+)/g, '$1^{$2}');

		// Greek letters
		const greeks: Record<string, string> = {
			'alpha': '\\alpha', 'beta': '\\beta', 'gamma': '\\gamma', 'delta': '\\delta',
			'epsilon': '\\epsilon', 'zeta': '\\zeta', 'eta': '\\eta', 'theta': '\\theta',
			'iota': '\\iota', 'kappa': '\\kappa', 'lambda': '\\lambda', 'mu': '\\mu',
			'nu': '\\nu', 'xi': '\\xi', 'pi': '\\pi', 'rho': '\\rho',
			'sigma': '\\sigma', 'tau': '\\tau', 'upsilon': '\\upsilon', 'phi': '\\phi',
			'chi': '\\chi', 'psi': '\\psi', 'omega': '\\omega',
			'Alpha': '\\Alpha', 'Beta': '\\Beta', 'Gamma': '\\Gamma', 'Delta': '\\Delta',
			'Theta': '\\Theta', 'Lambda': '\\Lambda', 'Pi': '\\Pi', 'Sigma': '\\Sigma',
			'Phi': '\\Phi', 'Psi': '\\Psi', 'Omega': '\\Omega'
		};
		for (const [t, k] of Object.entries(greeks)) {
			s = s.replace(new RegExp(`\\b${t}\\b`, 'g'), k);
		}

		// Operators & symbols
		const symbols: Record<string, string> = {
			'times': '\\times', 'div': '\\div', 'plus.minus': '\\pm',
			'minus.plus': '\\mp', 'dot': '\\cdot', 'star': '\\star',
			'infinity': '\\infty', 'deg': '^{\\circ}',
			'angle': '\\angle', 'parallel': '\\parallel', 'perp': '\\perp',
			'approx': '\\approx', 'equiv': '\\equiv', 'prop': '\\propto',
			'subset': '\\subset', 'supset': '\\supset', 'in': '\\in',
			'not': '\\not', 'forall': '\\forall', 'exists': '\\exists',
			'emptyset': '\\emptyset', 'union': '\\cup', 'inter': '\\cap',
			'arrow.r': '\\rightarrow', 'arrow.l': '\\leftarrow',
			'arrow.r.double': '\\Rightarrow', 'arrow.l.double': '\\Leftarrow',
			'arrow.l.r.double': '\\Leftrightarrow',
			'dots': '\\ldots', 'dots.c': '\\cdots',
			'<=': '\\leq', '>=': '\\geq', '!=': '\\neq',
			'sum': '\\sum', 'product': '\\prod', 'integral': '\\int',
		};
		for (const [t, k] of Object.entries(symbols)) {
			s = s.replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), k);
		}

		return s;
	}

	// Extract math segments from text mode content ($...$)
	function renderPreview(text: string): string {
		if (!text.trim()) return '';
		
		if (isTextMode) {
			// Replace $...$ with rendered KaTeX
			return text.replace(/\$([^$]+)\$/g, (_match, math) => {
				try {
					const katexStr = typstToKatex(math);
					return katex.renderToString(katexStr, { throwOnError: false, displayMode: false });
				} catch {
					return `<span class="text-red-500">${math}</span>`;
				}
			});
		} else {
			try {
				const katexStr = typstToKatex(text);
				return katex.renderToString(katexStr, { throwOnError: false, displayMode: true });
			} catch {
				return `<span class="text-red-500">${text}</span>`;
			}
		}
	}

	let previewHtml = $derived(renderPreview(content));
	let hasContent = $derived(
		isTextMode ? /\$[^$]+\$/.test(content) : content.trim().length > 0
	);
</script>

{#if hasContent}
	<div class="typst-preview mt-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 transition-all">
		<div class="mb-1 flex items-center gap-1.5">
			<span class="text-[9px] font-bold uppercase tracking-wider text-primary/60">معاينة فورية</span>
		</div>
		<div class="preview-content text-sm leading-relaxed text-foreground" dir="ltr">
			{@html previewHtml}
		</div>
	</div>
{/if}

<style>
	.preview-content :global(.katex) {
		font-size: 1.15em;
	}
	.preview-content :global(.katex-display) {
		margin: 0.5em 0;
		overflow-x: auto;
	}
</style>
