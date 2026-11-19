import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 17 : difficulty === 'medium' ? 31 : 53;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 79 + salt) >>> 0) || 1);
}

const KIDS = ['أَمِينُ', 'سَارَةُ', 'آدَمُ', 'مَرْيَمُ', 'أَنَسُ', 'إِيمَانُ', 'وَسِيمُ', 'لِينَا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Breathing & Heartbeat
// ═══════════════════════════════════════════════════════════════════════════════
const breathingHeartTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t2_breathing_heart',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'human_body',
	titleAr: 'التَّنَفُّسُ وَدَقَّاتُ القَلْبِ',
	curriculumLessonId: 'sci_lesson_1ap_t2_breathing_heartbeat',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 201);
		const kid = rng.pick(KIDS);
		const modes = [
			{
				prompt: `عِنْدَمَا يَدْخُلُ الهَوَاءُ إِلى صَدْرِ ${kid} أَثْنَاءَ التَّنَفُّسِ، مَاذَا يَحْدُثُ لِصَدْرِهِ؟`,
				correct: 'يَرْتَفِعُ الصَّدْرُ وَيَمْتَلِئُ بِالهَوَاءِ',
				wrongs: [
					{ text: 'يَنْخَفِضُ الصَّدْرُ', diagnosticFeedback: 'يَنْخَفِضُ الصَّدْرُ عِنْدَ خُرُوجِ الهَوَاءِ وَلَيْسَ دُخُولِهِ.' },
					{ text: 'يَتَوَقَّفُ القَلْبُ عَنِ النَّبْضِ', diagnosticFeedback: 'القَلْبُ يَنْبُضُ بِاسْتِمْرَارٍ دُونَ تَوَقُّفٍ.' },
					{ text: 'لَا يَتَحَرَّكُ الصَّدْرُ أَبَدًا', diagnosticFeedback: 'الصَّدْرُ يَرْتَفِعُ وَيَنْخَفِضُ مَعَ كُلِّ نَفَسٍ.' }
				],
				badge: 'دُخُولُ الهَوَاءِ'
			},
			{
				prompt: `لَعِبَ ${kid} كُرَةَ القَدَمِ وَجَرَى كَثِيرًا، ثُمَّ وَضَعَ يَدَهُ عَلَى صَدْرِهِ مِنْ جِهَةِ اليَسَارِ. مَاذَا لَاحَظَ؟`,
				correct: 'دَقَّاتُ القَلْبِ وَالتَّنَفُّسُ أَصْبَحَا أَسْرَعَ',
				wrongs: [
					{ text: 'تَوَقَّفَتْ دَقَّاتُ القَلْبِ', diagnosticFeedback: 'القَلْبُ يَسْتَمِرُّ فِي النَّبْضِ وَتَزْدَادُ سُرْعَتُهُ بَعْدَ الجَرْيِ.' },
					{ text: 'أَصْبَحَتْ دَقَّاتُ القَلْبِ أَبْطَأَ مِنْ وَقْتِ النَّوْمِ', diagnosticFeedback: 'تَبْطُؤُ الدَّقَّاتُ عِنْدَ الرَّاحَةِ وَتَتَسَارَعُ عِنْدَ الجَرْيِ.' },
					{ text: 'تَوَقَّفَ التَّنَفُّسُ تَمَامًا', diagnosticFeedback: 'يَزْدَادُ التَّنَفُّسُ سُرْعَةً أَثْنَاءَ الجَرْيِ وَاللَّعِبِ.' }
				],
				badge: 'بَعْدَ الجَرْيِ'
			}
		] as const;

		const chosen = rng.pick(modes);
		const mcq = buildUniqueMcqOptions(chosen.correct, [...chosen.wrongs], rng);

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">التَّنَفُّسُ وَدَقَّاتُ القَلْبِ (${esc(chosen.badge)})</text>` +
				`<rect x="224" y="46" width="174" height="126" rx="10" fill="#f0f9ff" stroke="#0284c7" stroke-width="1.8"/>` +
				`<ellipse cx="294" cy="96" rx="16" ry="24" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>` +
				`<ellipse cx="328" cy="96" rx="16" ry="24" fill="#bae6fd" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="311" y="142" text-anchor="middle" font-size="11" font-weight="bold" fill="#0369a1">الرِّئَتَانِ وَالصَّدْرُ</text>` +
				`<text x="311" y="160" text-anchor="middle" font-size="9.8" fill="#334155">دُخُولٌ وَخُرُوجُ الهَوَاءِ</text>` +
				`<rect x="22" y="46" width="174" height="126" rx="10" fill="#fef2f2" stroke="#dc2626" stroke-width="1.8"/>` +
				`<path d="M 109 116 C 86 98, 84 78, 98 75 C 104 74, 108 80, 109 84 C 110 80, 114 74, 120 75 C 134 78, 132 98, 109 116 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1.8"/>` +
				`<text x="109" y="142" text-anchor="middle" font-size="11" font-weight="bold" fill="#991b1b">القَلْبُ (جِهَةُ اليَسَارِ)</text>` +
				`<text x="109" y="160" text-anchor="middle" font-size="9.8" fill="#334155">يَنْبُضُ بِاسْتِمْرَارٍ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t2_breathing_heart_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${chosen.prompt}\nالجَوَابُ: ........................................`,
						answer: chosen.correct,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'الرِّئَتَانِ وَالقَلْبُ فِي صَدْرِ الإِنْسَانِ'
					}
				]
			},
			{
				type: 'true_false',
				items: [
					{ q: 'يَنْبُضُ قَلْبِي فِي الجِهَةِ اليُسْرَى مِنْ صَدْرِي.', a: 'صَحِيحٌ', mark: '0.75' },
					{ q: 'الهَوَاءُ النَّقِيُّ فِي الحَدِيقَةِ مُفِيدٌ لِصِحَّةِ التَّنَفُّسِ.', a: 'صَحِيحٌ', mark: '0.75' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t2_breathing_heart',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'human_body',
			titleAr: 'التَّنَفُّسُ وَدَقَّاتُ القَلْبِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: chosen.prompt,
				questionTextAr: chosen.prompt,
				imageUrl,
				imageCaption: 'التَّنَفُّسُ وَدَقَّاتُ القَلْبِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `أَتَنَفَّسُ بِاسْتِمْرَارٍ فَيَرْتَفِعُ صَدْرِي عِنْدَ دُخُولِ الهَوَاءِ، وَتَزْدَادُ دَقَّاتُ قَلْبِي عِنْدَ الجَرْيِ.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظِ الرَّسْمَ ثُمَّ أَجِبْ:',
				content
			},
			hints: [
				'ضَعْ يَدَكَ عَلَى صَدْرِكَ وَخُذْ نَفَسًا عَمِيقًا لِتُلَاحِظَ حَرَكَةَ صَدْرِكَ.',
				'القَلْبُ يَقَعُ فِي الجِهَةِ اليُسْرَى مِنَ الصَّدْرِ وَيَنْبُضُ أَسْرَعَ عِنْدَ الجَرْيِ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${chosen.correct}.`
			],
			solutionStepsAr: [
				'نُحَدِّدُ الوَضْعِيَّةَ (دُخُولُ الهَوَاءِ أَوِ الجَرْيُ).',
				`النَّتِيجَةُ: ${chosen.correct}.`
			],
			finalAnswer: chosen.correct
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Domestic vs Wild Animals & Living Things
// ═══════════════════════════════════════════════════════════════════════════════
const livingDomesticWildTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t2_living_domestic_wild',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'الحَيَوَانَاتُ الأَلِيفَةُ وَالمُتَوَحِّشَةُ',
	curriculumLessonId: 'sci_lesson_1ap_t2_plants_animals_around',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 202);
		const domestic = ['البَقَرَةُ', 'الخَرُوفُ', 'الدَّجَاجَةُ', 'القِطُّ', 'الحِصَانُ', 'الأَرْنَبُ'];
		const wild = ['الأَسَدُ', 'الذِّئْبُ', 'النَّمِرُ', 'الثَّعْلَبُ', 'الدُّبُّ', 'الفِيلُ'];

		const askDomestic = seed % 2 === 0;
		const correctAnimal = askDomestic ? rng.pick(domestic) : rng.pick(wild);
		const wrongAnimals = askDomestic ? rng.pickDistinct(wild, 3) : rng.pickDistinct(domestic, 3);

		const mcq = buildUniqueMcqOptions(
			correctAnimal,
			wrongAnimals.map((w) => ({
				text: w,
				diagnosticFeedback: askDomestic
					? `${w} حَيَوَانٌ مُتَوَحِّشٌ يَعِيشُ فِي البَرِّيَّةِ وَلَيْسَ أَلِيفًا.`
					: `${w} حَيَوَانٌ أَلِيفٌ يَعِيشُ مَعَ الإِنْسَانِ وَلَيْسَ مُتَوَحِّشًا.`
			})),
			rng
		);

		const listForSvg = rng.shuffle([correctAnimal, ...wrongAnimals]);
		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">صَنِّفِ الحَيَوَانَاتِ: أَلِيفٌ أَمْ مُتَوَحِّشٌ؟</text>` +
				listForSvg
					.map((name, i) => {
						const x = 316 - i * 98;
						return (
							`<rect x="${x}" y="54" width="86" height="62" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="1.8"/>` +
							`<text x="${x + 43}" y="90" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">${esc(name)}</text>`
						);
					})
					.join('') +
				`<rect x="28" y="132" width="174" height="36" rx="8" fill="#fffbeb" stroke="#d97706" stroke-width="1.5"/>` +
				`<text x="115" y="155" text-anchor="middle" font-size="11" font-weight="bold" fill="#92400e">حَيَوَانٌ مُتَوَحِّشٌ (الغَابَةُ)</text>` +
				`<rect x="218" y="132" width="174" height="36" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5"/>` +
				`<text x="305" y="155" text-anchor="middle" font-size="11" font-weight="bold" fill="#166534">حَيَوَانٌ أَلِيفٌ (المَزْرَعَةُ)</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t2_living_domestic_wild_${difficulty}_s${seed}`, svg);

		const qText = askDomestic
			? 'أَيُّ حَيَوَانٍ مِنَ البِطَاقَاتِ التَّالِيَةِ هُوَ **حَيَوَانٌ أَلِيفٌ** يَعِيشُ مَعَ الإِنْسَانِ؟'
			: 'أَيُّ حَيَوَانٍ مِنَ البِطَاقَاتِ التَّالِيَةِ هُوَ **حَيَوَانٌ مُتَوَحِّشٌ** يَعِيشُ فِي الغَابَةِ أَوِ البَرِّيَّةِ؟';

		const tableRows = listForSvg.map((name) => [
			name,
			{
				content: '....................',
				answer: domestic.includes(name) ? 'حَيَوَانٌ أَلِيفٌ' : 'حَيَوَانٌ مُتَوَحِّشٌ',
				mark: '0.5'
			}
		]);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ....................`,
						answer: correctAnimal,
						mark: '0.5'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'بِطَاقَاتُ الحَيَوَانَاتِ'
					}
				]
			},
			{
				type: 'table',
				headers: ['اسْمُ الحَيَوَانِ', 'التَّصْنِيفُ (أَلِيفٌ / مُتَوَحِّشٌ)'],
				cells: [],
				rows: tableRows
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t2_living_domestic_wild',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'الحَيَوَانَاتُ الأَلِيفَةُ وَالمُتَوَحِّشَةُ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'تَصْنِيفُ الحَيَوَانَاتِ الأَلِيفَةِ وَالمُتَوَحِّشَةِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `${correctAnimal} هُوَ حَيَوَانٌ ${askDomestic ? 'أَلِيفٌ يَعِيشُ مَعَ الإِنْسَانِ' : 'مُتَوَحِّشٌ يَعِيشُ فِي البَرِّيَّةِ'}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَجِبْ عَنِ السُّؤَالِ ثُمَّ صَنِّفِ الحَيَوَانَاتِ فِي الجَدْوَلِ:',
				content
			},
			hints: [
				'الحَيَوَانُ الأَلِيفُ يَعِيشُ فِي المَزْرَعَةِ أَوِ البَيْتِ مَعَ الإِنْسَانِ.',
				'الحَيَوَانُ المُتَوَحِّشُ يَعِيشُ حُرًّا فِي الغَابَةِ أَوِ الصَّحْرَاءِ.',
				`الإِجَابَةُ هِيَ: ${correctAnimal}.`
			],
			solutionStepsAr: [
				`نَتَعَرَّفُ مَكَانَ عَيْشِ كُلِّ حَيَوَانٍ.`,
				`${correctAnimal} حَيَوَانٌ ${askDomestic ? 'أَلِيفٌ' : 'مُتَوَحِّشٌ'}.`
			],
			finalAnswer: correctAnimal
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Herbivore vs Carnivore
// ═══════════════════════════════════════════════════════════════════════════════
const herbivoreCarnivoreTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t2_herbivore_carnivore',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'ecology_environment',
	titleAr: 'تَغْذِيَةُ الحَيَوَانَاتِ: عَاشِبٌ أَمْ لَاحِمٌ؟',
	curriculumLessonId: 'sci_lesson_1ap_t2_animal_diets',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 203);
		const herbivores = [
			{ name: 'الأَرْنَبُ', food: 'الجَزَرُ وَالعُشْبُ' },
			{ name: 'البَقَرَةُ', food: 'العُشْبُ وَالتِّبْنُ' },
			{ name: 'الخَرُوفُ', food: 'الحَشَائِشُ الخَضْرَاءُ' },
			{ name: 'الغَزَالُ', food: 'أَوْرَاقُ النَّبَاتِ وَالعُشْبُ' },
			{ name: 'الزَّرَافَةُ', food: 'أَوْرَاقُ الأَشْجَارِ' }
		] as const;
		const carnivores = [
			{ name: 'الأَسَدُ', food: 'اللَّحْمُ' },
			{ name: 'النَّمِرُ', food: 'لُحُومُ الفَرَائِسِ' },
			{ name: 'الذِّئْبُ', food: 'اللَّحْمُ' },
			{ name: 'النَّسْرُ', food: 'اللَّحْمُ' }
		] as const;

		const isHerb = seed % 2 === 0;
		const animal = isHerb ? rng.pick(herbivores) : rng.pick(carnivores);
		const otherGroup = isHerb ? rng.pickDistinct(carnivores, 2) : rng.pickDistinct(herbivores, 2);

		const svg = wrapSciencesSvg(
			420,
			190,
			`<rect x="6" y="6" width="408" height="178" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">مَا نِظَامُ تَغْذِيَةِ هَذَا الحَيَوَانِ؟</text>` +
				`<rect x="234" y="54" width="160" height="92" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>` +
				`<text x="314" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">${esc(animal.name)}</text>` +
				`<text x="314" y="118" text-anchor="middle" font-size="11" fill="#334155">يَأْكُلُ: ${esc(animal.food)}</text>` +
				`<text x="210" y="106" text-anchor="middle" font-size="18" font-weight="bold" fill="#475569">←</text>` +
				`<rect x="26" y="54" width="160" height="40" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="106" y="79" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">حَيَوَانٌ عَاشِبٌ</text>` +
				`<rect x="26" y="106" width="160" height="40" rx="8" fill="#fef2f2" stroke="#dc2626" stroke-width="1.6"/>` +
				`<text x="106" y="131" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">حَيَوَانٌ لَاحِمٌ</text>` +
				haloText(`x="210" y="172" text-anchor="middle" font-size="10.5" font-weight="bold"`, '#475569', 'العَاشِبُ يَأْكُلُ النَّبَاتَ — اللَّاحِمُ يَأْكُلُ اللَّحْمَ')
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t2_herbivore_carnivore_${difficulty}_s${seed}`, svg);

		const correctType = isHerb ? 'حَيَوَانٌ عَاشِبٌ' : 'حَيَوَانٌ لَاحِمٌ';
		const mcq = buildUniqueMcqOptions(
			correctType,
			[
				{
					text: isHerb ? 'حَيَوَانٌ لَاحِمٌ' : 'حَيَوَانٌ عَاشِبٌ',
					diagnosticFeedback: isHerb
						? `${animal.name} يَأْكُلُ ${animal.food} (نَبَاتٌ)، لِذَا هُوَ عَاشِبٌ وَلَيْسَ لَاحِمًا.`
						: `${animal.name} يَأْكُلُ ${animal.food}، لِذَا هُوَ لَاحِمٌ وَلَيْسَ عَاشِبًا.`
				},
				{ text: 'نَبَاتٌ أَخْضَرُ', diagnosticFeedback: `${animal.name} حَيَوَانٌ وَلَيْسَ نَبَاتًا.` },
				{ text: 'شَيْءٌ غَيْرُ حَيٍّ', diagnosticFeedback: `${animal.name} كَائِنٌ حَيٌّ يَتَغَذَّى وَيَتَنَفَّسُ.` }
			],
			rng
		);

		const qText = `يَتَغَذَّى **${animal.name}** عَلَى **${animal.food}**. كَيْفَ نُصَنِّفُ هَذَا الحَيَوَانَ؟`;

		const tableRows = rng
			.shuffle([
				{ name: animal.name, food: animal.food, type: correctType },
				{ name: otherGroup[0].name, food: otherGroup[0].food, type: isHerb ? 'حَيَوَانٌ لَاحِمٌ' : 'حَيَوَانٌ عَاشِبٌ' },
				{ name: otherGroup[1].name, food: otherGroup[1].food, type: isHerb ? 'حَيَوَانٌ لَاحِمٌ' : 'حَيَوَانٌ عَاشِبٌ' }
			])
			.map((r) => [
				r.name,
				r.food,
				{ content: '....................', answer: r.type, mark: '0.5' }
			]);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ....................`,
						answer: correctType,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'تَغْذِيَةُ الحَيَوَانَاتِ'
					}
				]
			},
			{
				type: 'table',
				headers: ['الحَيَوَانُ', 'غِذَاؤُهُ', 'نَوْعُهُ (عَاشِبٌ / لَاحِمٌ)'],
				cells: [],
				rows: tableRows
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t2_herbivore_carnivore',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'ecology_environment',
			titleAr: 'تَغْذِيَةُ الحَيَوَانَاتِ: عَاشِبٌ أَمْ لَاحِمٌ؟',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `نِظَامُ تَغْذِيَةِ ${animal.name}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `بِمَا أَنَّ ${animal.name} يَأْكُلُ ${animal.food}، فَهُوَ ${correctType}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَجِبْ عَنِ السُّؤَالِ ثُمَّ أَكْمِلْ تَصْنِيفَ الحَيَوَانَاتِ فِي الجَدْوَلِ:',
				content
			},
			hints: [
				'العَاشِبُ يَتَغَذَّى عَلَى النَّبَاتَاتِ وَالأَعْشَابِ.',
				'اللَّاحِمُ يَتَغَذَّى عَلَى اللُّحُومِ.',
				`${animal.name} هُوَ ${correctType}.`
			],
			solutionStepsAr: [
				`غِذَاءُ ${animal.name} هُوَ: ${animal.food}.`,
				`إِذَنْ هُوَ: ${correctType}.`
			],
			finalAnswer: correctType
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Plant Watering Experiment
// ═══════════════════════════════════════════════════════════════════════════════
const plantWateringTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t2_plant_watering',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'plant_biology',
	titleAr: 'حَاجَةُ النَّبَاتِ الأَخْضَرِ لِلْمَاءِ',
	curriculumLessonId: 'sci_lesson_1ap_t2_plant_water_needs',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 204);
		const kid = rng.pick(KIDS);
		const askOrgan = difficulty === 'hard';

		const svg = svgPlantAndPrimaryDiagram('plant_anatomy', {
			title: 'أَجْزَاءُ النَّبَاتِ الأَخْضَرِ وَامْتِصَاصُ المَاءِ'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t2_plant_watering_${difficulty}_s${seed}`, svg);

		const correctText = askOrgan
			? 'الجُذُورُ المَوْجُودَةُ فِي التُّرْبَةِ'
			: 'يَذْبُلُ وَيَصْفَرُّ ثُمَّ يَمُوتُ';

		const distractors = askOrgan
			? [
					{ text: 'الزَّهْرَةُ فِي الأَعْلَى', diagnosticFeedback: 'الزَّهْرَةُ لَا تُلَامِسُ التُّرْبَةَ؛ الجُذُورُ هِيَ الَّتِي تَمْتَصُّ المَاءَ.' },
					{ text: 'الأَصِيصُ الخَارِجِيُّ', diagnosticFeedback: 'الأَصِيصُ إِنَاءٌ وَلَيْسَ جُزْءًا مِنَ النَّبَاتِ.' },
					{ text: 'الثَّمَرَةُ', diagnosticFeedback: 'الثَّمَرَةُ تَحْمِلُ البُذُورَ وَلَا تَمْتَصُّ المَاءَ مِنَ التُّرْبَةِ.' }
				]
			: [
					{ text: 'يَنْمُو بِسُرْعَةٍ أَكْبَرَ وَيُزْهِرُ', diagnosticFeedback: 'النَّبَاتُ لَا يَنْمُو دُونَ مَاءٍ.' },
					{ text: 'يَبْقَى أَخْضَرَ دَائِمًا دُونَ تَغَيُّرٍ', diagnosticFeedback: 'بِغِيَابِ المَاءِ يَجِفُّ النَّبَاتُ وَيَصْفَرُّ.' },
					{ text: 'يَتَحَرَّكُ لِيَبْحَثَ عَنِ المَاءِ', diagnosticFeedback: 'النَّبَاتُ ثَابِتٌ فِي التُّرْبَةِ بِجُذُورِهِ وَلَا يَمْشِي.' }
				];

		const mcq = buildUniqueMcqOptions(correctText, distractors, rng);
		const qText = askOrgan
			? `سَقَى ${kid} نَبْتَةً خَضْرَاءَ فِي أَصِيصٍ. بِأَيِّ جُزْءٍ تَمْتَصُّ النَّبْتَةُ المَاءَ مِنَ التُّرْبَةِ؟`
			: `نَسِيَ ${kid} سَقْيَ نَبْتَتِهِ الخَضْرَاءِ لِمُدَّةٍ طَوِيلَةٍ. مَاذَا يَحْدُثُ لِلنَّبْتَةِ؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ........................................`,
						answer: correctText,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'أَجْزَاءُ النَّبَاتِ الأَخْضَرِ'
					}
				]
			},
			{
				type: 'true_false',
				items: [
					{ q: 'النَّبَاتُ الأَخْضَرُ كَائِنٌ حَيٌّ يَحْتَاجُ إِلى المَاءِ لِيَعِيشَ وَيَنْمُوَ.', a: 'صَحِيحٌ', mark: '0.75' },
					{ q: 'يَمْتَصُّ النَّبَاتُ المَاءَ مِنَ التُّرْبَةِ بِوَاسِطَةِ جُذُورِهِ.', a: 'صَحِيحٌ', mark: '0.75' }
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t2_plant_watering',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'plant_biology',
			titleAr: 'حَاجَةُ النَّبَاتِ الأَخْضَرِ لِلْمَاءِ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'أَجْزَاءُ النَّبَاتِ الأَخْضَرِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'النَّبَاتُ الأَخْضَرُ يَحْتَاجُ لِلْمَاءِ، يَمْتَصُّهُ بِالجُذُورِ مِنَ التُّرْبَةِ، وَإِذَا لَمْ يُسْقَ يَذْبُلُ وَيَمُوتُ.'
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'تَأَمَّلِ الرَّسْمَ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ:',
				content
			},
			hints: [
				'النَّبَاتُ كَائِنٌ حَيٌّ يَشْرَبُ المَاءَ كَالإِنْسَانِ وَالحَيَوَانِ.',
				'الجُذُورُ تَحْتَ التُّرْبَةِ تَمْتَصُّ المَاءَ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${correctText}.`
			],
			solutionStepsAr: [
				'النَّبَاتُ الأَخْضَرُ يَحْتَاجُ إِلى المَاءِ لِيَنْمُوَ.',
				`الجَوَابُ المَطْلُوبُ: ${correctText}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: Visit to the Farm & Garden
// ═══════════════════════════════════════════════════════════════════════════════
const integrationGardenVisitTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t2_integration_garden_visit',
	grade: '1ap',
	trimesterId: 't2',
	domain: 'integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: نُزْهَةٌ فِي المَزْرَعَةِ وَالحَدِيقَةِ',
	curriculumLessonId: 'sci_lesson_1ap_t2_plant_water_needs',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 205);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">نُزْهَةُ ${esc(kid)} فِي مَزْرَعَةِ الجَدِّ</text>` +
				`<rect x="300" y="48" width="120" height="118" rx="9" fill="#ffffff" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="360" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">خَرُوفٌ وَأَرْنَبٌ</text>` +
				`<text x="360" y="106" text-anchor="middle" font-size="10.2" fill="#334155">حَيَوَانَاتٌ أَلِيفَةٌ</text>` +
				`<text x="360" y="128" text-anchor="middle" font-size="10.2" fill="#15803d">عَاشِبَةٌ تَأْكُلُ العُشْبَ</text>` +
				`<rect x="160" y="48" width="120" height="118" rx="9" fill="#ffffff" stroke="#0284c7" stroke-width="1.6"/>` +
				`<text x="220" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0369a1">نَبْتَةٌ مَسْقِيَّةٌ</text>` +
				`<text x="220" y="106" text-anchor="middle" font-size="10.2" fill="#334155">تَمْتَصُّ المَاءَ</text>` +
				`<text x="220" y="128" text-anchor="middle" font-size="10.2" fill="#0369a1">بِوَاسِطَةِ الجُذُورِ</text>` +
				`<rect x="20" y="48" width="120" height="118" rx="9" fill="#ffffff" stroke="#dc2626" stroke-width="1.6"/>` +
				`<text x="80" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#991b1b">جَرْيٌ وَلَعِبٌ</text>` +
				`<text x="80" y="106" text-anchor="middle" font-size="10.2" fill="#334155">هَوَاءٌ نَقِيٌّ</text>` +
				`<text x="80" y="128" text-anchor="middle" font-size="10.2" fill="#dc2626">تَسَارُعُ دَقَّاتِ القَلْبِ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t2_integration_garden_visit_${difficulty}_s${seed}`, svg);

		const mcq = buildUniqueMcqOptions(
			'الخَرُوفُ حَيَوَانٌ أَلِيفٌ وَعَاشِبٌ، وَالنَّبَاتُ يَحْتَاجُ لِلْمَاءِ لِيَنْمُوَ',
			[
				{ text: 'الخَرُوفُ حَيَوَانٌ مُتَوَحِّشٌ وَلَاحِمٌ', diagnosticFeedback: 'الخَرُوفُ يَعِيشُ فِي المَزْرَعَةِ وَيَأْكُلُ العُشْبَ فَهُوَ أَلِيفٌ وَعَاشِبٌ.' },
				{ text: 'النَّبَاتُ الأَخْضَرُ لَا يَحْتَاجُ إِلى المَاءِ أَبَدًا', diagnosticFeedback: 'النَّبَاتُ الأَخْضَرُ كَائِنٌ حَيٌّ يَذْبُلُ وَيَمُوتُ بِدُونِ مَاءٍ.' },
				{ text: 'تَتَوَقَّفُ دَقَّاتُ القَلْبِ أَثْنَاءَ اللَّعِبِ فِي الحَدِيقَةِ', diagnosticFeedback: 'تَزْدَادُ دَقَّاتُ القَلْبِ سُرْعَةً أَثْنَاءَ الجَرْيِ وَاللَّعِبِ.' }
			],
			rng
		);

		const qText = `زَارَ ${kid} مَزْرَعَةَ جَدِّهِ فَرَأَى خَرُوفًا يَأْكُلُ العُشْبَ وَنَبَاتَاتٍ خَضْرَاءَ يَسْقِيهَا الجَدُّ، ثُمَّ جَرَى فِي الهَوَاءِ النَّقِيِّ. أَيُّ جُمْلَةٍ صَحِيحَةٌ؟`;

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: `مَشْهَدٌ مِنْ مَزْرَعَةِ جَدِّ ${kid}`
			},
			{
				type: 'text',
				content: `1) صَنِّفِ الخَرُوفَ حَسَبَ مَكَانِ عَيْشِهِ (أَلِيفٌ / مُتَوَحِّشٌ) وَحَسَبَ غِذَائِهِ (عَاشِبٌ / لَاحِمٌ).`,
				answer: 'الخَرُوفُ حَيَوَانٌ أَلِيفٌ وَعَاشِبٌ.',
				mark: '1'
			},
			{
				type: 'text',
				content: `2) لِمَاذَا يَسْقِي الجَدُّ النَّبَاتَاتِ الخَضْرَاءَ، وَبِأَيِّ جُزْءٍ تَمْتَصُّ المَاءَ؟`,
				answer: 'يَسْقِيهَا لِتَنْمُوَ وَلَا تَذْبُلَ، وَتَمْتَصُّ المَاءَ بِوَاسِطَةِ الجُذُورِ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: `3) بَعْدَ أَنْ جَرَى ${kid} فِي الحَدِيقَةِ، مَاذَا حَدَثَ لِدَقَّاتِ قَلْبِهِ وَتَنَفُّسِهِ؟`,
				answer: 'ازْدَادَتْ سُرْعَةُ دَقَّاتِ قَلْبِهِ وَسُرْعَةُ تَنَفُّسِهِ.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t2_integration_garden_visit',
			seed,
			grade: '1ap',
			trimesterId: 't2',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: نُزْهَةٌ فِي المَزْرَعَةِ وَالحَدِيقَةِ',
			onecRole: 'integration',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: `مَزْرَعَةُ جَدِّ ${kid}`,
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation:
					'الخَرُوفُ أَلِيفٌ وَعَاشِبٌ، وَالنَّبَاتُ الأَخْضَرُ يَحْتَاجُ لِلْمَاءِ لِيَنْمُوَ، وَتَتَسَارَعُ دَقَّاتُ القَلْبِ عِنْدَ الجَرْيِ.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				instruction: `قَضَى ${kid} يَوْمًا جَمِيلًا فِي مَزْرَعَةِ جَدِّهِ. أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ:`,
				content
			},
			hints: [
				'الخَرُوفُ يَعِيشُ فِي المَزْرَعَةِ وَيَأْكُلُ العُشْبَ.',
				'النَّبَاتُ يَمْتَصُّ المَاءَ بِجُذُورِهِ.',
				'عِنْدَ الجَرْيِ تَزْدَادُ سُرْعَةُ القَلْبِ وَالتَّنَفُّسِ.'
			],
			solutionStepsAr: [
				'الخَرُوفُ أَلِيفٌ وَعَاشِبٌ.',
				'النَّبَاتُ يَحْتَاجُ المَاءَ وَيَمْتَصُّهُ بِالجُذُورِ.',
				'دَقَّاتُ القَلْبِ وَالتَّنَفُّسُ تَتَسَارَعُ عِنْدَ الجَرْيِ.'
			],
			finalAnswer: 'الخروف أليف وعاشب — الجذور — تتسارع دقات القلب والتنفس'
		};
	}
};

export const SCIENCES_TEMPLATES_1AP_T2: SciencesParameterizedTemplate[] = [
	breathingHeartTemplate,
	livingDomesticWildTemplate,
	herbivoreCarnivoreTemplate,
	plantWateringTemplate,
	integrationGardenVisitTemplate
];
