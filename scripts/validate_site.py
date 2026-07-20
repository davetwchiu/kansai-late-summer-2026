#!/usr/bin/env python3
from pathlib import Path
from bs4 import BeautifulSoup
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'index.html','daily.html','deep-itinerary.html','culture.html','museums.html','food.html','maps.html',
    'assets/style.css','assets/site.js','assets/route.svg','data/itinerary.json','AGENTS.md'
]
PRIVATE_PATTERNS = [
    re.compile(r'Reservation Number', re.I),
    re.compile(r'Confirmation\s*#', re.I),
    re.compile(r'25210885'),
    re.compile(r'Party size', re.I),
]
errors=[]

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

try:
    data=json.loads((ROOT/'data/itinerary.json').read_text(encoding='utf-8'))
    if len(data.get('days',[])) != 8:
        errors.append('data/itinerary.json: expected 8 days')
except Exception as exc:
    errors.append(f'data/itinerary.json invalid: {exc}')

if errors:
    print('VALIDATION FAILED')
    for error in errors:
        print(f'- {error}')
    sys.exit(1)
print(f'VALIDATION PASSED: {len(html_files)} HTML pages, local links and privacy checks OK')
