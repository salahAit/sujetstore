// ============================================================
// Natural Sciences (SNV) — Precision Biochemical, Genetic &
// ONEC Pedagogical Helpers (Dual KaTeX + Typst)
// ============================================================

export interface DualBioFormula {
	katex: string;
	typst: string;
}

export interface AminoAcidInfo {
	code3: string;
	nameAr: string;
	chargeType: 'acidic' | 'basic' | 'neutral_polar' | 'neutral_nonpolar' | 'stop';
}

export const AMINO_ACID_INFO: Record<string, AminoAcidInfo> = {
	Met: { code3: 'Met', nameAr: 'ميثيونين', chargeType: 'neutral_nonpolar' },
	Phe: { code3: 'Phe', nameAr: 'فينيل ألانين', chargeType: 'neutral_nonpolar' },
	Leu: { code3: 'Leu', nameAr: 'لوسين', chargeType: 'neutral_nonpolar' },
	Ile: { code3: 'Ile', nameAr: 'إيزولوسين', chargeType: 'neutral_nonpolar' },
	Val: { code3: 'Val', nameAr: 'فالين', chargeType: 'neutral_nonpolar' },
	Ser: { code3: 'Ser', nameAr: 'سيرين', chargeType: 'neutral_polar' },
	Pro: { code3: 'Pro', nameAr: 'برولين', chargeType: 'neutral_nonpolar' },
	Thr: { code3: 'Thr', nameAr: 'ثريونين', chargeType: 'neutral_polar' },
	Ala: { code3: 'Ala', nameAr: 'ألانين', chargeType: 'neutral_nonpolar' },
	Tyr: { code3: 'Tyr', nameAr: 'تيروزين', chargeType: 'neutral_polar' },
	His: { code3: 'His', nameAr: 'هيستيدين', chargeType: 'basic' },
	Gln: { code3: 'Gln', nameAr: 'غلوتامين', chargeType: 'neutral_polar' },
	Asn: { code3: 'Asn', nameAr: 'أسباراجين', chargeType: 'neutral_polar' },
	Lys: { code3: 'Lys', nameAr: 'ليزين', chargeType: 'basic' },
	Asp: { code3: 'Asp', nameAr: 'حمض الأسبارتيك', chargeType: 'acidic' },
	Glu: { code3: 'Glu', nameAr: 'حمض الغلوتاميك', chargeType: 'acidic' },
	Cys: { code3: 'Cys', nameAr: 'سيستئين', chargeType: 'neutral_polar' },
	Trp: { code3: 'Trp', nameAr: 'تريبتوفان', chargeType: 'neutral_nonpolar' },
	Arg: { code3: 'Arg', nameAr: 'أرجينين', chargeType: 'basic' },
	Gly: { code3: 'Gly', nameAr: 'غليسين', chargeType: 'neutral_nonpolar' },
	STOP: { code3: 'STOP', nameAr: 'رامزة توقف', chargeType: 'stop' }
};

/** Complete Standard RNA Genetic Code Table (64 codons) */
export const RNA_CODON_TABLE: Record<string, string> = {
	UUU: 'Phe', UUC: 'Phe', UUA: 'Leu', UUG: 'Leu',
	UCU: 'Ser', UCC: 'Ser', UCA: 'Ser', UCG: 'Ser',
	UAU: 'Tyr', UAC: 'Tyr', UAA: 'STOP', UAG: 'STOP',
	UGU: 'Cys', UGC: 'Cys', UGA: 'STOP', UGG: 'Trp',

	CUU: 'Leu', CUC: 'Leu', CUA: 'Leu', CUG: 'Leu',
	CCU: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
	CAU: 'His', CAC: 'His', CAA: 'Gln', CAG: 'Gln',
	CGU: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',

	AUU: 'Ile', AUC: 'Ile', AUA: 'Ile', AUG: 'Met',
	ACU: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
	AAU: 'Asn', AAC: 'Asn', AAA: 'Lys', AAG: 'Lys',
	AGU: 'Ser', AGC: 'Ser', AGA: 'Arg', AGG: 'Arg',

	GUU: 'Val', GUC: 'Val', GUA: 'Val', GUG: 'Val',
	GCU: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
	GAU: 'Asp', GAC: 'Asp', GAA: 'Glu', GAG: 'Glu',
	GGU: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly'
};

