import type {
	Difficulty,
	PhysicsGeneratedExerciseInstance,
	PhysicsParameterizedTemplate
} from '../../types';
import type { ContentBlock } from '../../../SujetBuilder/types';
import { buildUniqueMcqOptions, roundTo, SeededRng } from '../../../MathTemplates/rng';
import { savePhysicsSvgAsset, wrapPhysicsSvg } from '../../svg-physics';

// ═══════════════════════════════════════════════════════════════════════════════
// FreeMono-Free Custom SVG Builders for 1AS TCL T3 (Energy)
// ═══════════════════════════════════════════════════════════════════════════════

function buildEnergyChainTplSvg(
	title: string,
	nodes: Array<{ name: string; storage: string }>,
	transfers: string[]
): string {
	let body = `<defs>
		<marker id="ectArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#2563eb"/>
		</marker>
		<marker id="ectQ" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
			<path d="M0,0 L5,2.5 L0,5 Z" fill="#dc2626"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="174" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">${title}</text>`;

	const n = nodes.length;
	const stepX = 360 / n;
	for (let i = 0; i < n; i++) {
		const cx = 20 + stepX * i + stepX / 2;
		const rx = Math.min(38, stepX * 0.36);
		body += `<ellipse cx="${cx.toFixed(1)}" cy="82" rx="${rx.toFixed(1)}" ry="20" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5"/>`;
		body += `<text x="${cx.toFixed(1)}" y="86" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">${nodes[i].name}</text>`;
		body += `<text x="${cx.toFixed(1)}" y="118" text-anchor="middle" font-size="11" font-weight="bold" fill="#059669">${nodes[i].storage}</text>`;

		if (i > 0) {
			body += `<line x1="${cx.toFixed(1)}" y1="124" x2="${cx.toFixed(1)}" y2="152" stroke="#dc2626" stroke-width="1.3" stroke-dasharray="3,2" marker-end="url(#ectQ)"/>`;
			body += `<text x="${(cx + 12).toFixed(1)}" y="150" font-size="9.5" font-weight="bold" fill="#dc2626">Q</text>`;
		}

		if (i < n - 1) {
			const nextCx = 20 + stepX * (i + 1) + stepX / 2;
			const x1 = cx + rx + 2;
			const x2 = nextCx - rx - 3;
			body += `<line x1="${x1.toFixed(1)}" y1="82" x2="${x2.toFixed(1)}" y2="82" stroke="#2563eb" stroke-width="1.7" marker-end="url(#ectArr)"/>`;
			body += `<text x="${((x1 + x2) / 2).toFixed(1)}" y="71" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1d4ed8">${transfers[i]}</text>`;
		}
	}
	body += `<text x="200" y="170" text-anchor="middle" font-size="9.5" fill="#475569">أكمل نمط التخزين أو التحويل المجهول (؟) وطبق مبدأ انحفاظ الطاقة</text>`;
	return wrapPhysicsSvg(400, 190, body);
}

function buildPowerChartTplSvg(appName: string, pW: number, hours: number): string {
	let body = `<rect x="8" y="8" width="384" height="178" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">استطاعة الأجهزة المنزلية (P = E / t)</text>`;

	const apps = [
		{ name: 'مصباح LED', p: 12, col: '#16a34a' },
		{ name: 'تلفاز', p: 120, col: '#2563eb' },
		{ name: appName, p: pW, col: '#dc2626' },
		{ name: 'فرن كهربائي', p: 2400, col: '#9333ea' }
	];
	apps.forEach((a, idx) => {
		const y = 44 + idx * 24;
		const barW = Math.max(8, Math.min(180, (a.p / 2400) * 180));
		body += `<text x="95" y="${y + 13}" text-anchor="end" font-size="10" font-weight="bold" fill="#334155">${a.name}</text>`;
		body += `<rect x="102" y="${y + 2}" width="${barW.toFixed(1)}" height="14" rx="3" fill="${a.col}"/>`;
		body += `<text x="${(108 + barW).toFixed(1)}" y="${y + 13}" font-size="10" font-weight="bold" fill="#0f172a">${a.p} W</text>`;
	});

	body += `<rect x="20" y="144" width="360" height="32" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1.2"/>`;
	body += `<text x="200" y="164" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">الجهاز المدروس: ${appName} (${pW} W)  |  مدة التشغيل = ${hours} h</text>`;
	return wrapPhysicsSvg(400, 194, body);
}

function buildElectricMeterTplSvg(oldIdx: number, newIdx: number, rate1: number, rate2: number): string {
	let body = `<rect x="8" y="8" width="384" height="176" rx="9" fill="#fefce8" stroke="#ca8a04" stroke-width="1.4"/>`;
	body += `<text x="200" y="28" text-anchor="middle" font-size="12" font-weight="bold" fill="#854d0e">مؤشر العداد الكهربائي المنزلي (كشف الفاتورة)</text>`;

	body += `<rect x="24" y="42" width="352" height="74" rx="7" fill="#ffffff" stroke="#eab308" stroke-width="1.2"/>`;
	body += `<text x="112" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">الرقم القديم</text>`;
	body += `<text x="112" y="94" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">${oldIdx} kWh</text>`;
	body += `<line x1="200" y1="52" x2="200" y2="106" stroke="#e2e8f0" stroke-width="1.5"/>`;
	body += `<text x="288" y="68" text-anchor="middle" font-size="11" font-weight="bold" fill="#475569">الرقم الجديد</text>`;
	body += `<text x="288" y="94" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#15803d">${newIdx} kWh</text>`;

	body += `<rect x="24" y="128" width="352" height="44" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1.1"/>`;
	body += `<text x="200" y="147" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">التسعيرة: الشطر 1 (حتى 125 kWh) = ${rate1} DA/kWh</text>`;
	body += `<text x="200" y="164" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#92400e">الشطر 2 (ما فاق 125 kWh) = ${rate2} DA/kWh</text>`;

	return wrapPhysicsSvg(400, 192, body);
}

