# Blog Content Calendar

Scheduled posts are written as full drafts in `content/blog/posts/` with `draft: true` and a future `date`.
They are excluded from routes, sitemap, listing, and all markdown mirrors until the date passes **and** a build runs.

**How scheduled publishing works:** the GitHub Actions workflow `.github/workflows/scheduled-rebuild.yml` runs daily at 02:00 UTC and triggers a Vercel deploy via `VERCEL_DEPLOY_HOOK_URL`.

**One-time setup (2 minutes):**
1. In Vercel dashboard: your project → Settings → Git → Deploy Hooks → create a hook for your production branch.
2. Copy the hook URL and add it as a GitHub secret named `VERCEL_DEPLOY_HOOK_URL`.

After that, publishing is zero-touch:
- **Publish now:** set `draft: false` (or remove it) and push → Vercel deploys automatically.
- **Schedule:** keep `draft: true` with a future `date` → goes live on the first rebuild after that date.
- **New post scaffold:** `npm run new:post <slug> "<Title>"`, then `npm run images` to fetch a Pexels hero image from the title + keywords.

## Scheduled posts

| Date | Slug | Title | Cluster | Preconditions |
|------|------|-------|---------|---------------|
| 2026-08-15 | `ai-vendor-pitfalls-hk` | Seven pitfalls when buying AI as a small HK firm | economics | Draft complete; re-read against real vendor interactions before publish |
| 2026-09-01 | `ai-vs-ai-governance` | AI-vs-AI governance — catching hallucinations before they reach a client report | compliance | Draft complete; add deployment evidence if available |
| 2026-10-01 | `build-vs-buy-automation` | Build vs buy — what boutique HK firms actually save | economics | Draft complete; update figures against a real scoping example |
| 2026-11-01 | `pcpd-data-lifecycle-map` | PCPD amendments and your data lifecycle — a practical map | compliance | Verify against the published amendment text; update FAQ answers |
| 2026-12-01 | `middle-office-automation-year-one` | One year of middle-office automation — what HK deployments taught us | operations | Draft complete; add real deployment learnings, anonymised |

All five are fully drafted and image-embedded (images were fetched at scaffold time from title + keywords). They will surface automatically on their dates — no action required unless you want to edit them first.

## Cadence

2 posts/month for the first 3–6 months (15 Aug, 1 Sep, 1 Oct, 1 Nov, 1 Dec 2026), then 1/month sustained.
Always slot new posts into an existing cluster (compliance / operations / economics) so related-articles linking stays strong.