const DNA_TO_MRNA: Record<string, string> = { A: 'U', T: 'A', C: 'G', G: 'C' };
const DNA_COMPLEMENT: Record<string, string> = { A: 'T', T: 'A', C: 'G', G: 'C' };

export interface TranslatedGeneSequence {
	/** DNA template (transcribed / مستنسخة) strand 3' -> 5' */
	template3to5: string;
	/** DNA coding (non-transcribed / غير مستنسخة) strand 5' -> 3' */
	coding5to3: string;
	/** mRNA strand 5' -> 3' */
	mrna5to3: string;
	/** Triplets of template DNA */
	dnaTriplets: string[];
	/** mRNA codons */
	codons: string[];
	/** Translated amino acids up to STOP (excluding STOP) */
	peptide: string[];
	/** All translated labels including STOP if reached */
	allCodonProducts: string[];
	/** Formatted peptide string e.g. Met - Ala - Val - Glu */
	peptideStr: string;
}

/**
 * Guaranteed exact transcription (ADN 3'->5' => ARNm 5'->3') and translation.
 * Eliminates any human typo in genetic code exercises.
 */
export function transcribeAndTranslate(templateStrand3to5: string): TranslatedGeneSequence {
	const clean = templateStrand3to5.toUpperCase().replace(/[^ATCG]/g, '');
	const coding5to3 = clean
		.split('')
		.map((b) => DNA_COMPLEMENT[b] ?? b)
		.join('');
	const mrna5to3 = clean
		.split('')
		.map((b) => DNA_TO_MRNA[b] ?? b)
		.join('');

	const dnaTriplets: string[] = [];
	const codons: string[] = [];
	const allCodonProducts: string[] = [];
	const peptide: string[] = [];
	let stopped = false;

	for (let i = 0; i + 2 < clean.length; i += 3) {
		const dt = clean.slice(i, i + 3);
		const cd = mrna5to3.slice(i, i + 3);
		const aa = RNA_CODON_TABLE[cd] ?? '???';
		dnaTriplets.push(dt);
		codons.push(cd);
		allCodonProducts.push(aa);
		if (!stopped) {
			if (aa === 'STOP') {
				stopped = true;
			} else {
				peptide.push(aa);
			}
		}
	}

	return {
		template3to5: clean,
		coding5to3,
		mrna5to3,
		dnaTriplets,
		codons,
		peptide,
		allCodonProducts,
		peptideStr: peptide.join(' - ')
	};
}

/** Formats a codon subset reference string for exam sheets (السند: جدول الشفرة الوراثية المصغر) */
export function buildMiniCodonTableRows(codons: string[]): { headers: string[]; rows: string[][] } {
	const unique = Array.from(new Set(codons));
	return {
		headers: ['الرامزة (ARNm)', ...unique],
		rows: [['الحمض الأميني', ...unique.map((c) => RNA_CODON_TABLE[c] ?? '—')]]
	};
}