function buildEfficiencyBarTplSvg(deviceName: string, eIn: number, eUseful: number): string {
	const pct = Math.round((eUseful / eIn) * 100);
	const barTotal = 310;
	const usefulW = Math.max(24, (eUseful / eIn) * barTotal);
	const lossW = barTotal - usefulW;

	let body = `<rect x="8" y="8" width="384" height="174" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">توزع الطاقة والمردود الطاقوي لـ (${deviceName})</text>`;

	body += `<text x="200" y="54" text-anchor="middle" font-size="11" font-weight="bold" fill="#1e3a8a">الطاقة الكلية المستهلكة = ${eIn} J</text>`;
	body += `<rect x="45" y="66" width="${usefulW.toFixed(1)}" height="36" fill="#16a34a"/>`;
	body += `<rect x="${(45 + usefulW).toFixed(1)}" y="66" width="${lossW.toFixed(1)}" height="36" fill="#ef4444"/>`;
	body += `<text x="${(45 + usefulW / 2).toFixed(1)}" y="89" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">${eUseful} J مفيدة</text>`;
	if (lossW > 46) {
		body += `<text x="${(45 + usefulW + lossW / 2).toFixed(1)}" y="89" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#ffffff">Q ضائعة</text>`;
	}

	body += `<rect x="45" y="116" width="310" height="50" rx="6" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>`;
	body += `<text x="200" y="137" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">احسب المردود الطاقوي (الطاقة المفيدة / الطاقة الكلية)</text>`;
	body += `<text x="200" y="156" text-anchor="middle" font-size="10.5" fill="#475569">الضياع الحراري Q يتحول إلى المحيط (المردود دوما &lt; 100%)</text>`;
	void pct;
	return wrapPhysicsSvg(400, 190, body);
}

function buildIntegrationHomeAuditSvg(
	solarInW: number,
	solarOutW: number,
	oldIdx: number,
	newIdx: number,
	lampCount: number
): string {
	let body = `<defs>
		<marker id="ihaArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
			<path d="M0,0 L6,3 L0,6 Z" fill="#16a34a"/>
		</marker>
	</defs>`;
	body += `<rect x="8" y="8" width="384" height="182" rx="9" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>`;
	body += `<text x="200" y="27" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">التدقيق الطاقوي المنزلي: لوح شمسي ومصابيح LED</text>`;

	// Top: Solar Energy chain
	body += `<ellipse cx="64" cy="64" rx="34" ry="18" fill="#fef3c7" stroke="#eab308" stroke-width="1.4"/>`;
	body += `<text x="64" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#854d0e">الشمس</text>`;
	body += `<line x1="100" y1="64" x2="146" y2="64" stroke="#16a34a" stroke-width="1.7" marker-end="url(#ihaArr)"/>`;
	body += `<text x="123" y="56" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#15803d">Er=${solarInW}W</text>`;
	body += `<ellipse cx="192" cy="64" rx="42" ry="18" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>`;
	body += `<text x="192" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#1e3a8a">اللوح الشمسي</text>`;
	body += `<line x1="236" y1="64" x2="282" y2="64" stroke="#16a34a" stroke-width="1.7" marker-end="url(#ihaArr)"/>`;
	body += `<text x="259" y="56" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#15803d">We=${solarOutW}W</text>`;
	body += `<ellipse cx="328" cy="64" rx="40" ry="18" fill="#ecfdf5" stroke="#16a34a" stroke-width="1.4"/>`;
	body += `<text x="328" y="68" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">البطارية</text>`;

	// Bottom: Meter & Lamp comparison
	body += `<rect x="20" y="98" width="174" height="76" rx="6" fill="#fefce8" stroke="#ca8a04" stroke-width="1.2"/>`;
	body += `<text x="107" y="117" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#854d0e">عداد الشبكة (kWh)</text>`;
	body += `<text x="107" y="138" text-anchor="middle" font-size="10.5" fill="#0f172a">القديم: ${oldIdx}</text>`;
	body += `<text x="107" y="158" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#15803d">الجديد: ${newIdx}</text>`;

	body += `<rect x="206" y="98" width="174" height="76" rx="6" fill="#ffffff" stroke="#3b82f6" stroke-width="1.2"/>`;
	body += `<text x="293" y="117" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#1e3a8a">استبدال ${lampCount} مصابيح</text>`;
	body += `<text x="293" y="138" text-anchor="middle" font-size="10" fill="#dc2626">قديم متوهج: 75 W للمصباح</text>`;
	body += `<text x="293" y="158" text-anchor="middle" font-size="10" font-weight="bold" fill="#16a34a">حديث LED: 10 W للمصباح</text>`;

	return wrapPhysicsSvg(400, 198, body);
}

// ═══════════════════════════════════════════════════════════════════════════════
// Template 1: Energy Forms, Chains & Conservation Principle
// ═══════════════════════════════════════════════════════════════════════════════

