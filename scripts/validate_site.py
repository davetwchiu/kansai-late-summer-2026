#!/usr/bin/env python3
from pathlib import Path
from bs4 import BeautifulSoup
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'index.html','daily.html','deep-itinerary.html','culture.html','museums.html','food.html','drinks.html','maps.html',
    'assets/style.css','assets/site.js','assets/route.svg',
    'assets/images/hero-kansai-editorial.webp','assets/images/culture-layers-editorial.webp',
    'assets/images/dining-technique-editorial.webp','data/itinerary.json','AGENTS.md'
]
PRIVATE_PATTERNS = [
    re.compile(r'Reservation Number', re.I),
    re.compile(r'Confirmation\s*#', re.I),
    re.compile(r'25210885'),
    re.compile(r'Party size', re.I),
]
MAP_REQUIRED_LABELS = [
    '關西國際機場', 'InterContinental Osaka', 'ジュンジーノ',
    '近鉄奈良駅（往復）', '奈良国立博物館', 'うな菊 奈良本店',
    '東大寺ミュージアム', '東大寺 南大門', '東大寺 大仏殿',
    '東大寺 法華堂（三月堂）', '東大寺 二月堂', '依水園・寧楽美術館',
    '旨い料理・旨い酒 じょうじ', 'さかい利晶の杜', '千利休屋敷跡',
    '大道筋（旧紀州街道）', '宿院停留場', '弥助',
    '堺伝匠館／堺刃物ミュージアム CUT', '妙国寺前停留場',
    '鉄炮鍛冶屋敷', '高須神社停留場', '七道駅',
    'しまなみふれんち Murakami', 'ritmicita', '炭火いわ田',
    'JR大阪駅', '新神戸駅', '竹中大工道具館', 'トンカツとワイン 日月',
    '阪神神戸三宮駅', '阪神魚崎駅', '菊正宗酒造記念館',
    '白鶴酒造資料館', '神戸酒心館', '阪神石屋川駅',
    'エスピス', '大阪くらしの今昔館', 'alcentro', '南森町駅',
    '四天王寺', '新世界・通天閣本通', '鮨まさる',
    'Osteria Shoru', '桜井駅', '箕面駅', '箕面滝道',
    '瀧安寺', '箕面大滝', 'さか本', '黒杉',
]
errors=[]
BANNED_CONTRAST = re.compile(r'不是[^。；]{0,80}而是')

for rel in REQUIRED:
    if not (ROOT/rel).exists():
        errors.append(f'missing required file: {rel}')

html_files=sorted(ROOT.glob('*.html'))
ids_by_file={}
for path in html_files:
    text=path.read_text(encoding='utf-8')
    soup=BeautifulSoup(text,'html.parser')
    ids_by_file[path.name]={tag.get('id') for tag in soup.find_all(attrs={'id':True})}
    if not soup.title or not soup.title.string.strip():
        errors.append(f'{path.name}: missing title')
    if not soup.find('meta',attrs={'name':'viewport'}):
        errors.append(f'{path.name}: missing viewport')
    if not soup.find('main'):
        errors.append(f'{path.name}: missing main')
    nav_labels=[a.get_text(strip=True) for a in soup.select('.nav a')]
    if len(nav_labels) != 7:
        errors.append(f'{path.name}: expected 7 nav links, got {len(nav_labels)}')
    if '深度行程' not in nav_labels:
        errors.append(f'{path.name}: missing deep itinerary navigation')
    for pattern in PRIVATE_PATTERNS:
        if pattern.search(text):
            errors.append(f'{path.name}: possible private data matched {pattern.pattern}')

for path in html_files:
    soup=BeautifulSoup(path.read_text(encoding='utf-8'),'html.parser')
    for tag in soup.find_all(['a','link','script','img']):
        attr='href' if tag.name in ('a','link') else 'src'
        val=tag.get(attr)
        if not val or val.startswith(('http://','https://','mailto:','tel:','javascript:')):
            continue
        target, _, frag = val.partition('#')
        target_path=(path.parent/target).resolve() if target else path.resolve()
        try:
            target_path.relative_to(ROOT.resolve())
        except ValueError:
            errors.append(f'{path.name}: path escapes root: {val}')
            continue
        if not target_path.exists():
            errors.append(f'{path.name}: broken local reference: {val}')
            continue
        if frag and target_path.suffix=='.html':
            ids=ids_by_file.get(target_path.name,set())
            if frag not in ids:
                errors.append(f'{path.name}: missing fragment #{frag} in {target_path.name}')

for name in ('index.html', 'culture.html', 'food.html'):
    text=(ROOT/name).read_text(encoding='utf-8')
    if BANNED_CONTRAST.search(text):
        errors.append(f'{name}: avoid the 不是…而是 contrast construction')