/** Standard Dual (KaTeX + Typst) Biochemical & Metabolic Equations */
export const BIO_EQUATIONS = {
	photosynthesis: {
		katex: '$6\\text{CO}_2 + 12\\text{H}_2\\text{O} \\xrightarrow{\\text{ضوء + يخضور}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 + 6\\text{H}_2\\text{O}$',
		typst: '$6 upright("CO")_2 + 12 upright("H")_2 upright("O") arrow.r^(upright("ضوء + يخضور")) upright("C")_6 upright("H")_12 upright("O")_6 + 6 upright("O")_2 + 6 upright("H")_2 upright("O")$'
	},
	photosynthesisSimple: {
		katex: '$6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{ضوء + يخضور}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$',
		typst: '$6 upright("CO")_2 + 6 upright("H")_2 upright("O") arrow.r^(upright("ضوء + يخضور")) upright("C")_6 upright("H")_12 upright("O")_6 + 6 upright("O")_2$'
	},
	waterPhotolysis: {
		katex: '$2\\text{H}_2\\text{O} \\xrightarrow{\\text{ضوء + PSII}} \\text{O}_2 + 4\\text{H}^+ + 4\\text{e}^-$',
		typst: '$2 upright("H")_2 upright("O") arrow.r^(upright("ضوء")) upright("O")_2 + 4 upright("H")^+ + 4 upright("e")^-$'
	},
	cellularRespiration: {
		katex: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 + 6\\text{H}_2\\text{O} \\longrightarrow 6\\text{CO}_2 + 12\\text{H}_2\\text{O} + \\text{E} \\ (38\\text{ ATP})$',
		typst: '$upright("C")_6 upright("H")_12 upright("O")_6 + 6 upright("O")_2 + 6 upright("H")_2 upright("O") arrow.r 6 upright("CO")_2 + 12 upright("H")_2 upright("O") + upright("E (38 ATP)")$'
	},
	alcoholicFermentation: {
		katex: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 \\longrightarrow 2\\text{C}_2\\text{H}_5\\text{OH} + 2\\text{CO}_2 + \\text{E} \\ (2\\text{ ATP})$',
		typst: '$upright("C")_6 upright("H")_12 upright("O")_6 arrow.r 2 upright("C")_2 upright("H")_5 upright("OH") + 2 upright("CO")_2 + upright("E (2 ATP)")$'
	},
	glycolysis: {
		katex: '$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 2\\text{NAD}^+ + 2\\text{ADP} + 2\\text{P}_i \\longrightarrow 2\\text{CH}_3\\text{COCOOH} + 2\\text{NADH,H}^+ + 2\\text{ATP}$',
		typst: '$upright("C")_6 upright("H")_12 upright("O")_6 + 2 upright("NAD")^+ + 2 upright("ADP") + 2 upright("P")_i arrow.r 2 upright("CH")_3 upright("COCOOH") + 2 upright("NADH,H")^+ + 2 upright("ATP")$'
	},
	enzymeMechanism: {
		katex: '$\\text{E} + \\text{S} \\rightleftharpoons \\text{ES} \\longrightarrow \\text{E} + \\text{P}$',
		typst: '$upright("E") + upright("S") harpoons.rtlb upright("ES") arrow.r upright("E") + upright("P")$'
	},
	atpHydrolysis: {
		katex: '$\\text{ATP} + \\text{H}_2\\text{O} \\longrightarrow \\text{ADP} + \\text{P}_i + 30.5\\text{ kJ}$',
		typst: '$upright("ATP") + upright("H")_2 upright("O") arrow.r upright("ADP") + upright("P")_i + 30.5 upright(" kJ")$'
	},
	zwitterion: {
		katex: '$\\text{H}_3\\text{N}^+\\text{–CH(R)–COOH} \\xrightleftharpoons{\\text{pH} = \\text{pH}_i} \\text{H}_3\\text{N}^+\\text{–CH(R)–COO}^- \\xrightleftharpoons{\\text{pH} > \\text{pH}_i} \\text{H}_2\\text{N–CH(R)–COO}^-$',
		typst: '$upright("H")_3 upright("N")^+ - upright("CH(R)") - upright("COOH") harpoons.rtlb upright("H")_3 upright("N")^+ - upright("CH(R)") - upright("COO")^- harpoons.rtlb upright("H")_2 upright("N") - upright("CH(R)") - upright("COO")^-$'
	},
	starchDigestion: {
		katex: '$\\text{النشاء} \\xrightarrow{\\text{أميلاز لعابي } (37^\\circ\\text{C})} \\text{مالتوز (سكر شعير)} \\xrightarrow{\\text{مالتاز}} \\text{غلوكوز}$',
		typst: '$upright("النشاء") arrow.r^(upright("أميلاز لعابي 37°C")) upright("مالتوز") arrow.r^(upright("مالتاز")) upright("غلوكوز")$'
	}
} as const satisfies Record<string, DualBioFormula>;

/** Formats an amino-acid net charge at a given pH using pHi (for electrophoresis exercises) */
export function aminoAcidChargeAtPh(pH: number, pHi: number): {
	sign: '+' | '0' | '-';
	directionAr: string;
	poleAr: string;
} {
	if (Math.abs(pH - pHi) < 0.25) {
		return {
			sign: '0',
			directionAr: 'يبقى في المنتصف (لا يهاجر)',
			poleAr: 'المنتصف (متعادل كهربائياً — أيون ثنائي القطب)'
		};
	}
	if (pH < pHi) {
		return {
			sign: '+',
			directionAr: 'يهاجر نحو القطب السالب (الكاثود)',
			poleAr: 'القطب السالب (−) لأن الوسط حامضي بالنسبة له فيسلك سلوك قاعدة (شحنته موجبة)'
		};
	}
	return {
		sign: '-',
		directionAr: 'يهاجر نحو القطب الموجب (الأنود)',
		poleAr: 'القطب الموجب (+) لأن الوسط قاعدي بالنسبة له فيسلك سلوك حمض (شحنته سالبة)'
	};
}
