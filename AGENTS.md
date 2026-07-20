# AGENTS.md

## Purpose
Maintain the static 2026 Kansai late-summer itinerary site without exposing private booking data.

## Controlled execution loop
For every material change:
1. Inspect the current pages, `data/itinerary.json`, and relevant official sources.
2. State a short plan and machine-checkable completion criteria.
3. Implement the smallest coherent change.
4. Run `python3 scripts/validate_site.py`.
5. Review the diff for factual, privacy, mobile-layout, and navigation errors.
6. Repair and re-test. Stop after three no-progress repair cycles and report the exact blocker.

## Acceptance criteria
- Seven top-level pages remain present: home, daily, deep itinerary, culture, museums, food, maps.
- All internal links and fragment links resolve.
- No reservation numbers, confirmation numbers, names, party-size metadata, or hotel confirmation details are published.
- Opening hours and temporary closures are dated and linked to official sources.
- Mobile navigation remains usable at 760 px and below.
- `data/itinerary.json` contains exactly eight trip days.

## Content rules
- Traditional Chinese is the primary language; preserve Japanese venue names where useful.
- Do not add observation decks or skyline/night-view stops unless there is a specific cultural or architectural reason.
- Treat restaurant reservations, museum closing times, and transport buffers as hard constraints.
- Prefer direct official-source links over third-party summaries.
