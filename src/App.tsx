/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dog, 
  MapPin, 
  ChevronRight, 
  RefreshCw, 
  Heart, 
  Trees, 
  Coffee, 
  Camera, 
  Waves,
  CheckCircle2,
  Info,
  ArrowRight,
  UserCheck,
  UserX,
  Dumbbell,
  Moon,
  Maximize2,
  Minimize2
} from 'lucide-react';

// --- Types ---

type Step = 'hero' | 'quiz' | 'result';

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    icon?: ReactNode;
  }[];
}

interface FeaturedSpot {
  name: string;
  location: string;
  description: string;
  image: string;
  tag: string;
}

interface ResultType {
  id: string;
  title: string;
  patternName: string;
  description: string;
  image: string;
  recommendations: {
    large: string[];
    smallMedium: string[];
  };
  featuredSpots?: FeaturedSpot[];
  color: string;
  icon: ReactNode;
}

// --- Constants ---

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "ワンちゃんは、人見知り、ワンちゃん見知り（内向的）をしますか？",
    options: [
      { label: "する（内向的）", value: "introverted", icon: <UserCheck className="w-5 h-5" /> },
      { label: "しない（外向的）", value: "extroverted", icon: <UserX className="w-5 h-5" /> },
    ]
  },
  {
    id: 2,
    text: "ワンちゃんは、運動好き（活発）ですか？",
    options: [
      { label: "すき（活発）", value: "active", icon: <Dumbbell className="w-5 h-5" /> },
      { label: "きらい（おとなしい）", value: "quiet", icon: <Moon className="w-5 h-5" /> },
    ]
  },
  {
    id: 3,
    text: "ワンちゃんの大きさはどのくらいですか？",
    options: [
      { label: "大型犬", value: "large", icon: <Maximize2 className="w-5 h-5" /> },
      { label: "中・小型犬", value: "smallMedium", icon: <Minimize2 className="w-5 h-5" /> },
    ]
  }
];

const RESULTS: Record<string, ResultType> = {
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
    icon: <Trees className="w-8 h-8" />
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
    icon: <Waves className="w-8 h-8" />
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
    icon: <Coffee className="w-8 h-8" />
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
        image: 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?auto=format&fit=crop&q=80&w=800',
        tag: '遊ぶ'
      }
    ],
    color: 'bg-[#22AC38]',
    icon: <Camera className="w-8 h-8" />
  }
};

// --- Components ---

