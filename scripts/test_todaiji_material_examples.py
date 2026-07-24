from pathlib import Path

from bs4 import BeautifulSoup

html = Path("todaiji.html").read_text()
soup = BeautifulSoup(html, "html.parser")
section = soup.select_one("#materials")
assert section is not None
assert section.parent.select_one(":scope > #nandaimon").find_previous_sibling("section") == section
assert not section.select("[data-material-filter]"), "material filter buttons must remain removed"
assert "data-material-filter" not in Path("assets/todaiji.js").read_text()
assert "material-controls" not in Path("assets/style.css").read_text()
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
