// --- Constants & Data ---
const QUESTIONS = [
    {
        id: 1,
        text: "ワンちゃんは、人見知り、ワンちゃん見知り（内向的）をしますか？",
        options: [
            { label: "する（内向的）", value: "introverted", icon: "user-check" },
            { label: "しない（外向的）", value: "user-x" },
        ]
    },
    {
        id: 2,
        text: "ワンちゃんは、運動好き（活発）ですか？",
        options: [
            { label: "すき（活発）", value: "active", icon: "dumbbell" },
            { label: "きらい（おとなしい）", value: "quiet", icon: "moon" },
        ]
    },
    {
        id: 3,
        text: "ワンちゃんの大きさはどのくらいですか？",
        options: [
            { label: "大型犬", value: "large", icon: "maximize-2" },
            { label: "中・小型犬", value: "smallMedium", icon: "minimize-2" },
        ]
    }
];

const RESULTS = {
    uchibenkei: {
        id: 'uchibenkei',
        patternName: 'パターン①',
        title: '内弁慶ちゃん',
        description: '飼い主様以外の人やほかのワンちゃんを警戒してしまう「内弁慶ちゃん」。このタイプのワンちゃんの旅行は、飼い主さんと二人だけで体を動かせるプランを考えてはいかがでしょう。マリンスポーツや、プライベートドッグランもおすすめ。キャビン型のホテルは、安心して宿泊もできます。',
        image: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=800',
        recommendations: {
            large: ['プライベートドッグラン付きロッジ', '大型犬OKのカヌー体験', '専用庭付きキャビン'],
            smallMedium: ['貸切ドッグラン巡り', '静かな湖畔での水遊び', '個室食の温泉宿']
        },
        featuredSpots: [
            {
                name: 'じゃのひれSUP',
                location: '兵庫県南あわじ市',
                description: '波の影響が少なく透明度の高い海で、SUPやFIBが体験できる。ガイドさんがほぼマンツーマンで同行してくれるので初心者でも安心。',
                image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800',
                tag: '遊ぶ'
            },
            {
                name: '舞洲バーベキューパーク',
                location: '大阪府大阪市',
                description: 'わんことBBQが楽しめるペットサイトエリアがオープン。24,000㎡の広大な敷地にあるBBQ場。オートキャンプも可能。',
                image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
                tag: '食べる・遊ぶ'
            },
            {
                name: 'Moon-Rivage（ムーン・リバージュ）',
                location: '静岡県下田市',
                description: '愛犬と過ごす海辺のお宿。全客室に天然温泉の掛け流しのお風呂が付いている贅沢な空間。',
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
                tag: '泊まる'
            },
            {
                name: '南あわじドッグラン・飛行犬撮影所',
                location: '兵庫県南あわじ市',
                description: 'わんこが飛んでいる瞬間をプロのカメラマンが激写！約500坪の広大な敷地がそのまま屋外スタジオに。',
                image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
                tag: '遊ぶ'
            }
        ],
        color: 'bg-[#00A0E9]',
        icon: 'trees'
    },
    hakoiri: {
        id: 'hakoiri',
        patternName: 'パターン④',
        title: '箱入りちゃん',
        description: '飼い主様の事が大好きで、少し慎重な「箱入りちゃん」。安心した旅行にするために、宿泊は、ほかのワンちゃんと接する機会の少ない、ロッジタイプがおすすめ。飼い主様と一緒に記念品を作ったり、きれいな景色の中を散策したり、二人っきりの時間を楽しみましょう。',
        image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
        recommendations: {
            large: ['景色の良いプライベートヴィラ', 'ゆったりとした森の散策', '大型犬対応の静かなコテージ'],
            smallMedium: ['思い出の記念品作り体験', 'お部屋食の静かな宿', 'カートでのんびり景色鑑賞']
        },
        featuredSpots: [
            {
                name: '軽井沢BIRDIE',
                location: '長野県北佐久郡軽井沢町',
                description: 'わんこのおしゃれと健康を第一に考えるペット雑貨店。上質な首輪やウェア、ウェルネスフードが豊富に揃う、25年以上愛される名店。',
                image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
                tag: '買う'
            },
            {
                name: '那須温泉宿 ゆきみそう 別邸',
                location: '栃木県那須郡那須町',
                description: '源泉かけ流し温泉とプライベートドッグランが併設された一棟貸しの宿。特選A5ランクの那須和牛しゃぶしゃぶも堪能できる。',
                image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
                tag: '泊まる'
            },
            {
                name: '観光農園花ひろば',
                location: '愛知県知多郡南知多町',
                description: '広大な敷地に咲き誇る四季折々の花々に囲まれて、のびのびと散歩が楽しめる。カフェを含め園内すべてのエリアでわんこ同伴OK。',
                image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800',
                tag: '遊ぶ'
            },
            {
                name: 'アトリエ・ロッキー万華鏡館',
                location: '静岡県伊東市',
                description: '世界最大級の巨大万華鏡「SPACE WALK」の中に入って、わんこと一緒に幻想的な写真撮影が可能。アートな体験を。',
                image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800',
                tag: '遊ぶ'
            }
        ],
        color: 'bg-[#0071BC]',
        icon: 'waves'
    },
    wanpaku: {
        id: 'wanpaku',
        patternName: 'パターン②',
        title: 'ワンパクちゃん',
        description: '体を動かすことが大好きな、「ワンパクちゃん」。他のワンちゃんと友達になるのも得意なので、大きなドッグランに大喜び。水遊びが好きならマリンスポーツにも挑戦。バーベキューもついたプランだと、飼い主様もお楽しみいただけます。',
        image: 'https://images.unsplash.com/photo-1551730459-92db2a308d6a?auto=format&fit=crop&q=80&w=800',
        recommendations: {
            large: ['広大なドッグランがあるリゾート', '本格的なマリンスポーツ体験', '開放感のあるBBQ広場'],
            smallMedium: ['ドッグラン巡りツアー', 'みんなで楽しむ水遊び', 'テラス席でのBBQランチ']
        },
        featuredSpots: [
            {
                name: 'プレジデントリゾートホテル軽井沢',
                location: '群馬県吾妻郡長野原町',
                description: '大自然の中にある広大なドッグランでわんこと一緒に大はしゃぎ！夏は涼しく、冬はスキー場にある「雪のドッグラン」も楽しめるガーデンコテージが人気。',
                image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=800',
                tag: '泊まる'
            },
            {
                name: 'レストランメロディー',
                location: '京都府京都市西京区',
                description: '60年代アメリカンな雰囲気が自慢のレストラン。わんこメニューも豊富で、骨型クッキーに名前を入れられる誕生日ケーキも人気。',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800',
                tag: '食べる'
            },
            {
                name: 'miele the garden（ミエレ・ザ・ガーデン）',
                location: '兵庫県淡路市',
                description: '海が見える開放的なドッグテラスで地元食材の料理を堪能！芝生が一面に広がるガーデンカフェで、ワンちゃんとのびのびくつろげる。',
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
                tag: '食べる'
            }
        ],
        color: 'bg-[#E60012]',
        icon: 'coffee'
    },
    himeouji: {
        id: 'himeouji',
        patternName: 'パターン③',
        title: '姫ちゃん王子ちゃん',
        description: '飼い主様をはじめ、人にかまってもらうのが大好きな「姫ちゃん王子ちゃん」。ワンちゃんが輝くような写真撮影や、ショッピングをご提案します。人見知りをしないので、ワンちゃんも一緒に食べられるカフェなども組み込んで、ゆったりとしたプランをおすすめします。',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800',
        recommendations: {
            large: ['プロによる写真撮影会', 'ドッグフレンドリーな大型モール', 'ゆったりとしたカフェランチ'],
            smallMedium: ['映えるフォトスポット巡り', 'おしゃれなドッグカフェ', 'セレクトショップでのお買い物']
        },
        featuredSpots: [
            {
                name: '伊豆アート体験 さくら坂',
                location: '静岡県伊東市',
                description: 'わんこと一緒に伊豆の思い出を作品に。ミニチュアガラスを組み合わせたキャンドル作りやオルゴール作りなど、オリジナルのわんこグッズ製作を体験できる。',
                image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800',
                tag: '遊ぶ'
            },
            {
                name: 'クラフトの里 ダラスヴィレッジ',
                location: '山梨県南都留郡山中湖村',
                description: '「いつでもわんこと一緒」がコンセプトの体験工房＆レストラン。吹きガラスや陶芸など13種類ものクラフトを愛犬とともに体験できる。',
                image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
                tag: '食べる・遊ぶ'
            },
            {
                name: '小野住吉神社',
                location: '兵庫県小野市',
                description: '愛犬の健康や幸せを祈願する「犬幸祈願」ができる神社。わんこ専用の可愛いお守りや絵馬、おみくじが充実しており、愛犬と一緒に祈祷やお祓いを受ける貴重な体験ができます。',
                image: 'https://ono-navi.jp/wp-content/uploads/2021/04/sumiyoshi-shrine.jpg',
                tag: '遊ぶ'
            }
        ],
        color: 'bg-[#22AC38]',
        icon: 'camera'
    }
};