structure_checks = {
    'index.html': ('.atlas-era', 5, 'historical atlas entries'),
    'culture.html': ('.culture-place', 5, 'city culture entries'),
    'food.html': ('.food-feature', 14, 'restaurant features'),
}
for name, (selector, expected, label) in structure_checks.items():
    soup=BeautifulSoup((ROOT/name).read_text(encoding='utf-8'),'html.parser')
    actual=len(soup.select(selector))
    if actual != expected:
        errors.append(f'{name}: expected {expected} {label}, got {actual}')

food_soup=BeautifulSoup((ROOT/'food.html').read_text(encoding='utf-8'),'html.parser')
if len(food_soup.select('.dining-thread')) != 4:
    errors.append('food.html: expected four dining culture threads')
if 'id="regional-network"' not in (ROOT/'culture.html').read_text(encoding='utf-8'):
    errors.append('culture.html: missing regional history network')

guide_expectations = {
    'culture.html': {'古代宗教', '海運市場', '近代私鐵'},
    'deep-itinerary.html': {'硬節點', '核心現場', '先刪項目'},
}
for name, expected_labels in guide_expectations.items():
    soup=BeautifulSoup((ROOT/name).read_text(encoding='utf-8'),'html.parser')
    guide=soup.select_one('.relation-guide')
    labels={item.get_text(' ',strip=True) for item in guide.select('strong')} if guide else set()
    if labels != expected_labels:
        errors.append(f'{name}: missing practical history/itinerary guide')
if '四條餐桌線' not in food_soup.get_text(' ',strip=True):
    errors.append('food.html: missing dining themes')
booking_truths = (
    '季節のおまかせコース', '店主おまかせランチコース', 'Dinner menu saison',
    '本日のランチおまかせコース', 'スペシャリテコース', 'お寿司のみ', 'おまかせ握り16貫',
)
food_text = food_soup.get_text(' ', strip=True)
for phrase in booking_truths:
    if phrase not in food_text:
        errors.append(f'food.html: missing confirmed booking detail: {phrase}')
if len(food_soup.select('.service-japanese')) != 3:
    errors.append('food.html: expected Japanese ordering help only at three relevant restaurants')
if len(food_soup.select('.service-japanese dt')) < 10:
    errors.append('food.html: insufficient contextual Japanese ordering phrases')

site_js=(ROOT/'assets/site.js').read_text(encoding='utf-8')
if "main > .section, main > .deep-day" not in site_js or "回頁首 ↑" not in site_js:
    errors.append('assets/site.js: missing per-section back-to-top navigation')

daily_soup=BeautifulSoup((ROOT/'daily.html').read_text(encoding='utf-8'),'html.parser')
context_links=daily_soup.select('.schedule a.context-link')
if len(context_links) < 30:
    errors.append(f'daily.html: expected at least 30 item-level internal links, got {len(context_links)}')
linked_targets={link.get('href') for link in context_links}
required_item_targets={
    'museums.html#nara-museum', 'museums.html#todaiji', 'museums.html#isuien',
    'museums.html#risho', 'museums.html#cut', 'museums.html#teppo',
    'museums.html#takenaka', 'museums.html#hakutsuru-detail', 'museums.html#kiku',
    'museums.html#fukuju', 'museums.html#konjaku', 'museums.html#shitennoji',
    'culture.html#sakai', 'culture.html#osaka', 'culture.html#minoh',
    'food.html#junjino', 'food.html#unagiku', 'food.html#joji', 'food.html#yasuke',
    'food.html#murakami', 'food.html#ritmicita', 'food.html#iwata',
    'food.html#nichigetsu', 'food.html#espice', 'food.html#masaru',
    'food.html#alcentro',
    'food.html#shoru', 'food.html#sakamoto', 'food.html#kurosugi',
}
for target in sorted(required_item_targets - linked_targets):
    errors.append(f'daily.html: missing item-level link to {target}')

reciprocal_groups={
    'food.html': ('.food-feature', 14),
    'museums.html': ('.museum-feature', 10),
    'maps.html': ('.map-card', 8),
    'deep-itinerary.html': ('.deep-day', 8),
}
for name, (selector, expected_count) in reciprocal_groups.items():
    soup=BeautifulSoup((ROOT/name).read_text(encoding='utf-8'),'html.parser')
    units=soup.select(selector)
    if len(units) != expected_count:
        errors.append(f'{name}: expected {expected_count} linked content units, got {len(units)}')
    for unit in units:
        unit_id=unit.get('id','without-id')
        if not unit.select_one('a[href^="daily.html#d"]'):
            errors.append(f'{name}: #{unit_id} cannot return to its daily itinerary')

culture_soup=BeautifulSoup((ROOT/'culture.html').read_text(encoding='utf-8'),'html.parser')
for section_id in ('nara','sakai','carpentry','nada','osaka','minoh'):
    section=culture_soup.select_one(f'#{section_id}')
    if not section or not section.select_one('a[href^="daily.html#d"]'):
        errors.append(f'culture.html: #{section_id} cannot return to its daily itinerary')

