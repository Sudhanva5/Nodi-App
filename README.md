# Nodi (ನೋಡಿ) · Civic complaint prototype for Namma Yatri

Snap it. Send it. See it fixed.

- `/` interactive prototype with a 4-step checklist
- `/case-study` the case study, with live looping clips of the prototype
- `/demo/report`, `/demo/track`, `/demo/nearby`, `/demo/a11y` the looping clips on their own

## Run locally
```
npm install
npm run dev        # http://localhost:3456
```

## Deploy on Railway
1. Railway dashboard → New Project → Deploy from GitHub repo → `Sudhanva5/Nodi-App`.
2. Railway reads `railway.json`: it installs dependencies, builds with `npm run build` and starts with `npm run start` (binds to Railway's `$PORT`).
3. Settings → Networking → Generate Domain. Share:
   - Prototype: `https://<your-domain>/`
   - Case study: `https://<your-domain>/case-study`

No environment variables are needed. Node 20+ (see `.nvmrc`).

## macOS note
If Gatekeeper blocks `next-swc.darwin-arm64.node` after `npm install`:
```
find node_modules -name "*.node" -exec xattr -d com.apple.quarantine {} \; -exec codesign --force --sign - {} \;
```