const tplEnergyFormsChains: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t3_energy_forms_chains',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'energy',
	titleAr: 'أشكال الطاقة، السلسلة الوظيفية والطاقوية، ومبدأ انحفاظ الطاقة',
	curriculumLessonId: 'phy_lesson_1as_tcl_t3_functional_energy_chain_conservation',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const setups = [
			{
				title: 'توليد الكهرباء من سد مائي',
				nodes: [
					{ name: 'ماء السد', storage: 'Epp+Ec' },
					{ name: 'العنفة', storage: 'Ec' },
					{ name: 'الدينامو', storage: 'Ec' },
					{ name: 'المصباح', storage: 'Ei' }
				],
				transfers: ['W', 'W', 'We'],
				missingIdx: 1,
				missingCorrect: 'W (تحويل ميكانيكي)',
				missingSymbol: 'W'
			},
			{
				title: 'مروحة تعمل ببطارية ومحرك',
				nodes: [
					{ name: 'البطارية', storage: 'Ei' },
					{ name: 'المحرك', storage: 'Ec' },
					{ name: 'المروحة', storage: 'Ec' }
				],
				transfers: ['We', 'W'],
				missingIdx: 0,
				missingCorrect: 'We (تحويل كهربائي)',
				missingSymbol: 'We'
			},
			{
				title: 'عنفة هوائية تشغّل مصباحاً',
				nodes: [
					{ name: 'الرياح', storage: 'Ec' },
					{ name: 'العنفة', storage: 'Ec' },
					{ name: 'الدينامو', storage: 'Ec' },
					{ name: 'المصباح', storage: 'Ei' }
				],
				transfers: ['W', 'W', 'We'],
				missingIdx: 2,
				missingCorrect: 'We (تحويل كهربائي)',
				missingSymbol: 'We'
			}
		];
		const setup = difficulty === 'easy' ? setups[1] : rng.pick(setups);

		const eIn = rng.pick([400, 500, 600, 800, 1000]);
		const qLoss = rng.pick([80, 100, 150, 200]);
		const eUseful = eIn - qLoss;

		const svg = buildEnergyChainTplSvg(
			setup.title,
			setup.nodes,
			setup.transfers.map((tr, i) => (i === setup.missingIdx ? '؟' : tr))
		);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t3_chain_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${setup.missingSymbol}$ (${setup.missingSymbol === 'W' ? 'تحويل ميكانيكي' : 'تحويل كهربائي'}) والطاقة المفيدة $${eUseful}\\,\\text{J}$`,
			[
				{
					text: `$${setup.missingSymbol === 'W' ? 'We' : 'W'}$ والطاقة المفيدة $${eUseful}\\,\\text{J}$`,
					diagnosticFeedback:
						setup.missingSymbol === 'W'
							? 'انتبه: بين العنفة والدينامو يوجد دوران ميكانيكي ($W$) وليس تياراً كهربائياً!'
							: 'انتبه: البطارية أو الدينامو يغذي الجهاز التالي بالتيار الكهربائي ($W_e$).'
				},
				{
					text: `$${setup.missingSymbol}$ والطاقة المفيدة $${eIn + qLoss}\\,\\text{J}$`,
					diagnosticFeedback: 'خطأ في انحفاظ الطاقة! الطاقة المفيدة تساوي الطاقة الداخلة ناقص الضائعة ($E_{\\text{داخلة}} - Q$).'
				},
				{
					text: `$E_i$ (طاقة داخلية) والطاقة المفيدة $${qLoss}\\,\\text{J}$`,
					diagnosticFeedback: '$E_i$ نمط تخزين يكتب تحت الفقاعة وليس فوق السهم، و$${qLoss}\\,\\text{J}$ هي الطاقة الضائعة!'
				}
			],
			rng
		);

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
				questionText: `في السلسلة الطاقوية المرفقة لـ **${setup.title}**، ما رمز التحويل الناقص مكان علامة الاستفهام (؟)؟ وإذا استقبل المحوّل الأخير طاقة قدرها $${eIn}\\,\\text{J}$ وضاع منه حرارياً $Q = ${qLoss}\\,\\text{J}$، فما الطاقة المفيدة المقدمة؟`,
				questionTextAr: `أكمل السلسلة الطاقوية واحسب الطاقة المفيدة:`,
				imageUrl: svgPath,
				imageCaption: `السلسلة الطاقوية: ${setup.title}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الرمز الناقص هو **${setup.missingCorrect}**، وحسب مبدأ انحفاظ الطاقة: $E_{\\text{مفيدة}} = ${eIn} - ${qLoss} = ${eUseful}\\,\\text{J}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `يدرس التلاميذ التركيبة التكنولوجية الممثلة في السلسلة الطاقوية التالية (*${setup.title}*):`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) حدد نمط التحويل الناقص مكان (؟) في المخطط، وفسر دلالة السهم المتقطع $Q$ المتجه نحو المحيط الخارجي.`,
								answer: `1) نمط التحويل الناقص هو *${setup.missingCorrect}*.\nيدل السهم المتقطع $Q$ على *التحويل الحراري غير المفيد* (الضياع الحراري في المحيط).`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `مخطط السلسلة الطاقوية`
							}
						]
					},
					{
						type: 'table',
						headers: ['الجملة الفيزيائية', 'شكل تخزين الطاقة الموافق ($E_c, E_("pp"), E_("pe"), E_i$)'],
						cells: [],
						rows: [
							[
								'ماء محجوز خلف سد على ارتفاع من سطح الأرض',
								{ content: '................', answer: '$E_("pp")$ (طاقة كامنة ثقالية)', mark: '0.5' }
							],
							[
								'نابض مشدود في لعبة أطفال',
								{ content: '................', answer: '$E_("pe")$ (طاقة كامنة مرونية)', mark: '0.5' }
							],
							[
								'بطارية هاتف مشحونة أو وقود سائل',
								{ content: '................', answer: '$E_i$ (طاقة داخلية)', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `3) اكتب نص *مبدأ انحفاظ الطاقة*، ثم احسب الطاقة المفيدة $E_("مفيدة")$ لمحول ثابت المخزون يتلقى طاقة مكتسبة قدرها $${eIn} "J"$ ويضيع منه حرارياً $Q = ${qLoss} "J"$.`,
						answer: `3) *مبدأ انحفاظ الطاقة*: الطاقة لا تستحدث ولا تزول؛ إذا اكتسبت جملة طاقة أو فقدتها فإنها أخذتها من جملة أخرى أو قدمتها لها.\nالحساب: $E_("مفيدة") = E_("مكتسبة") - Q = ${eIn} - ${qLoss} = ${eUseful} "J"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `4) عند اشتغال المصباح النهائي وإضاءة الغرفة، ما هما التحويلان الطاقويان اللذان يقدمهما للغرفة (المفيد وغير المفيد)؟`,
						answer: `4) يقدم المصباح *تحويلاً إشعاعياً* ($E_r$) وهو المفيد للإضاءة، و*تحويلاً حرارياً* ($Q$) وهو غير مفيد.`,
						mark: '1'
					}
				]
			},
			hints: [
				'فوق الأسهم نكتب أنماط التحويل ($W, W_e, Q, E_r$) وتحت الفقاعات نكتب أنماط التخزين ($E_c, E_{pp}, E_{pe}, E_i$).',
				'في نظام دائم: الطاقة المكتسبة تساوي مجموع الطاقة المفيدة والطاقة الحرارية الضائعة $Q$.',
				'المصباح يضيء ($E_r$) ويسخن ($Q$).'
			],
			solutionStepsAr: [
				`الرمز الناقص: ${setup.missingCorrect}، و$Q$ يمثل الضياع الحراري نحو المحيط.`,
				'أشكال التخزين: ماء السد ($E_{pp}$)، النابض ($E_{pe}$)، البطارية ($E_i$).',
				`الطاقة المفيدة: $${eIn} - ${qLoss} = ${eUseful}\\,\\text{J}$.`
			],
			finalAnswer: `${setup.missingSymbol}، E(مفيدة) = ${eUseful} J`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 2: Energy Power P = E/t & Units (W, kW, J, Wh, kWh)
