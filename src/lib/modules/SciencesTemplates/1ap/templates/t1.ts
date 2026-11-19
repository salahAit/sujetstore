import type {
	Difficulty,
	SciencesGeneratedExerciseInstance,
	SciencesParameterizedTemplate
} from '../../types';
import type { ContentBlock, ExerciseBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, SeededRng } from '../../../MathTemplates/rng';
import {
	esc,
	haloText,
	saveSciencesSvgAsset,
	svgPlantAndPrimaryDiagram,
	wrapSciencesSvg
} from '../../svg-sciences';

function makeRng(seed: number, difficulty: Difficulty, salt: number): SeededRng {
	const d = difficulty === 'easy' ? 13 : difficulty === 'medium' ? 29 : 47;
	return new SeededRng((((Math.trunc(seed) >>> 0) * 1009 + d * 83 + salt) >>> 0) || 1);
}

const KIDS = ['أَمِينُ', 'سَارَةُ', 'آدَمُ', 'مَرْيَمُ', 'رَائِدُ', 'إِيمَانُ', 'وَسِيمُ', 'لِينَا'] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Five Senses Match
// ═══════════════════════════════════════════════════════════════════════════════
const fiveSensesTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t1_five_senses_match',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'الحَوَاسُّ الخَمْسُ وَأَعْضَاؤُهَا',
	curriculumLessonId: 'sci_lesson_1ap_t1_five_senses',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 101);
		const kid = rng.pick(KIDS);
		const scenarios = [
			{
				action: 'تَذَوَّقَ قِطْعَةَ بُرْتُقَالٍ فَوَجَدَهَا حُلْوَةً',
				sense: 'حَاسَّةُ الذَّوْقِ',
				organ: 'اللِّسَانُ',
				itemLabel: 'طَعْمُ البُرْتُقَالِ',
				col: '#dc2626',
				bg: '#fef2f2'
			},
			{
				action: 'سَمِعَ زَقْزَقَةَ العَصَافِيرِ فِي الحَدِيقَةِ',
				sense: 'حَاسَّةُ السَّمْعِ',
				organ: 'الأُذُنُ',
				itemLabel: 'صَوْتُ العَصَافِيرِ',
				col: '#7c3aed',
				bg: '#f5f3ff'
			},
			{
				action: 'شَمَّ رَائِحَةَ زَهْرَةِ اليَاسَمِينِ الجَمِيلَةِ',
				sense: 'حَاسَّةُ الشَّمِّ',
				organ: 'الأَنْفُ',
				itemLabel: 'رَائِحَةُ الزَّهْرَةِ',
				col: '#16a34a',
				bg: '#f0fdf4'
			},
			{
				action: 'لَمَسَ قِطْعَةَ قُطْنٍ فَوَجَدَهَا نَاعِمَةً جِدًّا',
				sense: 'حَاسَّةُ اللَّمْسِ',
				organ: 'الجِلْدُ (اليَدُ)',
				itemLabel: 'مَلْمَسُ القُطْنِ',
				col: '#d97706',
				bg: '#fffbeb'
			},
			{
				action: 'شَاهَدَ قَوْسَ قُزَحَ بِأَلْوَانِهِ الزَّاهِيَةِ فِي السَّمَاءِ',
				sense: 'حَاسَّةُ البَصَرِ',
				organ: 'العَيْنُ',
				itemLabel: 'أَلْوَانُ قَوْسِ قُزَحَ',
				col: '#2563eb',
				bg: '#eff6ff'
			}
		] as const;

		const target = rng.pick(scenarios);
		const others = rng.pickDistinct(
			scenarios.filter((s) => s.sense !== target.sense),
			3
		);

		const svg = wrapSciencesSvg(
			420,
			200,
			`<rect x="6" y="6" width="408" height="188" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">أَيُّ حَاسَّةٍ اسْتَعْمَلَ ${esc(kid)}؟</text>` +
				`<rect x="28" y="46" width="364" height="62" rx="10" fill="${target.bg}" stroke="${target.col}" stroke-width="2"/>` +
				`<text x="210" y="72" text-anchor="middle" font-size="12.5" font-weight="bold" fill="${target.col}">${esc(target.itemLabel)}</text>` +
				`<text x="210" y="95" text-anchor="middle" font-size="11" fill="#334155">${esc(target.action)}</text>` +
				// 5 organ badges at bottom
				['العَيْنُ', 'الأُذُنُ', 'الأَنْفُ', 'اللِّسَانُ', 'الجِلْدُ']
					.map((org, idx) => {
						const x = 336 - idx * 76;
						return (
							`<rect x="${x}" y="128" width="66" height="44" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>` +
							`<text x="${x + 33}" y="154" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">${org}</text>`
						);
					})
					.join('')
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t1_five_senses_match_${difficulty}_s${seed}`, svg);

		const askOrgan = difficulty !== 'easy';
		const correctText = askOrgan ? `${target.organ} (${target.sense})` : target.sense;
		const mcq = buildUniqueMcqOptions(
			correctText,
			others.map((o) => ({
				text: askOrgan ? `${o.organ} (${o.sense})` : o.sense,
				diagnosticFeedback: `تَذَكَّرْ: ${o.organ} خَاصٌّ بِـ ${o.sense}، أَمَّا هُنَا فَنَحْتَاجُ إِلى ${target.sense}.`
			})),
			rng
		);

		const qText = `فِي الصُّورَةِ، ${kid} ${target.action}. مَا ${askOrgan ? 'العُضْوُ وَالحَاسَّةُ اللّذَانِ' : 'الحَاسَّةُ الَّتِي'} اسْتَعْمَلَهُمَا؟`;
		const tableRows = rng.shuffle([target, ...others.slice(0, 2)]).map((row) => [
			row.itemLabel,
			{ content: '....................', answer: row.organ, mark: '0.5' },
			{ content: '....................', answer: row.sense, mark: '0.25' }
		]);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.25fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) تَأَمَّلِ المَشْهَدَ: ${kid} ${target.action}.\n- مَا اسْمُ الحَاسَّةِ المُسْتَعْمَلَةِ؟ ....................`,
						answer: `${target.sense} (بِوَاسِطَةِ ${target.organ}).`,
						mark: '0.25'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'الحَوَاسُّ الخَمْسُ وَأَعْضَاؤُهَا'
					}
				]
			},
			{
				type: 'table',
				headers: ['مَا نَكْتَشِفُهُ', 'العُضْوُ المُسْتَعْمَلُ', 'اسْمُ الحَاسَّةِ'],
				cells: [],
				rows: tableRows
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t1_five_senses_match',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'الحَوَاسُّ الخَمْسُ وَأَعْضَاؤُهَا',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'مَشْهَدُ اكْتِشَافٍ بِالحَوَاسِّ الخَمْسِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `نَسْتَعْمِلُ ${target.organ} لِـ ${target.sense} عِنْدَمَا نُرِيدُ مَعْرِفَةَ ${target.itemLabel}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَكْمِلِ الإِجَابَةَ وَالجَدْوَلَ التَّالِيَ بِمَا يُنَاسِبُ مِنَ الحَوَاسِّ الخَمْسِ:',
				content
			},
			hints: [
				'اقْرَأِ الجُمْلَةَ جَيِّدًا لِتَعْرِفَ: هَلْ هِيَ لَوْنٌ أَمْ صَوْتٌ أَمْ رَائِحَةٌ أَمْ طَعْمٌ أَمْ مَلْمَسٌ؟',
				'ارْبُطْ كُلَّ عُضْوٍ بِحَاسَّتِهِ: العَيْنُ لِلْبَصَرِ، الأُذُنُ لِلسَّمْعِ، الأَنْفُ لِلشَّمِّ، اللِّسَانُ لِلذَّوْقِ، الجِلْدُ لِلَّمْسِ.',
				`فِي هَذَا المَشْهَدِ الإِجَابَةُ هِيَ: ${target.organ} (${target.sense}).`
			],
			solutionStepsAr: [
				`نُحَدِّدُ مَا يَكْتَشِفُهُ ${kid}: ${target.itemLabel}.`,
				`العُضْوُ المَسْؤُولُ عَنْ ذَلِكَ هُوَ: ${target.organ}.`,
				`إِذَنْ الحَاسَّةُ هِيَ: ${target.sense}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Human Movement & Joints
// ═══════════════════════════════════════════════════════════════════════════════
const movementJointsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t1_movement_joints',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'الحَرَكَةُ وَأَطْرَافُ الجِسْمِ وَالمَفَاصِلُ',
	curriculumLessonId: 'sci_lesson_1ap_t1_human_movement',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 102);
		const kid = rng.pick(KIDS);
		const cases = [
			{
				activity: 'القَفْزُ وَالجَرْيُ فِي سَاحَةِ المَدْرَسَةِ',
				limb: 'الأَطْرَافُ السُّفْلِيَّةُ (الرِّجْلَانِ)',
				joint: 'مَفْصِلُ الرُّكْبَةِ',
				wrongLimbs: ['الأَطْرَافُ العُلْوِيَّةُ فَقَطْ', 'الأُذُنَانِ', 'اللِّسَانُ']
			},
			{
				activity: 'ثَنْيُ الذِّرَاعِ لِحَمْلِ المِحْفَظَةِ المَدْرَسِيَّةِ',
				limb: 'الأَطْرَافُ العُلْوِيَّةُ (الذِّرَاعَانِ)',
				joint: 'مَفْصِلُ المِرْفَقِ',
				wrongLimbs: ['الأَطْرَافُ السُّفْلِيَّةُ (الرِّجْلَانِ)', 'الأَنْفُ', 'العَيْنَانِ']
			},
			{
				activity: 'الكِتَابَةُ بِالقَلَمِ عَلَى اللَّوْحَةِ',
				limb: 'اليَدُ (الطَّرَفُ العُلْوِيُّ)',
				joint: 'مَفْصِلُ المِعْصَمِ وَالأَصَابِعِ',
				wrongLimbs: ['القَدَمُ (الطَّرَفُ السُّفْلِيُّ)', 'الأُذُنُ', 'الرُّكْبَةُ']
			},
			{
				activity: 'رَكْلُ الكُرَةِ فِي مَلْعَبِ الرِّيَاضَةِ',
				limb: 'الرِّجْلُ وَالقَدَمُ (الطَّرَفُ السُّفْلِيُّ)',
				joint: 'مَفْصِلُ الرُّكْبَةِ',
				wrongLimbs: ['الذِّرَاعُ وَاليَدُ', 'المِرْفَقُ', 'الأَنْفُ']
			}
		] as const;

		const item = rng.pick(cases);
		const askJoint = difficulty === 'hard';

		const svg = wrapSciencesSvg(
			420,
			195,
			`<rect x="6" y="6" width="408" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="28" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">حَرَكَاتُ الجِسْمِ وَالمَفَاصِلُ</text>` +
				// Stick child silhouette with highlighted joints
				`<circle cx="322" cy="64" r="14" fill="#fed7aa" stroke="#ea580c" stroke-width="2"/>` +
				`<line x1="322" y1="78" x2="322" y2="124" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>` +
				// Arms
				`<polyline fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" points="322,90 296,104 282,88"/>` +
				`<polyline fill="none" stroke="#2563eb" stroke-width="4" stroke-linecap="round" points="322,90 348,104 362,90"/>` +
				// Legs
				`<polyline fill="none" stroke="#16a34a" stroke-width="4.5" stroke-linecap="round" points="322,124 306,150 302,174"/>` +
				`<polyline fill="none" stroke="#16a34a" stroke-width="4.5" stroke-linecap="round" points="322,124 338,150 346,174"/>` +
				// Highlighted joints
				`<circle cx="296" cy="104" r="5.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.6"/>` +
				`<circle cx="306" cy="150" r="5.5" fill="#fde047" stroke="#ca8a04" stroke-width="1.6"/>` +
				haloText(`x="266" y="109" text-anchor="end" font-size="10.5" font-weight="bold"`, '#1d4ed8', 'مِرْفَقٌ') +
				haloText(`x="278" y="155" text-anchor="end" font-size="10.5" font-weight="bold"`, '#15803d', 'رُكْبَةٌ') +
				// Activity card on left
				`<rect x="22" y="54" width="214" height="114" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.8"/>` +
				`<text x="129" y="80" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">نَشَاطُ ${esc(kid)}:</text>` +
				`<text x="129" y="110" text-anchor="middle" font-size="10.8" font-weight="bold" fill="#0f172a">${esc(item.activity)}</text>` +
				`<text x="129" y="144" text-anchor="middle" font-size="10" fill="#475569">أَطْرَافٌ عُلْوِيَّةٌ أَمْ سُفْلِيَّةٌ؟</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t1_movement_joints_${difficulty}_s${seed}`, svg);

		const correctAnswer = askJoint ? item.joint : item.limb;
		const distractors = askJoint
			? [
					{ text: item.joint === 'مَفْصِلُ الرُّكْبَةِ' ? 'مَفْصِلُ المِرْفَقِ' : 'مَفْصِلُ الرُّكْبَةِ', diagnosticFeedback: 'تَأَكَّدْ مِنْ مَكَانِ المَفْصِلِ: المِرْفَقُ فِي الذِّرَاعِ وَالرُّكْبَةُ فِي الرِّجْلِ.' },
					{ text: 'الأُذُنُ اليُمْنَى', diagnosticFeedback: 'الأُذُنُ عُضْوُ السَّمْعِ وَلَيْسَتْ مَفْصِلًا لِلْحَرَكَةِ.' },
					{ text: 'العَيْنُ', diagnosticFeedback: 'العَيْنُ عُضْوُ البَصَرِ وَلَيْسَتْ مَفْصِلًا.' }
				]
			: item.wrongLimbs.map((w) => ({
					text: w,
					diagnosticFeedback: `فَكِّرْ جَيِّدًا فِي الحَرَكَةِ: ${item.activity} يَتِمُّ بِـ ${item.limb}.`
				}));

		const mcq = buildUniqueMcqOptions(correctAnswer, distractors, rng);
		const qText = askJoint
			? `يَقُومُ ${kid} بِـ: **${item.activity}**. مَا المَفْصِلُ الأَسَاسِيُّ الَّذِي يُسَاعِدُهُ عَلَى الاِنْثِنَاءِ؟`
			: `يَقُومُ ${kid} بِـ: **${item.activity}**. مَا الطَّرَفُ الَّذِي يَسْتَعْمِلُهُ أَسَاسًا؟`;

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) ${qText}\nالجَوَابُ: ........................................`,
						answer: correctAnswer,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: 'الأَطْرَافُ وَالمَفَاصِلُ عِنْدَ الإِنْسَانِ'
					}
				]
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'تُسَاعِدُ المَفَاصِلُ مِثْلَ الرُّكْبَةِ وَالمِرْفَقِ عَلَى ثَنْيِ الأَطْرَافِ وَبَسْطِهَا.',
						a: 'صَحِيحٌ',
						mark: '0.75'
					},
					{
						q: 'نَسْتَعْمِلُ الأَطْرَافَ السُّفْلِيَّةَ (الرِّجْلَيْنِ) فِي المَشْيِ وَالجَرْيِ وَالقَفْزِ.',
						a: 'صَحِيحٌ',
						mark: '0.75'
					}
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t1_movement_joints',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'الحَرَكَةُ وَأَطْرَافُ الجِسْمِ وَالمَفَاصِلُ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'الأَطْرَافُ وَالمَفَاصِلُ عِنْدَ الإِنْسَانِ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `عِنْدَ ${item.activity}، نَسْتَعْمِلُ ${item.limb} وَيُسَاعِدُنَا ${item.joint}.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'لَاحِظِ الرَّسْمَ ثُمَّ أَجِبْ عَنِ الأَسْئِلَةِ:',
				content
			},
			hints: [
				'فَرِّقْ بَيْنَ الأَطْرَافِ العُلْوِيَّةِ (الذِّرَاعَانِ) وَالأَطْرَافِ السُّفْلِيَّةِ (الرِّجْلَانِ).',
				'المِرْفَقُ يُوجَدُ فِي الذِّرَاعِ، وَالرُّكْبَةُ تُوجَدُ فِي الرِّجْلِ.',
				`الإِجَابَةُ الصَّحِيحَةُ هِيَ: ${correctAnswer}.`
			],
			solutionStepsAr: [
				`النَّشَاطُ هُوَ: ${item.activity}.`,
				`الطَّرَفُ المُسْتَعْمَلُ هُوَ: ${item.limb}.`,
				`المَفْصِلُ المُسَاعِدُ هُوَ: ${item.joint}.`
			],
			finalAnswer: correctAnswer
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Growth Signs (Height & Weight)
// ═══════════════════════════════════════════════════════════════════════════════
const growthSignsTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t1_growth_signs',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'human_body',
	titleAr: 'أَنَا أَنْمُو: تَطَوُّرُ القَامَةِ وَالوَزْنِ',
	curriculumLessonId: 'sci_lesson_1ap_t1_i_grow_develop',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 103);
		const kid = rng.pick(KIDS);
		const hPrev = rng.int(104, 112);
		const deltaH = rng.int(5, 8);
		const hNow = hPrev + deltaH;
		const wPrev = rng.int(16, 19);
		const wNow = wPrev + rng.int(2, 4);

		const isTrueStatement = seed % 2 === 0;
		const statement = isTrueStatement
			? `زَادَتْ قَامَةُ ${kid} مِنْ ${hPrev} سـم إِلى ${hNow} سـم وَوَزْنُهُ مِنْ ${wPrev} كغ إِلى ${wNow} كغ، وَهَذَا يَدُلُّ عَلَى أَنَّهُ يَنْمُو.`
			: `عِنْدَمَا يَنْمُو الطِّفْلُ تَقْصُرُ قَامَتُهُ وَيَصْغُرُ حِذَاؤُهُ وَتُصْبِحُ مَلَابِسُهُ القَدِيمَةُ وَاسِعَةً جِدًّا.`;

		const svg = wrapSciencesSvg(
			420,
			200,
			`<rect x="6" y="6" width="408" height="188" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="210" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">دَفْتَرُ نُمُوِّ ${esc(kid)}</text>` +
				// Two comparison bars (Last year vs This year)
				`<rect x="236" y="52" width="154" height="124" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>` +
				`<text x="313" y="74" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">السَّنَةُ المَاضِيَةُ</text>` +
				`<rect x="295" y="96" width="36" height="44" rx="6" fill="#60a5fa"/>` +
				`<text x="313" y="156" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">القَامَةُ: ${hPrev} سـم</text>` +
				`<text x="313" y="171" text-anchor="middle" font-size="10.5" fill="#334155">الوَزْنُ: ${wPrev} كغ</text>` +
				`<text x="210" y="118" text-anchor="middle" font-size="20" font-weight="bold" fill="#16a34a">←</text>` +
				`<rect x="30" y="52" width="154" height="124" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>` +
				`<text x="107" y="74" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">هَذِهِ السَّنَةُ</text>` +
				`<rect x="89" y="82" width="36" height="58" rx="6" fill="#22c55e"/>` +
				`<text x="107" y="156" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">القَامَةُ: ${hNow} سـم</text>` +
				`<text x="107" y="171" text-anchor="middle" font-size="10.5" fill="#15803d">الوَزْنُ: ${wNow} كغ</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t1_growth_signs_${difficulty}_s${seed}`, svg);

		const content: ContentBlock[] = [
			{
				type: 'columns',
				widths: ['1.2fr', '1fr'],
				children: [
					{
						type: 'text',
						content: `1) قَارِنْ بَيْنَ قَامَةِ ${kid} فِي السَّنَةِ المَاضِيَةِ (${hPrev} سـم) وَهَذِهِ السَّنَةِ (${hNow} سـم). مَاذَا تُلَاحِظُ؟`,
						answer: `زَادَتْ قَامَةُ ${kid} وَزَادَ وَزْنُهُ، إِذَنْ هُوَ يَنْمُو نُمُوًّا سَلِيمًا.`,
						mark: '1'
					},
					{
						type: 'image',
						src: imageUrl,
						caption: `مُقَارَنَةُ قَامَةِ وَوَزْنِ ${kid}`
					}
				]
			},
			{
				type: 'true_false',
				items: [
					{
						q: 'مِنْ مَظَاهِرِ النُّمُوِّ أَنَّ الحِذَاءَ القَدِيمَ يُصْبِحُ صَغِيرًا عَلَى قَدَمِي.',
						a: 'صَحِيحٌ',
						mark: '0.75'
					},
					{
						q: 'النَّوْمُ الكَافِي وَالغِذَاءُ الصِّحِّيُّ يُسَاعِدَانِ جِسْمِي عَلَى النُّمُوِّ.',
						a: 'صَحِيحٌ',
						mark: '0.75'
					}
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t1_growth_signs',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'human_body',
			titleAr: 'أَنَا أَنْمُو: تَطَوُّرُ القَامَةِ وَالوَزْنِ',
			onecRole: 'reasoning',
			quizQuestion: {
				type: 'true_false',
				questionText: `صَحِيحٌ أَمْ خَطَأٌ؟\n${statement}`,
				questionTextAr: statement,
				imageUrl,
				imageCaption: `دَفْتَرُ نُمُوِّ ${kid}`,
				questionData: {
					correctAnswer: isTrueStatement
				},
				explanation: isTrueStatement
					? `صَحِيحٌ! زِيَادَةُ القَامَةِ وَالوَزْنِ هِيَ أَهَمُّ مَظَاهِرِ النُّمُوِّ السَّلِيمِ عِنْدَ الطِّفْلِ.`
					: `خَطَأٌ! عِنْدَمَا يَنْمُو الطِّفْلُ تَطُولُ قَامَتُهُ وَتَكْبُرُ قَدَمَاهُ فَتُصْبِحُ مَلَابِسُهُ القَدِيمَةُ ضَيِّقَةً.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: `تَأَمَّلْ دَفْتَرَ نُمُوِّ ${kid}، ثُمَّ أَجِبْ:`,
				content
			},
			hints: [
				'قَارِنِ القَامَةَ وَالوَزْنَ بَيْنَ السَّنَةِ المَاضِيَةِ وَهَذِهِ السَّنَةِ.',
				'عِنْدَمَا أَنْمُو يَزْدَادُ طُولِي وَوَزْنِي وَتَصْغُرُ مَلَابِسِي القَدِيمَةُ.',
				`الإِجَابَةُ هِيَ: ${isTrueStatement ? 'صَحِيحٌ' : 'خَطَأٌ'}.`
			],
			solutionStepsAr: [
				`القَامَةُ انْتَقَلَتْ مِنْ ${hPrev} سـم إِلى ${hNow} سـم (زَادَتْ).`,
				`الوَزْنُ انْتَقَلَ مِنْ ${wPrev} كغ إِلى ${wNow} كغ (زَادَ).`,
				`الحُكْمُ عَلَى العِبَارَةِ: ${isTrueStatement ? 'صَحِيحٌ' : 'خَطَأٌ'}.`
			],
			finalAnswer: isTrueStatement ? 'صَحِيحٌ' : 'خَطَأٌ'
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Healthy Food & Dental Hygiene
// ═══════════════════════════════════════════════════════════════════════════════
const healthyFoodTeethTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t1_healthy_food_teeth',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'nutrition_digestion',
	titleAr: 'الغِذَاءُ الصِّحِّيُّ وَسَلَامَةُ الأَسْنَانِ',
	curriculumLessonId: 'sci_lesson_1ap_t1_healthy_food_teeth',
	defaultPoints: 2.5,
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 104);
		const healthyPool = [
			'الحَلِيبُ وَالتُّفَّاحُ وَالخُبْزُ',
			'الجَزَرُ وَالبَيْضُ وَالمَاءُ النَّقِيُّ',
			'الخُضَرُ وَالفَوَاكِهُ وَالسَّمَكُ',
			'العَدَسُ وَالبُرْتُقَالُ وَالحَلِيبُ'
		] as const;
		const unhealthyPool = [
			'الإِكْثَارُ مِنَ الحَلَوِيَّاتِ وَالمَشْرُوبَاتِ الغَازِيَّةِ',
			'أَكْلُ الشُّوكُولَاطَةِ كَثِيرًا قَبْلَ النَّوْمِ دُونَ تَنْظِيفِ الأَسْنَانِ',
			'رَقَائِقُ البَطَاطَا المَالِحَةُ وَالمُصَاصَاتُ السُّكَّرِيَّةُ فَقَطْ',
			'شُرْبُ المَشْرُوبَاتِ الغَازِيَّةِ بَدَلَ المَاءِ وَالحَلِيبِ'
		] as const;

		const askHealthy = seed % 2 === 0;
		const correctHealthy = rng.pick(healthyPool);
		const correctUnhealthy = rng.pick(unhealthyPool);
		const correctText = askHealthy ? correctHealthy : correctUnhealthy;
		const distractorList = askHealthy
			? rng.pickDistinct(unhealthyPool, 3).map((t) => ({
					text: t,
					diagnosticFeedback: 'هَذَا خِيَارٌ غَيْرُ صِحِّيٍّ يُسَبِّبُ تَسَوُّسَ الأَسْنَانِ وَيَضُرُّ بِالجِسْمِ.'
				}))
			: rng.pickDistinct(healthyPool, 3).map((t) => ({
					text: t,
					diagnosticFeedback: 'هَذِهِ أَغْذِيَةٌ صِحِّيَّةٌ مُفِيدَةٌ لِلْجِسْمِ وَالأَسْنَانِ.'
				}));

		const mcq = buildUniqueMcqOptions(correctText, distractorList, rng);
		const svg = svgPlantAndPrimaryDiagram('balanced_diet', {
			title: 'أَخْتَارُ الغِذَاءَ الصِّحِّيَّ لِجِسْمِي وَأَسْنَانِي'
		});
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t1_healthy_food_teeth_${difficulty}_s${seed}`, svg);

		const qText = askHealthy
			? 'أَيُّ وَجْبَةٍ مِنَ الوَجَبَاتِ التَّالِيَةِ هِيَ **غِذَاءٌ صِحِّيٌّ** يُقَوِّي الجِسْمَ وَيَحْمِي الأَسْنَانَ؟'
			: 'أَيُّ سُلُوكٍ غِذَائِيٍّ مِمَّا يَلِي **يَضُرُّ بِالأَسْنَانِ** وَيُسَبِّبُ تَسَوُّسَهَا؟';

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
						caption: 'الغِذَاءُ الصِّحِّيُّ المُتَوَازِنُ'
					}
				]
			},
			{
				type: 'table',
				headers: ['الغِذَاءُ أَوِ السُّلُوكُ', 'مُفِيدٌ لِلصِّحَّةِ / مُضِرٌّ بِالأَسْنَانِ'],
				cells: [],
				rows: [
					['غَسْلُ الأَسْنَانِ بِالفُرْشَاةِ وَالمَعْجُونِ بَعْدَ الأَكْلِ', { content: '....................', answer: 'مُفِيدٌ لِلصِّحَّةِ', mark: '0.5' }],
					['شُرْبُ الحَلِيبِ وَأَكْلُ الفَوَاكِهِ المَغْسُولَةِ', { content: '....................', answer: 'مُفِيدٌ لِلصِّحَّةِ', mark: '0.5' }],
					['الإِكْثَارُ مِنَ الحَلَوِيَّاتِ وَكَسْرُ الجَوْزِ بِالأَسْنَانِ', { content: '....................', answer: 'مُضِرٌّ بِالأَسْنَانِ', mark: '0.5' }]
				]
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t1_healthy_food_teeth',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'nutrition_digestion',
			titleAr: 'الغِذَاءُ الصِّحِّيُّ وَسَلَامَةُ الأَسْنَانِ',
			onecRole: 'recall',
			quizQuestion: {
				type: 'mcq',
				questionText: qText,
				questionTextAr: qText,
				imageUrl,
				imageCaption: 'المَجْمُوعَاتُ الغِذَائِيَّةُ الصِّحِّيَّةُ',
				questionData: {
					options: mcq.options,
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الخُضَرُ وَالفَوَاكِهُ وَالحَلِيبُ أَغْذِيَةٌ صِحِّيَّةٌ، أَمَّا الإِكْثَارُ مِنَ السُّكَّرِيَّاتِ فَيُسَبِّبُ تَسَوُّسَ الأَسْنَانِ.`
			},
			sujetExercise: {
				points: 2.5,
				instruction: 'أَجِبْ عَنِ السُّؤَالِ ثُمَّ صَنِّفْ كُلَّ سُلُوكٍ فِي الجَدْوَلِ:',
				content
			},
			hints: [
				'الأَغْذِيَةُ الصِّحِّيَّةُ هِيَ الحَلِيبُ وَالخُضَرُ وَالفَوَاكِهُ وَالمَاءُ.',
				'السُّكَّرِيَّاتُ وَالحَلَوِيَّاتُ الكَثِيرَةُ تُسَبِّبُ التَّسَوُّسَ.',
				`الخِيَارُ الصَّحِيحُ هُوَ: ${correctText}.`
			],
			solutionStepsAr: [
				'نُمَيِّزُ بَيْنَ الغِذَاءِ الصِّحِّيِّ المُفِيدِ وَالسُّكَّرِيَّاتِ المُضِرَّةِ.',
				`نَخْتَارُ: ${correctText}.`
			],
			finalAnswer: correctText
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// 5. Integration: Healthy Day of a 1AP Pupil
// ═══════════════════════════════════════════════════════════════════════════════
const integrationHealthyDayTemplate: SciencesParameterizedTemplate = {
	id: 'sci_tpl_1ap_t1_integration_healthy_day',
	grade: '1ap',
	trimesterId: 't1',
	domain: 'integration',
	titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: يَوْمٌ صِحِّيٌّ لِتِلْمِيذِ السَّنَةِ الأُولَى',
	curriculumLessonId: 'sci_lesson_1ap_t1_healthy_food_teeth',
	defaultPoints: 2.5,
	isIntegration: true,
	onecRole: 'integration',
	generate(seed: number, difficulty: Difficulty = 'medium'): SciencesGeneratedExerciseInstance {
		const rng = makeRng(seed, difficulty, 105);
		const kid = rng.pick(KIDS);

		const svg = wrapSciencesSvg(
			440,
			195,
			`<rect x="6" y="6" width="428" height="183" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.4"/>` +
				`<text x="220" y="27" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">يَوْمُ ${esc(kid)} الصِّحِّيُّ فِي البَيْتِ وَالمَدْرَسَةِ</text>` +
				`<rect x="304" y="48" width="116" height="118" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.6"/>` +
				`<text x="362" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#1e3a8a">1. الصَّبَاحُ</text>` +
				`<text x="362" y="106" text-anchor="middle" font-size="10.2" fill="#334155">فُطُورٌ صِحِّيٌّ</text>` +
				`<text x="362" y="128" text-anchor="middle" font-size="10.2" fill="#334155">وَتَنْظِيفُ الأَسْنَانِ</text>` +
				`<rect x="162" y="48" width="116" height="118" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.6"/>` +
				`<text x="220" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">2. المَدْرَسَةُ</text>` +
				`<text x="220" y="106" text-anchor="middle" font-size="10.2" fill="#334155">رُؤْيَةُ السَّبُّورَةِ</text>` +
				`<text x="220" y="128" text-anchor="middle" font-size="10.2" fill="#334155">وَالجَرْيُ فِي السَّاحَةِ</text>` +
				`<rect x="20" y="48" width="116" height="118" rx="9" fill="#fffbeb" stroke="#d97706" stroke-width="1.6"/>` +
				`<text x="78" y="76" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#92400e">3. المَسَاءُ</text>` +
				`<text x="78" y="106" text-anchor="middle" font-size="10.2" fill="#334155">عَشَاءٌ خَفِيفٌ</text>` +
				`<text x="78" y="128" text-anchor="middle" font-size="10.2" fill="#334155">وَنَوْمٌ بَاكِرٌ لِلنُّمُوِّ</text>` +
				`<text x="291" y="112" text-anchor="middle" font-size="16" font-weight="bold" fill="#475569">←</text>` +
				`<text x="149" y="112" text-anchor="middle" font-size="16" font-weight="bold" fill="#475569">←</text>`
		);
		const imageUrl = saveSciencesSvgAsset(`sci_1ap_t1_integration_healthy_day_${difficulty}_s${seed}`, svg);

		const pairs = [
			{ left: { text: 'رُؤْيَةُ مَا تَكْتُبُهُ المُعَلِّمَةُ عَلَى السَّبُّورَةِ' }, right: { text: 'حَاسَّةُ البَصَرِ (العَيْنُ)' } },
			{ left: { text: 'الجَرْيُ وَالقَفْزُ فِي سَاحَةِ المَدْرَسَةِ' }, right: { text: 'الأَطْرَافُ السُّفْلِيَّةُ وَالرُّكْبَتَانِ' } },
			{ left: { text: 'الوِقَايَةُ مِنْ تَسَوُّسِ الأَسْنَانِ' }, right: { text: 'التَّنْظِيفُ بِالفُرْشَاةِ وَالمَعْجُونِ' } },
			{ left: { text: 'النُّمُوُّ وَزِيَادَةُ القَامَةِ وَالوَزْنِ' }, right: { text: 'الغِذَاءُ الصِّحِّيُّ وَالنَّوْمُ البَاكِرُ' } }
		];

		const content: ContentBlock[] = [
			{
				type: 'image',
				src: imageUrl,
				caption: `مَرَاحِلُ يَوْمِ ${kid} الصِّحِّيِّ`
			},
			{
				type: 'text',
				content: `1) تَنَاوَلَ ${kid} الحَلِيبَ وَالتُّفَّاحَ ثُمَّ نَظَّفَ أَسْنَانَهُ. لِمَاذَا يُنَظِّفُ أَسْنَانَهُ بَعْدَ الأَكْلِ؟`,
				answer: 'لِحِمَايَةِ الأَسْنَانِ مِنَ التَّسَوُّسِ وَإِزَالَةِ بَقَايَا الطَّعَامِ.',
				mark: '0.75'
			},
			{
				type: 'text',
				content: `2) فِي المَدْرَسَةِ قَرَأَ ${kid} الدَّرْسَ عَلَى السَّبُّورَةِ وَجَرَى مَعَ زُمَلَائِهِ. مَا الحَاسَّةُ المُسْتَعْمَلَةُ لِرُؤْيَةِ السَّبُّورَةِ، وَمَا الأَطْرَافُ المُسْتَعْمَلَةُ فِي الجَرْيِ؟`,
				answer: 'حَاسَّةُ البَصَرِ (بِالعَيْنِ) لِرُؤْيَةِ السَّبُّورَةِ، وَالأَطْرَافُ السُّفْلِيَّةُ (الرِّجْلَانِ) فِي الجَرْيِ.',
				mark: '1'
			},
			{
				type: 'text',
				content: `3) نَامَ ${kid} بَاكِرًا فِي المَسَاءِ. كَيْفَ يُسَاعِدُ النَّوْمُ البَاكِرُ جِسْمَ الطِّفْلِ؟`,
				answer: 'يُسَاعِدُ جِسْمَهُ عَلَى النُّمُوِّ السَّلِيمِ وَالرَّاحَةِ وَالنَّشَاطِ.',
				mark: '0.75'
			}
		];

		return {
			templateId: 'sci_tpl_1ap_t1_integration_healthy_day',
			seed,
			grade: '1ap',
			trimesterId: 't1',
			difficulty,
			domain: 'integration',
			titleAr: 'وَضْعِيَّةٌ إِدْمَاجِيَّةٌ: يَوْمٌ صِحِّيٌّ لِتِلْمِيذِ السَّنَةِ الأُولَى',
			onecRole: 'integration',
			quizQuestion: {
				type: 'matching',
				questionText: `ارْبُطْ كُلَّ نَشَاطٍ فِي يَوْمِ ${kid} الصِّحِّيِّ بِمَا يُنَاسِبُهُ:`,
				questionTextAr: `ارْبُطْ كُلَّ نَشَاطٍ فِي يَوْمِ ${kid} بِمَا يُنَاسِبُهُ:`,
				imageUrl,
				imageCaption: `يَوْمُ ${kid} الصِّحِّيُّ`,
				questionData: { pairs },
				explanation:
					'التِّلْمِيذُ الصِّحِّيُّ يُحَافِظُ عَلَى حَوَاسِّهِ، يَتَحَرَّكُ وَيَلْعَبُ الرِّيَاضَةَ، يَأْكُلُ غِذَاءً صِحِّيًّا، يُنَظِّفُ أَسْنَانَهُ، وَيَنَامُ بَاكِرًا لِيَنْمُوَ جَيِّدًا.'
			},
			sujetExercise: {
				points: 2.5,
				customTitle: 'الوَضْعِيَّةُ الإِدْمَاجِيَّةُ',
				instruction: `يَحْرِصُ ${kid} عَلَى تَطْبِيقِ قَوَاعِدِ الصِّحَّةِ كُلَّ يَوْمٍ كَمَا فِي المَشْهَدِ. أَجِبْ عَنِ الأَسْئِلَةِ:`,
				content
			},
			hints: [
				'ارْبُطِ السَّبُّورَةَ بِالعَيْنِ، وَالجَرْيَ بِالرِّجْلَيْنِ.',
				'تَنْظِيفُ الأَسْنَانِ يَحْمِيهَا مِنَ التَّسَوُّسِ.',
				'الغِذَاءُ الصِّحِّيُّ وَالنَّوْمُ البَاكِرُ يُسَاعِدَانِ عَلَى النُّمُوِّ.'
			],
			solutionStepsAr: [
				'نُنَظِّفُ الأَسْنَانَ لِلْوِقَايَةِ مِنَ التَّسَوُّسِ.',
				'نَرَى السَّبُّورَةَ بِالعَيْنِ (البَصَرِ) وَنَجْرِي بِالأَطْرَافِ السُّفْلِيَّةِ.',
				'النَّوْمُ البَاكِرُ يَسْمَحُ لِلْجِسْمِ بِالرَّاحَةِ وَالنُّمُوِّ السَّلِيمِ.'
			],
			finalAnswer: 'البصر — الأطراف السفلية — الفرشاة والمعجون — النمو السليم'
		};
	}
};

export const SCIENCES_TEMPLATES_1AP_T1: SciencesParameterizedTemplate[] = [
	fiveSensesTemplate,
	movementJointsTemplate,
	growthSignsTemplate,
	healthyFoodTeethTemplate,
	integrationHealthyDayTemplate
];