museums_soup=BeautifulSoup((ROOT/'museums.html').read_text(encoding='utf-8'),'html.parser')
museum_ids={'nara-museum','todaiji','isuien','risho','cut','teppo','takenaka','hakutsuru','konjaku','shitennoji'}
if not museum_ids.issubset(ids_by_file.get('museums.html',set())):
    errors.append('museums.html: missing one or more required visit guides')
if len(museums_soup.select('.museum-role')) != 10:
    errors.append(f'museums.html: expected 10 explicit visit rationales, got {len(museums_soup.select(".museum-role"))}')
if len(museums_soup.select('.orientation-grid')) < 5:
    errors.append('museums.html: insufficient newcomer orientation panels')
if not museums_soup.select_one('#sake-japanese'):
    errors.append('museums.html: missing sake Japanese section')
if len(museums_soup.select('#sake-japanese .sake-term-groups dt')) < 70:
    errors.append('museums.html: insufficient sake brewing vocabulary')
if len(museums_soup.select('#sake-japanese .tour-phrases dt')) != 16:
    errors.append('museums.html: expected six brewery-tour and ten everyday sake questions')

site_text=' '.join((ROOT/name).read_text(encoding='utf-8') for name in ('daily.html','deep-itinerary.html','museums.html','maps.html'))
for stale in (
    '09:15出發', '09:15 酒店', '10:15–11:45 · 強烈推薦', '待預約確認', '仍待預約',
    '天神橋筋商店街簡單午餐', '14:40入場', '四天王寺必須在16:10', '酷熱或下雨，直接刪口縄坂',
):
    if stale in site_text:
        errors.append(f'stale itinerary text remains: {stale}')

day31_expectations = {
    'daily.html': ('11:30–13:15', '13:30–14:50', '15:25–16:30', '17:15–17:35', 'food.html#alcentro'),
    'deep-itinerary.html': ('13:30以alcentro午餐', '15:25抵達四天王寺', '新世界北側'),
    'museums.html': ('11:30–13:15', '15:25抵達 · 16:30前先入閉門區', '16:30後看一般境內'),
    'food.html': ('id="alcentro"', '31/8 · 13:30', '17:50到餐廳附近'),
    'maps.html': ('alcentro ↗', '南森町駅 ↗', '新世界・通天閣本通 ↗'),
}
for name, expected_phrases in day31_expectations.items():
    text=(ROOT/name).read_text(encoding='utf-8')
    for phrase in expected_phrases:
        if phrase not in text:
            errors.append(f'{name}: missing updated 31/8 detail: {phrase}')

drinks_text=(ROOT/'drinks.html').read_text(encoding='utf-8')
for phrase in (
    'ウイスキー専門店 相葉星期一休息，已排除',
    '十三トリス北新地', 'BAR RENÉE', 'Cellar Infini', 'Bar K',
    '十三トリスバー 本店', '吸煙資料亦互相矛盾',
):
    if phrase not in drinks_text:
        errors.append(f'drinks.html: missing required Monday-night guidance: {phrase}')
if len(daily_soup.select('a[href^="drinks.html#d08"]')) < 6:
    errors.append('daily.html: expected optional post-dinner links for six dinner evenings')
if 'id="post-dinner"' not in (ROOT/'maps.html').read_text(encoding='utf-8'):
    errors.append('maps.html: missing optional post-dinner venue map section')

try:
    data=json.loads((ROOT/'data/itinerary.json').read_text(encoding='utf-8'))
    if len(data.get('days',[])) != 8:
        errors.append('data/itinerary.json: expected 8 days')
except Exception as exc:
    errors.append(f'data/itinerary.json invalid: {exc}')

maps_path=ROOT/'maps.html'
if maps_path.exists():
    maps_soup=BeautifulSoup(maps_path.read_text(encoding='utf-8'),'html.parser')
    cards=maps_soup.select('.map-card')
    point_links=maps_soup.select('.route-steps a')
    backup_routes=maps_soup.select('.map-actions a[href*="google.com/maps/dir"]')
    if len(cards) != 8:
        errors.append(f'maps.html: expected 8 day cards, got {len(cards)}')
    if len(point_links) != 58:
        errors.append(f'maps.html: expected 58 individual map links, got {len(point_links)}')
    if len(backup_routes) != 11:
        errors.append(f'maps.html: expected 11 backup route links, got {len(backup_routes)}')
    map_labels={a.get_text(' ',strip=True).replace('↗','').strip() for a in point_links}
    for label in MAP_REQUIRED_LABELS:
        if label not in map_labels:
            errors.append(f'maps.html: missing required point: {label}')
    for link in point_links + backup_routes:
        if link.get('target') != '_blank' or 'noopener' not in (link.get('rel') or []):
            errors.append(f'maps.html: unsafe external link: {link.get_text(" ",strip=True)}')

if errors:
    print('VALIDATION FAILED')
    for error in errors:
        print(f'- {error}')
    sys.exit(1)
print(f'VALIDATION PASSED: {len(html_files)} HTML pages, local links, visual assets, evidence boundaries, cultural depth, dining structure, map completeness and privacy checks OK')