// ═══════════════════════════════════════════════════════════════════════════════

const tplPowerEnergyUnits: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t3_power_energy_units',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'energy',
	titleAr: 'الاستطاعة الطاقوية P = E / t والتحويل بين الوحدات (W, kW, J, kWh)',
	curriculumLessonId: 'phy_lesson_1as_tcl_t3_power_units_electricity_bill',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const appliances = [
			{ name: 'مكواة كهربائية', pW: 1500, hours: 2 },
			{ name: 'مجفف شعر', pW: 1200, hours: 0.5 },
			{ name: 'سخان ماء كهربائي', pW: 2000, hours: 1.5 },
			{ name: 'غسالة ملابس', pW: 1000, hours: 2 },
			{ name: 'مكيف هواء', pW: 1800, hours: 2.5 }
		];
		const app = difficulty === 'easy' ? appliances[0] : rng.pick(appliances);
		const pKW = roundTo(app.pW / 1000, 2);
		const eWh = roundTo(app.pW * app.hours, 1);
		const eKwh = roundTo(eWh / 1000, 3);
		const eJ = Math.round(eWh * 3600);
		const tSec = Math.round(app.hours * 3600);

		const svg = buildPowerChartTplSvg(app.name, app.pW, app.hours);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t3_pow_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$${eKwh}\\,\\text{kWh}$ و $${eJ.toLocaleString('en-US')}\\,\\text{J}$`,
			[
				{
					text: `$${eWh}\\,\\text{kWh}$ و $${eWh}\\,\\text{J}$`,
					diagnosticFeedback: 'خطأ في الوحدات! الضرب $\\text{W} \\times \\text{h}$ يعطي $\\text{Wh}$ لا $\\text{kWh}$، كما أن $1\\,\\text{Wh} = 3600\\,\\text{J}$.'
				},
				{
					text: `$${eKwh}\\,\\text{kWh}$ و $${eWh * 60}\\,\\text{J}$`,
					diagnosticFeedback: 'خطأ: الساعة تحتوي على $3600\\,\\text{s}$ ($60 \\times 60$) وليس $60\\,\\text{s}$ فقط!'
				},
				{
					text: `$${roundTo(app.pW / app.hours, 1)}\\,\\text{kWh}$ و $${eJ.toLocaleString('en-US')}\\,\\text{J}$`,
					diagnosticFeedback: 'خطأ: الطاقة هي الجداء $E = P \\times t$ وليست القسمة $P / t$.'
				}
			],
			rng
		);

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
				questionText: `تشتغل **${app.name}** استطاعتها الكهربائية $P = ${app.pW}\\,\\text{W}$ لمدة $t = ${app.hours}\\,\\text{h}$. ما قيمة الطاقة المحوّلة بالكيلوواط ساعي ($\\text{kWh}$) وبالجول ($\\text{J}$)؟`,
				questionTextAr: `احسب الطاقة المستهلكة بوحدة $\\text{kWh}$ وبوحدة $\\text{J}$:`,
				imageUrl: svgPath,
				imageCaption: `مخطط استطاعة ${app.name}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `$P = ${pKW}\\,\\text{kW}$، إذن $E = ${pKW} \\times ${app.hours} = ${eKwh}\\,\\text{kWh} = ${eWh}\\,\\text{Wh} = ${eWh} \\times 3600 = ${eJ}\\,\\text{J}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تحمل بطاقة بيانات *${app.name}* الدلالة $${app.pW} "W"$، ويُشغَّل هذا الجهاز يومياً لمدة $t = ${app.hours} "h"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) ماذا تعني الدلالة $${app.pW} "W"$ فيزيائياً؟ اكتب العلاقة التي تربط الاستطاعة $P$ والطاقة $E$ والزمن $t$.`,
								answer: `1) تعني الدلالة *استطاعة التحويل الطاقوي* للجهاز (يحوّل $${app.pW}$ جول من الطاقة في كل ثانية).\nالعلاقة: $P = frac(E, t) arrow.r.double E = P times t$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `استطاعة ${app.name} مقارنة بأجهزة أخرى`
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب الطاقة الكهربائية المستهلكة يومياً بوحدة الواط ساعي ($"Wh"$) ثم بوحدة الكيلوواط ساعي ($"kWh"$).`,
						answer: `2) $E = ${app.pW} times ${app.hours} = ${eWh} "Wh"$.\nوبالقسمة على $1000$: $E = frac(${eWh}, 1000) = ${eKwh} "kWh"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) عبّر عن هذه الطاقة اليومية بوحدة *الجول* ($"J"$) في الجملة الدولية ($"SI"$).`,
						answer: `3) $t = ${app.hours} times 3600 = ${tSec} "s"$.\n$E = ${app.pW} times ${tSec} = ${eJ} "J"$ (أو مباشرة $${eWh} times 3600 = ${eJ} "J"$).`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) ما هي المدة الزمنية بالساعات اللازمة لكي يستهلك مصباح $"LED"$ استطاعته $12 "W"$ نفس الطاقة اليومية ($${eWh} "Wh"$)؟`,
						answer: `4) $t = frac(E, P) = frac(${eWh}, 12) = ${roundTo(eWh / 12, 1)} "h"$.`,
						mark: '1'
					}
				]
			},
			hints: [
				'استعمل العلاقة $E = P \\times t$.',
				'حوّل إلى الكيلوواط بالقسمة على $1000$، أو اضرب $\\text{Wh}$ في $3600$ للحصول على الجول.',
				'لحساب الزمن: $t = \\frac{E}{P}$.'
			],
			solutionStepsAr: [
				`الدلالة تعني استطاعة التحويل ($${app.pW}\\,\\text{J/s}$).`,
				`$E = ${eWh}\\,\\text{Wh} = ${eKwh}\\,\\text{kWh}$.`,
				`بالجول: $E = ${eJ}\\,\\text{J}$، وزمن تشغيل LED المكافئ: $${roundTo(eWh / 12, 1)}\\,\\text{h}$.`
			],
			finalAnswer: `${eKwh} kWh = ${eJ} J`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 3: Home Electricity Meter & Tiered Electricity Bill (Sonelgaz)
// ═══════════════════════════════════════════════════════════════════════════════

const tplDomesticElectricityBill: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t3_domestic_electricity_bill',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'energy',
	titleAr: 'قراءة العداد الكهربائي وحساب الفاتورة الكهربائية للمنزل',
	curriculumLessonId: 'phy_lesson_1as_tcl_t3_power_units_electricity_bill',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const oldIdx = rng.int(110, 240) * 100;
		const tranche1Limit = 125;
		const consumedKwh = difficulty === 'easy' ? rng.pick([200, 250, 300]) : rng.pick([225, 275, 325, 375, 425]);
		const newIdx = oldIdx + consumedKwh;

		const rate1 = 1.8;
		const rate2 = 4.2;
		const costT1 = roundTo(tranche1Limit * rate1, 2); // 225 DA
		const remKwh = consumedKwh - tranche1Limit;
		const costT2 = roundTo(remKwh * rate2, 2);
		const totalCost = roundTo(costT1 + costT2, 2);

		const svg = buildElectricMeterTplSvg(oldIdx, newIdx, rate1, rate2);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t3_bill_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`$E = ${consumedKwh}\\,\\text{kWh}$ والمبلغ $= ${totalCost}\\,\\text{DA}$`,
			[
				{
					text: `$E = ${consumedKwh}\\,\\text{kWh}$ والمبلغ $= ${roundTo(consumedKwh * rate2, 2)}\\,\\text{DA}$`,
					diagnosticFeedback: `خطأ: حسبت الاستهلاك كله بسعر الشطر الثاني (${rate2} DA) ونسيت احتساب الشطر الأول (${tranche1Limit} kWh بسعر ${rate1} DA)!`
				},
				{
					text: `$E = ${consumedKwh}\\,\\text{kWh}$ والمبلغ $= ${roundTo(consumedKwh * rate1, 2)}\\,\\text{DA}$`,
					diagnosticFeedback: `خطأ: سعر ${rate1} DA يخص أول ${tranche1Limit} kWh فقط وليس كامل الاستهلاك.`
				},
				{
					text: `$E = ${newIdx}\\,\\text{kWh}$ والمبلغ $= ${roundTo(newIdx * rate2, 2)}\\,\\text{DA}$`,
					diagnosticFeedback: 'خطأ: الاستهلاك هو الفرق (الجديد $-$ القديم) وليس الرقم الجديد وحده!'
				}
			],
			rng
		);

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
				questionText: `سجل العداد الكهربائي لمنزل الرقم القديم $${oldIdx}\\,\\text{kWh}$ والرقم الجديد $${newIdx}\\,\\text{kWh}$. تُحسب التسعيرة بشطرين: أول $${tranche1Limit}\\,\\text{kWh}$ بسعر $${rate1}\\,\\text{DA/kWh}$، وما فاق ذلك بسعر $${rate2}\\,\\text{DA/kWh}$. ما الطاقة المستهلكة ومبلغ الاستهلاك؟`,
				questionTextAr: `احسب الطاقة المستهلكة ومبلغ الفاتورة الصافي:`,
				imageUrl: svgPath,
				imageCaption: 'مقتطف العداد الكهربائي المنزلي والتسعيرة',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `الاستهلاك: $E = ${newIdx} - ${oldIdx} = ${consumedKwh}\\,\\text{kWh}$. الشطر الأول: $${tranche1Limit} \\times ${rate1} = ${costT1}\\,\\text{DA}$، والشطر الثاني: $${remKwh} \\times ${rate2} = ${costT2}\\,\\text{DA}$، والمجموع $= ${totalCost}\\,\\text{DA}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `تلقت أسرة جزائرية فاتورة الكهرباء، فلاحظت القراءتين المسجلتين على العداد الكهربائي الموضح في الوثيقة:\n- الرقم القديم: $${oldIdx} "kWh"$ | الرقم الجديد: $${newIdx} "kWh"$.\n- تسعيرة الشطر الأول (حتى $${tranche1Limit} "kWh"$): $${rate1} "DA/kWh"$ | الشطر الثاني (ما فاق $${tranche1Limit} "kWh"$): $${rate2} "DA/kWh"$.`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب كمية الطاقة الكهربائية المستهلكة $E$ بوحدة $"kWh"$، ثم عبّر عنها بالجول ($"J"$) علماً أن $1 "kWh" = 3.6 times 10^6 "J"$.`,
								answer: `1) $E = ${newIdx} - ${oldIdx} = ${consumedKwh} "kWh"$.\nبالجول: $E = ${consumedKwh} times 3.6 times 10^6 = ${roundTo(consumedKwh * 3.6, 1)} times 10^6 "J"$.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: 'بيانات العداد الكهربائي والتسعيرة'
							}
						]
					},
					{
						type: 'text',
						content: `2) احسب تكلفة الشطر الأول وتكلفة الشطر الثاني، ثم استنتج المبلغ الإجمالي للاستهلاك (دون احتساب الرسوم الثابتة).`,
						answer: `2) الشطر الأول: $${tranche1Limit} times ${rate1} = ${costT1} "DA"$.\nالكمية في الشطر الثاني: $${consumedKwh} - ${tranche1Limit} = ${remKwh} "kWh"$.\nالشطر الثاني: $${remKwh} times ${rate2} = ${costT2} "DA"$.\nالمجموع: $${costT1} + ${costT2} = ${totalCost} "DA"$.`,
						mark: '2'
					},
					{
						type: 'text',
						content: `3) لو علمت أن مكيف الهواء ($P = 1.5 "kW"$) اشتغل لمدة $4$ ساعات يومياً خلال $30$ يوماً من تلك الفترة، كم استهلك المكيف وحده من $"kWh"$؟`,
						answer: `3) $E_("مكيف") = 1.5 times 4 times 30 = 180 "kWh"$.`,
						mark: '1.5'
					},
					{
						type: 'text',
						content: `4) قدّم نصيحتين عمليتين للأسرة لتقليص قيمة فاتورتها القادمة.`,
						answer: `4) 1) استبدال المصابيح القديمة بمصابيح $"LED"$ الاقتصادية. 2) ضبط المكيف عند $25 degree "C"$ وإطفاء الأجهزة كلياً بدل وضع الاستعداد.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الاستهلاك يساوي المؤشر الجديد ناقص المؤشر القديم.',
				`قسّم الطاقة المستهلكة إلى جزأين: $${tranche1Limit}\\,\\text{kWh}$ بالشطر الأول، وما تبقى بالشطر الثاني.`,
				'احسب استهلاك المكيف بـ $E = P(\\text{kW}) \\times t(\\text{h})$.'
			],
			solutionStepsAr: [
				`الاستهلاك: $E = ${newIdx} - ${oldIdx} = ${consumedKwh}\\,\\text{kWh}$.`,
				`التكلفة: $${costT1} + ${costT2} = ${totalCost}\\,\\text{DA}$.`,
				`استهلاك المكيف خلال 30 يوماً: $180\\,\\text{kWh}$.`
			],
			finalAnswer: `${consumedKwh} kWh (${totalCost} DA)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 4: Energy Efficiency, Renewable Energies & Conservation (Experimental)
// ═══════════════════════════════════════════════════════════════════════════════

const tplEfficiencyRenewables: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t3_efficiency_renewables',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'energy',
	isExperimental: true,
	titleAr: 'المردود الطاقوي والطاقات المتجددة (الشمسية والريحية) والترشيد',
	curriculumLessonId: 'phy_lesson_1as_tcl_t3_efficiency_renewables_conservation',
	defaultPoints: 6,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const devices = [
			{ name: 'مصباح LED', eIn: 200, effPct: 85 },
			{ name: 'محرك كهربائي', eIn: 500, effPct: 80 },
			{ name: 'لوح شمسي حديث', eIn: 1000, effPct: 20 },
			{ name: 'عنفة ريحية', eIn: 800, effPct: 45 },
			{ name: 'مصباح متوهج تقليدي', eIn: 400, effPct: 10 }
		];
		const dev = difficulty === 'easy' ? devices[1] : rng.pick(devices);
		const eUseful = Math.round((dev.eIn * dev.effPct) / 100);
		const qLoss = dev.eIn - eUseful;

		const svg = buildEfficiencyBarTplSvg(dev.name, dev.eIn, eUseful);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t3_eff_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`المردود $\\eta = ${dev.effPct}\\%$ والضياع الحراري $Q = ${qLoss}\\,\\text{J}$`,
			[
				{
					text: `المردود $\\eta = ${100 - dev.effPct}\\%$ والضياع الحراري $Q = ${eUseful}\\,\\text{J}$`,
					diagnosticFeedback: 'عكست النسبة! لقد حسبت نسبة الطاقة الضائعة بدلاً من نسبة الطاقة المفيدة.'
				},
				{
					text: `المردود $\\eta = ${roundTo((dev.eIn / eUseful) * 100, 1)}\\%$ والضياع $Q = ${qLoss}\\,\\text{J}$`,
					diagnosticFeedback: 'مستحيل أن يفوق المردود $100\\%$! المردود هو الطاقة المفيدة مقسومة على الطاقة الكلية.'
				},
				{
					text: `المردود $\\eta = ${dev.effPct}\\%$ والضياع الحراري $Q = ${dev.eIn + eUseful}\\,\\text{J}$`,
					diagnosticFeedback: 'المردود صحيح لكن الضياع $Q$ يساوي الفرق $E_{\\text{كلية}} - E_{\\text{مفيدة}}$ وليس الجمع.'
				}
			],
			rng
		);

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
				questionText: `في تجربة مخبرية على **${dev.name}**، استهلك الجهاز طاقة كلية قدرها $${dev.eIn}\\,\\text{J}$ وقدّم طاقة مفيدة قدرها $${eUseful}\\,\\text{J}$. ما قيمة المردود الطاقوي $\\eta$ وما مقدار الطاقة الضائعة $Q$؟`,
				questionTextAr: `احسب المردود الطاقوي والطاقة الحرارية الضائعة $Q$:`,
				imageUrl: svgPath,
				imageCaption: `مخطط المردود الطاقوي لـ ${dev.name}`,
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `المردود: $\\eta = \\frac{${eUseful}}{${dev.eIn}} \\times 100\\% = ${dev.effPct}\\%$، والطاقة الضائعة: $Q = ${dev.eIn} - ${eUseful} = ${qLoss}\\,\\text{J}$.`
			},
			sujetExercise: {
				points: this.defaultPoints,
				instruction: `أجرى فوج من التلاميذ قياساً للطاقة الداخلة والمفيدة لجهاز *${dev.name}* كما هو مبين في المخطط البياني المقابل:`,
				content: [
					{
						type: 'columns',
						widths: ['1.35fr', '1.15fr'],
						children: [
							{
								type: 'text',
								content: `1) احسب مقدار الطاقة الحرارية الضائعة $Q$، وفسّر لماذا يكون المردود الطاقوي لأي محول دوماً أقل من $100%$.`,
								answer: `1) $Q = E_("مستهلكة") - E_("مفيدة") = ${dev.eIn} - ${eUseful} = ${qLoss} "J"$.\nيكون المردود دوماً أقل من $100%$ لأن جزءاً من الطاقة يضيع حتماً نحو المحيط على شكل حرارة ($Q > 0$) بسبب الاحتكاك أو تسخن المقاومات.`,
								mark: '1.5'
							},
							{
								type: 'image',
								src: svgPath,
								caption: `المردود الطاقوي لـ ${dev.name}`
							}
						]
					},
					{
						type: 'text',
						content: `2) اكتب عبارة المردود الطاقوي، ثم احسب قيمته المئوية لهذا الجهاز.`,
						answer: `2) المردود $= frac(E_("مفيدة"), E_("مستهلكة")) times 100% = frac(${eUseful}, ${dev.eIn}) times 100% = ${dev.effPct}%$.`,
						mark: '2'
					},
					{
						type: 'table',
						headers: ['مصدر الطاقة', 'التصنيف (متجددة نظيفة / غير متجددة أحفورية)'],
						cells: [],
						rows: [
							[
								'الإشعاع الشمسي في الصحراء الجزائرية',
								{ content: '................', answer: 'طاقة متجددة نظيفة', mark: '0.5' }
							],
							[
								'الغاز الطبيعي والبترول',
								{ content: '................', answer: 'طاقة غير متجددة (أحفورية)', mark: '0.5' }
							],
							[
								'طاقة الرياح (محطة أدرار)',
								{ content: '................', answer: 'طاقة متجددة نظيفة', mark: '0.5' }
							]
						],
						headerBackground: true,
						borders: 'grid',
						width: 'full'
					} as ContentBlock,
					{
						type: 'text',
						content: `4) اذكر فائدتين بيئيتين واقتصاديتين للاعتماد على الطاقات المتجددة في الجزائر.`,
						answer: `4) 1) تقليل انبعاثات غاز ثنائي أكسيد الكربون $"CO"_2$ والاحتباس الحراري.\n2) ديمومة المصدر وعدم نفاده مع توفير الثروات الأحفورية وخفض تكاليف الكهرباء على المدى الطويل.`,
						mark: '1'
					}
				]
			},
			hints: [
				'الضياع الحراري $Q = E_{\\text{مستهلكة}} - E_{\\text{مفيدة}}$.',
				'المردود المئوي $= \\frac{E_{\\text{مفيدة}}}{E_{\\text{مستهلكة}}} \\times 100\\%$ ودائماً أصغر من $100\\%$.',
				'الشمس والرياح والمياه طاقات متجددة؛ والنفط والغاز والفحم غير متجددة.'
			],
			solutionStepsAr: [
				`الطاقة الضائعة: $Q = ${dev.eIn} - ${eUseful} = ${qLoss}\\,\\text{J}$.`,
				`المردود: $\\eta = \\frac{${eUseful}}{${dev.eIn}} \\times 100\\% = ${dev.effPct}\\%$.`,
				'الشمس والرياح طاقات متجددة نظيفة تقلل تلوث الهواء والاحتباس الحراري.'
			],
			finalAnswer: `${dev.effPct}% (Q = ${qLoss} J)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Template 5 (Integration): Home Solar Transition & Energy Bill Audit
// ═══════════════════════════════════════════════════════════════════════════════

const tplIntegrationHomeSolarAudit: PhysicsParameterizedTemplate = {
	id: 'phy_tpl_1as_tcl_t3_integration_home_solar_audit',
	grade: '1as_tcl',
	trimesterId: 't3',
	domain: 'integration',
	isIntegration: true,
	titleAr: 'وضعية إدماجية (الإنسان والطاقة): الطاقة الشمسية، الفاتورة، وترشيد الاستهلاك',
	curriculumLessonId: 'phy_lesson_1as_tcl_t3_efficiency_renewables_conservation',
	defaultPoints: 8,
	generate(seed: number, difficulty: Difficulty = 'medium'): PhysicsGeneratedExerciseInstance {
		const rng = new SeededRng(seed);
		const cleanSeed = Math.abs(Math.trunc(seed));

		const solarInW = rng.pick([1000, 1500, 2000]);
		const solarEff = difficulty === 'easy' ? 20 : rng.pick([18, 20, 22]);
		const solarOutW = Math.round((solarInW * solarEff) / 100);
		const solarLossW = solarInW - solarOutW;

		const oldIdx = rng.int(150, 250) * 100;
		const consumedKwh = rng.pick([200, 250, 300, 350]);
		const newIdx = oldIdx + consumedKwh;
		const avgRate = 4;
		const gridCost = consumedKwh * avgRate;

		const lampCount = rng.pick([6, 8, 10]);
		const dailyHours = rng.pick([4, 5]);
		const days = 30;
		const oldLampsKwh = roundTo((lampCount * 75 * dailyHours * days) / 1000, 1);
		const ledLampsKwh = roundTo((lampCount * 10 * dailyHours * days) / 1000, 1);
		const savedKwh = roundTo(oldLampsKwh - ledLampsKwh, 1);
		const savedDa = roundTo(savedKwh * avgRate, 1);

		const svg = buildIntegrationHomeAuditSvg(solarInW, solarOutW, oldIdx, newIdx, lampCount);
		const svgPath = savePhysicsSvgAsset(`phy_1as_tcl_t3_int_home_${difficulty}_s${cleanSeed}`, svg);

		const mcq = buildUniqueMcqOptions(
			`مردود اللوح $${solarEff}\\%$ والتوفير الشهري $${savedKwh}\\,\\text{kWh}$ ($${savedDa}\\,\\text{DA}$)`,
			[
				{
					text: `مردود اللوح $${100 - solarEff}\\%$ والتوفير الشهري $${savedKwh}\\,\\text{kWh}$`,
					diagnosticFeedback: 'خطأ في حساب مردود اللوح: قسمت الطاقة الضائعة بدلاً من الطاقة المفيدة ($P_{\\text{مفيدة}} / P_{\\text{كلية}}$).'
				},
				{
					text: `مردود اللوح $${solarEff}\\%$ والتوفير الشهري $${ledLampsKwh}\\,\\text{kWh}$`,
					diagnosticFeedback: `$${ledLampsKwh}\\,\\text{kWh}$ هو استهلاك مصابيح LED وليس مقدار التوفير (الفرق $E_{\\text{قديم}} - E_{\\text{LED}}$)!`
				},
				{
					text: `مردود اللوح $${solarEff}\\%$ والتوفير الشهري $${roundTo(savedKwh * 1000, 0)}\\,\\text{kWh}$`,
					diagnosticFeedback: 'نسيت التحويل من الواط ساعي ($\\text{Wh}$) إلى الكيلوواط ساعي ($\\text{kWh}$) بالقسمة على $1000$!'
				}
			],
			rng
		);

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
				questionText: `ركّبت عائلة لوحاً شمسياً يستقبل إشعاعاً استطاعته $${solarInW}\\,\\text{W}$ وينتج استطاعة كهربائية $${solarOutW}\\,\\text{W}$، كما استبدلت $${lampCount}$ مصابيح متوهجة ($75\\,\\text{W}$) بمصابيح LED ($10\\,\\text{W}$) تشتغل $${dailyHours}\\,\\text{h}$ يومياً طوال $30$ يوماً (بسعر $${avgRate}\\,\\text{DA/kWh}$). ما مردود اللوح الشمسي وما الطاقة الموفرة شهرياً؟`,
				questionTextAr: `ما مردود اللوح الشمسي والطاقة الموفرة شهرياً من المصابيح؟`,
				imageUrl: svgPath,
				imageCaption: 'التدقيق الطاقوي المنزلي واللوح الشمسي',
				questionData: {
					options: mcq.options,
					correctIndex: mcq.correctIndices[0],
					correctIndices: mcq.correctIndices,
					correctIndexes: mcq.correctIndices
				},
				explanation: `مردود اللوح $\\eta = \\frac{${solarOutW}}{${solarInW}} \\times 100\\% = ${solarEff}\\%$. واستهلاك القديمة $${oldLampsKwh}\\,\\text{kWh}$ مقابل $${ledLampsKwh}\\,\\text{kWh}$ لـ LED، فالتوفير $= ${savedKwh}\\,\\text{kWh}$ ($${savedDa}\\,\\text{DA}$).`
			},
			sujetExercise: {
				points: this.defaultPoints,
				customTitle: 'الوضعية الإدماجية — الإنسان والطاقة',
				instruction: `قررت عائلة جزائرية خفض فاتورتها الكهربائية عبر تركيب نظام لوح شمسي وترشيد استهلاك الإنارة المنزلية، بالاعتماد على معطيات الوثيقة المرفقة.`,
				content: [
					{
						type: 'image',
						src: svgPath,
						caption: 'بطاقة التدقيق الطاقوي: السلسلة الطاقوية والعداد والمصابيح',
						width: 350
					},
					{
						type: 'text',
						content: `*الجزء الأول: السلسلة الطاقوية والمردود (2.5 نقطة)*\n1) أعد رسم السلسلة الطاقوية لتشغيل البطارية باللوح الشمسي (` +
							`الشمس ← اللوح الشمسي ← البطارية` +
							`) موضحاً أشكال التخزين تحت الفقاعات وأنماط التحويل فوق الأسهم مع الضياع الحراري $Q$.\n2) يتلقى اللوح إشعاعاً شمسياً استطاعته $${solarInW} "W"$ وينتج استطاعة كهربائية مفيدة $${solarOutW} "W"$. احسب مردود اللوح الشمسي واستنتج الاستطاعة الضائعة $Q$.`,
						answer: `1) الشمس ($E_i$) $arrow.r^(E_r)$ اللوح الشمسي ($E_i$) $arrow.r^(W_e)$ البطارية ($E_i$)، مع سهم متقطع $Q$ من اللوح نحو المحيط.\n2) المردود: $frac(${solarOutW}, ${solarInW}) times 100% = ${solarEff}%$.\nالاستطاعة الضائعة: $P_("ضائعة") = ${solarInW} - ${solarOutW} = ${solarLossW} "W"$.`,
						mark: '2.5'
					},
					{
						type: 'text',
						content: `*الجزء الثاني: قراءة العداد وحساب الفاتورة (3 نقاط)*\n1) من مقتطف العداد (القديم $${oldIdx} "kWh"$، الجديد $${newIdx} "kWh"$), احسب الطاقة المستهلكة من الشبكة بالكيلوواط ساعي ($"kWh"$) ثم بالجول ($"J"$).\n2) احسب تكلفة هذا الاستهلاك بالدينار الجزائري ($"DA"$) إذا كان السعر المتوسط للوحدة هو $${avgRate} "DA/kWh"$.`,
						answer: `1) $E = ${newIdx} - ${oldIdx} = ${consumedKwh} "kWh"$.\nبالجول: $E = ${consumedKwh} times 3.6 times 10^6 = ${roundTo(consumedKwh * 3.6, 1)} times 10^6 "J"$.\n2) التكلفة: $${consumedKwh} times ${avgRate} = ${gridCost} "DA"$.`,
						mark: '3'
					},
					{
						type: 'text',
						content: `*الجزء الثالث: ترشيد الاستهلاك ومصابيح LED (2.5 نقطة)*\n1) احسب الطاقة التي توفرها الأسرة خلال $30$ يوماً عند استبدال $${lampCount}$ مصابيح متوهجة ($75 "W"$) بـ $${lampCount}$ مصابيح $"LED"$ ($10 "W"$) تشتغل $${dailyHours}$ ساعات يومياً، واستنتج المبلغ المالي الموفَّر.\n2) اقترح سلوكين إضافيين لترشيد الطاقة الكهربائية في المنزل.`,
						answer: `1) استهلاك المصابيح القديمة: $E_1 = frac(${lampCount} times 75 times ${dailyHours} times ${days}, 1000) = ${oldLampsKwh} "kWh"$.\nاستهلاك مصابيح $"LED"$: $E_2 = frac(${lampCount} times 10 times ${dailyHours} times ${days}, 1000) = ${ledLampsKwh} "kWh"$.\nالطاقة الموفرة: $Delta E = ${oldLampsKwh} - ${ledLampsKwh} = ${savedKwh} "kWh"$.\nالمبلغ الموفر: $${savedKwh} times ${avgRate} = ${savedDa} "DA"$.\n2) إطفاء الأجهزة كلياً بدل تركها في وضع الاستعداد، واستغلال الإنارة الطبيعية والعزل الحراري.`,
						mark: '2.5'
					}
				]
			},
			hints: [
				'في السلسلة الطاقوية، ترسل الشمس إشعاعاً ($E_r$) واللوح يقدم تحويلاً كهربائياً ($W_e$).',
				'الاستهلاك = الجديد $-$ القديم، و$1\\,\\text{kWh} = 3.6 \\times 10^6\\,\\text{J}$.',
				'قارن استهلاك الـ $75\\,\\text{W}$ مع الـ $10\\,\\text{W}$ على مدى $30$ يوماً بالكيلوواط ساعي.'
			],
			solutionStepsAr: [
				`مردود اللوح الشمسي: $${solarEff}\\%$ والاستطاعة الضائعة $${solarLossW}\\,\\text{W}$.`,
				`العداد: $${consumedKwh}\\,\\text{kWh}$ بتكلفة $${gridCost}\\,\\text{DA}$.`,
				`توفير مصابيح LED خلال 30 يوماً: $${savedKwh}\\,\\text{kWh}$ ($${savedDa}\\,\\text{DA}$).`
			],
			finalAnswer: `η = ${solarEff}%، التوفير = ${savedKwh} kWh (${savedDa} DA)`
		};
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// Exported Trimester 3 Parameterized Templates for 1AS TCL Physics
// ═══════════════════════════════════════════════════════════════════════════════

export const PHYSICS_TEMPLATES_1AS_TCL_T3: PhysicsParameterizedTemplate[] = [
	tplEnergyFormsChains,
	tplPowerEnergyUnits,
	tplDomesticElectricityBill,
	tplEfficiencyRenewables,
	tplIntegrationHomeSolarAudit
];
