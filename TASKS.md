# TASKS.md

Consolidated "What's Left" task sheet, organized by priority and category.

---

## 1. Content, Demos & Workflows

- [x] **Add Private RAG Demo Workflow:** RAG assistant workflow (`rag-chatbot`) replacing KYC/Recon — query shown first, then links Excel risk policy, BlackRock Aladdin positions, and OneDrive compliance SOPs; PII masking, ephemeral chunking/embedding, semantic retrieval, and grounded answer with citations + SHA-256 audit. Dispatch to Teams channel. Includes distinct "Query" box showing the search query.
- [x] **Add Teams Transcript Demo Workflow:** `teams-transcript` replacing Teams & Granola — pure Microsoft stack (Graph API transcript capture → Outlook thread scanning → OneDrive report cross-reference → sentiment/alignment analysis → dispatch to Teams channel). All Granola references removed from demo.
- [x] **Fix Thinking Indicator Animation:** Dots and capacity chips (LOW/MED/HIGH) no longer keep animating after their stage finishes — animations stop when a thinking step is no longer active.
- [x] **Remove Demo Scrollbar:** Replaced non-functional `scrollbar-hide` class with the existing `no-scrollbar` utility on the demo canvas.
- [ ] **Unbrand Internal Ticketing Demo:** Unzip the ticketing asset, change color scheme, strip all logos, and obfuscate/change all real employee/company names.
- [ ] **Add HKEx & IPO Lead Scraping Workflow:** Add the new workflow prompt/card (AI agents monitoring HKEx filings, regulatory updates, and IPO applications to flag companies needing financial printing/prospectuses).
- [ ] **Replace Hero Pipeline Block:** Swap out the "PIPELINE ENGINE — LIVE" placeholder text with your actual promotional video.

---

## 2. UI, Typography & Visual Polish (`automation.jonathansimpson.co`)

- [x] **Global Font & Scale Boost:** Increase baseline font size across the entire site (target ~125% of current size so it's readable) and establish a consistent typography scale.
- [ ] **Watch Demo Page Scaling:** Increase font sizes specifically on the Watch Demo page to match the ~125% zoom feel.
- [x] **Icon Sizing:** Scale up icons site-wide—they are currently too small relative to surrounding copy.
- [ ] **Tighten Section Spacing:** Reduce excessive vertical padding/whitespace between sections.
- [ ] **Feature Core Selling Points:** Boost visibility (contrast, size, highlighting) for:
  > **JUNIORS DO THE MEANINGFUL WORK** | **100% PCPD & SFC COMPLIANT** | **24/7/365 AUTOMATED**

- [ ] **Fix Hub Header Alignment:** Fix line-wrap on the "Compliant" text in the Hub section so it fits neatly on a single line.
- [ ] **Slow Down Live Ops Ticker:** Decrease animation/scroll speed for the ticker (`HSBC NAV file ingested... | PII redaction engine active...`). It currently cycles too fast to read.
- [ ] **Fix Slack Connector Contrast:** Adjust the dark purple Slack icon/accent color so it is legible against the dark background.

---

## 3. Pricing & Calculator Adjustments

- [ ] **Junior Analyst Calculator:** Anchor the FTE number label directly to the slider handle/dot indicator as it moves.
- [ ] **Core Growth Tier Range:** Update FTE range to **4–9** (instead of 10).
- [ ] **Add Custom Tier:** Add a "Custom" tier/pricing option to the pricing section.
- [ ] **Emphasize Pro Tier ("Sweet Spot"):** Make the Pro card larger, thicken the border frame, and add bold highlighted badge/text.

---

## 4. Platform Engine, SEO & Blog

- [ ] **Automation Fixes:** Resolve open bugs and fix core automation pipeline logic.
- [ ] **Add Blog Module:** Integrate blog layout into the automation site.
- [ ] **SEO Optimization:** Optimize keyword targeting, metadata, and copy across the platform for search rankings.
