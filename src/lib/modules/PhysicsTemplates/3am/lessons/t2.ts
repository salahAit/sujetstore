import type { PhysicsInteractiveLessonData } from '../../types';

function wrapSvg(width: number, height: number, body: string): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="background:#ffffff;font-family:'Arabic Transparent',Arial,sans-serif">${body}</svg>`;
}

export const PHYSICS_LESSONS_3AM_T2: PhysicsInteractiveLessonData[] = [
	// ═══════════════════════════════════════════════════════════════════════════
	// 6. السلسلة الطاقوية
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t2_energy_chain',
		slug: 'phy-3am-t2-energy-chain',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: السلسلة الطاقوية، انحفاظ الطاقة، واستطاعة التحويل',
		order: 6,
		titleAr: 'السلسلة الطاقوية (أنماط تخزين الطاقة وأنماط تحويلها)',
		objectives: [
			'التمييز بين أنماط تخزين الطاقة: الطاقة الحركية (Ec)، الطاقة الكامنة الثقالية (Epp)، الطاقة الكامنة المرونية (Epe)، والطاقة الداخلية (Ei)',
			'التمييز بين أنماط تحويل الطاقة: التحويل الميكانيكي (W)، التحويل الكهربائي (We)، التحويل الحراري (Q)، والتحويل بالإشعاع (Er)',
			'تحويل السلسلة الوظيفية إلى سلسلة طاقوية لتركيبة تكنولوجية'
		],
		keywordsAr: [
			'السلسلة الطاقوية',
			'أنماط التخزين',
			'أنماط التحويل',
			'Ec',
			'Epp',
			'Epe',
			'Ei',
			'W',
			'We',
			'Q',
			'Er'
		],
		discover: {
			scenarioAr:
				'في ورشة التكنولوجيا بالمتوسطة، بنى تلاميذ عربة صغيرة تتحرك بواسطة بطارية ومحرك كهربائي. بعد رسم السلسلة الوظيفية (`البطارية ← المحرك ← العربة`)، طلب منهم الأستاذ استبدال أفعال الحالة وأفعال الأداء بالرموز العلمية للطاقة! كيف نعبّر عن الطاقة المخزنة في كل جملة والطاقة المحوّلة بينها؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">الانتقال من السلسلة الوظيفية إلى السلسلة الطاقوية</text>
				<defs><marker id="eArr1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#2563eb"/></marker><marker id="qArr1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#dc2626"/></marker></defs>
				<ellipse cx="90" cy="88" rx="52" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>
				<text x="90" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">البطارية</text>
				<text x="90" y="130" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#059669">Ei</text>
				<line x1="145" y1="88" x2="205" y2="88" stroke="#2563eb" stroke-width="2" marker-end="url(#eArr1)"/>
				<text x="175" y="76" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">We</text>
				<ellipse cx="262" cy="88" rx="52" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>
				<text x="262" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">المحرك</text>
				<text x="262" y="130" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#059669">Ec</text>
				<line x1="317" y1="88" x2="377" y2="88" stroke="#2563eb" stroke-width="2" marker-end="url(#eArr1)"/>
				<text x="347" y="76" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">W</text>
				<ellipse cx="434" cy="88" rx="52" ry="24" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>
				<text x="434" y="93" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">العربة</text>
				<text x="434" y="130" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#059669">Ec</text>
				<line x1="262" y1="112" x2="262" y2="156" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#qArr1)"/>
				<text x="276" y="150" font-size="11" font-weight="bold" fill="#dc2626">Q (للمحيط)</text>
				<line x1="434" y1="112" x2="434" y2="156" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,3" marker-end="url(#qArr1)"/>
				<text x="448" y="150" font-size="11" font-weight="bold" fill="#dc2626">Q (للمحيط)</text>
				<text x="280" y="185" text-anchor="middle" font-size="11" fill="#475569">تحت الفقاعات: أنماط التخزين (Ei, Ec)  |  فوق الأسهم: أنماط التحويل (We, W, Q)</text>`
			),
			steps: [
				{
					promptAr:
						'تخزّن البطارية طاقة كيميائية مجهرية في موادها الداخلية، فهل نمط تخزينها حركي ($E_c$) أم داخلي ($E_i$)؟',
					hintAr: 'الكلمة الأولى في «طاقة داخلية» هي internal.',
					expectedInput: 'Ei',
					revealAr:
						'نمط التخزين في البطارية (والوقود، والأجسام الساخنة، والشمس) هو **الطاقة الداخلية ($E_i$)**.'
				},
				{
					promptAr:
						'بعد تفرغ البطارية، يمر تيار كهربائي لتشغيل المحرك. ما رمز نمط التحويل الذي تكتبه فوق السهم بين البطارية والمحرك؟',
					hintAr: 'التحويل الكهربائي رمزه $W_e$.',
					expectedInput: 'We',
					revealAr: 'يُكتب فوق السهم رمز **التحويل الكهربائي ($W_e$)**.'
				},
				{
					promptAr:
						'عندما يدور المحرك ويسخن قليلاً، يتحول جزء من الطاقة إلى حرارة تضيع في الهواء المحيط. ما رمز هذا التحويل الحراري غير المفيد؟',
					hintAr: 'الحرارة رمزها $Q$.',
					expectedInput: 'Q',
					revealAr:
						'يُمثل الضياع الحراري في المحيط بسهم متقطع يحمل رمز **التحويل الحراري ($Q$)**.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**أنماط تخزين الطاقة (تُكتب تحت الفقاعات بدلاً من أفعال الحالة)**:\n- **طاقة حركية ($E_c$)**: يمتلكها كل جسم في حالة حركة (عربة تسير، عنفة تدور، ماء يتدفق).\n- **طاقة كامنة ثقالية ($E_{pp}$)**: يمتلكها كل جسم موجود على ارتفاع عن سطح الأرض (ماء السد، حجر معلق).\n- **طاقة كامنة مرونية ($E_{pe}$)**: يمتلكها كل جسم مرن مضغوط أو ممدد أو مشدود (نابض، مطاط).\n- **طاقة داخلية ($E_i$)**: ترتبط بالحالة المجهرية والحرارية والكيميائية للجملة (بطارية، وقود، شمس، مصباح متوهج يسخن، ماء ساخن).',
				'**أنماط تحويل الطاقة (تُكتب فوق الأسهم بدلاً من أفعال الأداء)**:\n- **تحويل ميكانيكي ($W$)**: عند تحريك أو تدوير جسم بفضل قوة.\n- **تحويل كهربائي ($W_e$)**: عند مرور تيار كهربائي لتغذية جهاز.\n- **تحويل حراري ($Q$)**: عند تسخين جسم أو ضياع حرارة نحو المحيط.\n- **تحويل بالإشعاع ($E_r$)**: عند إرسال ضوء أو أشعة (مثل الشمس أو المصباح نحو الوسط الخارجي).'
			],
			visualSvg: wrapSvg(
				560,
				200,
				`<rect x="10" y="10" width="540" height="180" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<rect x="24" y="24" width="250" height="152" rx="10" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
				<text x="149" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">أنماط تخزين الطاقة (تحت الفقاعة)</text>
				<text x="149" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">Ec : طاقة حركية (حركة / دوران)</text>
				<text x="149" y="98" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">Epp : كامنة ثقالية (ارتفاع عن الأرض)</text>
				<text x="149" y="124" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">Epe : كامنة مرونية (نابض / مطاط)</text>
				<text x="149" y="150" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">Ei : طاقة داخلية (بطارية / وقود / حرارة)</text>
				<rect x="286" y="24" width="250" height="152" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
				<text x="411" y="46" text-anchor="middle" font-size="13" font-weight="bold" fill="#1d4ed8">أنماط تحويل الطاقة (فوق السهم)</text>
				<text x="411" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">W : تحويل ميكانيكي (يدير / يسحب)</text>
				<text x="411" y="98" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">We : تحويل كهربائي (يغذي بالتيار)</text>
				<text x="411" y="124" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">Q : تحويل حراري (يسخن / يضيّع حرارة)</text>
				<text x="411" y="150" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">Er : تحويل إشعاعي (ينير / يشع)</text>`
			),
			visualCaptionAr: 'الرموز الأربعة لأنماط التخزين والرموز الأربعة لأنماط التحويل في السلسلة الطاقوية',
			examples: [
				{
					problemAr:
						'حوّل السلسلة الوظيفية لشحن هاتف نقال عبر لوح شمسي: `الشمس ← اللوح الشمسي ← البطارية` إلى سلسلة طاقوية.',
					solutionAr:
						'الفقاعات وأنماط التخزين تحتها: **الشمس** ($E_i$) $\\xrightarrow{E_r}$ **اللوح الشمسي** ($E_i$) $\\xrightarrow{W_e}$ **البطارية** ($E_i$)، مع أسهم متقطعة للتحويل الحراري $Q$ نحو المحيط.'
				},
				{
					problemAr:
						'ما السلسلة الطاقوية لحجر يسقط ليدير بكرة ثم منوبة ثم مصباحاً يضيء الغرفة؟',
					solutionAr:
						'**الحجر + الأرض** ($E_{pp} + E_c$) $\\xrightarrow{W}$ **البكرة** ($E_c$) $\\xrightarrow{W}$ **المنوبة** ($E_c$) $\\xrightarrow{W_e}$ **المصباح** ($E_i$) $\\xrightarrow{E_r + Q}$ **المحيط (الغرفة)**.'
				}
			],
			watchOutAr:
				'تذكّر أن الطاقة الكامنة الثقالية ($E_{pp}$) تخص جملة `(جسم + أرض)` معاً عند الارتفاع، وأن المصباح المتوهج يخزن طاقة داخلية ($E_i$) ويحوّلها إلى المحيط على شكل إشعاع ($E_r$ مفيد) وحرارة ($Q$ غير مفيدة).'
		},
		practice: [
			{
				questionAr:
					'ما نمط تخزين الطاقة في جملة **نابض مشدود** ونمط تخزين الطاقة في **ماء محجوز خلف سدٍّ مرتفع** على الترتيب؟',
				options: ['$E_c$ و $E_i$', '$E_{pe}$ و $E_{pp}$', '$E_{pp}$ و $E_{pe}$', '$E_i$ و $E_c$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$E_c$ للحركة و $E_i$ للطاقة الداخلية.',
					'أحسنت! النابض المشدود يخزن طاقة كامنة مرونية ($E_{pe}$)، والماء المرتفع يخزن طاقة كامنة ثقالية ($E_{pp}$).',
					'انتبه للترتيب: المرونية ($E_{pe}$) للنابض، والثقالية ($E_{pp}$) للارتفاع.',
					'لا يتحرك الماء المحجوز بعد، والنابض الساكن يخزن طاقة كامنة مرونية.'
				],
				explanationAr:
					'المرونة ترتبط بـ $E_{pe}$ (elastic potential energy)، والارتفاع عن الأرض يرتبط بـ $E_{pp}$ (gravitational potential energy).'
			},
			{
				questionAr:
					'في السلسلة الطاقوية لمدفأة كهربائية تسخن هواء الغرفة: `المأخذ (أو المنوبة) ← المقاومة الكهربائية ← الغرفة`. ما نمطا التحويل فوق السهمين على الترتيب؟',
				options: ['$W$ ثم $E_r$', '$W_e$ ثم $Q$', '$Q$ ثم $W_e$', '$E_r$ ثم $W$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$W$ للتحويل الميكانيكي وليس الكهربائي.',
					'ممتاز! المأخذ يمد المقاومة بتحويل كهربائي $W_e$، والمقاومة تسخن الغرفة بتحويل حراري $Q$.',
					'عكست الترتيب: الكهرباء أولاً ثم الحرارة.',
					'المدفأة الكهربائية دورها الأساسي التسخين ($Q$) وليس الميكانيك ($W$).'
				],
				explanationAr:
					'تتغذى مقاومة المدفأة كهربائياً ($W_e$) وتحوّل الطاقة إلى الغرفة حرارياً ($Q$).'
			},
			{
				questionAr:
					'في السلسلة الطاقوية لتجفيف الملابس تحت أشعة الشمس: `الشمس ← الملابس المبللة`. ما نمط التحويل المفيد الذي يربط الشمس بالملابس؟',
				options: ['$W$', '$W_e$', '$E_r$', '$E_c$'],
				correctIndex: 2,
				diagnosticFeedback: [
					'الشمس لا تدفع الملابس ميكانيكياً.',
					'لا يوجد تيار كهربائي بين الشمس والملابس.',
					'صحيح! الشمس ترسل طاقتها عبر الفضاء بتحويل إشعاعي ($E_r$).',
					'$E_c$ نمط تخزين وليس نمط تحويل.'
				],
				explanationAr:
					'تصل طاقة الشمس عبر الضوء والأشعة بواسطة التحويل بالإشعاع ($E_r$).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 7. مبدأ انحفاظ الطاقة والحصيلة الطاقوية
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t2_energy_conservation_balance',
		slug: 'phy-3am-t2-energy-conservation-balance',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: السلسلة الطاقوية، انحفاظ الطاقة، واستطاعة التحويل',
		order: 7,
		titleAr: 'مبدأ انحفاظ الطاقة والحصيلة الطاقوية (التحويل المفيد وغير المفيد)',
		objectives: [
			'صياغة مبدأ انحفاظ الطاقة والتعبير عنه بالعلاقة الرمزية E_نهائية = E_ابتدائية + E_مكتسبة - E_مقدمة',
			'التمييز بين التحويل المفيد والتحويل غير المفيد للطاقة',
			'تمثيل الحصيلة الطاقوية لجملة بين لحظتين باستعمال نموذج الفقاعة والأعمدة'
		],
		keywordsAr: [
			'مبدأ انحفاظ الطاقة',
			'الحصيلة الطاقوية',
			'الفقاعة والأعمدة',
			'التحويل المفيد',
			'التحويل غير المفيد'
		],
		discover: {
			scenarioAr:
				'شغّل أمين سيارة لعبة تشتغل ببطارية كهربائية، وبعد مدة توقفت السيارة وسخنت البطارية قليلاً! تساءل أمين: «أين ذهبت الطاقة التي كانت في البطارية؟ هل فنيت واختفت أم تحوّلت؟» كيف نثبت أن الطاقة محفوظة ونمثّل تغيرها بين لحظتين؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="32" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">الحصيلة الطاقوية (نموذج الفقاعة والأعمدة)</text>
				<defs><marker id="bArr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>
				<g transform="translate(26,44)">
					<rect x="0" y="0" width="242" height="146" rx="10" fill="#ffffff" stroke="#2563eb" stroke-width="1.4"/>
					<text x="121" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">جملة: البطارية (طاقتها تتناقص)</text>
					<ellipse cx="121" cy="84" rx="52" ry="44" fill="#eff6ff" stroke="#2563eb" stroke-width="1.7"/>
					<rect x="109" y="54" width="24" height="58" fill="#ffffff" stroke="#1e3a8a" stroke-width="1.4"/>
					<rect x="110" y="88" width="22" height="23" fill="#93c5fd"/>
					<line x1="121" y1="58" x2="121" y2="86" stroke="#dc2626" stroke-width="2" marker-end="url(#bArr)"/>
					<text x="148" y="88" font-size="11.5" font-weight="bold" fill="#1e3a8a">Ei</text>
					<line x1="173" y1="84" x2="225" y2="84" stroke="#2563eb" stroke-width="2" marker-end="url(#bArr)"/>
					<text x="200" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#2563eb">We + Q</text>
					<text x="121" y="140" text-anchor="middle" font-size="10.5" fill="#475569">عمود يتناقص (سهم نازل)</text>
				</g>
				<g transform="translate(292,44)">
					<rect x="0" y="0" width="242" height="146" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="1.4"/>
					<text x="121" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">جملة: العربة (تتسارع من السكون)</text>
					<ellipse cx="121" cy="84" rx="52" ry="44" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.7"/>
					<rect x="109" y="54" width="24" height="58" fill="#ffffff" stroke="#166534" stroke-width="1.4"/>
					<rect x="110" y="60" width="22" height="51" fill="#86efac"/>
					<line x1="121" y1="108" x2="121" y2="62" stroke="#16a34a" stroke-width="2" marker-end="url(#bArr)"/>
					<text x="148" y="88" font-size="11.5" font-weight="bold" fill="#166534">Ec</text>
					<line x1="16" y1="84" x2="67" y2="84" stroke="#16a34a" stroke-width="2" marker-end="url(#bArr)"/>
					<text x="40" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">W</text>
					<line x1="173" y1="84" x2="225" y2="84" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="4,3" marker-end="url(#bArr)"/>
					<text x="200" y="74" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">Q</text>
					<text x="121" y="140" text-anchor="middle" font-size="10.5" fill="#475569">عمود يتزايد (سهم صاعد)</text>
				</g>`
			),
			steps: [
				{
					promptAr:
						'هل تفنى الطاقة التي كانت مخزنة في البطارية أم تتحوّل من نمط إلى آخر؟',
					hintAr: 'تذكّر نص مبدأ انحفاظ الطاقة.',
					expectedInput: 'تتحول من نمط إلى آخر ولا تفنى',
					revealAr:
						'**الطاقة لا تُستحدث ولا تزول** (لا تفنى)، بل **تتحوّل** من شكل إلى آخر (من $E_i$ في البطارية إلى $W_e$ ثم $E_c$ وحرارة $Q$).'
				},
				{
					promptAr:
						'في مصباح كهربائي يستهلك $100\\text{ J}$ كهربائياً، فيعطي $20\\text{ J}$ إشعاعاً ضوئياً و $80\\text{ J}$ حرارة. أي التحويلين هو التحويل **المفيد**؟',
					hintAr: 'ما الغرض الأساسي من تشغيل المصباح؟',
					expectedInput: 'الإشعاع الضوئي',
					revealAr:
						'التحويل المفيد للمصباح هو **التحويل بالإشعاع ($E_r = 20\\text{ J}$)**، بينما الحرارة ($Q = 80\\text{ J}$) تحويل **غير مفيد** (ضائع في المحيط).'
				},
				{
					promptAr:
						'إذا كانت الطاقة الابتدائية لجملة $E_1 = 500\\text{ J}$، واكتسبت $200\\text{ J}$ وقدّمت $150\\text{ J}$، فما قيمتها النهائية $E_2$؟',
					hintAr: 'طبّق العلاقة: $E_2 = E_1 + E_{\\text{مكتسبة}} - E_{\\text{مقدمة}}$.',
					expectedInput: '550',
					revealAr: '$E_2 = 500 + 200 - 150 = 550\\text{ J}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**مبدأ انحفاظ الطاقة**: «الطاقة لا تُستحدث ولا تزول؛ إذا اكتسبت جملة طاقة أو فقدتها فإن هذه الطاقة تكون بالضرورة قد أخذتها من جملة أخرى أو قدّمتها لها».',
				'**العلاقة الرمزية لانحفاظ الطاقة**:\n$$E_{\\text{نهائية}} = E_{\\text{ابتدائية}} + E_{\\text{مكتسبة}} - E_{\\text{مقدمة}}$$\nإذا لم يتغيّر مخزون الطاقة للجملة ($E_{\\text{نهائية}} = E_{\\text{ابتدائية}}$ مثل مصباح مشتعل بانتظام) فإن: $E_{\\text{مكتسبة}} = E_{\\text{مقدمة}}$.',
				'**الحصيلة الطاقوية (الفقاعة والأعمدة)**:\n- نرسم داخل فقاعة **عموداً** لكل شكل طاقة يتغيّر بين اللحظتين (سهم صاعد = تزايد، سهم نازل = تناقص). إذا لم يتغيّر المخزون نترك الفقاعة فارغة.\n- نرسم سهماً **داخلاً** للفقاعة من اليسار للطاقة **المكتسبة**، وسهماً **خارجاً** من اليمين للطاقة **المقدمة** (وخطاً متقطعاً للتحويل غير المفيد $Q$).',
				'**التحويل المفيد وغير المفيد**:\n- **التحويل المفيد**: الطاقة التي تحقق الهدف المطلوب من الجهاز (مثلاً $E_r$ للمصباح، $W$ للمحرك).\n- **التحويل غير المفيد**: الطاقة الضائعة نحو المحيط الخارجي (غالباً على شكل حرارة $Q$ بسبب الاحتكاك أو التسخين).'
			],
			visualSvg: wrapSvg(
				560,
				185,
				`<rect x="10" y="10" width="540" height="165" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">تمثيل الحصيلة الطاقوية لجملة ثابتة المخزون (المصباح) وجملة متزايدة (الماء يسخن)</text>
				<defs><marker id="bArr2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#0f172a"/></marker></defs>
				<ellipse cx="140" cy="100" rx="44" ry="34" fill="#fef3c7" stroke="#d97706" stroke-width="1.7"/>
				<text x="140" y="104" text-anchor="middle" font-size="12" font-weight="bold" fill="#92400e">المصباح</text>
				<line x1="36" y1="100" x2="94" y2="100" stroke="#2563eb" stroke-width="2" marker-end="url(#bArr2)"/>
				<text x="64" y="90" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#2563eb">We</text>
				<line x1="186" y1="88" x2="244" y2="88" stroke="#16a34a" stroke-width="2" marker-end="url(#bArr2)"/>
				<text x="215" y="79" text-anchor="middle" font-size="11" font-weight="bold" fill="#16a34a">Er (مفيد)</text>
				<line x1="186" y1="112" x2="244" y2="112" stroke="#dc2626" stroke-width="1.7" stroke-dasharray="4,3" marker-end="url(#bArr2)"/>
				<text x="215" y="130" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#dc2626">Q (غير مفيد)</text>
				<text x="140" y="156" text-anchor="middle" font-size="10.5" fill="#475569">فقاعة فارغة: E_مكتسبة = E_مقدمة (We = Er + Q)</text>
				<line x1="280" y1="48" x2="280" y2="162" stroke="#cbd5e1" stroke-width="1.4"/>
				<ellipse cx="420" cy="100" rx="46" ry="36" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.7"/>
				<rect x="409" y="74" width="22" height="50" fill="#ffffff" stroke="#0369a1" stroke-width="1.3"/>
				<rect x="410" y="80" width="20" height="43" fill="#bae6fd"/>
				<line x1="420" y1="120" x2="420" y2="79" stroke="#0284c7" stroke-width="2" marker-end="url(#bArr2)"/>
				<text x="444" y="104" font-size="11" font-weight="bold" fill="#0369a1">Ei</text>
				<line x1="312" y1="100" x2="372" y2="100" stroke="#dc2626" stroke-width="2" marker-end="url(#bArr2)"/>
				<text x="342" y="90" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">Q</text>
				<text x="420" y="156" text-anchor="middle" font-size="10.5" fill="#475569">سخان ماء: تزداد الطاقة الداخلية (Ei)</text>`
			),
			visualCaptionAr: 'تمثيل الحصيلة الطاقوية لجملة تحوّل الطاقة باستمرار (المصباح) وجملة تخزّنها (تسخين الماء)',
			examples: [
				{
					problemAr:
						'يتلقى محرك كهربائي طاقة كهربائية قدرها $W_e = 600\\text{ J}$، فيحوّل منها $480\\text{ J}$ إلى طاقة ميكانيكية مفيدة ($W$). احسب الطاقة الضائعة حرارياً ($Q$) في المحيط.',
					solutionAr:
						'بتطبيق مبدأ انحفاظ الطاقة على المحرك في نظام دائم ($E_{\\text{نهائية}} = E_{\\text{ابتدائية}}$):\n$$W_e = W + Q \\implies Q = W_e - W = 600 - 480 = 120\\text{ J}$$'
				},
				{
					problemAr:
						'خلال شحن بطارية هاتف نقال، كانت طاقتها الابتدائية $E_1 = 4000\\text{ J}$، فاكتسبت من الشاحن طاقة كهربائية $W_e = 18000\\text{ J}$ وضاعت منها حرارة قدرها $Q = 2000\\text{ J}$. احسب طاقتها النهائية $E_2$.',
					solutionAr:
						'بتطبيق العلاقة:\n$$E_2 = E_1 + E_{\\text{مكتسبة}} - E_{\\text{مقدمة}} = 4000 + 18000 - 2000 = 20000\\text{ J}$$'
				}
			],
			watchOutAr:
				'احذر أن تضع في الحصيلة الطاقوية عموداً لطاقة **لم تتغير**! فالعمود يُرسم فقط لشكل الطاقة المتزايد أو المتناقص، أما المصباح أثناء إضاءته المستقرة فتُترك فقاعته فارغة.'
		},
		practice: [
			{
				questionAr:
					'يمتص مصباح متوهج طاقة كهربائية $W_e = 250\\text{ J}$، ويضيّع منها حرارة غير مفيدة $Q = 200\\text{ J}$. ما قيمة الطاقة الإشعاعية المفيدة $E_r$ التي يرسلها؟',
				options: ['$450\\text{ J}$', '$50\\text{ J}$', '$200\\text{ J}$', '$125\\text{ J}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'يجب طرح الطاقة الضائعة من المكتسبة وليس جمعهما!',
					'ممتاز! حسب انحفاظ الطاقة: $W_e = E_r + Q \\implies E_r = 250 - 200 = 50\\text{ J}$.',
					'$200\\text{ J}$ هي الطاقة الحرارية الضائعة وليس الإشعاعية.',
					'ليس نصف الطاقة؛ نطبق $E_r = W_e - Q$.'
				],
				explanationAr:
					'حسب مبدأ انحفاظ الطاقة في المصباح: $E_{\\text{مكتسبة}} = E_{\\text{مقدمة}}$ أي $W_e = E_r + Q$ ومنه $E_r = 250 - 200 = 50\\text{ J}$.'
			},
			{
				questionAr:
					'أثناء سقوط كرة سقوطاً حراً نحو الأرض (بإهمال مقاومة الهواء)، أي تمثيل للحصيلة الطاقوية لجملة `(الكرة + الأرض)` صحيح؟',
				options: [
					'عمود $E_{pp}$ يصعد وعمود $E_c$ ينزل',
					'عمود $E_{pp}$ ينزل (يتناقص) وعمود $E_c$ يصعد (يتزايد)',
					'فقاعة فارغة بدون أعمدة',
					'عمود $E_i$ يصعد فقط'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'عند السقوط ينخفض الارتفاع فتتناقص $E_{pp}$ وتزداد السرعة فتتزايد $E_c$.',
					'أحسنت! أثناء السقوط تتناقص الطاقة الكامنة الثقالية $E_{pp}$ وتتحوّل إلى طاقة حركية متزايدة $E_c$.',
					'توجد أشكال طاقة تتغير (الارتفاع والسرعة)، لذا يجب رسم عمودين.',
					'الطاقة الداخلية لا تتغير في السقوط الحر مع إهمال الاحتكاك.'
				],
				explanationAr:
					'كلما سقط الجسم قلّ ارتفاعه ($E_{pp}$ تتناقص) وزادت سرعته ($E_c$ تتزايد).'
			},
			{
				questionAr:
					'في الحصيلة الطاقوية لغسالة ملابس، ما التحويل **غير المفيد** الذي ينبغي تقليله لتحسين مردودها الطاقوي؟',
				options: [
					'التحويل الميكانيكي $W$ لتدوير الحوض',
					'التحويل الكهربائي $W_e$ القادم من المأخذ',
					'التحويل الحراري $Q$ الضائع نحو المحيط بسبب احتكاك المحرك',
					'جميع التحويلات غير مفيدة'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'تدوير الحوض هو الهدف الأساسي (تحويل مفيد).',
					'$W_e$ هي الطاقة المكتسبة لتشغيل الغسالة.',
					'صحيح! الحرارة المتسربة نحو المحيط بفعل الاحتكاك تمثل طاقة ضائعة غير مفيدة.',
					'الحركة الميكانيكية في الغسالة مفيدة.'
				],
				explanationAr:
					'التحويل الحراري $Q$ الضائع في الوسط الخارجي هو التحويل غير المفيد في الأجهزة الكهروميكانيكية.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 8. استطاعة تحويل الطاقة وقراءة فاتورة الكهرباء والغاز
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t2_power_energy_billing',
		slug: 'phy-3am-t2-power-energy-billing',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't2',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المقطع الثالث: السلسلة الطاقوية، انحفاظ الطاقة، واستطاعة التحويل',
		order: 8,
		titleAr: 'استطاعة تحويل الطاقة (P = E / t) والوحدات وقراءة فاتورة الكهرباء والغاز',
		objectives: [
			'تعريف استطاعة التحويل الطاقوي وتطبيق العلاقة P = E / t والتحويل بين الجول (J) والواط ساعي (Wh) والكيلوواط ساعي (kWh)',
			'قراءة الدلالات المميزة للأجهزة الكهرومنزلية وحساب تكلفة الاستهلاك وقراءة فاتورة الكهرباء والغاز (سونلغاز) واقتراح حلول لترشيد الطاقة'
		],
		keywordsAr: [
			'استطاعة التحويل',
			'الواط',
			'الجول',
			'الواط ساعي',
			'الكيلوواط ساعي',
			'فاتورة الكهرباء والغاز'
		],
		discover: {
			scenarioAr:
				'استلمت عائلة بالجزائر العاصمة فاتورة الكهرباء والغاز (سونلغاز) للثلاثي الأخير، فوجدت أن الاستهلاك المسجل بالكهرباء ارتفع من المؤشر القديم `14250` إلى المؤشر الجديد `14850` بالكيلوواط ساعي ($\\text{kWh}$). كما لاحظ الأب مكتوباً على المكواة الدلالة `2000 W`. ماذا تعني هذه الدلالة، وكيف نحسب الطاقة المستهلكة ومبلغ الفاتورة بالوحدات الدولية والعملية؟',
			svg: wrapSvg(
				560,
				205,
				`<rect x="10" y="10" width="540" height="185" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">جدول التحويلات الطاقوية وقراءة عداد سونلغاز</text>
				<rect x="24" y="48" width="246" height="130" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
				<text x="147" y="70" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1d4ed8">العلاقة والوحدات: E = P × t</text>
				<text x="147" y="95" text-anchor="middle" font-size="11.5" fill="#0f172a">دولي: P (W) × t (s) ⇐ E (J)</text>
				<text x="147" y="117" text-anchor="middle" font-size="11.5" fill="#0f172a">عملي: P (W) × t (h) ⇐ E (Wh)</text>
				<text x="147" y="139" text-anchor="middle" font-size="11.5" fill="#0f172a">فواتير: P (kW) × t (h) ⇐ E (kWh)</text>
				<text x="147" y="164" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">1 Wh = 3600 J  |  1 kWh = 1000 Wh</text>
				<rect x="288" y="48" width="248" height="130" rx="9" fill="#fefce8" stroke="#ca8a04" stroke-width="1.4"/>
				<text x="412" y="70" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#854d0e">مؤشر عداد سونلغاز (kWh)</text>
				<rect x="308" y="84" width="208" height="32" rx="5" fill="#ffffff" stroke="#a16207"/>
				<text x="412" y="105" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">الجديد: 14850  -  القديم: 14250</text>
				<text x="412" y="138" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">الطاقة المستهلكة = 600 kWh</text>
				<text x="412" y="162" text-anchor="middle" font-size="11" fill="#475569">التكلفة = الطاقة × سعر الوحدة (DA/kWh)</text>`
			),
			steps: [
				{
					promptAr:
						'على المكواة مكتوب `2000 W`، وهذا يمثّل سرعة تحويلها للطاقة الكهربائية إلى حرارة في الثانية. ماذا نسمي هذا المقدار الذي يُقاس بالواط ($\\text{W}$)؟',
					hintAr: 'يبدأ بكلمة «استطاعة».',
					expectedInput: 'استطاعة التحويل الطاقوي',
					revealAr:
						'تسمى **استطاعة التحويل الطاقوي** (رمزها $P$ ووحدتها الدولية الواط $\\text{W}$)، أي أن المكواة تحوّل $2000\\text{ J}$ في كل ثانية.'
				},
				{
					promptAr:
						'إذا شغّلنا هذه المكواة ($P = 2000\\text{ W} = 2\\text{ kW}$) لمدة $1.5\\text{ h}$، فما الطاقة الكهربائية المستهلكة بالكيلوواط ساعي ($\\text{kWh}$)؟',
					hintAr: 'اضرب الاستطاعة بالكيلوواط ($2\\text{ kW}$) في الزمن بالساعات ($1.5\\text{ h}$).',
					expectedInput: '3',
					revealAr: '$E = P \\times t = 2\\text{ kW} \\times 1.5\\text{ h} = 3\\text{ kWh}$.'
				},
				{
					promptAr:
						'ما كمية الطاقة الكهربائية المستهلكة في فاتورة العائلة إذا كان المؤشر الجديد $14850$ والقديم $14250$ بالكيلوواط ساعي؟',
					hintAr: 'اطرح المؤشر القديم من المؤشر الجديد.',
					expectedInput: '600',
					revealAr: '$E = 14850 - 14250 = 600\\text{ kWh}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**استطاعة التحويل الطاقوي ($P$)**: هي حاصل قسمة الطاقة المحوّلة $E$ على مدة التحويل $t$:\n$$P = \\frac{E}{t} \\iff E = P \\times t \\iff t = \\frac{E}{P}$$',
				'**الوحدات والتحويلات**:\n- في الجملة الدولية ($\\text{SI}$): $P$ بالواط ($\\text{W}$)، $t$ بالثانية ($\\text{s}$)، فتعطي $E$ بـ **الجول ($\\text{J}$)**.\n- في الحياة اليومية: $P$ بالواط ($\\text{W}$) و $t$ بالساعة ($\\text{h}$) تعطي $E$ بـ **الواط ساعي ($\\text{Wh}$)**؛ و $P$ بالكيلوواط ($\\text{kW}$) و $t$ بالساعة ($\\text{h}$) تعطي **الكيلوواط ساعي ($\\text{kWh}$)**.\n- **علاقات التحويل**: $1\\text{ kW} = 1000\\text{ W}$، $1\\text{ Wh} = 3600\\text{ J}$، $1\\text{ kWh} = 1000\\text{ Wh} = 3.6 \\times 10^6\\text{ J}$.',
				'**قراءة فاتورة الكهرباء والغاز (سونلغاز) وترشيد الاستهلاك**:\n- الطاقة المستهلكة = **الرقم الجديد للعداد $-$ الرقم القديم** (بالنسبة للكهرباء بـ $\\text{kWh}$ وللغاز بالمتر المكعب $\\text{m}^3$ المحول إلى وحدة حرارية $\\text{th}$).\n- لترشيد الاستهلاك: استبدال المصابيح العادية بمصابيح اقتصادية **LED**، إطفاء الأجهزة كلياً بدلاً من وضع الاستعداد، وضبط مكيف الهواء عند $25^\\circ\\text{C}$.'
			],
			visualSvg: wrapSvg(
				560,
				175,
				`<rect x="10" y="10" width="540" height="155" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">مثلث العلاقة E = P × t وسلسلة تحويل وحدات الطاقة</text>
				<polygon points="105,52 45,148 165,148" fill="#dbeafe" stroke="#2563eb" stroke-width="1.8"/>
				<line x1="75" y1="100" x2="135" y2="100" stroke="#1d4ed8" stroke-width="1.5"/>
				<line x1="105" y1="100" x2="105" y2="148" stroke="#1d4ed8" stroke-width="1.5"/>
				<text x="105" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#1e3a8a">E</text>
				<text x="82" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">P</text>
				<text x="128" y="132" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">t</text>
				<rect x="210" y="56" width="90" height="44" rx="8" fill="#dcfce7" stroke="#16a34a" stroke-width="1.4"/>
				<text x="255" y="83" text-anchor="middle" font-size="13" font-weight="bold" fill="#166534">kWh</text>
				<rect x="334" y="56" width="90" height="44" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.4"/>
				<text x="379" y="83" text-anchor="middle" font-size="13" font-weight="bold" fill="#92400e">Wh</text>
				<rect x="458" y="56" width="76" height="44" rx="8" fill="#fee2e2" stroke="#dc2626" stroke-width="1.4"/>
				<text x="496" y="83" text-anchor="middle" font-size="13" font-weight="bold" fill="#b91c1c">J</text>
				<text x="317" y="72" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">× 1000</text>
				<text x="317" y="92" text-anchor="middle" font-size="10.5" fill="#475569">→</text>
				<text x="441" y="72" text-anchor="middle" font-size="10.5" font-weight="bold" fill="#0f172a">× 3600</text>
				<text x="441" y="92" text-anchor="middle" font-size="10.5" fill="#475569">→</text>
				<text x="372" y="130" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">للرجوع بالعكس: ÷ 3600 ثم ÷ 1000</text>`
			),
			visualCaptionAr: 'المثلث التذكيري للعلاقة E = P × t وسلّم التحويل بين kWh و Wh و J',
			examples: [
				{
					problemAr:
						'يشتغل مجفف شعر استطاعته $P = 1200\\text{ W}$ لمدة $15\\text{ min}$. احسب الطاقة المحولة بالواط ساعي ($\\text{Wh}$) ثم بالجول ($\\text{J}$).',
					solutionAr:
						'نحوّل الزمن إلى الساعات: $t = \\frac{15}{60} = 0.25\\text{ h}$.\nبالواط ساعي: $E = P \\times t = 1200 \\times 0.25 = 300\\text{ Wh}$.\nبالجول: $E = 300 \\times 3600 = 1\\,080\\,000\\text{ J} = 1.08 \\times 10^6\\text{ J}$.'
				},
				{
					problemAr:
						'استعملت أسرة ثلاجة ($150\\text{ W}$) لمدة $24\\text{ h}$ و $5$ مصابيح LED ($10\\text{ W}$ لكل مصباح) لمدة $4\\text{ h}$ يومياً. احسب الطاقة المستهلكة في اليوم الواحد بالكيلوواط ساعي، ثم كلفتها خلال $30$ يوماً إذا كان سعر $1\\text{ kWh}$ هو $4.5\\text{ DA}$.',
					solutionAr:
						'استهلاك الثلاجة يومياً: $E_1 = 150 \\times 24 = 3600\\text{ Wh} = 3.6\\text{ kWh}$.\nاستهلاك المصابيح: $E_2 = 5 \\times 10 \\times 4 = 200\\text{ Wh} = 0.2\\text{ kWh}$.\nالمجموع اليومي: $3.6 + 0.2 = 3.8\\text{ kWh}$.\nخلال $30$ يوماً: $E_{\\text{شهر}} = 3.8 \\times 30 = 114\\text{ kWh}$.\nالتكلفة: $114 \\times 4.5 = 513\\text{ DA}$.'
				}
			],
			watchOutAr:
				'احذر عدم تجانس الوحدات! لا تضرب الواط ($\\text{W}$) في الدقائق ($\\text{min}$) مباشرة؛ إما تحوّل الزمن إلى ثوانٍ للحصول على الجول ($\\text{J}$)، أو إلى ساعات للحصول على الواط ساعي ($\\text{Wh}$).'
		},
		practice: [
			{
				questionAr:
					'فرن كهربائي استطاعته $P = 2\\text{ kW}$ يشتغل لمدة $30\\text{ min}$. ما الطاقة الكهربائية المحوّلة بالجول ($\\text{J}$)؟',
				options: ['$3.6 \\times 10^6\\text{ J}$', '$60\\text{ J}$', '$3600\\text{ J}$', '$1000\\text{ J}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! $P = 2000\\text{ W}$ و $t = 30 \\times 60 = 1800\\text{ s}$، إذن $E = 2000 \\times 1800 = 3.6 \\times 10^6\\text{ J} = 1\\text{ kWh}$.',
					'لا تضرب بالكيلوواط في الدقائق! حوّل إلى الواط والثانية.',
					'$3600\\text{ J}$ تساوي $1\\text{ Wh}$ وليس $1\\text{ kWh}$.',
					'راجع التحويل: $30\\text{ min} = 1800\\text{ s}$ و $2\\text{ kW} = 2000\\text{ W}$.'
				],
				explanationAr:
					'$P = 2000\\text{ W}$ و $t = 0.5\\text{ h} = 1800\\text{ s}$. إذن $E = 2000 \\times 1800 = 3\\,600\\,000\\text{ J} = 3.6 \\times 10^6\\text{ J}$.'
			},
			{
				questionAr:
					'إذا استهلك تلفاز طاقة قدرها $E = 180\\text{ Wh}$ خلال مدة $t = 2\\text{ h}$، فما استطاعة تحويله الطاقوي $P$؟',
				options: ['$360\\text{ W}$', '$90\\text{ W}$', '$90\\text{ kW}$', '$180\\text{ W}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'العلاقة هي القسمة $P = E / t$ وليس الضرب.',
					'ممتاز! $P = \\frac{180\\text{ Wh}}{2\\text{ h}} = 90\\text{ W}$.',
					'الوحدة هي الواط ($\\text{W}$) لأن الطاقة بالواط ساعي ($\\text{Wh}$) وليس الكيلوواط ساعي.',
					'نسيت القسمة على الزمن $2\\text{ h}$.'
				],
				explanationAr:
					'نطبق $P = \\frac{E}{t} = \\frac{180\\text{ Wh}}{2\\text{ h}} = 90\\text{ W}$.'
			},
			{
				questionAr:
					'أيّ من الإجراءات التالية يُعدّ الأكثر فاعلية لخفض قيمة فاتورة الكهرباء في منزل جزائري دون التأثير على شدة الإضاءة؟',
				options: [
					'استبدال المصابيح المتوهجة التقليدية ($100\\text{ W}$) بمصابيح LED ($12\\text{ W}$)',
					'ترك أجهزة التلفاز وشواحن الهواتف موصولة بالمآخذ في وضع الاستعداد ليلاً',
					'فتح نوافذ المنزل أثناء تشغيل المكيف الهوائي صيفاً',
					'تشغيل السخان الكهربائي بأقصى درجة حرارة طوال اليوم'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'صحيح! مصابيح LED تعطي نفس الإضاءة باستهلاك طاقة أقل بنحو 8 مرات.',
					'وضع الاستعداد يستهلك طاقة كهربائية مستمرة دون فائدة.',
					'فتح النوافذ يبدد البرودة ويزيد من استهلاك المكيف.',
					'التسخين المستمر يرفع استهلاك الطاقة بشكل كبير.'
				],
				explanationAr:
					'ترشيد الطاقة يعتمد على استعمال تجهيزات ذات استطاعة أصغر ومردود أفضل مثل مصابيح LED.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 9. نموذج التيار المستمر، شدة التيار، التوتر، وقانونا الشدات والتوترات
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t2_dc_current_voltage_laws',
		slug: 'phy-3am-t2-dc-current-voltage-laws',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: التيار الكهربائي المستمر (الشدة، التوتر، المقاومة)',
		order: 9,
		titleAr:
			'نموذج التيار المستمر، شدة التيار (الأمبيرمتر)، التوتر الكهربائي (الفولطمتر)، وقانونا الشدات والتوترات',
		objectives: [
			'تمثيل الجهة الاصطلاحية للتيار الكهربائي المستمر وتوظيف النموذج الدوراني لحركة الدقائق الكهربائية',
			'قياس شدة التيار الكهربائي بالأمبيرمتر (على التسلسل) والتوتر الكهربائي بالفولطمتر (على التفرع) وحسابهما من القراءة والسلم والعيار',
			'التحقق تجريبيا من قانوني الشدات والتوترات في دارتي الربط على التسلسل والربط على التفرع وتطبيقها حسابيا'
		],
		keywordsAr: [
			'التيار المستمر',
			'الجهة الاصطلاحية',
			'شدة التيار',
			'الأمبيرمتر',
			'التوتر الكهربائي',
			'الفولطمتر',
			'قانون الشدات',
			'قانون التوترات'
		],
		discover: {
			scenarioAr:
				'ركّب تلميذ مصباحين $L_1$ و $L_2$ مع بطارية $6\\text{ V}$ مرة على التسلسل ومرة على التفرع، ثم قاس شدة التيار بالأمبيرمتر والتوتر الكهربائي بالفولطمتر. لاحظ أن إضاءة المصباحين ضعيفة في التسلسل وقوية في التفرع! كيف يعمل التيار المستمر داخل الدارة، وما القوانين التي تحكم الشدات والتوترات في الحالتين؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="32" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">قانونا الشدات والتوترات في الدارة المستمرة</text>
				<g transform="translate(24,46)">
					<rect x="0" y="0" width="246" height="142" rx="9" fill="#eff6ff" stroke="#2563eb" stroke-width="1.4"/>
					<text x="123" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">الربط على التسلسل</text>
					<rect x="28" y="38" width="190" height="58" fill="none" stroke="#0f172a" stroke-width="1.7"/>
					<line x1="20" y1="63" x2="36" y2="63" stroke="#dc2626" stroke-width="2.5"/><line x1="23" y1="71" x2="33" y2="71" stroke="#2563eb" stroke-width="3"/>
					<circle cx="95" cy="38" r="10" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><line x1="88" y1="31" x2="102" y2="45" stroke="#0f172a"/><line x1="88" y1="45" x2="102" y2="31" stroke="#0f172a"/>
					<circle cx="155" cy="38" r="10" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><line x1="148" y1="31" x2="162" y2="45" stroke="#0f172a"/><line x1="148" y1="45" x2="162" y2="31" stroke="#0f172a"/>
					<text x="123" y="114" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">الشدة متساوية: I = I₁ = I₂</text>
					<text x="123" y="132" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">التوترات تُجمع: U = U₁ + U₂</text>
				</g>
				<g transform="translate(290,46)">
					<rect x="0" y="0" width="246" height="142" rx="9" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.4"/>
					<text x="123" y="20" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">الربط على التفرع</text>
					<rect x="28" y="34" width="190" height="64" fill="none" stroke="#0f172a" stroke-width="1.7"/>
					<line x1="90" y1="66" x2="218" y2="66" stroke="#0f172a" stroke-width="1.7"/>
					<line x1="90" y1="34" x2="90" y2="98" stroke="#0f172a" stroke-width="1.7"/>
					<circle cx="154" cy="34" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><line x1="148" y1="28" x2="160" y2="40" stroke="#0f172a"/><line x1="148" y1="40" x2="160" y2="28" stroke="#0f172a"/>
					<circle cx="154" cy="66" r="9" fill="#ffffff" stroke="#0f172a" stroke-width="1.5"/><line x1="148" y1="60" x2="160" y2="72" stroke="#0f172a"/><line x1="148" y1="72" x2="160" y2="60" stroke="#0f172a"/>
					<text x="123" y="114" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#dc2626">الشدات تُجمع: I = I₁ + I₂</text>
					<text x="123" y="132" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">التوتر متساوٍ: U = U₁ = U₂</text>
				</g>`
			),
			steps: [
				{
					promptAr:
						'ما الجهة الاصطلاحية للتيار الكهربائي المستمر خارج المولد؟ (من أي قطب إلى أي قطب؟)',
					hintAr: 'يخرج السهم من القطب الموجب ويتجه نحو القطب السالب.',
					expectedInput: 'من القطب الموجب إلى القطب السالب',
					revealAr:
						'اصطلاحاً، يسري التيار المستمر **خارج المولد من القطب الموجب ($+$) نحو القطب السالب ($-$)**، وتتحرك الدقائق الكهربائية حركة دورانية متزامنة في كامل الدارة المغلقة.'
				},
				{
					promptAr:
						'كيف نربط جهاز **الأمبيرمتر** لقياس شدة التيار $I$، وكيف نربط **الفولطمتر** لقياس التوتر $U$؟',
					hintAr: 'أحدهما يُدمج في المسار نفسه والآخر بين طرفي العنصر.',
					expectedInput: 'الأمبيرمتر على التسلسل والفولطمتر على التفرع',
					revealAr:
						'يُربط **الأمبيرمتر على التسلسل**، ويُربط **الفولطمتر على التفرع** مع مراعاة توصيل القطب الموجب نحو موجب المولد والقطب المشترك (`COM`) نحو السالب.'
				},
				{
					promptAr:
						'في دارة على التفرع بمصباحين، إذا كان توتر المولد $U = 6\\text{ V}$ وشدة تيار المصباح الأول $I_1 = 0.2\\text{ A}$ والثاني $I_2 = 0.3\\text{ A}$، فما التوتر $U_1$ وما الشدة الكلية $I$؟',
					hintAr: 'في التفرع التوترات متساوية والشدات تُجمع.',
					expectedInput: 'U1 = 6 V, I = 0.5 A',
					revealAr:
						'في التفرع: $U_1 = U_2 = U = 6\\text{ V}$، والشدة الكلية: $I = I_1 + I_2 = 0.2 + 0.3 = 0.5\\text{ A}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**النموذج الدوراني والجهة الاصطلاحية**: التيار المستمر هو حركة إجمالية منتظمة ومتزامنة للدقائق الكهربائية في دارة مغلقة؛ جهته الاصطلاحية خارج المولد **من القطب الموجب ($+$) إلى القطب السالب ($-$)**.',
				'**القياس بجهاز ذي إبرة (قراءة الميناء)**:\n$$I = \\frac{L \\times C}{N} \\quad \\text{أو} \\quad U = \\frac{L \\times C}{N}$$\nحيث $L$ القراءة (انحراف الإبرة)، $C$ العيار المختار، و $N$ السلم الكلي للميناء. نختار دوماً أكبر عيار أولاً ثم ننزل إلى العيار المناسب لتجنب تلف الجهاز.',
				'**قانونا الشدات والتوترات**:\n- **دارة على التسلسل**: الشدة **متساوية** في كل نقطة ($I = I_1 = I_2$)، والتوتر الكلي يساوي **مجموع** التوترات ($U = U_1 + U_2$).\n- **دارة على التفرع**: الشدة الكلية تساوي **مجموع** شدات الفروع ($I = I_1 + I_2$)، والتوتر **متساوٍ** بين طرفي كل فرع ($U = U_1 = U_2$).',
				'**تحويل الوحدات**: $1\\text{ A} = 1000\\text{ mA}$ و $1\\text{ V} = 1000\\text{ mV}$.'
			],
			visualSvg: wrapSvg(
				560,
				180,
				`<rect x="10" y="10" width="540" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#1e3a8a">قراءة الجهاز ذي الإبرة وربط الأمبيرمتر والفولطمتر</text>
				<path d="M 55 130 A 75 75 0 0 1 205 130" fill="none" stroke="#1e293b" stroke-width="2.2"/>
				<line x1="130" y1="130" x2="174" y2="75" stroke="#dc2626" stroke-width="2.3"/>
				<circle cx="130" cy="130" r="4" fill="#0f172a"/>
				<text x="52" y="145" font-size="10.5" fill="#475569">0</text>
				<text x="130" y="48" text-anchor="middle" font-size="10.5" fill="#475569">N/2</text>
				<text x="206" y="145" text-anchor="end" font-size="10.5" fill="#475569">N=100</text>
				<text x="180" y="68" font-size="11" font-weight="bold" fill="#dc2626">L=70</text>
				<rect x="246" y="50" width="286" height="106" rx="9" fill="#ffffff" stroke="#94a3b8" stroke-width="1.2"/>
				<text x="389" y="74" text-anchor="middle" font-size="12" font-weight="bold" fill="#0f172a">حساب القياس: I = (L × C) / N</text>
				<text x="389" y="98" text-anchor="middle" font-size="11.5" fill="#1d4ed8">مثال: إذا كان العيار C = 5 A و L = 70 و N = 100</text>
				<text x="389" y="120" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">I = (70 × 5) / 100 = 3.5 A</text>
				<text x="389" y="142" text-anchor="middle" font-size="10.5" fill="#dc2626">الأمبيرمتر (A): على التسلسل  |  الفولطمتر (V): على التفرع</text>`
			),
			visualCaptionAr: 'حساب شدة التيار أو التوتر انطلاقاً من القراءة L والسلم N والعيار C',
			examples: [
				{
					problemAr:
						'قاست تلميذة شدة تيار بأمبيرمتر ذي إبرة مضبوط على العيار $C = 500\\text{ mA}$، فاستقرت الإبرة عند التدريجة $L = 60$ على سلم كلي $N = 100$. احسب شدة التيار $I$ بالميلي أمبير ثم بالأمبير.',
					solutionAr:
						'$I = \\frac{L \\times C}{N} = \\frac{60 \\times 500}{100} = 300\\text{ mA}$.\nبالتحويل إلى الأمبير: $I = \\frac{300}{1000} = 0.3\\text{ A}$.'
				},
				{
					problemAr:
						'في دارة على التسلسل تغذى بمولد $U = 9\\text{ V}$، قاس الفولطمتر توتر المصباح الأول فكان $U_1 = 3.5\\text{ V}$، وكانت شدة التيار المارة فيه $I_1 = 0.25\\text{ A}$. أوجد توتر المصباح الثاني $U_2$ وشدته $I_2$.',
					solutionAr:
						'في الربط على التسلسل:\nقانون الشدات: $I_2 = I_1 = 0.25\\text{ A}$.\nقانون التوترات: $U = U_1 + U_2 \\implies U_2 = 9 - 3.5 = 5.5\\text{ V}$.'
				}
			],
			watchOutAr:
				'احذر ربط الأمبيرمتر على التفرع بين قطبي المولد! فمقاومته الداخلية صغيرة جداً وسيتسبب في استقصار المولد وإتلاف الجهاز. الأمبيرمتر يُربط دائماً على التسلسل، والفولطمتر على التفرع.'
		},
		practice: [
			{
				questionAr:
					'ضُبط فولطمتر على العيار $C = 10\\text{ V}$ على سلم كلي $N = 100$، فتوقفت الإبرة عند التدريجة $L = 45$. ما قيمة التوتر الكهربائي المقاس؟',
				options: ['$45\\text{ V}$', '$4.5\\text{ V}$', '$0.45\\text{ V}$', '$22.2\\text{ V}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$45$ هي القراءة $L$ فقط دون تطبيق العلاقة مع العيار والسلم.',
					'ممتاز! $U = \\frac{45 \\times 10}{100} = 4.5\\text{ V}$.',
					'قمت بالقسمة على 1000 بدلاً من 100 بعد الضرب في 10.',
					'تأكد من ترتيب العلاقة: $U = \\frac{L \\times C}{N}$ وليس $N/U$.'
				],
				explanationAr:
					'نطبق القانون: $U = \\frac{L \\times C}{N} = \\frac{45 \\times 10}{100} = 4.5\\text{ V}$.'
			},
			{
				questionAr:
					'في دارة تحتوي على مصباحين $L_1$ و $L_2$ مربوطين على **التفرع** مع مولد، قاس الأمبيرمتر الرئيسي الشدة الكلية $I = 0.8\\text{ A}$، وقاس أمبيرمتر في فرع $L_1$ الشدة $I_1 = 350\\text{ mA}$. ما شدة التيار $I_2$ المارة في $L_2$؟',
				options: ['$0.45\\text{ A}$', '$0.8\\text{ A}$', '$1.15\\text{ A}$', '$349.2\\text{ mA}$'],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! نحوّل $I_1 = 0.35\\text{ A}$ ثم نطبق قانون الشدات في التفرع: $I_2 = 0.8 - 0.35 = 0.45\\text{ A}$.',
					'الشدة لا تتساوى في فروع التفرع إلا إذا كان المصباحان متماثلين (وهنا نطرح من الكل).',
					'جمعت الشدتين بدلاً من طرح $I_1$ من الشدة الكلية $I$.',
					'احذر! لا تطرح الأمبير من الميلي أمبير دون تحويل الوحدات أولاً.'
				],
				explanationAr:
					'أولاً: $I_1 = 350\\text{ mA} = 0.35\\text{ A}$. وبما أن الربط على التفرع فإن $I = I_1 + I_2 \\implies I_2 = 0.8 - 0.35 = 0.45\\text{ A}$.'
			},
			{
				questionAr:
					'عند ربط مصباحين غير متماثلين على **التسلسل** بمولد توتره $12\\text{ V}$، أي عبارة تكون صحيحة دائماً؟',
				options: [
					'التوتر متساوٍ بين طرفيهما ($U_1 = U_2 = 12\\text{ V}$)',
					'شدة التيار متساوية فيهما ($I_1 = I_2 = I$)',
					'شدة التيار الكلية تساوي مجموع شدتي المصباحين',
					'إذا أُتلف أحد المصباحين يبقى الآخر مشتعلاً'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'تساوي التوتر خاص بالربط على التفرع، أما في التسلسل فالتوترات تُجمع.',
					'صحيح! في دارة التسلسل يوجد مسار واحد للدقائق الكهربائية، فتكون شدة التيار متساوية في جميع النقاط.',
					'جمع الشدات خاص بالربط على التفرع.',
					'في التسلسل، إذا انقطع عنصر واحد تنفتح الدارة كلها وينطفئ المصباح الآخر.'
				],
				explanationAr:
					'الربط على التسلسل يتسم بحلقة واحدة تمر فيها نفس شدة التيار ($I = I_1 = I_2$) وتتوزع فيها التوترات ($U = U_1 + U_2$).'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 10. المقاومة الكهربائية: مفهومها والقياس المباشر
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t2_resistance_measurement',
		slug: 'phy-3am-t2-resistance-measurement',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: التيار الكهربائي المستمر (الشدة، التوتر، المقاومة)',
		order: 10,
		titleAr: 'المقاومة الكهربائية: مفهومها والقياس المباشر (الأومتر وشفرات الألوان)',
		objectives: [
			'إبراز دور المقاومة الكهربائية (الناقل الأومي) في إعاقة مرور التيار الكهربائي وتخفيض شدته',
			'قياس قيمة مقاومة كهربائية مباشرة باستعمال الأومتر وقراءتها باستعمال جدول شفرات الألوان'
		],
		keywordsAr: ['المقاومة الكهربائية', 'الناقل الأومي', 'الأوم', 'الأومتر', 'شفرة الألوان'],
		discover: {
			scenarioAr:
				'فتح سامي جهاز راديو قديماً معطّلاً فوجد داخل لوحته الإلكترونية قطعاً خزفية صغيرة ملونة بأحزمة دائرية (أحمر، بنفسجي، برتقالي، ذهبي). أخبره أستاذه أنها «نواقل أومية» تحمي الدارة الكهربائية وتتحكم في شدة التيار! كيف نعرف قيمة هذه المقاومات من ألوانها، وكيف نقيسها مباشرة بالأومتر؟',
			svg: wrapSvg(
				560,
				210,
				`<rect x="10" y="10" width="540" height="190" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">تحديد قيمة المقاومة الكهربائية بشفرات الألوان</text>
				<line x1="70" y1="86" x2="490" y2="86" stroke="#64748b" stroke-width="4"/>
				<rect x="150" y="60" width="260" height="52" rx="16" fill="#fde68a" stroke="#b45309" stroke-width="2"/>
				<rect x="182" y="60" width="22" height="52" fill="#dc2626"/>
				<rect x="228" y="60" width="22" height="52" fill="#7c3aed"/>
				<rect x="274" y="60" width="22" height="52" fill="#f97316"/>
				<rect x="352" y="60" width="18" height="52" fill="#eab308"/>
				<text x="193" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#dc2626">أحمر (2)</text>
				<text x="239" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#7c3aed">بنفسجي (7)</text>
				<text x="285" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#ea580c">برتقالي (×10³)</text>
				<text x="361" y="132" text-anchor="middle" font-size="11" font-weight="bold" fill="#a16207">ذهبي (±5%)</text>
				<rect x="70" y="148" width="420" height="36" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
				<text x="280" y="171" text-anchor="middle" font-size="12.5" font-weight="bold" fill="#1e3a8a">القيمة: R = 27 × 10³ Ω = 27000 Ω = 27 kΩ (± 5%)</text>`
			),
			steps: [
				{
					promptAr:
						'ماذا يحدث لشدة التيار الكهربائي وإضاءة المصباح عندما نُدرج ناقلاً أومياً على التسلسل داخل الدارة؟',
					hintAr: 'من اسمها «مقاومة»: تعيق مرور التيار.',
					expectedInput: 'تنقص شدة التيار وتضعف الإضاءة',
					revealAr:
						'الناقل الأومي يعيق مرور التيار الكهربائي، فتقل **شدة التيار** وتضعف إضاءة المصباح (وتزداد الإعاقة كلما كبرت قيمة المقاومة $R$).'
				},
				{
					promptAr:
						'في شفرة الألوان، لدينا: أسود(0)، بني(1)، أحمر(2)، برتقالي(3)، أصفر(4)، أخضر(5)، أزرق(6)، بنفسجي(7)، رمادي(8)، أبيض(9). ما قيمة مقاومة حلقاتها الأولى الثلاث: **بني – أسود – أحمر**؟',
					hintAr: 'الرقمان الأولان هما $1$ و $0$، والحلقة الثالثة تعني إضافة صفرين ($\\times 10^2$).',
					expectedInput: '1000',
					revealAr:
						'الرقمان: $1$ و $0$ $\\leftarrow 10$، والحلقة الثالثة أحمر ($2$ أصفار) $\\leftarrow 10 \\times 100 = 1000\\,\\Omega = 1\\text{ k}\\Omega$.'
				},
				{
					promptAr:
						'هل يجوز قياس المقاومة الكهربائية بجهاز **الأومتر** بينما هي موصولة في دارة مغلقة يمر فيها تيار من المولد؟',
					hintAr: 'الأومتر يرسل تياراً صغيراً خاصاً به لقياس المقاومة.',
					expectedInput: 'لا، يجب فصلها عن الدارة',
					revealAr:
						'**لا أبداً!** يجب فصل الناقل الأومي عن الدارة الكهربائية تماماً قبل قياسه بالأومتر حتى لا تتلف أداة القياس ولا تتشوه النتيجة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**المقاومة الكهربائية ($R$)**: خاصية للناقل الأومي في إعاقة مرور التيار الكهربائي وتخفيض شدته في الدارة. وحدتها الدولية هي **الأوم ($\\Omega$)** ($1\\text{ k}\\Omega = 1000\\,\\Omega$، $1\\text{ M}\\Omega = 10^6\\,\\Omega$).',
				'**القياس المباشر بالأومتر**: نضبط جهاز متعدد القياسات على وضعية الأومتر ($\\Omega$) ونوصل مربطيه (`COM` و `$\\Omega$`) مباشرة بمربطي الناقل الأومي **وهو معزول خارج الدارة**.',
				'**قراءة شفرة الألوان (4 حلقات)**: نضع حلقة الدقة (الذهبية $\\pm 5\\%$ أو الفضية $\\pm 10\\%$) على اليمين، ثم نقرأ من اليسار:\n- الحلقة 1: رقم العشرات.\n- الحلقة 2: رقم الآحاد.\n- الحلقة 3: عدد الأصفار (المضاعف $10^n$).\n**ترتيب الألوان ($0 \\rightarrow 9$)**: أسود(0)، بني(1)، أحمر(2)، برتقالي(3)، أصفر(4)، أخضر(5)، أزرق(6)، بنفسجي(7)، رمادي(8)، أبيض(9).'
			],
			visualSvg: wrapSvg(
				560,
				185,
				`<rect x="10" y="10" width="540" height="165" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">جدول شفرة ألوان المقاومات الكهربائية (0 إلى 9)</text>
				<g transform="translate(20,48)">
					<rect x="0" y="0" width="50" height="52" rx="6" fill="#0f172a"/><text x="25" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">أسود</text><text x="25" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">0</text>
					<rect x="52" y="0" width="50" height="52" rx="6" fill="#78350f"/><text x="77" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">بني</text><text x="77" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">1</text>
					<rect x="104" y="0" width="50" height="52" rx="6" fill="#dc2626"/><text x="129" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">أحمر</text><text x="129" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">2</text>
					<rect x="156" y="0" width="50" height="52" rx="6" fill="#f97316"/><text x="181" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">برتقالي</text><text x="181" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">3</text>
					<rect x="208" y="0" width="50" height="52" rx="6" fill="#eab308"/><text x="233" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">أصفر</text><text x="233" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">4</text>
					<rect x="260" y="0" width="50" height="52" rx="6" fill="#16a34a"/><text x="285" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">أخضر</text><text x="285" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">5</text>
					<rect x="312" y="0" width="50" height="52" rx="6" fill="#2563eb"/><text x="337" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">أزرق</text><text x="337" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">6</text>
					<rect x="364" y="0" width="50" height="52" rx="6" fill="#7c3aed"/><text x="389" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">بنفسجي</text><text x="389" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">7</text>
					<rect x="416" y="0" width="50" height="52" rx="6" fill="#64748b"/><text x="441" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">رمادي</text><text x="441" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#ffffff">8</text>
					<rect x="468" y="0" width="50" height="52" rx="6" fill="#ffffff" stroke="#94a3b8"/><text x="493" y="24" text-anchor="middle" font-size="11" font-weight="bold" fill="#0f172a">أبيض</text><text x="493" y="42" text-anchor="middle" font-size="13" font-weight="bold" fill="#0f172a">9</text>
				</g>
				<text x="280" y="130" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#0f172a">الحلقة الرابعة (الدقة): ذهبي = ±5%  |  فضي = ±10%</text>
				<text x="280" y="152" text-anchor="middle" font-size="11" fill="#dc2626">تنبيه أمني: يقاس الناقل الأومي بالأومتر وهو مفصول كلياً عن الدارة الكهربائية!</text>`
			),
			visualCaptionAr: 'دلالات ألوان الحلقات الأربع لقراءة قيمة المقاومة الكهربائية',
			examples: [
				{
					problemAr:
						'احسب قيمة مقاومة كهربائية تحمل الألوان التالية من اليسار إلى اليمين: **أصفر – بنفسجي – بني – ذهبي**.',
					solutionAr:
						'الأصفر ($4$)، البنفسجي ($7$) $\\leftarrow 47$.\nالبني ($1$) يعني مضاعف $10^1$ (صفر واحد).\nالذهبي يعني دقة $\\pm 5\\%$.\nإذن: $R = 47 \\times 10^1 = 470\\,\\Omega \\pm 5\\%$.'
				},
				{
					problemAr:
						'أوجد ألوان الحلقات الثلاث الأولى لمقاومة قيمتها $R = 3.3\\text{ k}\\Omega$.',
					solutionAr:
						'نحوّل إلى الأوم: $R = 3.3 \\times 1000 = 3300\\,\\Omega = 33 \\times 10^2\\,\\Omega$.\nالرقم $3$ (برتقالي) – الرقم $3$ (برتقالي) – صفران $10^2$ (أحمر).'
				}
			],
			watchOutAr:
				'خطأ متكرر عند قراءة الألوان: اعتبار الحلقة الثالثة هي الرقم الثالث! بل الحلقة الثالثة هي **عدد الأصفار** (مثلاً: أسود في الحلقة الثالثة يعني $\\times 10^0 = \\times 1$ أي لا نضيف أي صفر، وليس إضافة صفر!).'
		},
		practice: [
			{
				questionAr:
					'ما قيمة مقاومة كهربائية ألوانها من اليسار إلى اليمين: **أخضر – أزرق – أسود – فضي**؟',
				options: [
					'$560\\,\\Omega \\pm 10\\%$',
					'$56\\,\\Omega \\pm 10\\%$',
					'$5600\\,\\Omega \\pm 5\\%$',
					'$65\\,\\Omega \\pm 10\\%$'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'الحلقة الثالثة سوداء ($0$) تعني $10^0 = 1$ (أي لا نضيف صفراً)، وليس إضافة صفر واحد!',
					'أحسنت! أخضر ($5$)، أزرق ($6$)، أسود ($\\times 10^0 = \\times 1$)، وفضي ($\\pm 10\\%$)، إذن $R = 56\\,\\Omega \\pm 10\\%$.',
					'أضفت صفرين والذهبي هو $\\pm 5\\%$ وليس الفضي.',
					'عكست ترتيب اللونين الأولين (الأخضر $5$ والأزرق $6$).'
				],
				explanationAr:
					'أخضر ($5$)، أزرق ($6$)، أسود (صفر أصفار أي $\\times 1$) $\\leftarrow 56\\,\\Omega$، والفضي دقة $\\pm 10\\%$.'
			},
			{
				questionAr:
					'لدينا ثلاث مقاومات $R_1 = 100\\,\\Omega$، $R_2 = 470\\,\\Omega$، $R_3 = 1\\text{ k}\\Omega$. إذا أدرجنا كل واحدة منها على حدة في نفس الدارة مع نفس المصباح والمولد، فأيها تجعل شدة التيار المارة في المصباح **أصغر ما يمكن**؟',
				options: ['$R_1$', '$R_2$', '$R_3$', 'تبقى الشدة نفسها في الحالات الثلاث'],
				correctIndex: 2,
				diagnosticFeedback: [
					'$R_1$ هي الأصغر فتسمح بأكبر شدة تيار.',
					'$R_2$ أصغر من $R_3 = 1000\\,\\Omega$.',
					'ممتاز! كلما زادت قيمة المقاومة $R$ ($1\\text{ k}\\Omega = 1000\\,\\Omega$) زادت إعاقة التيار فنقصت شدته إلى أصغر قيمة.',
					'المقاومة تعيق التيار وتنقص شدته بمقدار يتناسب مع قيمتها.'
				],
				explanationAr:
					'بما أن $R_3 = 1000\\,\\Omega$ هي الأكبر، فإنها تُعيق التيار الكهربائي أكثر من غيرها فتنتج أصغر شدة تيار.'
			},
			{
				questionAr:
					'أراد تلميذ قياس قيمة مقاومة باستعمال جهاز متعدد القياسات مضبوط على الأومتر ($\\Omega$). ما الشرط الضروري لسلامة الجهاز وصحة القياس؟',
				options: [
					'غلق القاطعة ليمر التيار أثناء القياس',
					'ربط الأومتر على التسلسل مع المولد والمصباح',
					'فصل المقاومة كلياً عن الدارة الكهربائية ووضعها بين مربطي الأومتر فقط',
					'ضبط الجهاز على الفولطمتر بدلاً من الأومتر'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'تيار المولد قد يتلف الأومتر ويعطي قراءة خاطئة.',
					'لا يُربط الأومتر في دارة مغذّاة بالمولد.',
					'صحيح! الأومتر يُستخدم دائماً على عنصر مفصول خارج الدارة الكهربائية.',
					'الفولطمتر يقيس التوتر ($\\text{V}$) وليس المقاومة ($\\Omega$).'
				],
				explanationAr:
					'لقياس المقاومة بالأومتر يجب عزل الناقل الأومي عن أي مولد أو دارة مغلقة.'
			}
		]
	},

	// ═══════════════════════════════════════════════════════════════════════════
	// 11. إدماج تعلمات الفصل الثاني
	// ═══════════════════════════════════════════════════════════════════════════
	{
		id: 'phy_lesson_3am_t2_integration',
		slug: 'phy-3am-t2-integration',
		grade: '3am',
		yearSubjectId: 638,
		trimesterId: 't2',
		sequenceId: 'seq4',
		sequenceTitleAr: 'المقطع الرابع: التيار الكهربائي المستمر (الشدة، التوتر، المقاومة)',
		order: 11,
		titleAr: 'إدماج تعلمات الفصل الثاني: الطاقة وفاتورة الاستهلاك وقوانين التيار المستمر',
		objectives: [
			'حل وضعيات إدماجية حول السلسلة الطاقوية والحصيلة الطاقوية وحساب الاستهلاك الكهربائي وقانوني الشدات والتوترات'
		],
		keywordsAr: ['وضعية إدماجية', 'الحصيلة الطاقوية', 'قانون الشدات والتوترات'],
		discover: {
			scenarioAr:
				'في منزل جديد، لاحظت أمينـة أن مصابيح الرواق موصولة بحيث إذا نزعنا مصباحاً تنطفئ بقية المصابيح، كما ارتفعت فاتورة سونلغاز للثلاثي إلى مبلغ كبير بسبب ترك مسخن ماء كهربائي استطاعته $2000\\text{ W}$ يشتغل $3\\text{ h}$ يومياً! كيف تشخص أخطاء التركيب الكهربائي وتضبط الفاتورة وتنمذج التحولات الطاقوية في هذا المسخن؟',
			svg: wrapSvg(
				560,
				185,
				`<rect x="10" y="10" width="540" height="165" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13.5" font-weight="bold" fill="#0f172a">إدماج الفصل الثاني: الطاقة + الاستهلاك + الدارة المستمرة</text>
				<rect x="24" y="48" width="162" height="110" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="1.3"/>
				<text x="105" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#1d4ed8">السلسلة والحصيلة</text>
				<text x="105" y="94" text-anchor="middle" font-size="10.5" fill="#0f172a">مصباح/مسخن: We ← Q</text>
				<text x="105" y="114" text-anchor="middle" font-size="10.5" fill="#0f172a">تسخين الماء: عمود Ei يصعد</text>
				<text x="105" y="134" text-anchor="middle" font-size="10.5" fill="#0f172a">انحفاظ الطاقة: E₂=E₁+E_مك-E_مق</text>
				<rect x="199" y="48" width="162" height="110" rx="8" fill="#fefce8" stroke="#ca8a04" stroke-width="1.3"/>
				<text x="280" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#854d0e">الاستطاعة والفاتورة</text>
				<text x="280" y="94" text-anchor="middle" font-size="10.5" fill="#0f172a">E = P × t (kWh / J)</text>
				<text x="280" y="114" text-anchor="middle" font-size="10.5" fill="#0f172a">استهلاك العداد = جديد - قديم</text>
				<text x="280" y="134" text-anchor="middle" font-size="10.5" fill="#0f172a">ترشيد الاستهلاك (LED)</text>
				<rect x="374" y="48" width="162" height="110" rx="8" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.3"/>
				<text x="455" y="70" text-anchor="middle" font-size="12" font-weight="bold" fill="#15803d">قوانين التيار المستمر</text>
				<text x="455" y="94" text-anchor="middle" font-size="10.5" fill="#0f172a">التفرع للمنازل: U=U₁=U₂</text>
				<text x="455" y="114" text-anchor="middle" font-size="10.5" fill="#0f172a">شدة العداد: I = I₁ + I₂</text>
				<text x="455" y="134" text-anchor="middle" font-size="10.5" fill="#0f172a">قياس المقاومة بالألوان/الأومتر</text>`
			),
			steps: [
				{
					promptAr:
						'كيف تم ربط مصابيح الرواق في حالة أمينة (تسلسل أم تفرع)؟ وما النوع الصحيح للربط المنزلي؟',
					hintAr: 'في الربط المنزلي تشتغل المصابيح باستقلالية وبنفس التوتر.',
					expectedInput: 'رُبطت على التسلسل والصحيح على التفرع',
					revealAr:
						'رُبطت خطأً على **التسلسل** (لذلك تنطفئ كلها معاً)، ويجب ربطها على **التفرع** لتشتغل باستقلالية وتحت نفس التوتر.'
				},
				{
					promptAr:
						'ما الطاقة التي يستهلكها المسخن ($2\\text{ kW}$) خلال $30$ يوماً بمعدل $3\\text{ h}$ يومياً بالكيلوواط ساعي ($\\text{kWh}$)؟',
					hintAr: 'احسب أولاً الاستهلاك اليومي ($2 \\times 3$) ثم اضرب في $30$.',
					expectedInput: '180',
					revealAr:
						'الاستهلاك اليومي $2 \\times 3 = 6\\text{ kWh}$، وخلال $30$ يوماً: $6 \\times 30 = 180\\text{ kWh}$.'
				}
			]
		},
		summary: {
			rulesAr: [
				'**ربط التعلمات في الفصل الثاني**:\n1. في التركيبات المنزلية، تُوصل جميع المصابيح والأجهزة على **التفرع** ليتساوى توترها ($U = U_1 = U_2$) وتُجمع شدات تياراتها ($I = I_1 + I_2 + \\dots$).\n2. تُحسب الطاقة الكهربائية الإجمالية بـ $E = P \\times t$ وتُقارن بفرق مؤشري العداد في فاتورة سونلغاز.\n3. نُمثل السلسلة الطاقوية والحصيلة الطاقوية بدقة مع التمييز بين التحويل المفيد وغير المفيد.'
			],
			visualSvg: wrapSvg(
				560,
				155,
				`<rect x="10" y="10" width="540" height="135" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
				<text x="280" y="34" text-anchor="middle" font-size="13" font-weight="bold" fill="#1e3a8a">نموذج الربط المنزلي على التفرع وحفظ الطاقة</text>
				<rect x="42" y="52" width="120" height="72" rx="8" fill="#dbeafe" stroke="#2563eb"/><text x="102" y="84" text-anchor="middle" font-size="12" font-weight="bold" fill="#1e3a8a">الشبكة / العداد</text><text x="102" y="104" text-anchor="middle" font-size="11" fill="#0f172a">U ثابت  |  I = ΣIᵢ</text>
				<line x1="162" y1="70" x2="220" y2="70" stroke="#0f172a" stroke-width="1.8"/>
				<line x1="162" y1="106" x2="220" y2="106" stroke="#0f172a" stroke-width="1.8"/>
				<rect x="220" y="50" width="130" height="34" rx="6" fill="#fef3c7" stroke="#d97706"/><text x="285" y="72" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#92400e">مصابيح LED (I₁)</text>
				<rect x="220" y="92" width="130" height="34" rx="6" fill="#fee2e2" stroke="#dc2626"/><text x="285" y="114" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#b91c1c">مسخن الماء (I₂)</text>
				<rect x="378" y="52" width="150" height="72" rx="8" fill="#dcfce7" stroke="#16a34a"/><text x="453" y="82" text-anchor="middle" font-size="11.5" font-weight="bold" fill="#166534">E_كلية = E₁ + E₂</text><text x="453" y="104" text-anchor="middle" font-size="11" fill="#0f172a">التكلفة حسب الأشطر</text>`
			),
			visualCaptionAr: 'الربط على التفرع وتجمع الشدات والطاقات المستهلكة في المسكن',
			examples: [
				{
					problemAr:
						'سجل عداد الكهرباء الرقم القديم $23400\\text{ kWh}$ والرقم الجديد $23750\\text{ kWh}$. إذا كان سعر الشطر الأول (حتى $125\\text{ kWh}$) هو $1.8\\text{ DA/kWh}$، وسعر الشطر الثاني (ما فاق $125\\text{ kWh}$) هو $4.2\\text{ DA/kWh}$، احسب تكلفة الطاقة المستهلكة.',
					solutionAr:
						'الطاقة المستهلكة: $E = 23750 - 23400 = 350\\text{ kWh}$.\nالشطر الأول: $125 \\times 1.8 = 225\\text{ DA}$.\nالكمية المتبقية في الشطر الثاني: $350 - 125 = 225\\text{ kWh}$.\nتكلفة الشطر الثاني: $225 \\times 4.2 = 945\\text{ DA}$.\nالمجموع: $225 + 945 = 1170\\text{ DA}$.'
				},
				{
					problemAr:
						'في دارة تيار مستمر على التفرع مع مولد $12\\text{ V}$، يمر في الفرع الأول مصباح تياره $0.4\\text{ A}$ وفي الفرع الثاني مقاومة ألوانها `بني-أسود-بني` تيارها $0.12\\text{ A}$. ما قيمة المقاومة وما الشدة الكلية؟',
					solutionAr:
						'قيمة المقاومة (`بني 1، أسود 0، بني ×10¹`): $R = 100\\,\\Omega$.\nالشدة الكلية: $I = I_1 + I_2 = 0.4 + 0.12 = 0.52\\text{ A}$.'
				}
			],
			watchOutAr:
				'في حساب فاتورة سونلغاز ذات الأشطر، لا تضرب الاستهلاك الكلي كله في سعر الشطر الثاني! بل تحسب أولاً حصة الشطر الأول (مثلاً $125\\text{ kWh}$)، وما تبقى يُحسب بسعر الشطر الثاني.'
		},
		practice: [
			{
				questionAr:
					'إذا كان المؤشر القديم لعداد كهرباء $5120\\text{ kWh}$ والمؤشر الجديد $5400\\text{ kWh}$، وكان سعر $1\\text{ kWh}$ الموحد $4\\text{ DA}$، فما كلفة الاستهلاك؟',
				options: ['$280\\text{ DA}$', '$1120\\text{ DA}$', '$21600\\text{ DA}$', '$1400\\text{ DA}$'],
				correctIndex: 1,
				diagnosticFeedback: [
					'$280\\text{ kWh}$ هي الطاقة المستهلكة، لم تضرب في السعر $4\\text{ DA}$.',
					'ممتاز! $E = 5400 - 5120 = 280\\text{ kWh}$، والتكلفة $280 \\times 4 = 1120\\text{ DA}$.',
					'ضربت المؤشر الجديد في $4$ دون طرح المؤشر القديم!',
					'تحقق من الطرح: $5400 - 5120 = 280$ وليس $350$.'
				],
				explanationAr:
					'$E = 5400 - 5120 = 280\\text{ kWh}$، ومنه التكلفة $= 280 \\times 4 = 1120\\text{ DA}$.'
			},
			{
				questionAr:
					'تعمل مدفأة كهربائية استطاعتها $1500\\text{ W}$ لمدة $4\\text{ h}$. ما الحصيلة الطاقوية الصحيحة للمدفأة نفسها أثناء عملها المستقر، وما الطاقة التي حوّلتها للغرفة؟',
				options: [
					'فقاعة فارغة لأن طاقتها الداخلية لا تتغير، وحوّلت $6\\text{ kWh}$ حرارياً $Q$',
					'عمود $E_i$ يتناقص، وحوّلت $6000\\text{ J}$',
					'عمود $E_c$ يتزايد، وحوّلت $375\\text{ Wh}$',
					'فقاعة فارغة، وحوّلت $1500\\text{ kWh}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! المدفأة تحوّل الطاقة المكتسبة $W_e$ مباشرة إلى حرارة $Q$ للغرفة، و $E = 1.5\\text{ kW} \\times 4\\text{ h} = 6\\text{ kWh}$.',
					'المدفأة تأخذ طاقة من الشبكة ولا تستهلك مخزوناً داخلياً ينضب كالبطارية، كما أن $6000\\text{ Wh}$ تساوي $6\\text{ kWh}$ وليس $6000\\text{ J}$.',
					'المدفأة لا تتحرك، والعلاقة ضرب $P \\times t$ وليس قسمة.',
					'$1500\\text{ W} = 1.5\\text{ kW}$ ثم نضرب في $4\\text{ h}$.'
				],
				explanationAr:
					'أثناء التشغيل المستقر تكون الطاقة المكتسبة مساوية للمقدمة (فقاعة فارغة في الحصيلة)، والطاقة المحولة $E = 1.5 \\times 4 = 6\\text{ kWh}$.'
			},
			{
				questionAr:
					'في دارة مستمرة تحتوي على مصباحين $L_1$ و $L_2$ مربوطين على التفرع بمولد توتره $9\\text{ V}$، يمر في الدارة الرئيسية تيار $I = 0.7\\text{ A}$ وفي المصباح $L_1$ تيار $I_1 = 0.25\\text{ A}$. ما توتر المصباح $L_2$ وشدة تياره $I_2$؟',
				options: [
					'$U_2 = 9\\text{ V}$ و $I_2 = 0.45\\text{ A}$',
					'$U_2 = 4.5\\text{ V}$ و $I_2 = 0.7\\text{ A}$',
					'$U_2 = 9\\text{ V}$ و $I_2 = 0.95\\text{ A}$',
					'$U_2 = 0\\text{ V}$ و $I_2 = 0.45\\text{ A}$'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! في التفرع التوتر متساوٍ ($U_2 = 9\\text{ V}$) والشدات تُجمع ($I_2 = 0.7 - 0.25 = 0.45\\text{ A}$).',
					'قسمت التوتر وساويت الشدة كما لو كان الربط عكسياً.',
					'طرح الشدة من الكل وليس جمعها مع الكل!',
					'التوتر بين طرفي كل فرع يساوي توتر المولد $9\\text{ V}$.'
				],
				explanationAr:
					'في التفرع: $U_2 = U = 9\\text{ V}$ و $I_2 = I - I_1 = 0.7 - 0.25 = 0.45\\text{ A}$.'
			}
		]
	}
];
