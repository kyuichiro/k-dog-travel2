import os

# Base Template
def create_html(title, body_content, progress=0):
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | ワンちゃん旅行 タイプ診断システム</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app" class="app-container">
        <section class="screen">
{body_content}
        </section>
    </div>
    <!-- Decorative background elements -->
    <div class="bg-blob blob-1"></div>
    <div class="bg-blob blob-2"></div>
    <div class="bg-blob blob-3"></div>
</body>
</html>
"""

# Question Template Generator
def generate_question_html(title, q_num, text, desc, opt1_label, opt1_desc, opt1_link, opt2_label, opt2_desc, opt2_link, back_link=None):
    progress_w = (q_num / 3.0) * 100
    
    back_btn_html = ""
    if back_link:
        back_btn_html = f'<a href="{back_link}" class="text-btn" style="text-decoration:none; display:inline-block; margin-top:2rem;">前の質問に戻る</a>'

    body = f"""
            <div class="glass-card quiz-card">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: {progress_w}%"></div>
                </div>
                <div class="question-header">
                    <span class="q-label">質問 <span>{q_num}</span></span>
                    <h2 class="question-title">{text}</h2>
                    <p class="question-desc">{desc}</p>
                </div>
                <div class="options-grid">
                    <a href="{opt1_link}" style="text-decoration:none; color:inherit;">
                        <div class="option-card">
                            <div class="option-title">{opt1_label}</div>
                            <div class="option-desc">{opt1_desc}</div>
                        </div>
                    </a>
                    <a href="{opt2_link}" style="text-decoration:none; color:inherit;">
                        <div class="option-card">
                            <div class="option-title">{opt2_label}</div>
                            <div class="option-desc">{opt2_desc}</div>
                        </div>
                    </a>
                </div>
                {back_btn_html}
            </div>
    """
    return create_html(title, body)

# Result Template
def generate_result_html(typeName, tags, desc, image_path):
    tags_html = ""
    for t in tags:
        tags_html += f'<span class="type-tag">{t}</span>\n'

    body = f"""
            <div class="glass-card result-card">
                <div class="result-badge">診断結果</div>
                <h2 class="result-title">「<span style="color:var(--primary-color)">{typeName}</span>」タイプ</h2>
                
                <div class="result-image-container">
                    <img src="{image_path}" alt="おすすめプランイメージ" class="result-image" />
                    <div class="tag-container">
                        {tags_html}
                    </div>
                </div>

                <div class="result-description-box">
                    <h3 style="font-size: 1rem; margin-bottom: 0.5rem; color: var(--primary-color);">おすすめプランの内容</h3>
                    <p>{desc}</p>
                </div>

                <div class="action-buttons">
                    <a href="q1.html" class="secondary-btn" style="text-decoration:none; display:inline-block; text-align:center;">もう一度診断する</a>
                    <a href="index.html" class="text-btn" style="text-decoration:none; display:inline-block;">トップに戻る</a>
                </div>
            </div>
    """
    return create_html(f"診断結果: {typeName}", body)


# Generator Logic

# Start page
start_body = """
            <div class="glass-card">
                <div class="badge">診断</div>
                <h1 class="main-title">ワンちゃん旅行<br><span class="highlight">タイプ診断システム</span></h1>
                <p class="subtitle">愛犬の性格に合わせた、<br>ぴったりの旅行プランを診断します。</p>
                <div class="info-box" style="margin-bottom:2rem;">
                    <span class="icon">⏱️</span> 所要時間：約1分（2問）
                </div>
                <a href="q1.html" class="primary-btn" style="text-decoration:none; display:inline-block;">
                    <span>診断を開始する</span>
                    <span class="arrow">→</span>
                </a>
            </div>
