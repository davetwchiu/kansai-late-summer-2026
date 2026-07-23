# 2026 關西晚夏旅程誌

大阪作基地的 2026-08-26 至 2026-09-02 靜態多頁網站，涵蓋大阪、奈良、堺、神戶及箕面。

## Pages

- `index.html` — 使用模式、城市史時間軸、八日節奏與時間風險
- `daily.html` — 每日時間軸、交通 buffer、可刪項目
- `deep-itinerary.html` — 八日主題、觀看方法、節奏與取捨
- `culture.html` — 五地城市形成、地域交換網絡、工藝與宗教制度
- `museums.html` — 入館焦點、最後入場、官方資料
- `food.html` — 十三間餐廳、七個餐後酒場、四條餐飲文化線與餐桌讀法
- `maps.html` — 每日 Google Maps 路線入口

## Local preview

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

## Validation

```bash
python3 scripts/validate_site.py
```

The validator checks required files and visual assets, internal and fragment links, cultural and dining structure, map completeness, eight-day JSON data, house-style rules, and likely private booking data.

## Privacy

The public site must not contain reservation numbers, confirmation numbers, party-size metadata, guest names, or hotel confirmation details.
