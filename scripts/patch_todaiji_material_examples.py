from pathlib import Path
import re

HTML_PATH = Path("todaiji.html")
SW_PATH = Path("sw.js")
TEST_PATH = Path("scripts/test_todaiji_material_examples.py")

REPLACEMENT = '''  <section class="section material-lab" id="materials">
    <div class="wrap">
      <div class="section-heading"><div class="label">Material microscope</div><div><h2>先認技法，現場才看得到表面差異</h2><p>四種工法直接對照東大寺實例。先記住材料、製作次序與代表像，現場再看重量感、接縫、殘彩與修補痕跡。</p></div></div>
      <div class="technique-grid">
        <article data-material-card="clay"><span>塑造</span><h3>木骨 → 草繩 → 粗泥 → 細泥 → 彩色</h3><p>優勢是細微塑形；弱點是重、脆、怕震。看眼皮、面頰、手指與衣褶的柔軟過渡。</p><p class="technique-example"><strong>東大寺例：</strong><a href="https://www.todaiji.or.jp/information/kaidando/" target="_blank" rel="noopener">戒壇堂四天王立像 ↗</a></p></article>
        <article data-material-card="lacquer"><span>脫活乾漆</span><h3>泥胎 → 麻布髹漆 → 抽泥 → 木構補強</h3><p>較泥塑輕，材料與人工極昂貴。看漆層形成的連續曲面、貼附裝飾與空心結構。</p><p class="technique-example"><strong>東大寺例：</strong><a href="https://www.todaiji.or.jp/information/hokkedo/" target="_blank" rel="noopener">法華堂不空羂索觀音立像 ↗</a></p></article>
        <article data-material-card="wood"><span>木造寄木</span><h3>多木塊分工雕刻 → 組裝 → 表面整合</h3><p>容許大型造像並行製作，也方便乾燥、搬運與修理。看接合、深鑿衣紋與外張動勢。</p><p class="technique-example"><strong>東大寺例：</strong><a href="https://www.todaiji.or.jp/information/nandaimon/" target="_blank" rel="noopener">南大門金剛力士立像（阿形・吽形） ↗</a></p></article>
        <article data-material-card="bronze"><span>鑄銅</span><h3>內外模 → 留銅壁 → 分段澆鑄 → 補鑄</h3><p>巨像的技術問題在熱、流動、收縮與接縫。看金屬色、厚度、鑄接與後代修補。</p><p class="technique-example"><strong>東大寺例：</strong><a href="https://www.todaiji.or.jp/information/daibutsuden/" target="_blank" rel="noopener">盧舍那大佛 ↗</a> · <a href="https://www.todaiji.or.jp/kids/kids2-2.html" target="_blank" rel="noopener">官方鑄造圖解 ↗</a></p></article>
      </div>
    </div>
  </section>'''

TEST_CONTENT = '''from pathlib import Path

from bs4 import BeautifulSoup

html = Path("todaiji.html").read_text()
soup = BeautifulSoup(html, "html.parser")
section = soup.select_one("#materials")
assert section is not None
assert not section.select("[data-material-filter]"), "material filter buttons must remain removed"
cards = section.select("[data-material-card]")
assert len(cards) == 4
expected = {
    "clay": "戒壇堂四天王立像",
    "lacquer": "法華堂不空羂索觀音立像",
    "wood": "南大門金剛力士立像",
    "bronze": "盧舍那大佛",
}
for card in cards:
    key = card.get("data-material-card")
    example = card.select_one(".technique-example")
    assert example is not None, f"missing example for {key}"
    link = example.select_one("a[href]")
    assert link is not None and link["href"].startswith("https://"), f"missing link for {key}"
    assert expected[key] in example.get_text(" ", strip=True)
'''


def patch_html() -> None:
    text = HTML_PATH.read_text()
    if 'data-material-filter=' in text:
        pattern = re.compile(
            r'  <section class="section material-lab" id="materials">.*?  </section>\n\n(?=  <section class="section alt" id="object-room">)',
            re.S,
        )
        text, count = pattern.subn(REPLACEMENT + "\n\n", text, count=1)
        if count != 1:
            raise SystemExit(f"material section replacement count: {count}")
        HTML_PATH.write_text(text)
    elif 'class="technique-example"' not in text:
        raise SystemExit("material buttons absent but linked examples missing")


def patch_cache() -> None:
    text = SW_PATH.read_text()
    if "kansai-todaiji-v14" in text:
        SW_PATH.write_text(text.replace("kansai-todaiji-v14", "kansai-todaiji-v15", 1))
    elif "kansai-todaiji-v15" not in text:
        raise SystemExit("unexpected service-worker cache version")


def main() -> None:
    patch_html()
    patch_cache()
    TEST_PATH.write_text(TEST_CONTENT)


if __name__ == "__main__":
    main()