"""
with open("index.html", "w", encoding="utf-8") as f:
    f.write(create_html("トップ", start_body))

# Q1
with open("q1.html", "w", encoding="utf-8") as f:
    f.write(generate_question_html("質問1", 1, 
            "ワンちゃんの大きさは？", "体のサイズに合ったプランをご提案します", 
            "中・小型犬", "チワワ・トイプードル・柴犬など", "q2-small.html",
            "大型犬", "体重おおむね25kg以上・ゴールデンレトリバーなど", "q2-large.html",
            back_link="index.html"))

# Q2
for size, size_back in [("small", "q1.html"), ("large", "q1.html")]:
    with open(f"q2-{size}.html", "w", encoding="utf-8") as f:
        f.write(generate_question_html("質問2", 2,
            "ワンちゃんは、運動好きですか？", "普段の活動量・性格で選んでください",
            "すき（活発）", "走ったり遊んだりするのが大好き", f"q3-{size}-active.html",
            "きらい（おとなしい）", "のんびり過ごすのが好き・おとなしいタイプ", f"q3-{size}-quiet.html",
            back_link=size_back))

# Q3
for size, size_tag in [("small", "中・小型犬向け"), ("large", "大型犬向け")]:
    for act in ["active", "quiet"]:
        with open(f"q3-{size}-{act}.html", "w", encoding="utf-8") as f:
            f.write(generate_question_html("質問3", 3,
                "ワンちゃんは、人見知り・ワンちゃん見知りをしますか？", "他の人や犬に対する反応で選んでください",
                "する（内向的）", "他の人や犬に緊張したり警戒しがち", f"result-{size}-{act}-introvert.html",
                "しない（外向的）", "誰とでもすぐ仲良くなれる人懐っこいタイプ", f"result-{size}-{act}-extrovert.html",
                back_link=f"q2-{size}.html"))

# Results Mapping
resultsMap = {
    "active-extrovert": {
        "name": "ワンパクちゃん",
        "desc": "体を動かすことが大好きな、「ワンパクちゃん」。他のワンちゃんと友達になるのも得意なので、大きなドッグランに大喜び。水遊びが好きならマリンスポーツにも挑戦。バーベキューもついたプランだと、飼い主様もお楽しみいただけます。",
        "image": "type_wanpaku_1775783285203.png",
        "tags": ["外向的で運動ずき", "アクティビティ", "バーベキュー", "マリンスポーツ"]
    },
    "quiet-extrovert": {
        "name": "姫ちゃん王子ちゃん",
        "desc": "飼い主様をはじめ、人にかまってもらうのが大好きな「姫ちゃん王子ちゃん」。ワンちゃんが輝くような写真撮影や、ショッピングをご提案します。人見知りをしないので、ワンちゃんも一緒に食べられるカフェなども組み込んで、ゆったりとしたプランをおすすめします。",
        "image": "type_princess_1775783326786.png",
        "tags": ["外向的で運動ぎらい", "写真撮影", "買い物", "同伴用レストラン"]
    },
    "active-introvert": {
        "name": "内弁慶ちゃん",
        "desc": "飼い主様以外の人やほかのワンちゃんを警戒してしまう「内弁慶ちゃん」。このタイプのワンちゃんの旅行は、飼い主さんと二人だけで体を動かせるプランを考えてはいかがでしょう。マリンスポーツや、プライベートドッグランもおすすめ。キャビン型のホテルは、安心して宿泊もできます。",
        "image": "type_uchibenkei_1775783348460.png",
        "tags": ["内向的で運動ずき", "プライベートドッグラン", "ホテル型（専用）"]
    },
    "quiet-introvert": {
        "name": "箱入りちゃん",
        "desc": "飼い主様の事が大好きで、少し慎重な「箱入りちゃん」。安心した旅行にするために、宿泊は、ほかのワンちゃんと接する機会の少ない、ロッジタイプがおすすめ。飼い主様と一緒に記念品を作ったり、きれいな景色の中を散策したり、二人っきりの時間を楽しみましょう。",
        "image": "type_hakoiri_1775783367778.png",
        "tags": ["内向的で運動ぎらい", "ロッジ型", "体験もの（記念製作）"]
    }
}

for size, size_tag in [("small", "中・小型犬向け"), ("large", "大型犬向け")]:
    for act in ["active", "quiet"]:
        for soc in ["introvert", "extrovert"]:
            key = f"{act}-{soc}"
            r = resultsMap[key]
            tags = [size_tag] + r["tags"]
            with open(f"result-{size}-{act}-{soc}.html", "w", encoding="utf-8") as f:
                f.write(generate_result_html(r["name"], tags, r["desc"], r["image"]))

print("All HTML files generated successfully.")
