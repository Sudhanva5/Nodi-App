# Nodi (ನೋಡಿ) · Civic complaint prototype for Namma Yatri

Snap it. Send it. See it fixed.

## Run
```
npm install
npm run dev        # http://localhost:3456
```
- `/` interactive iPhone prototype + design rationale panel (jump buttons per screen)
- `/case-study` full write-up: users, assumptions, flow, decisions, MVP vs future, metrics
- `CASE_STUDY.md` same write-up as markdown · `SPEC.md` product spec

## Screens
1. Home / My reports  2. Report (camera, one confirm sheet, trust loader, sent)  3. Track (proof, citizen confirm, reopen)  4. Nearby live map

## macOS note
If Gatekeeper blocks `next-swc.darwin-arm64.node` after `npm install`:
```
find node_modules -name "*.node" -exec xattr -d com.apple.quarantine {} \; -exec codesign --force --sign - {} \;
```
