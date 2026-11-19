import type { FrenchInteractiveLessonData } from '../../types';
import {
	svgFrenchConjugationChart,
	svgFrenchGrammarMap,
	svgFrenchTenseTimeline,
	svgFrenchWritingBlueprint
} from '../../svg-french';

export const LESSONS_2AS_LE_T3: FrenchInteractiveLessonData[] = [
	{
		id: 'fre_lesson_2as_le_t3_enonciation_dialogue',
		slug: 'fre-2as-le-t3-enonciation-dialogue',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: حوار الأفكار، الروبورتاج التراثي والقصة الواقعية الأخلاقية (Dialogue d’idées, reportage et nouvelle réaliste morale)',
		order: 1,
		titleAr: 'علامات التلفظ والتدرج الجدلي في حوار الأفكار (Énonciation et progression dans le dialogue d’idées)',
		objectives: [
			'تحليل موقف التلفظ (Situation d’énonciation) ومؤشراته (Déictiques: je/vous, ici, maintenant) داخل حوار الأفكار',
			'تتبع التدرج الجدلي للحوار الفكري (Progression dialectique): التساؤل، الاعتراض المهذب، التعديل، والوصول إلى تركيب فكري متوازن',
			'التمييز بين الترابط اللفظي والرد المباشر (Enchaînement des répliques) وأثره في إقناع القارئ'
		],
		keywordsAr: [
			'dialogue d’idées',
			'énonciation',
			'déictiques',
			'progression dialectique',
			'répliques',
			'حوار الأفكار'
		],
		discover: {
			scenarioAr:
				'في قاعة المخطوطات بقسنطينة، يتحاور مؤرخ مسن وطالبة في اللغات: « Vous croyez vraiment, mademoiselle, que la numérisation suffira à sauver notre mémoire manuscrite ? interrogea le professeur. — Je ne prétends pas qu’elle remplace le papier original, monsieur, répondit-elle avec déférence, mais ici et dès aujourd’hui, elle protège ces pages fragiles contre l’oubli. » لاحظ المؤشرات التلفظية وبناء التدرج الحواري.',
			svg: svgFrenchGrammarMap({
				title: 'Énonciation et dynamique du Dialogue d’idées (2AS LE)',
				rootLabel: 'Confronter des points de vue',
				rootSub: 'Écoute mutuelle + Rigueur argumentative',
				width: 580,
				branches: [
					{
						label: 'Déictiques',
						rule: 'je, vous, ici, aujourd’hui',
						example: 'Ancrés dans l’instant de parole.'
					},
					{
						label: 'Enchaînement',
						rule: 'Reprise d’un mot ou d’une idée',
						example: '« Elle » reprend « la numérisation ».'
					},
					{
						label: 'Courtoisie civique',
						rule: 'Apostrophes, modalité polie',
						example: 'monsieur, je comprends votre souci'
					},
					{
						label: 'Synthèse finale',
						rule: 'Dépasser l’opposition initiale',
						example: 'Allier manuscrit et archive numérique.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'استخرج من الحوار التمهيدي المؤشرات التلفظية (Les déictiques) التي لا يُفهم مرجعها إلا من خلال موقف الكلام الحاضر (الشخص، المكان، الزمان).',
					hintAr: 'ابحث عن الضمائر الشخصية والظرفين « ici » و « aujourd’hui ».',
					expectedInput: 'Vous / Je / notre / ici / dès aujourd’hui',
					revealAr:
						'المؤشرات التلفظية (Les déictiques / embrayeurs) هي علامات حضور المتكلم والمخاطب والمكان والزمان (je, tu, vous, mon, votre, ici, maintenant, aujourd’hui)؛ وهي تمنح حوار الأفكار طابعاً حياً ومباشراً.'
				},
				{
					promptAr:
						'كيف ربطت الطالبة ردها بسؤال الأستاذ دون قطيعة أو عدوانية؟',
					hintAr: 'لاحظ البداية: « Je ne prétends pas que... mais... » ولقب الاحترام « monsieur ».',
					expectedInput: 'أعادت التطرق لفكرته بتواضع واستدراك مهذب ثم عرضت الفائدة العملية للرقمنة',
					revealAr:
						'في حوار الأفكار الناضج، يلتقط المتحاور فكرة محدثه (Enchaînement des répliques)، يسلّم بالجزء الصحيح فيها، ثم يبني عليها خطوة فكرية جديدة نحو تركيب مشترك.'
				},
				{
					promptAr:
						'ما الغاية التربوية والأدبية من عرض فكرة في شكل « حوار أفكار » بدلاً من مقال أحادي الصوت؟',
					hintAr: 'فكر في تعدد وجهات النظر وإشراك القارئ في التفكير.',
					expectedInput: 'عرض زوايا نظر متعددة ومناقشة الاعتراضات بصورة حية تجعل القارئ يشارك في بناء الحقيقة',
					revealAr:
						'يتيح حوار الأفكار (Dialogue d’idées) إبراز الجدل الفكري بحيوية وتجاوز النظرة الأحادية نحو خلاصة متوازنة ومقنعة.'
				}
			]
		},
		summary: {
			rulesAr: [
				'موقف التلفظ في الحوار (La situation d’énonciation): يحدد من يتكلم (Énonciateur / Locuteur)، إلى من (Destinataire / Interlocuteur)، أين ومتى، ويظهر عبر المؤشرات التلفظية (Déictiques: je, vous, ici, maintenant, ce jour).',
				'الالتحام بين الردود (L’enchaînement des répliques): يتحقق بتكرار كلمة محورية أو الإحالة عليها بضمير (cela, ce point)، وبالروابط الحوارية (Certes, Justement, Toutefois, En effet, Permettez-moi d’ajouter).',
				'البعد الأخلاقي لحوار الأفكار: يقوم على أدب الاستماع (Déférence, courtoisie) واستعمال صيغ التخاطب المهذبة (Vouvoiement، ألقاب الاحترام) والشرطي المخفف (Je souhaiterais préciser / Pourrions-nous envisager...).',
				'التدرج الجدلي (La progression dialectique): ينطلق الحوار من تباين أولي في وجهات النظر، ثم يناقش كل طرف حجج الآخر، ليصل غالباً إلى تقارب أو تركيب بنّاء (Synthèse).'
			],
			visualSvg: svgFrenchWritingBlueprint({
				title: 'Analyser un Dialogue d’idées en 2AS LE',
				width: 580,
				steps: [
					{
						stage: '1. Situer l’échange',
						detail: 'Identifier les interlocuteurs, le cadre, le thème et le registre.'
					},
					{
						stage: '2. Repérer les thèses',
						detail: 'Dégager la position initiale et les arguments de chaque voix.'
					},
					{
						stage: '3. Étudier les liens',
						detail: 'Observer les déictiques, incises et reprises d’une réplique à l’autre.'
					},
					{
						stage: '4. Dégager la portée',
						detail: 'Montrer vers quelle synthèse ou leçon morale converge l’échange.'
					}
				]
			}),
			visualCaptionAr: 'المراحل الأربع لتحليل حوار الأفكار في نصوص شعبة اللغات الأجنبية',
			examples: [
				{
					problemAr:
						'Relevez les déictiques et expliquez le rôle du conditionnel dans : « Ici, dans cette bibliothèque, je souhaiterais que vous m’expliquiez votre méthode de conservation. »',
					solutionAr:
						'Déictiques : « Ici », « cette », « je », « vous », « m’ », « votre ». | Rôle du conditionnel (« souhaiterais ») : conditionnel d’atténuation / de politesse marquant le respect envers l’interlocuteur.'
				},
				{
					problemAr:
						'Comment se manifeste l’enchaînement logique entre : « — La traduction automatique gagne du temps. — Elle gagne du temps, certes, mais elle ignore souvent le contexte culturel. » ?',
					solutionAr:
						'Par la reprise exacte de l’expression « gagne du temps » suivie de la concession « certes » et de la réfutation introduite par « mais ».'
				}
			],
			watchOutAr:
				'لا تخلط بين الشرطي الدال على الشك والشرطي الدال على التأدب (Conditionnel de politesse) في الحوار: في جملة مثل « Pourriez-vous préciser votre pensée ? » أو « Je voudrais nuancer ce point », الشرطي يعبر عن التهذيب وأدب الحوار.'
		},
		practice: [
			{
				questionAr:
					'Quels termes constituent des déictiques (marques directes de la situation d’énonciation) dans une réplique ?',
				options: [
					'Les pronoms je/vous, les adverbes ici/maintenant et les démonstratifs ce/cette',
					'Uniquement les noms communs abstraits comme « histoire » ou « science »',
					'Seulement les conjonctions « mais » et « donc »',
					'Les verbes au passé simple à la 3e personne'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! المؤشرات التلفظية (Déictiques) تربط الكلام بالمتكلم والمخاطب والمكان واللحظة الراهنة.',
					'خطأ: الأسماء المجردة لا تتغير بتغير المتكلم أو المكان.',
					'خطأ: الروابط المنطقية ليست مؤشرات تلفظية.',
					'خطأ: الغائب والماضي البسيط يقطعان الصلة بموقف التلفظ الحاضر.'
				],
				explanationAr: 'المؤشرات التلفظية (Déictiques) تشمل ضمائر المتكلم والمخاطب وظروف الزمان والمكان الحاضرة (ici, aujourd’hui, maintenant).'
			},
			{
				questionAr:
					'Quelle est la valeur du conditionnel dans : « Monsieur le conservateur, pourriez-vous nous montrer comment l’on protège ces parchemins ? » ?',
				options: [
					'Conditionnel d’information douteuse',
					'Conditionnel de politesse (d’atténuation)',
					'Futur dans le passé',
					'Regret irréalisable'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: السياق طلب مهذب في حوار مباشر.',
					'أحسنت! الشرطي هنا أداة لباقة واحترام (Conditionnel de politesse).',
					'خطأ: ليس داخل خطاب غير مباشر ماضٍ.',
					'خطأ: هذا شرطي حاضر للطلب المهذب لا ندم ماضٍ.'
				],
				explanationAr: 'في الحوار المحترم يُستعمل الشرطي الحاضر (pourriez-vous, je voudrais) للتأدب وتلطيف الطلب.'
			},
			{
				questionAr:
					'Pourquoi qualifie-t-on un dialogue d’idées de « progressif » ou « dialectique » ?',
				options: [
					'Parce que les interlocuteurs répètent exactement la même phrase sans s’écouter',
					'Parce que chaque réplique répond à la précédente, examine les objections et fait avancer la réflexion vers une synthèse',
					'Parce qu’il ne contient aucune argumentation',
					'Parce qu’il est écrit exclusivement au registre familier'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: التكرار بلا إنصات حوار عقيم (Dialogue de sourds).',
					'صحيح! التدرج الجدلي يبني التفكير خطوة فخطوة عبر الأخذ والرد حتى بلوغ خلاصة متوازنة.',
					'خطأ: حوار الأفكار حجاجي بالدرجة الأولى.',
					'خطأ: لغته قياسية أو راقية.'
				],
				explanationAr: 'التدرج الجدلي يعني أن كل رد يثري النقاش ويتفاعل مع حجة الطرف الآخر وصولاً إلى تركيب ناضج.'
			},
			{
				questionAr:
					'Quel indice montre le mieux l’enchaînement entre deux répliques successives ?',
				options: [
					'La reprise d’un mot clé de l’interlocuteur suivie d’une nuance (ex. : « Ce progrès, certes, mais... »)',
					'Le changement brutal de sujet sans aucun lien',
					'La suppression de tous les pronoms personnels',
					'L’insertion d’une date sans rapport avec le débat'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! التقاط الكلمة المحورية من كلام المحاور ثم البناء عليها يؤكد الترابط الحواري.',
					'خطأ: تغيير الموضوع يكسر الاتساق.',
					'خطأ: الحوار يعتمد أساساً على ضمائر التخاطب.',
					'خطأ: لا يحقق أي التحام بين الردود.'
				],
				explanationAr: 'التحام الردود (Enchaînement des répliques) يبرز عبر استعادة ألفاظ المحاور أو الإحالة إليها قبل الرد.'
			},
			{
				questionAr:
					'Dans un dialogue d’idées de qualité, quelle attitude garantit la crédibilité des intervenants ?',
				options: [
					'L’agressivité verbale et l’interruption constante',
					'La courtoisie, l’écoute active et le recours à des arguments précis',
					'Le refus total de répondre aux questions posées',
					'L’emploi systématique de l’ironie blessante'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: العدوانية تفسد الحوار الفكري الجاد.',
					'صحيح! اللياقة والإنصات والحجة الدقيقة هي أسس الحوار المدني الناجح.',
					'خطأ: التهرب من الأسئلة يضعف المصداقية.',
					'خطأ: التجريح يتعارض مع أخلاق الحوار.'
				],
				explanationAr: 'أدب الحوار والحجة المتينة هما ركيزتا مصداقية المتحاورين.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t3_discours_rapporte_libre',
		slug: 'fre-2as-le-t3-discours-rapporte-libre',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: حوار الأفكار، الروبورتاج التراثي والقصة الواقعية الأخلاقية (Dialogue d’idées, reportage et nouvelle réaliste morale)',
		order: 2,
		titleAr: 'الأقوال المنقولة: المباشر وغير المباشر وغير المباشر الحر (Discours direct, indirect et indirect libre)',
		objectives: [
			'التمييز الدقيق بين أشكال نقل الكلام الثلاثة في النصوص الأدبية والصحفية: المباشر (DD)، غير المباشر (DI)، وغير المباشر الحر (DIL)',
			'التعرف على خصائص الخطاب غير المباشر الحر (Discours indirect libre): غياب فعل القول و « que »، مع بقاء أزمنة وضمائر غير المباشر ونبرة المباشر (؟ !)',
			'التحويل المرن بين الأشكال الثلاثة وتفسير الأثر الأسلوبي للخطاب غير المباشر الحر في القصة الواقعية'
		],
		keywordsAr: [
			'discours direct',
			'discours indirect',
			'discours indirect libre',
			'paroles rapportées',
			'effet stylistique',
			'الخطاب غير المباشر الحر'
		],
		discover: {
			scenarioAr:
				'تأمل ثلاث طرق للتعبير عن حيرة الطالب سمير بعدما وجد محفظة مفقودة في الحافلة:\n(1) المباشر: Samir se dit : « À qui appartient ce portefeuille ? Je dois absolument le rendre dès ce soir ! »\n(2) غير المباشر: Samir se demanda à qui appartenait ce portefeuille et se dit qu’il devait absolument le rendre dès ce soir-là.\n(3) غير المباشر الحر: Samir hésita un instant. À qui appartenait ce portefeuille ? Il devait absolument le rendre dès ce soir-là !',
			svg: svgFrenchConjugationChart({
				title: 'Comparer les trois formes de paroles rapportées (2AS LE)',
				subtitle: 'Savoir les identifier et expliquer leur effet dans le récit',
				width: 560,
				columns: [
					{
						header: 'Direct (DD)',
						rule: 'Guillemets + Présent / Je',
						examples: 'Il dit : « Je le rendrai ! »'
					},
					{
						header: 'Indirect (DI)',
						rule: 'Verbe + que/si + Imparfait/Il',
						examples: 'Il dit qu’il le rendrait.'
					},
					{
						header: 'Indirect Libre (DIL)',
						rule: 'Sans « que », garde ?/! + Il/Imp.',
						examples: 'Il le rendrait dès ce soir-là !'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'قارن الصيغة (3) بالصيغة (2): ما العنصران اللذان حُذفا في الصيغة (3) (الخطاب غير المباشر الحر)؟',
					hintAr: 'انظر هل يوجد فعل قول مثل « se demanda » أو أداة ربط مثل « que ».',
					expectedInput: 'حُذف فعل القول (Verbe introducteur) وأداة الربط (que / si) والمزدوجتان',
					revealAr:
						'الخطاب غير المباشر الحر (DIL) يُلغي فعل القول وأداة الربط والمزدوجتين، فيذوب كلام الشخصية أو تفكيرها الداخلي مباشرة داخل نسيج السرد!'
				},
				{
					promptAr:
						'ما الذي أخذه الخطاب غير المباشر الحر (DIL) من الخطاب غير المباشر، وما الذي احتفظ به من الخطاب المباشر؟',
					hintAr: 'راقب الضمير « Il » والزمن « appartenait / devait » ثم علامتي الاستفهام والتعجب « ? » و « ! ».',
					expectedInput: 'أخذ الضمائر (Il) وتطابق الأزمنة (Imparfait) من غير المباشر، واحتفظ بالنبرة وعلامات الاستفهام والتعجب من المباشر',
					revealAr:
						'هذا المزج الفريد (ضمائر وأزمنة غير المباشر + حيوية وعلامات المباشر دون فعل قول) هو البصمة المميزة للخطاب غير المباشر الحر.'
				},
				{
					promptAr:
						'ما الأثر الأسلوبي للخطاب غير المباشر الحر في القصة الواقعية الأخلاقية؟',
					hintAr: 'كيف يشعر القارئ وهو يقرأ خواطر سمير دون فاصل « Il se dit que »؟',
					expectedInput: 'يُدخل القارئ مباشرة إلى وعي الشخصية وأفكارها الداخلية بسلاسة وحيوية دون إبطاء وتيرة السرد',
					revealAr:
						'يسمح الخطاب غير المباشر الحر بدمج صوت الراوي وصوت الشخصية معاً، فينقل التوتر النفسي والقرار الأخلاقي بحيوية وانسيابية عالية.'
				}
			]
		},
		summary: {
			rulesAr: [
				'الخطاب المباشر (Discours direct): ينقل الكلام حرفياً بين مزدوجتين بعد نقطتين أو مع مطات، ويحافظ على الضمائر والأزمنة الأصلية؛ أثره: الواقعية والحيوية وإبراز صوت الشخصية مستقلاً.',
				'الخطاب غير المباشر (Discours indirect): يدمج الكلام في جملة تابعة بعد فعل قول وأداة ربط (que, si, ce que, de + inf.) مع تطابق الأزمنة إذا كان فعل القول ماضياً؛ أثره: التكثيف والسرعة والتحكم السردي للراوي.',
				'الخطاب غير المباشر الحر (Discours indirect libre — خاصية 2AS LE): ينقل أقوال الشخصية أو مونولوجها الداخلي دون مزدوجتين ودون فعل قول ودون أداة ربط (que)، مع الحفاظ على ضمائر وأزمنة الخطاب غير المباشر (الغائب + Imparfait / Conditionnel / Plus-que-parfait) وإبقاء علامات الانفعال والاستفهام والتعجب (؟ !) والنداء.',
				'مؤشر التحقق السريع لتمييز DIL في النص: جملة سردية بضمير الغائب (il/elle) وفي الماضي المستمر أو الشرطي، لكنها تتضمن سؤالاً مباشراً (؟) أو تعجباً (!) أو عبارة وجدانية تعكس تفكير الشخصية من الداخل.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Reconnaître le Discours Indirect Libre (DIL) à coup sûr',
				rootLabel: 'Les 4 indices du DIL',
				rootSub: 'Hybride entre récit et parole intérieure',
				width: 580,
				branches: [
					{
						label: 'Zéro subordonnant',
						rule: 'Ni « que », ni « si », ni « : »',
						example: 'Pas de guillemets ni de tirets.'
					},
					{
						label: 'Pronoms du DI',
						rule: '3e personne (il, elle, son)',
						example: 'Son devoir était clair.'
					},
					{
						label: 'Temps du DI',
						rule: 'Imparfait / Conditionnel / PQP',
						example: 'Comment retrouverait-il le maître ?'
					},
					{
						label: 'Expressivité du DD',
						rule: 'Garde ?, !, interjections',
						example: 'Non, il ne garderait pas cet argent !'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات الأربعة الأكيدة للتعرف على الخطاب غير المباشر الحر في نصوص 2AS LE',
			examples: [
				{
					problemAr:
						'Transposez ce discours direct en discours indirect libre : « L’horloger réfléchit : "Ai-je bien noté l’adresse du client ? Je dois le prévenir demain sans faute !" »',
					solutionAr:
						'L’horloger réfléchit. Avait-il bien noté l’adresse du client ? Il devait le prévenir le lendemain sans faute !'
				},
				{
					problemAr:
						'Identifiez la forme de discours rapporté et son effet : « Yasmine contemplait le vieil arbre menacé. Allait-on vraiment abattre ce témoin centenaire du quartier ? Jamais elle ne resterait silencieuse ! »',
					solutionAr:
						'Discours indirect libre (3e personne, imparfait/conditionnel, sans verbe introducteur ni « que », conservation de « ? » et « ! »). Effet : plonge le lecteur directement dans l’indignation intérieure et la résolution morale de Yasmine.'
				}
			],
			watchOutAr:
				'احذر عند تحويل سؤال مباشر إلى خطاب غير مباشر حر: نبقي علامة الاستفهام « ? » ويمكن إبقاء قلب الفاعل (« Avait-il bien noté ? ») مع تطبيق تطابق الأزمنة (Passé composé -> Plus-que-parfait، Présent -> Imparfait، Futur -> Conditionnel présent)!'
		},
		practice: [
			{
				questionAr:
					'Identifiez la phrase rédigée au discours indirect libre (DIL) :',
				options: [
					'Le jeune apprenti pensa : « Réussirai-je à réparer cette montre ancienne ? »',
					'Le jeune apprenti se demanda s’il réussirait à réparer cette montre ancienne.',
					'Le jeune apprenti hésitait devant l’établi. Réussirait-il à réparer cette montre ancienne ?',
					'Le jeune apprenti dit qu’il répare cette montre ancienne.'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: وجود النقطتين والمزدوجتين و « je » يدل على خطاب مباشر (DD).',
					'خطأ: وجود « se demanda si » يدل على خطاب غير مباشر (DI).',
					'ممتاز! غياب فعل القول و « si »، مع الغائب والشرطي (Réussirait-il) وبقاء « ? » هي سمات الخطاب غير المباشر الحر (DIL).',
					'خطأ: هذا خطاب غير مباشر عادي مع « dit que ».'
				],
				explanationAr: 'الخطاب غير المباشر الحر يدمج السؤال داخل السرد بالغائب والشرطي مع بقاء علامة الاستفهام دون أداة ربط.'
			},
			{
				questionAr:
					'Qu’emprunte le discours indirect libre au discours indirect classique ?',
				options: [
					'Les guillemets et les tirets de dialogue',
					'Les pronoms de la 3e personne et la concordance des temps (imparfait, conditionnel, plus-que-parfait)',
					'La conjonction « que » et le verbe introducteur',
					'Uniquement le présent et le futur simple'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المزدوجتان والمطات تخص المباشر وتغيبان في DIL.',
					'أحسنت! يأخذ ضمائر الغائب وتطابق الأزمنة في الماضي من الخطاب غير المباشر.',
					'خطأ: يحذف DIL أداة الربط وفعل القول المباشر.',
					'خطأ: يعتمد تطابق أزمنة الماضي.'
				],
				explanationAr: 'يحتفظ DIL بضمائر الغائب وبنظام تطابق الأزمنة المميز للخطاب غير المباشر.'
			},
			{
				questionAr:
					'Transposez correctement en discours indirect libre : « Nadia murmura : "Non, je ne tricherai jamais !" »',
				options: [
					'Nadia murmura qu’elle ne tricherait jamais.',
					'Nadia serra son stylo. Non, elle ne tricherait jamais !',
					'Nadia murmura : « Non, elle ne tricherait jamais ! »',
					'Nadia demanda si elle tricherait jamais.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: هذا خطاب غير مباشر عادي (DI) لوجود « murmura que ».',
					'صحيح! أزلنا فعل القول و « que » والمزدوجتين، وحولنا je -> elle و Futur -> Conditionnel مع إبقاء « Non » و « ! ».',
					'خطأ: وجود النقطتين والمزدوجتين يناقض الخطاب غير المباشر الحر.',
					'خطأ: غيّر المعنى تماماً واستعمل « demanda si ».'
				],
				explanationAr: 'في DIL نُحافظ على النبرة الانفعالية (« Non... ! ») مع ضمير الغائب والشرطي بلا رابط.'
			},
			{
				questionAr:
					'Quel est l’effet stylistique majeur du discours indirect libre dans une nouvelle réaliste ?',
				options: [
					'Ralentir la narration par de longues définitions scientifiques',
					'Rendre accessibles les pensées intimes d’un personnage avec fluidité tout en gardant la continuité du récit',
					'Empêcher le lecteur de savoir ce que ressent le personnage',
					'Supprimer tout point de vue dans la narration'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ليس أداة تفسير علمي.',
					'ممتاز! يمزج بين السرد والوجدان الداخلي بسلاسة فائقة تقرب القارئ من ضمير الشخصية.',
					'خطأ: بالعكس، هو يكشف أفكار الشخصية من الداخل.',
					'خطأ: يرتبط وثيقاً بوجهة النظر الداخلية (Focalisation interne).'
				],
				explanationAr: 'يعبر DIL عن الخواطر الداخلية والانفعالات بانسيابية سردية دون كسر تدفق القصة.'
			},
			{
				questionAr:
					'Dans la phrase au discours indirect libre : « Où avait-il donc égaré le carnet de son père ? », quel temps du discours direct correspond à « avait égaré » ?',
				options: ['Le futur simple', 'Le passé composé', 'Le présent', 'L’impératif'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المستقبل يتحول إلى الشرطي الحاضر.',
					'أحسنت! الماضي المركب (« Où ai-je donc égaré... ? ») يتحول في تطابق الأزمنة إلى Plus-que-parfait (avait égaré).',
					'خطأ: المضارع يتحول إلى Imparfait.',
					'خطأ: الأمر لا يتحول إلى Plus-que-parfait.'
				],
				explanationAr: 'وفق قاعدة Concordance des temps، يقابل Plus-que-parfait في النقل زمن Passé composé في الكلام المباشر.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t3_temps_recit_anticipation',
		slug: 'fre-2as-le-t3-temps-recit-anticipation',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: حوار الأفكار، الروبورتاج التراثي والقصة الواقعية الأخلاقية (Dialogue d’idées, reportage et nouvelle réaliste morale)',
		order: 3,
		titleAr: 'أزمنة السرد الواقعي والاستشراف الأخلاقي (Temps du récit et de l’anticipation éthique)',
		objectives: [
			'التمييز الوظيفي الدقيق بين أزمنة السرد في القصة الواقعية الأخلاقية: الماضي المستمر (Imparfait)، الماضي البسيط (Passé simple)، والماضي الأسبق (Plus-que-parfait)',
			'توظيف أزمنة الاستشراف الأخلاقي للمستقبل (Anticipation éthique: Futur simple, Futur antérieur, Conditionnel présent) لتخيل مدن مستقبلية مسؤولة بيئياً ومدنياً',
			'تحليل قيمة كل زمن داخل فقرة سردية (خلفية وصفية، حدث مفاجئ متسارع، حدث سابق في الماضي، أو رؤية استشرافية)'
		],
		keywordsAr: [
			'temps du récit',
			'imparfait',
			'passé simple',
			'plus-que-parfait',
			'anticipation éthique',
			'أزمنة السرد والاستشراف'
		],
		discover: {
			scenarioAr:
				'قارن بين مطلعين: (1) قصة واقعية أخلاقية: « Chaque matin, le vieil horloger ouvrait sa boutique de la rue Didouche alors que la ville s’éveillait doucement. Soudain, il aperçut un carnet qu’un voyageur avait oublié sur le comptoir la veille. » (2) استشراف أخلاقي (الجزائر 2045): « En 2045, lorsque nos villes auront généralisé la récupération des eaux pluviales, chaque quartier abritera des jardins économes et des bibliothèques solaires. »',
			svg: svgFrenchTenseTimeline({
				title: 'Système des temps : Récit au passé vs Anticipation éthique',
				tenseName: 'PQP -> Imparfait / Passé simple | Futur antérieur -> Futur simple',
				formula: 'Imparfait (décor/habitude) + Passé simple (action clé) + PQP (antériorité)',
				activeZone: 'two_past',
				example: 'Il ouvrait (Imp.) quand il aperçut (PS) le carnet qu’on avait oublié (PQP).',
				markers: 'Anticipation : Quand nous aurons agi (FA), les villes revivront (FS).'
			}),
			steps: [
				{
					promptAr:
						'في مطلع القصة الواقعية (1)، ميز بين أدوار الأزمنة الثلاثة: « ouvrait / s’éveillait » (Imparfait)، و « aperçut » (Passé simple)، و « avait oublié » (Plus-que-parfait).',
					hintAr: 'أيها للعادة والخلفية، وأيها للحدث المفاجئ، وأيها للحدث الأقدم قبلهما؟',
					expectedInput: 'Imparfait للعادة والوصف (الخلفية)، Passé simple للحدث المفاجئ الرئيسي، و Plus-que-parfait للحدث السابق لهما زمنياً',
					revealAr:
						'ثلاثية السرد الكلاسيكي: Imparfait (خلفية، وصف، عادة، استمرار — arrière-plan)، Passé simple (أحداث رئيسية قصيرة ومتتابعة — premier plan)، Plus-que-parfait (أسبقية زمنية في الماضي — antériorité).'
				},
				{
					promptAr:
						'في مطلع نص الاستشراف الأخلاقي (2): « En 2045, lorsque nos villes auront généralisé..., chaque quartier abritera... »، لماذا استعملنا المستقبل الأسبق (Futur antérieur) قبل المستقبل البسيط (Futur simple)؟',
					hintAr: 'أي الفعلين يجب أن يكتمل أولاً قبل تحقق الثاني في عام 2045؟',
					expectedInput: 'للتعبير عن أسبقية التعميم (auront généralisé) قبل تحقق النتيجة المستدامة (abritera) في المستقبل',
					revealAr:
						'في الاستشراف الأخلاقي للمستقبل (Anticipation éthique)، يعبر Futur antérieur عن شرط أو إنجاز سابق في المستقبل يؤدي إلى Futur simple، ويُستعمل الشرطي (Conditionnel) لبيان النتائج المحتملة لخياراتنا اليوم.'
				},
				{
					promptAr:
						'ما المقصود بـ « القصة الواقعية الأخلاقية » (Nouvelle réaliste morale) و « الاستشراف الأخلاقي » (Anticipation éthique)؟',
					hintAr: 'قصة قصيرة واقعية بلا خرافات تحمل عبرة في الأمانة أو التضامن، أو رؤية مستقبلية واقعية تدعو للمسؤولية البيئية والمدنية.',
					expectedInput: 'سرد واقعي هادف يستلهم الحياة اليومية أو يتخيل المستقبل لترسيخ قيم الصدق والأمانة وحماية البيئة',
					revealAr:
						'يربط هذا السرد بين متعة القراءة القصيرة (الواقعية والوحدة الموضوعية والنهاية المؤثرة) والرسالة الأخلاقية النبيلة (الصدق، الإتقان، ترشيد الماء، المسؤولية تجاه الأجيال القادمة).'
				}
			]
		},
		summary: {
			rulesAr: [
				'الماضي المستمر (L’imparfait — arrière-plan): يصف الأماكن والشخصيات (Description)، ويعبر عن العادة المتكررة في الماضي (Habitude: chaque matin)، وعن الحدث المستمر الذي يقطعه حدث مفاجئ.',
				'الماضي البسيط (Le passé simple — premier plan): يعبر عن الحدث المفاجئ (Soudain, Tout à coup)، وعن تسلسل الأفعال الرئيسية المحددة زمنياً التي تحرك حبكة القصة.',
				'الماضي الأسبق (Le plus-que-parfait): يعبر عن فعل وقع واكتمل قبل فعل آخر في الماضي (Antériorité dans le passé: « Il rendit le carnet que le client avait perdu la veille »).',
				'أزمنة الاستشراف الأخلاقي (Anticipation éthique): المستقبل البسيط (Futur simple: التوقع والرؤية المستقبلية)، المستقبل الأسبق (Futur antérieur: الإنجاز السابق لنتيجة مستقبلية)، والشرطي الحاضر (Conditionnel présent: التحذير من عواقب الإهمال أو رسم أفق مأمول).'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Emploi précis des temps du récit et de l’anticipation',
				subtitle: 'Bien distinguer arrière-plan, premier plan et projection future',
				width: 560,
				columns: [
					{
						header: 'Imparfait',
						rule: 'Décor, durée, habitude',
						examples: 'La rue était calme ; il lisait.'
					},
					{
						header: 'Passé simple',
						rule: 'Action brève et clé',
						examples: 'Soudain, il ouvrit le carnet.'
					},
					{
						header: 'Futur / FA',
						rule: 'Projection éthique 2045',
						examples: 'Quand on aura planté, la ville respirera.'
					}
				]
			}),
			visualCaptionAr: 'التوزيع الوظيفي لأزمنة القصة الواقعية ونصوص الاستشراف الأخلاقي',
			examples: [
				{
					problemAr:
						'Mettez les verbes entre parenthèses à l’imparfait, au passé simple ou au plus-que-parfait : « Alors que la pluie (tomber) sur la Casbah, l’artisan (trouver) une enveloppe qu’un voisin (égarer) plus tôt. »',
					solutionAr:
						'« Alors que la pluie tombait (Imparfait : arrière-plan) sur la Casbah, l’artisan trouva (Passé simple : action soudaine) une enveloppe qu’un voisin avait égarée (Plus-que-parfait : antériorité) plus tôt. »'
				},
				{
					problemAr:
						'Conjuguez au futur antérieur puis au futur simple : « Dès que les communes (installer) des capteurs solaires, l’éclairage public (consommer) moitié moins d’énergie. »',
					solutionAr:
						'« Dès que les communes auront installé des capteurs solaires, l’éclairage public consommera moitié moins d’énergie. »'
				}
			],
			watchOutAr:
				'احذر من خلط أزمنة الماضي البسيط في الفوجين الأول والثالث! الفوج الأول: il trouva / ils trouvèrent (بلا حرف s في المفرد!)؛ أفعال شائعة في الثالث: il aperçut, il comprit, il tint, il vint, il sut, il put, il voulut, il fit.'
		},
		practice: [
			{
				questionAr:
					'Dans la phrase : « Le soleil déclinait derrière les collines lorsque l’horloger ferma sa porte et rejoignit sa famille », quelle est la valeur respective de l’imparfait et du passé simple ?',
				options: [
					'Imparfait = action soudaine ; Passé simple = description de fond',
					'Imparfait = décor d’arrière-plan en cours ; Passé simple = actions successives de premier plan',
					'Les deux temps expriment une hypothèse future',
					'Imparfait = antériorité ; Passé simple = habitude répétée'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عكست الدورين! الماضي المستمر للخلفية والماضي البسيط للأفعال الرئيسية.',
					'ممتاز! « déclinait » يرسم الخلفية الوصفية المستمرة، بينما « ferma » و « rejoignit » يسردان الحدثين المتتابعين.',
					'خطأ: الزمنان في الماضي السردي.',
					'خطأ: الأسبقية يعبر عنها بـ Plus-que-parfait.'
				],
				explanationAr: 'يرسم Imparfait الإطار الوصفي (Arrière-plan) بينما يدفع Passé simple الأحداث المتسلسلة (Premier plan).'
			},
			{
				questionAr:
					'Complétez avec les temps du récit appropriés : « L’élève ...... le portefeuille que le voyageur ...... sur le banc dix minutes auparavant. »',
				options: [
					'rapporta / avait oublié',
					'rapportait / oubliera',
					'avait rapporté / oublia',
					'rapporte / oubliait'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الحدث الأقدم (النسيان قبل عشر دقائق) يأخذ Plus-que-parfait (avait oublié)، والحدث اللاحق (الإرجاع) يأخذ Passé simple (rapporta).',
					'خطأ: لا يتوافق الماضي مع المستقبل هنا.',
					'خطأ: عكست الترتيب الزمني! النسيان وقع قبل الإرجاع لا بعده.',
					'خطأ: لا يوضح الأسبقية الزمنية في نظام الماضي.'
				],
				explanationAr: 'النسيان وقع قبل الإرجاع، لذا يأخذ النسيان Plus-que-parfait والإرجاع Passé simple.'
			},
			{
				questionAr:
					'Dans un récit d’anticipation éthique : « Lorsque chaque école ...... un jardin pédagogique, les élèves ...... mieux la valeur de l’eau », choisissez la concordance exacte :',
				options: [
					'aura créé / comprendront',
					'créait / comprendront',
					'créa / avaient compris',
					'a créé / comprenaient'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! المستقبل الأسبق (aura créé) يسبق تحقق النتيجة في المستقبل البسيط (comprendront).',
					'خطأ: الماضي المستمر لا يتوافق مع المستقبل البسيط هنا.',
					'خطأ: أزمنة ماضية لا تناسب الاستشراف المستقبلي.',
					'خطأ: عدم توافق زمني.'
				],
				explanationAr: 'للتعبير عن فعل مستقبلي سابق لفعل مستقبلي آخر نستعمل: Lorsque + Futur antérieur => Futur simple.'
			},
			{
				questionAr:
					'Quelle est la terminaison exacte du passé simple à la 3e personne du singulier pour les verbes du 1er groupe (ex. : décider, restaurer) ?',
				options: ['-at', '-a', '-as', '-ait'],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النهاية « -ât » تخص Subjonctif imparfait.',
					'صحيح! الفوج الأول في Passé simple مع il/elle ينتهي دائماً بـ « -a » (il décida, elle restaura).',
					'خطأ: « -as » تخص ضمير المخاطب « tu ».',
					'خطأ: « -ait » تخص الماضي المستمر (Imparfait).'
				],
				explanationAr: 'ينتهي الماضي البسيط لأفعال الفوج الأول مع المفرد الغائب بحرف « -a » فقط: il décida, elle observa.'
			},
			{
				questionAr:
					'Quel est le but premier d’un récit d’anticipation éthique sur la ville de 2045 ?',
				options: [
					'Faire réfléchir le lecteur sur les choix civiques et écologiques d’aujourd’hui à travers une projection vraisemblable du futur',
					'Décrire un monde magique peuplé de créatures fantastiques',
					'Éviter toute réflexion morale ou sociale',
					'Répéter des faits datant de l’Antiquité'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'أحسنت! الاستشراف الأخلاقي الواقعي يستشرف المستقبل ليرشد سلوكنا المدني والبيئي في الحاضر.',
					'خطأ: الاستشراف الأخلاقي الواقعي بعيد عن الخرافة والسحر.',
					'خطأ: البعد الأخلاقي هو قلب هذا النوع السردي.',
					'خطأ: الاستشراف يتجه نحو المستقبل.'
				],
				explanationAr: 'يربط الاستشراف الأخلاقي بين مسؤولية الحاضر وصورة المجتمع المستقبلي (حماية الماء، التشجير، العلم).'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t3_analyse_stylistique_visee',
		slug: 'fre-2as-le-t3-analyse-stylistique-visee',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: حوار الأفكار، الروبورتاج التراثي والقصة الواقعية الأخلاقية (Dialogue d’idées, reportage et nouvelle réaliste morale)',
		order: 4,
		titleAr: 'التحليل الأسلوبي وزاوية الرؤية والغاية التواصلية (Analyse stylistique, focalisation et visée)',
		objectives: [
			'التمييز الدقيق بين زوايا الرؤية السردية الثلاث (Les points de vue / Focalisations): الصفرية/العالمة (Zéro / Omniscient)، الداخلية (Interne)، والخارجية (Externe)',
			'تحليل الأدوات الأسلوبية في السرد والروبورتاج: الحقول المعجمية، إيقاع الجمل، الصفات التقييمية، والصور البلاغية',
			'صياغة الغاية التواصلية والبعد الأخلاقي للنص بدقة تحليلية تناسب مستوى شعبة اللغات الأجنبية'
		],
		keywordsAr: [
			'focalisation',
			'point de vue omniscient',
			'focalisation interne',
			'focalisation externe',
			'analyse stylistique',
			'visée communicative',
			'زاوية الرؤية والأسلوب'
		],
		discover: {
			scenarioAr:
				'تأمل ثلاث طرق لوصف المشهد نفسه عند دخول زائر إلى المسجد الكبير بتلمسان:\n(1) « Le voyageur s’arrêta devant le portail de bois, ajusta sa sacoche et franchit le seuil sans prononcer un mot. »\n(2) « Il sentit soudain une paix profonde l’envahir ; devant ses yeux émerveillés, les arches blanches semblaient suspendues dans la clarté du matin. »\n(3) « Ce voyageur venait d’Oran sans savoir encore que, trois ans plus tard, il consacrerait sa thèse entière à ce monument. »\nقارن مدى معرفة الراوي في كل حالة!',
			svg: svgFrenchGrammarMap({
				title: 'Les trois points de vue (Focalisations) en analyse littéraire',
				rootLabel: 'Qui voit ? Que sait le narrateur ?',
				rootSub: 'Outil clé de l’analyse stylistique en 2AS LE',
				width: 580,
				branches: [
					{
						label: 'Focalisation zéro',
						rule: 'Narrateur omniscient (> pers.)',
						example: 'Connaît passé, futur et pensées.'
					},
					{
						label: 'Focalisation interne',
						rule: 'À travers un personnage (= pers.)',
						example: 'Verbes de perception et sentiments.'
					},
					{
						label: 'Focalisation externe',
						rule: 'Caméra neutre (< pers.)',
						example: 'Décrit gestes visibles sans pensées.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'في المقطع (1)، يصف الراوي الحركات الظاهرة فقط (توقف، عدّل حقيبته، عبر العتبة) كأنه عدسة كاميرا دون ولوج أفكاره. ما نوع زاوية الرؤية (Focalisation)؟',
					hintAr: 'الراوي يعرف أقل من الشخصية ولا يرى إلا الظاهر الخارجي.',
					expectedInput: 'الرؤية الخارجية (Focalisation externe)',
					revealAr:
						'في الرؤية الخارجية (Focalisation externe)، يظل الراوي شاهداً خارجياً محايداً يسجل الحركات والأصوات المرئية دون النفاذ إلى المشاعر الداخلية.'
				},
				{
					promptAr:
						'في المقطع (2): « Il sentit soudain une paix profonde... devant ses yeux émerveillés... semblaient... »، من خلال عيني من نرى المشهد؟ وما نوع الرؤية؟',
					hintAr: 'لاحظ أفعال الإحساس والإدراك (sentit, yeux émerveillés, semblaient).',
					expectedInput: 'الرؤية الداخلية (Focalisation interne) من خلال وعي وإحساس الزائر',
					revealAr:
						'في الرؤية الداخلية (Focalisation interne)، نرى ونشعر بما تراه وتشعر به الشخصية الواحدة، وتُعرف بأفعال الإدراك والشعور (voir, sentir, sembler, penser) وبالخطاب غير المباشر الحر.'
				},
				{
					promptAr:
						'في المقطع (3)، يعرف الراوي مدينة الزائر وما سيحدث له بعد ثلاث سنوات (وهو ما يجهله الزائر نفسه!). كيف تُسمى هذه الرؤية؟',
					hintAr: 'الراوي كليّ المعرفة (Narrateur omniscient).',
					expectedInput: 'الرؤية الصفرية / الراوي العليم (Focalisation zéro / point de vue omniscient)',
					revealAr:
						'في الرؤية الصفرية (Focalisation zéro)، يعرف الراوي أكثر من جميع الشخصيات: ماضيها ومستقبلها ونواياها الخفية في آن واحد.'
				}
			]
		},
		summary: {
			rulesAr: [
				'التمييز المنهجي بين زوايا الرؤية الثلاث: (1) Focalisation zéro (Narrateur omniscient: الراوي > الشخصية، يعرف الماضي والحاضر والمستقبل ودخيلة الجميع)؛ (2) Focalisation interne (الراوي = الشخصية، ندرك العالم عبر حواسها ومشاعرها وحدها)؛ (3) Focalisation externe (الراوي < الشخصية، وصف ظاهري موضوعي يشبه الكاميرا).',
				'ركائز التحليل الأسلوبي (L’analyse stylistique): فحص الحقول المعجمية المتقابلة أو المتآزرة، إيقاع الجمل (جمل قصيرة للتوتر والتسارع مقابل جمل طويلة مركبة للتأمل والوصف)، صور البيان، وقيم الأزمنة.',
				'صياغة الغاية التواصلية المتكاملة (Visée communicative) في 2AS LE: نحدد الغاية المزدوجة بدقة (مثلاً في القصة الواقعية الأخلاقية: « raconter une histoire vraisemblable afin d’illustrer la valeur de l’honnêteté et d’inviter le lecteur à la probité »؛ وفي الروبورتاج: « faire découvrir, valoriser le patrimoine algérien et sensibiliser à sa préservation »).',
				'الربط بين الشكل والمعنى (Lier procédé et sens): لا قيمة لرصد أسلوب أو رؤية سردية في الامتحان إلا إذا أوضحت كيف يخدم ذلك رسالة الكاتب الأخلاقية أو الفكرية.'
			],
			visualSvg: svgFrenchConjugationChart({
				title: 'Indices linguistiques des trois focalisations',
				subtitle: 'Repères concrets pour justifier sa réponse',
				width: 560,
				columns: [
					{
						header: 'Zéro (Omniscient)',
						rule: 'Passé, futur, plusieurs esprits',
						examples: 'sans savoir encore que...'
					},
					{
						header: 'Interne',
						rule: 'Perception + pensée d’un seul',
						examples: 'il sentit, il lui sembla, DIL'
					},
					{
						header: 'Externe',
						rule: 'Gestes, apparences neutres',
						examples: 'un homme entra, posa son sac'
					}
				]
			}),
			visualCaptionAr: 'المؤشرات النصية الحاسمة لتحديد زاوية الرؤية وتعليلها في الامتحان',
			examples: [
				{
					problemAr:
						'Identifiez la focalisation et justifiez : « Un homme d’une cinquantaine d’années poussa la porte de la librairie, feuilleta deux ouvrages et ressortit lentement. »',
					solutionAr:
						'Focalisation externe : le narrateur ne décrit que les gestes extérieurs observables et ignore l’identité ainsi que les pensées de l’homme.'
				},
				{
					problemAr:
						'Identifiez la focalisation et justifiez : « Amine regardait le billet trouvé par terre ; son cœur battait vite. S’il le remettait au directeur, le propriétaire serait tellement soulagé ! »',
					solutionAr:
						'Focalisation interne : le récit passe par les perceptions (« regardait »), les sensations intimes (« son cœur battait vite ») et les pensées au discours indirect libre d’Amine.'
				}
			],
			watchOutAr:
				'انتبه! لا تخلط بين « Narrateur » (الراوي) و « Auteur » (الكاتب الواقعي)، ولا تظن أن الضمير « il » يعني تلقائياً رؤية خارجية: يمكن لقصة بضمير الغائب « il » أن تكون برؤية داخلية أو صفرية أو خارجية حسب مدى كشف الأفكار!'
		},
		practice: [
			{
				questionAr:
					'Dans quel type de focalisation le narrateur connaît-il le passé, les pensées secrètes de plusieurs personnages et même leur avenir ?',
				options: [
					'Focalisation externe',
					'Focalisation interne',
					'Focalisation zéro (point de vue omniscient)',
					'Discours direct pur'
				],
				correctIndex: 2,
				diagnosticFeedback: [
					'خطأ: الرؤية الخارجية تقتصر على الملاحظة السطحية فقط.',
					'خطأ: الرؤية الداخلية محدودة بوعي شخصية واحدة.',
					'ممتاز! الراوي العليم يملك معرفة شاملة (Focalisation zéro / omnisciente).',
					'خطأ: هذا شكل من أشكال نقل الكلام وليس زاوية رؤية.'
				],
				explanationAr: 'الرؤية الصفرية (Focalisation zéro) تعني أن الراوي يعرف أكثر من كل الشخصيات.'
			},
			{
				questionAr:
					'Identifiez la focalisation dans : « Selma sentit une vive inquiétude : le manuscrit lui semblait plus fragile qu’hier. »',
				options: [
					'Focalisation externe',
					'Focalisation interne',
					'Focalisation zéro sur toute la ville',
					'Absence de narrateur'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: النص يكشف مشاعر سلمى الداخلية وانطباعها الشخصي.',
					'أحسنت! الأفعال « sentit » و « lui semblait » والصفة الشعورية تدل بوضوح على الرؤية الداخلية (Focalisation interne).',
					'خطأ: المعرفة محصورة في إحساس سلمى وحدها.',
					'خطأ: يوجد راوٍ يتبنى منظور سلمى.'
				],
				explanationAr: 'أفعال الشعور والإدراك والظن (sentir, sembler) من أوضح علامات Focalisation interne.'
			},
			{
				questionAr:
					'Quel effet crée une suite de phrases courtes et rythmées au passé simple dans une nouvelle réaliste ?',
				options: [
					'Elle ralentit la scène pour une longue pause contemplative',
					'Elle accélère le rythme du récit et souligne la vivacité ou l’urgence de l’action',
					'Elle transforme le récit en texte explicatif scientifique',
					'Elle supprime toute cohérence chronologique'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الإبطاء والتأمل يتحققان بالجمل الطويلة المركبة مع Imparfait.',
					'صحيح! الجمل القصيرة بالماضي البسيط تسرّع الإيقاع السردي وتبرز التوتر أو الحسم.',
					'خطأ: يظل النص سردياً.',
					'خطأ: التتابع السريع يعزز الخط الزمني ولا يلغيه.'
				],
				explanationAr: 'في التحليل الأسلوبي، تُسرّع الجمل القصيرة (Phrases brèves) وتيرة السرد وتزيد التشويق أو الحزم.'
			},
			{
				questionAr:
					'Quelle visée communicative caractérise une nouvelle réaliste morale centrée sur la restitution d’un objet perdu ?',
				options: [
					'Expliquer la fabrication industrielle du cuir',
					'Émouvoir et édifier le lecteur en illustrant concrètement la beauté de la probité et de l’honnêteté',
					'Décrire un monument géographique sans aucun personnage',
					'Dresser un réquisitoire contre les horlogers'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: ليست نصاً تقنياً صناعياً.',
					'ممتاز! القصة الواقعية الأخلاقية توظف السرد الواقعي لترسيخ قيمة الأمانة والصدق في نفس القارئ.',
					'خطأ: القصة تقوم على شخصيات وحدث وعبرة أخلاقية.',
					'خطأ: بالعكس، تبرز نموذجاً أخلاقياً مشرفاً.'
				],
				explanationAr: 'تجمع القصة الواقعية الأخلاقية بين السرد الحي والرسالة التربوية النبيلة (Émouvoir et édifier).'
			},
			{
				questionAr:
					'Une narration à la 3e personne (« il / elle ») peut-elle utiliser une focalisation interne ?',
				options: [
					'Non, la focalisation interne n’existe qu’avec le pronom « je »',
					'Oui, chaque fois que le narrateur adopte le regard, les perceptions et les pensées d’un seul personnage',
					'Uniquement dans les textes explicatifs scientifiques',
					'Uniquement dans les titres de journaux'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: شائع لكنه خاطئ! يمكن للغائب أن يحمل رؤية داخلية كاملة.',
					'أحسنت! نحدد الرؤية حسب « من يرى ويشعر » لا حسب الضمير وحده.',
					'خطأ: الرؤى السردية تخص النصوص القصصية والسردية.',
					'خطأ: لا صلة لها بعناوين الصحف.'
				],
				explanationAr: 'الضمير « il/elle » متوافق تماماً مع الرؤية الداخلية متى انحصرت الرؤية والإحساس في وعي شخصية واحدة.'
			}
		]
	},
	{
		id: 'fre_lesson_2as_le_t3_cr_critique_complet',
		slug: 'fre-2as-le-t3-cr-critique-complet',
		grade: '2as_le',
		yearSubjectId: 777,
		trimesterId: 't3',
		sequenceId: 'seq3',
		sequenceTitleAr: 'المشروع 3: حوار الأفكار، الروبورتاج التراثي والقصة الواقعية الأخلاقية (Dialogue d’idées, reportage et nouvelle réaliste morale)',
		order: 5,
		titleAr: 'التقرير النقدي الكامل — تحضير البكالوريا لشعبة اللغات (Compte rendu critique complet — 8 pts)',
		objectives: [
			'إتقان الصياغة الكاملة والاحترافية للتقرير النقدي (Compte rendu critique) لأنواع النصوص الثلاثة: حوار الأفكار، الروبورتاج التراثي، والقصة الواقعية الأخلاقية',
			'موازنة حجم الأجزاء الثلاثة بدقة: المقدمة (20%) + التلخيص الحيادي (50%) + التعليق النقدي المعمق (30%) في نحو 160 إلى 200 كلمة',
			'التحكم في معجم النقد الأدبي والصحفي (Cohérence, focalisation, lexique valorisant, portée morale, accessibilité) لتحقيق علامة 8/8'
		],
		keywordsAr: [
			'compte rendu critique complet',
			'accroche',
			'résumé fidèle',
			'commentaire critique évaluatif',
			'barème 8 points',
			'التقرير النقدي الكامل'
		],
		discover: {
			scenarioAr:
				'في نهاية السنة الثانية لغات أجنبية، يُصبح التقرير النقدي الكامل (Compte rendu critique complet) بوابتك الذهبية نحو التفوق في بكالوريا اللغات الأجنبية (معامل 5). كيف تُكيّف التقرير النقدي سواء كان النص روبورتاجاً ثقافياً أو حوار أفكار أو قصة واقعية أخلاقية؟',
			svg: svgFrenchWritingBlueprint({
				title: 'Maîtrise du Compte Rendu Critique Complet (2AS LE — 8 pts)',
				width: 580,
				steps: [
					{
						stage: '1. Accroche (3 lignes)',
						detail: 'Genre exact, titre, auteur, source, thème central et visée communicative.'
					},
					{
						stage: '2. Résumé fidèle (10 l.)',
						detail: 'Reformuler les étapes clés au présent et à la 3e personne (discours indirect).'
					},
					{
						stage: '3. Évaluation du fond',
						detail: 'Apprécier la portée morale, patrimoniale ou intellectuelle + nuance.'
					},
					{
						stage: '4. Évaluation de forme',
						detail: 'Commenter style, focalisation, temps, lexique et clarté pour le lecteur.'
					}
				]
			}),
			steps: [
				{
					promptAr:
						'كيف نلخص نصاً قصصياً (قصة واقعية أخلاقية) أو حوار أفكار في الجزء الثاني من التقرير النقدي؟',
					hintAr: 'تذكر: زمن التلخيص هو الحاضر وبضمير الغائب، وتُحول الحوارات المباشرة إلى غير مباشر.',
					expectedInput: 'نلخص المراحل الكبرى للسرد أو مواقف المتحاورين في الحاضر وبضمير الغائب دون نسخ الردود المباشرة',
					revealAr:
						'حتى لو كانت القصة مكتوبة بالماضي البسيط، فإننا نلخصها في التقرير النقدي بزمن المضارع (Présent de résumé) وبضمير الغائب: « Le narrateur présente d’abord... Puis le personnage découvre... Finalement... »'
				},
				{
					promptAr:
						'ما العناصر المميزة التي يمكن تقييمها في الجزء النقدي (الفقرة الثالثة) إذا كان النص روبورتاجاً تراثياً أو قصة أخلاقية؟',
					hintAr: 'للروبورتاج: الوصف التثميني، الشهادة، المؤشرات المكانية. وللقصة: الواقعية، زاوية الرؤية، الخطاب الحر، والعبرة الأخلاقية.',
					expectedInput: 'تقييم المضمون (القيمة التراثية أو العبرة الأخلاقية) والشكل (جودة الوصف أو الرؤية السردية وتنوع المعجم وسلاسة الإيقاع)',
					revealAr:
						'تكييف مصطلحاتك النقدية مع جنس النص يبرهن للمصحح على وعي أدبي ولغوي رفيع يستحق العلامة الكاملة (8/8).'
				},
				{
					promptAr:
						'ما القاعدة الذهبية لتجنب خسارة النقاط في الجزء الثالث النقدي؟',
					hintAr: 'هل تكفي كلمة « جميل » أم لا بد من التبرير الملموس من النص؟',
					expectedInput: 'كل حكم نقدي يجب أن يُعلل بمؤشر ملموس من النص، بلغة أكاديمية مهذبة ومتوازنة',
					revealAr:
						'قاعدة: [حكم واضح + تعليل نصي دقيق]؛ مثلاً: « Le style s’avère particulièrement vivant grâce à l’emploi du présent de reportage et de citations authentiques d’artisans. »'
				}
			]
		},
		summary: {
			rulesAr: [
				'الفقرة 1 — المقدمة (Accroche — 2 نقطة تقريباً): تحدد بدقة الجنس النصي (reportage culturel, dialogue d’idées, nouvelle réaliste morale)، العنوان، المصدر، الموضوع المحوري، والغاية التواصلية.',
				'الفقرة 2 — الملخص الموضوعي (Résumé objectif — 3 نقاط): يعيد بناء مسار النص بالترتيب المنطقي بضمير الغائب وفي الحاضر، مع تحويل الأقوال المباشرة إلى غير مباشر، وباستعمال روابط سلسة (Tout d’abord, Ensuite, Par ailleurs, En fin de compte) دون نسخ حرفي ودون أي تعليق ذاتي.',
				'الفقرة 3 — التعليق النقدي التقييمي (Commentaire critique — 3 نقاط): فقرة مستقلة تبرز القيمة الفكرية أو الأخلاقية أو التراثية للموضوع (Le fond)، وتُحلل كفاءة الأدوات اللغوية والأسلوبية (La forme: الوضوح، المعجم، الرؤية السردية، الصور، التدرج)، وتختم بنظرة متوازنة أو اقتراح بنّاء (Toutefois, on aurait souhaité...).',
				'الحجم المثالي لشعبة 2AS LE (8 نقاط): نحو 160 إلى 200 كلمة مقسمة إلى 3 فقرات واضحة متوازنة، خالية من الأخطاء الصرفية والإملائية وبأسلوب فرنسي رصين.'
			],
			visualSvg: svgFrenchGrammarMap({
				title: 'Lexique critique adapté au genre du texte (2AS LE)',
				rootLabel: 'Commentaire critique sur mesure',
				rootSub: 'Adapter ses critères au genre étudié',
				width: 580,
				branches: [
					{
						label: 'Reportage',
						rule: 'Vif, immersif, valorisant',
						example: 'Repères spatiaux et témoignage vrai.'
					},
					{
						label: 'Dialogue d’idées',
						rule: 'Courtois, dialectique, nuancé',
						example: 'Écoute mutuelle et synthèse claire.'
					},
					{
						label: 'Nouvelle morale',
						rule: 'Vraisemblable, édifiant',
						example: 'Focalisation interne, chute morale.'
					},
					{
						label: 'Nuance finale',
						rule: 'Réserve constructive et polie',
						example: 'On aurait apprécié davantage de...'
					}
				]
			}),
			visualCaptionAr: 'المصطلحات النقدية المتخصصة حسب نوع النص لإتقان الفقرة الثالثة في 2AS LE',
			examples: [
				{
					problemAr:
						'Rédigez la partie critique (5 lignes) d’une nouvelle réaliste morale racontant l’honnêteté d’un jeune horloger.',
					solutionAr:
						'D’un point de vue critique, cette nouvelle réaliste séduit autant par la noblesse de son message moral que par la sobriété de son écriture. Sur le plan du fond, elle montre de façon convaincante et sans lourdeur que la probité honore celui qui la pratique. Sur le plan de la forme, la focalisation interne et le recours au discours indirect libre nous plongent avec justesse dans la conscience du personnage. Tout au plus aurait-on apprécié une brève description supplémentaire du quartier pour enrichir encore le cadre réaliste.'
				},
				{
					problemAr:
						'Corrigez cette erreur fréquente dans le résumé d’un récit au passé simple : « D’abord l’horloger ouvrit sa boutique, ensuite il trouva un carnet... »',
					solutionAr:
						'Dans un compte rendu, le résumé se rédige au présent : « D’abord, le narrateur présente un horloger qui ouvre sa boutique ; ensuite, le personnage découvre un carnet oublié... »'
				}
			],
			watchOutAr:
				'احذر من التناقض الزمني في التقرير النقدي: نكتب التلخيص دائماً في الحاضر الإخباري (Présent)، وننتقل للفقرة النقدية بأسلوب راقٍ محكم الترقيم، ونحرص على ألا تطغى الفقرة النقدية على الملخص ولا تكون مجرد سطر يتيم مبتور!'
		},
		practice: [
			{
				questionAr:
					'À quel temps conjugue-t-on généralement les verbes du résumé (2e partie) d’un compte rendu critique, même lorsque le texte source est une nouvelle au passé simple ?',
				options: [
					'Au passé simple exclusivement',
					'Au présent de l’indicatif',
					'Au plus-que-parfait',
					'À l’impératif présent'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: لا نعيد سرد القصة بالماضي البسيط في التقرير.',
					'ممتاز! الحاضر الإخباري (Présent de l’indicatif) هو الزمن المعياري لتلخيص أي نص في التقرير النقدي.',
					'خطأ: الماضي الأسبق لا يصلح زمناً رئيسياً للتلخيص.',
					'خطأ: الأمر لا يلائم التقرير.'
				],
				explanationAr: 'يُحرر ملخص التقرير الموضوعي أو النقدي في زمن المضارع (Présent) وبضمير الغائب.'
			},
			{
				questionAr:
					'Pour évaluer la forme d’un reportage sur la Grande Mosquée de Tlemcen dans la partie critique, quel commentaire est le plus pertinent ?',
				options: [
					'L’auteur utilise des mots français très faciles.',
					'La description valorisante, structurée par des repères spatiaux précis et animée par un témoignage local, rend la visite particulièrement immersive.',
					'Le texte a trois paragraphes et un titre.',
					'Tlemcen se situe à l’ouest de l’Algérie.'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: عبارة سطحية غير تحليلية.',
					'أحسنت! تربط بين الأدوات الشكلية (الوصف التثميني، المؤشرات المكانية، الشهادة) وأثرها في القارئ.',
					'خطأ: ملاحظة مادية خارجية بلا تحليل أسلوبي.',
					'خطأ: معلومة جغرافية لا تقيّم شكل النص.'
				],
				explanationAr: 'التعليق النقدي المتميز يربط بين الخصائص الأسلوبية للنوع النصي وأثرها التواصلي.'
			},
			{
				questionAr:
					'Quelle proportion équilibrée convient à un compte rendu critique complet de 180 mots en 2AS LE ?',
				options: [
					'Accroche (100 mots), résumé (70 mots), critique (10 mots)',
					'Accroche concise (30-40 mots), résumé fidèle (85-95 mots), commentaire critique argumenté (50-60 mots)',
					'Aucune accroche, copie du texte (150 mots), une ligne de critique',
					'Uniquement des critiques personnelles sans résumer le texte'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: المقدمة طويلة جداً والفقرة النقدية مبتورة.',
					'صحيح! هذا التوازن (مقدمة موجزة + تلخيص وافٍ + تعليق نقدي متين) مثالي للحصول على 8/8.',
					'خطأ: غياب المقدمة والنسخ يبطلان العمل.',
					'خطأ: التلخيص الأمين جزء أساسي لا غنى عنه.'
				],
				explanationAr: 'التوازن الهيكلي بين الأجزاء الثلاثة معيار حاسم في تنقيط التقرير النقدي (8 نقاط).'
			},
			{
				questionAr:
					'Quelle formule introduit avec élégance une légère nuance constructive à la fin de la partie critique ?',
				options: [
					'Toutefois, l’ajout d’un témoignage complémentaire d’un jeune habitant aurait encore enrichi la perspective du reportage.',
					'D’ailleurs, l’auteur a tout raté dans son dernier paragraphe.',
					'Pour finir, je n’ai pas d’autre idée à écrire.',
					'Bref, ce texte est fini.'
				],
				correctIndex: 0,
				diagnosticFeedback: [
					'ممتاز! صياغة مهذبة وبناءة تُظهر قراءة نقدية ناضجة وموضوعية.',
					'خطأ: حكم قاسٍ وغير مبرر ومخالف لأدب النقد.',
					'خطأ: جملة اعتذارية ركيكة تسيء للختام.',
					'خطأ: أسلوب عامي ركيك.'
				],
				explanationAr: 'إبداء تحفظ لطيف أو مقترح بنّاء بصيغة الشرطي الماضي (« aurait encore enrichi ») يرفع مستوى الفقرة النقدية.'
			},
			{
				questionAr:
					'Quel piège méthodologique faut-il absolument éviter lors du passage du résumé (2e partie) au commentaire critique (3e partie) ?',
				options: [
					'Aller à la ligne avec un alinéa et un articulateur clair (ex. : « Sur le plan critique... »)',
					'Glisser ses jugements personnels dès le milieu du résumé ou oublier de justifier son appréciation',
					'Employer un registre courant soigné ou soutenu',
					'Évaluer à la fois l’intérêt du fond et les qualités de la forme'
				],
				correctIndex: 1,
				diagnosticFeedback: [
					'خطأ: الانتقال بفقرة مستقلة ومؤشر واضح هو الصواب تماماً.',
					'صحيح! خلط الرأي بالتلخيص أو إطلاق أحكام بلا تعليل هما أبرز خطأين يخصمان النقاط.',
					'خطأ: اللغة الراقية مطلوبة.',
					'خطأ: الجمع بين المضمون والشكل هو المطلوب.'
				],
				explanationAr: 'الحفاظ على حياد الملخص ثم تقديم نقد معلل في فقرة ثالثة مستقلة هو سر إتقان التقرير النقدي.'
			}
		]
	}
];
