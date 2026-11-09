# Repro: aborted IonBackButton navigation leaks into the next navigation

Minimal standalone project (Vite + Vue 3 + @ionic/vue 8.8.19 + @ionic/vue-router 8.8.19).
Three pages: `/home` → `/form` → `/done`. `/form` has an `IonBackButton` and an
`onBeforeRouteLeave` guard that returns `false` ("stay", as an unsaved-changes dialog would).

## Run

```sh
pnpm install
pnpm exec playwright install chromium   # once
pnpm test                               # Playwright: fails on the unpatched package (the bug)
```

Manual: `pnpm dev`, open http://localhost:5390/home, then

1. tap **Open form** (→ `/form`),
2. tap the header **back** button: the guard says stay (URL stays `/form`, the page shows
   "Guard said: stay on the form"),
3. tap **Send** (`router.replace('/done')`).

**Expected:** URL `/done` and the Done page is shown.
**Actual:** URL `/done`, but the **Home** page is shown (the page the aborted back wanted to go
to). Screenshot of the Playwright run: `test-results/after-send.png`.

## Verify the proposed fix

Add to `package.json` and reinstall, then `pnpm test` passes:

```json
"pnpm": { "patchedDependencies": { "@ionic/vue-router@8.8.19": "patches/@ionic__vue-router@8.8.19.patch" } }
```