// --- State ---
let step = 'hero';
let currentQuestion = 0;
let answers = {};
let result = null;
let dogSize = 'smallMedium';

// --- Functions ---
function render() {
    const container = document.getElementById('app-container');
    container.innerHTML = '';

    if (step === 'hero') {
        container.innerHTML = `
        <section class="fade-in relative overflow-hidden rounded-[2rem] bg-white shadow-xl border border-slate-100">
            <div class="grid md:grid-cols-2 items-center">
                <div class="p-8 md:p-16 space-y-8">
                    <div class="inline-block bg-[#00A0E9] text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                        Special Diagnosis
                    </div>
                    <h2 class="text-4xl md:text-5xl font-black leading-tight text-[#333]">
                        愛犬と行く、<br />
                        <span class="text-[#00A0E9]">最高の旅</span>を<br />
                        見つけよう。
                    </h2>
                    <p class="text-lg font-medium text-slate-500 leading-relaxed">
                        ワンちゃんの性格や好みから、愛犬を4パターンに分類！<br />
                        おすすめの旅行プランをご案内します。
                    </p>
                    <button onclick="startQuiz()" class="group flex items-center gap-4 bg-[#00A0E9] hover:bg-[#0071BC] text-white px-10 py-5 rounded-full text-xl font-black transition-all shadow-lg shadow-blue-200">
                        診断をスタートする
                        <i data-lucide="arrow-right" class="w-6 h-6"></i>
                    </button>
                </div>
                <div class="relative h-[400px] md:h-full min-h-[500px]">
                    <img src="https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80&w=800" class="absolute inset-0 w-full h-full object-cover" alt="Happy Dog">
                    <div class="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent hidden md:block"></div>
                </div>
            </div>
        </section>
        `;
    } else if (step === 'quiz') {
        const question = QUESTIONS[currentQuestion];
        container.innerHTML = `
        <section class="max-w-3xl mx-auto fade-in">
            <div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                <div class="flex items-center justify-between mb-12">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-[#00A0E9]/10 rounded-2xl flex items-center justify-center text-[#00A0E9] font-black text-xl">
                            ${currentQuestion + 1}
                        </div>
                        <div>
                            <p class="text-xs font-black text-[#00A0E9] uppercase tracking-widest">Question</p>
                            <p class="text-sm font-bold text-slate-400">全3問中</p>
                        </div>
                    </div>
                    <div class="flex gap-1">
                        ${QUESTIONS.map((_, i) => `
                            <div class="h-1.5 w-8 rounded-full transition-all duration-500 ${i <= currentQuestion ? 'bg-[#00A0E9]' : 'bg-slate-100'}"></div>
                        `).join('')}
                    </div>
                </div>

                <h3 class="text-2xl md:text-3xl font-black mb-12 text-[#333] leading-snug">
                    ${question.text}
                </h3>

                <div class="grid gap-4">
                    ${question.options.map((option, idx) => `
                        <button onclick="handleAnswer('${option.value}')" class="group flex items-center justify-between p-6 bg-[#F7F9FC] border-2 border-transparent rounded-2xl hover:border-[#00A0E9] hover:bg-white transition-all text-left">
                            <div class="flex items-center gap-4">
                                <div class="text-[#00A0E9] opacity-50 group-hover:opacity-100 transition-opacity">
                                    <i data-lucide="${option.icon}" class="w-5 h-5"></i>
                                </div>
                                <span class="text-lg font-black text-slate-600 group-hover:text-[#00A0E9]">${option.label}</span>
                            </div>
                            <div class="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:bg-[#00A0E9] group-hover:border-[#00A0E9] transition-all">
                                <i data-lucide="chevron-right" class="w-6 h-6 text-slate-300 group-hover:text-white transition-all"></i>
                            </div>
                        </button>
                    `).join('')}
                </div>
            </div>
        </section>
        `;
    } else if (step === 'result' && result) {
        container.innerHTML = `
        <section class="space-y-8 fade-in">
            <div class="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                <div class="grid md:grid-cols-2">
                    <div class="relative h-80 md:h-full min-h-[400px]">
                        <img src="${result.image}" alt="${result.title}" class="absolute inset-0 w-full h-full object-cover">
                        <div class="absolute top-6 left-6 w-16 h-16 ${result.color} rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <i data-lucide="${result.icon}" class="w-8 h-8"></i>
                        </div>
                    </div>
                    <div class="p-8 md:p-16 space-y-8">
                        <div>
                            <p class="text-sm font-black text-[#00A0E9] uppercase tracking-widest mb-2">${result.patternName} Result</p>
                            <h2 class="text-3xl md:text-4xl font-black text-[#333]">${result.title}</h2>
                            <p class="text-xs font-bold text-slate-400 mt-1">(${dogSize === 'large' ? '大型犬' : '中・小型犬'}向けプラン)</p>
                        </div>
                        
                        <div class="h-1 w-20 bg-[#00A0E9] rounded-full"></div>
                        
                        <p class="text-lg font-medium text-slate-600 leading-relaxed">
                            ${result.description}
                        </p>

                        <div class="space-y-4">
                            <h4 class="font-black flex items-center gap-2 text-[#00A0E9]">
                                <i data-lucide="map-pin" class="w-5 h-5"></i>
                                おすすめのプラン
                            </h4>
                            <div class="grid gap-3">
                                ${result.recommendations[dogSize].map(rec => `
                                    <div class="flex items-center gap-3 bg-[#F7F9FC] p-4 rounded-xl border border-slate-100">
                                        <i data-lucide="check-circle-2" class="w-5 h-5 text-[#00A0E9] shrink-0"></i>
                                        <span class="font-bold text-slate-700">${rec}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <button onclick="resetApp()" class="w-full flex items-center justify-center gap-3 py-5 bg-[#333] hover:bg-black text-white rounded-full font-black transition-all shadow-lg">
                            <i data-lucide="refresh-cw" class="w-5 h-5"></i>
                            もう一度診断する
                        </button>
                    </div>
                </div>
            </div>

            ${result.featuredSpots ? `
            <div class="space-y-8 mt-12">
                <div class="flex items-center gap-4">
                    <div class="h-px flex-grow bg-slate-200"></div>
                    <h3 class="text-2xl font-black text-[#00A0E9] flex items-center gap-2 shrink-0">
                        <i data-lucide="camera" class="w-7 h-7"></i>
                        おすすめスポット詳細
                    </h3>
                    <div class="h-px flex-grow bg-slate-200"></div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    ${result.featuredSpots.map(spot => `
                        <div class="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:translate-y-[-4px] transition-all duration-300">
                            <div class="relative h-56 bg-slate-100">
                                <img src="${spot.image}" alt="${spot.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1541591490109-6a4e881b5669?auto=format&fit=crop&q=80&w=800'">
                                <div class="absolute top-6 left-6 bg-[#00A0E9] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg tracking-wider">
                                    ${spot.tag}
                                </div>
                            </div>
                            <div class="p-8 space-y-4 flex-grow">
                                <div class="flex items-center gap-2 text-[#00A0E9] font-bold text-sm">
                                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                                    ${spot.location}
                                </div>
                                <h4 class="text-2xl font-black leading-tight text-[#333]">${spot.name}</h4>
                                <p class="text-slate-500 font-bold leading-relaxed">
                                    ${spot.description}
                                </p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </section>
        `;
    }

    lucide.createIcons();
}

function startQuiz() {
    step = 'quiz';
    currentQuestion = 0;
    answers = {};
    render();
}

function handleAnswer(value) {
    answers[QUESTIONS[currentQuestion].id] = value;
    if (currentQuestion < QUESTIONS.length - 1) {
        currentQuestion++;
        render();
    } else {
        calculateResult();
    }
}

function calculateResult() {
    const shy = answers[1];
    const exercise = answers[2];
    const size = answers[3];
    dogSize = size;

    if (shy === 'introverted') {
        result = (exercise === 'active') ? RESULTS.uchibenkei : RESULTS.hakoiri;
    } else {
        result = (exercise === 'active') ? RESULTS.wanpaku : RESULTS.himeouji;
    }
    step = 'result';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetApp() {
    step = 'hero';
    result = null;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize
document.addEventListener('DOMContentLoaded', render);