export default function App() {
  const [step, setStep] = useState<Step>('hero');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<ResultType | null>(null);
  const [dogSize, setDogSize] = useState<'large' | 'smallMedium'>('smallMedium');

  const handleStart = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<number, string>) => {
    const shy = finalAnswers[1];
    const exercise = finalAnswers[2];
    const size = finalAnswers[3] as 'large' | 'smallMedium';
    
    setDogSize(size);

    if (shy === 'introverted') {
      if (exercise === 'active') {
        setResult(RESULTS.uchibenkei);
      } else {
        setResult(RESULTS.hakoiri);
      }
    } else {
      if (exercise === 'active') {
        setResult(RESULTS.wanpaku);
      } else {
        setResult(RESULTS.himeouji);
      }
    }
    setStep('result');
  };

  const handleReset = () => {
    setStep('hero');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#333333] font-sans selection:bg-[#00A0E9]/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-[#00A0E9] px-6 py-3 shadow-sm">
        <div className="max-w-[800px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleReset}
            >
              <h1 className="text-lg font-black leading-none text-[#00A0E9]">ワンちゃん旅行 タイプ診断システム</h1>
              <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Travel Diagnosis System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-16 px-6">
        <div className="max-w-[800px] mx-auto">
          <AnimatePresence mode="wait">
            {step === 'hero' && (
              <motion.section
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative overflow-hidden rounded-[2rem] bg-white shadow-xl border border-slate-100"
              >
                <div className="grid md:grid-cols-2 items-center">
                  <div className="p-8 md:p-16 space-y-8">
                    <div className="inline-block bg-[#00A0E9] text-white text-xs font-black px-4 py-1.5 rounded-full tracking-widest uppercase">
                      Special Diagnosis
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black leading-tight text-[#333]">
                      愛犬と行く、<br />
                      <span className="text-[#00A0E9]">最高の旅</span>を<br />
                      見つけよう。
                    </h2>
                    <p className="text-lg font-medium text-slate-500 leading-relaxed">
                      ワンちゃんの性格や好みから、愛犬を4パターンに分類！<br />
                      おすすめの旅行プランをご案内します。
                    </p>
                    <button
                      onClick={handleStart}
                      className="group flex items-center gap-4 bg-[#00A0E9] hover:bg-[#0071BC] text-white px-10 py-5 rounded-full text-xl font-black transition-all shadow-lg shadow-blue-200"
                    >
                      診断をスタートする
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <div className="relative h-[400px] md:h-full min-h-[500px]">
                    <img 
                      src="https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80&w=800" 
                      alt="Happy Dog"
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent hidden md:block" />
                  </div>
                </div>
              </motion.section>
            )}

            {step === 'quiz' && (
              <motion.section
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#00A0E9]/10 rounded-2xl flex items-center justify-center text-[#00A0E9] font-black text-xl">
                        {currentQuestion + 1}
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#00A0E9] uppercase tracking-widest">Question</p>
                        <p className="text-sm font-bold text-slate-400">全3問中</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {QUESTIONS.map((_, i) => (
                        <div 
                          key={i} 
                          className={`h-1.5 w-8 rounded-full transition-all duration-500 ${i <= currentQuestion ? 'bg-[#00A0E9]' : 'bg-slate-100'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black mb-12 text-[#333] leading-snug">
                    {QUESTIONS[currentQuestion].text}
                  </h3>

                  <div className="grid gap-4">
                    {QUESTIONS[currentQuestion].options.map((option, idx) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleAnswer(option.value)}
                        className="group flex items-center justify-between p-6 bg-[#F7F9FC] border-2 border-transparent rounded-2xl hover:border-[#00A0E9] hover:bg-white transition-all text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-[#00A0E9] opacity-50 group-hover:opacity-100 transition-opacity">
                            {option.icon}
                          </div>
                          <span className="text-lg font-black text-slate-600 group-hover:text-[#00A0E9]">{option.label}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center group-hover:bg-[#00A0E9] group-hover:border-[#00A0E9] transition-all">
                          <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-white transition-all" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}

            {step === 'result' && result && (
              <motion.section
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100">
                  <div className="grid md:grid-cols-2">
                    <div className="relative h-80 md:h-full min-h-[400px]">
                      <img 
                        src={result.image} 
                        alt={result.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className={`absolute top-6 left-6 w-16 h-16 ${result.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                        {result.icon}
                      </div>
                    </div>
                    <div className="p-8 md:p-16 space-y-8">
                      <div>
                        <p className="text-sm font-black text-[#00A0E9] uppercase tracking-widest mb-2">{result.patternName} Result</p>
                        <h2 className="text-3xl md:text-4xl font-black text-[#333]">{result.title}</h2>
                        <p className="text-xs font-bold text-slate-400 mt-1">({dogSize === 'large' ? '大型犬' : '中・小型犬'}向けプラン)</p>
                      </div>
                      
                      <div className="h-1 w-20 bg-[#00A0E9] rounded-full" />
                      
                      <p className="text-lg font-medium text-slate-600 leading-relaxed">
                        {result.description}
                      </p>

                      <div className="space-y-4">
                        <h4 className="font-black flex items-center gap-2 text-[#00A0E9]">
                          <MapPin className="w-5 h-5" />
                          おすすめのプラン
                        </h4>
                        <div className="grid gap-3">
                          {result.recommendations[dogSize].map((rec, i) => (
                            <div key={i} className="flex items-center gap-3 bg-[#F7F9FC] p-4 rounded-xl border border-slate-100">
                              <CheckCircle2 className="w-5 h-5 text-[#00A0E9] shrink-0" />
                              <span className="font-bold text-slate-700">{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-3 py-5 bg-[#333] hover:bg-black text-white rounded-full font-black transition-all shadow-lg"
                      >
                        <RefreshCw className="w-5 h-5" />
                        もう一度診断する
                      </button>
                    </div>
                  </div>
                </div>

                {result.featuredSpots && (
                  <div className="space-y-8 mt-12">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-grow bg-slate-200" />
                      <h3 className="text-2xl font-black text-[#00A0E9] flex items-center gap-2 shrink-0">
                        <Camera className="w-7 h-7" />
                        おすすめスポット詳細
                      </h3>
                      <div className="h-px flex-grow bg-slate-200" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {result.featuredSpots.map((spot, idx) => (
                          <div key={idx} className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col hover:translate-y-[-4px] transition-all duration-300">
                          <div className="relative h-56 bg-slate-100">
                            <img 
                              src={spot.image} 
                              alt={spot.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541591490109-6a4e881b5669?auto=format&fit=crop&q=80&w=800';
                              }}
                            />
                            <div className="absolute top-6 left-6 bg-[#00A0E9] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg tracking-wider">
                              {spot.tag}
                            </div>
                          </div>
                          <div className="p-8 space-y-4 flex-grow">
                            <div className="flex items-center gap-2 text-[#00A0E9] font-bold text-sm">
                              <MapPin className="w-4 h-4" />
                              {spot.location}
                            </div>
                            <h4 className="text-2xl font-black leading-tight text-[#333]">{spot.name}</h4>
                            <p className="text-slate-500 font-bold leading-relaxed">
                              {spot.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="bg-white py-16 border-t border-slate-100">
        <div className="max-w-[800px] mx-auto px-6 text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
            <span className="text-xl font-black text-[#00A0E9]">ワンちゃん旅行 タイプ診断システム</span>
          </div>
          <p className="text-xs font-bold text-slate-300 tracking-widest">© ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}
