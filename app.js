const questions = [
    {
        id: "size",
        title: "ワンちゃんの大きさは？",
        desc: "体のサイズに合ったプランをご提案します",
        options: [
            { label: "中・小型犬", desc: "チワワ・トイプードル・柴犬など", value: "small" },
            { label: "大型犬", desc: "体重おおむね25kg以上・ゴールデンレトリバーなど", value: "large" }
        ]
    },
    {
        id: "activity",
        title: "ワンちゃんは、運動好きですか？",
        desc: "普段の活動量・性格で選んでください",
        options: [
            { label: "すき（活発）", desc: "走ったり遊んだりするのが大好き", value: "active" },
            { label: "きらい（おとなしい）", desc: "のんびり過ごすのが好き・おとなしいタイプ", value: "quiet" }
        ]
    },
    {
        id: "sociability",
        title: "ワンちゃんは、人見知り・ワンちゃん見知りをしますか？",
        desc: "他の人や犬に対する反応で選んでください",
        options: [
            { label: "する（内向的）", desc: "他の人や犬に緊張したり警戒しがち", value: "introvert" },
            { label: "しない（外向的）", desc: "誰とでもすぐ仲良くなれる人懐っこいタイプ", value: "extrovert" }
        ]
    }
];

const resultsMap = {
    "active-extrovert": {
        name: "ワンパクちゃん",
        desc: "体を動かすことが大好きな、「ワンパクちゃん」。他のワンちゃんと友達になるのも得意なので、大きなドッグランに大喜び。水遊びが好きならマリンスポーツにも挑戦。バーベキューもついたプランだと、飼い主様もお楽しみいただけます。",
        image: "type_wanpaku_1775783285203.png",
        tags: ["外向的で運動ずき", "アクティビティ", "バーベキュー", "マリンスポーツ"]
    },
    "quiet-extrovert": {
        name: "姫ちゃん王子ちゃん",
        desc: "飼い主様をはじめ、人にかまってもらうのが大好きな「姫ちゃん王子ちゃん」。ワンちゃんが輝くような写真撮影や、ショッピングをご提案します。人見知りをしないので、ワンちゃんも一緒に食べられるカフェなども組み込んで、ゆったりとしたプランをおすすめします。",
        image: "type_princess_1775783326786.png",
        tags: ["外向的で運動ぎらい", "写真撮影", "買い物", "同伴用レストラン"]
    },
    "active-introvert": {
        name: "内弁慶ちゃん",
        desc: "飼い主様以外の人やほかのワンちゃんを警戒してしまう「内弁慶ちゃん」。このタイプのワンちゃんの旅行は、飼い主さんと二人だけで体を動かせるプランを考えてはいかがでしょう。マリンスポーツや、プライベートドッグランもおすすめ。キャビン型のホテルは、安心して宿泊もできます。",
        image: "type_uchibenkei_1775783348460.png",
        tags: ["内向的で運動ずき", "プライベートドッグラン", "ホテル型（専用）"]
    },
    "quiet-introvert": {
        name: "箱入りちゃん",
        desc: "飼い主様の事が大好きで、少し慎重な「箱入りちゃん」。安心した旅行にするために、宿泊は、ほかのワンちゃんと接する機会の少ない、ロッジタイプがおすすめ。飼い主様と一緒に記念品を作ったり、きれいな景色の中を散策したり、二人っきりの時間を楽しみましょう。",
        image: "type_hakoiri_1775783367778.png",
        tags: ["内向的で運動ぎらい", "ロッジ型", "体験もの（記念製作）"]
    }
};

let currentQuestionIndex = 0;
let answers = {};

// Elements
const screens = document.querySelectorAll(".screen");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const progressFill = document.getElementById("progress-fill");
const qNumber = document.getElementById("q-number");
const questionText = document.getElementById("question-text");
const questionDesc = document.getElementById("question-desc");
const optionsContainer = document.getElementById("options-container");
const backBtn = document.getElementById("back-btn");

const resultTypeName = document.getElementById("result-type-name");
const resultImage = document.getElementById("result-image");
const resultTags = document.getElementById("result-tags");
const resultDesc = document.getElementById("result-desc");

// Navigation
function switchScreen(screenId) {
    screens.forEach(s => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");
}

// Initialization
document.getElementById("start-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    answers = {};
    renderQuestion();
    switchScreen("quiz-screen");
});

document.getElementById("restart-btn").addEventListener("click", () => {
    currentQuestionIndex = 0;
    answers = {};
    renderQuestion();
    switchScreen("quiz-screen");
});

document.getElementById("top-btn").addEventListener("click", () => {
    switchScreen("welcome-screen");
});

backBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
});

// Render Quiz
function renderQuestion() {
    const q = questions[currentQuestionIndex];
    qNumber.innerText = currentQuestionIndex + 1;
    questionText.innerText = q.title;
    questionDesc.innerText = q.desc;
    
    // Update progress
    progressFill.style.width = \`\${((currentQuestionIndex + 1) / questions.length) * 100}%\`;

    // Back button visibility
    if (currentQuestionIndex === 0) {
        backBtn.classList.add("hidden");
    } else {
        backBtn.classList.remove("hidden");
    }

    // Render options
    optionsContainer.innerHTML = "";
    q.options.forEach(opt => {
        const optionCard = document.createElement("div");
        optionCard.className = "option-card";
        optionCard.innerHTML = \`
            <div class="option-title">\${opt.label}</div>
            <div class="option-desc">\${opt.desc}</div>
        \`;
        optionCard.addEventListener("click", () => {
            answers[q.id] = opt.value;
            handleNext();
        });
        optionsContainer.appendChild(optionCard);
    });
}

function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
        // Transition effect
        quizScreen.style.opacity = "0";
        setTimeout(() => {
            currentQuestionIndex++;
            renderQuestion();
            quizScreen.style.opacity = "1";
        }, 300);
    } else {
        calculateResult();
    }
}

function calculateResult() {
    const activity = answers["activity"];
    const sociability = answers["sociability"];
    const size = answers["size"]; // Can be used for size-specific logic if needed
    
    const key = \`\${activity}-\${sociability}\`;
    const result = resultsMap[key] || resultsMap["active-extrovert"]; // Fallback safe
    
    // Render result
    resultTypeName.innerText = result.name;
    resultImage.src = result.image;
    resultDesc.innerText = result.desc;
    
    // Add size tag
    let sizeTag = size === "large" ? "大型犬向け" : "中・小型犬向け";
    let allTags = [sizeTag, ...result.tags];

    resultTags.innerHTML = "";
    allTags.forEach(tag => {
        const span = document.createElement("span");
        span.className = "type-tag";
        span.innerText = tag;
        resultTags.appendChild(span);
    });

    switchScreen("result-screen");
}