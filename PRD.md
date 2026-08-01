# Product Requirements Document (PRD)

**Product Title:** JS&C Automation Demo & Interactive Pipeline Simulator
**Subdomain & Link Target:** Production Host: automation.jonathansimpson.co
**Primary CTA Link Target:** https://jonathansimpson.co (Agency Contact & Consultation)

## 1. Executive Summary & Purpose

The JS&C Automation Demo is an interactive, front-end-driven web application built for Hong Kong financial executives, compliance managers, and Cyberport CCMF assessors. It simulates JS&C's Zero-Data-Retention (ZDR) Agentic AI Middleware in real time, demonstrating how automated pipelines eliminate junior analyst overhead ($\text{HKD } 580,000/\text{year}$) while maintaining strict compliance with SFC and HKMA regulatory circulars. The application serves as a high-converting lead-generation tool linked directly from the primary agency portfolio at jonathansimpson.co.

## 2. Target Audience & User Personas

### Persona 1: The Managing Director / Partner (Buy-Side SME)

**Role:** Owner or Chief Investment Officer at an SFC Type 4/9 Asset Manager in Central ($5$-$20$ staff).
**Pain Point:** Drowning in operational costs; junior analysts spend mornings manually consolidating custodian reports instead of doing research.
**Goal:** Wants to lower cost-to-income ratio without taking regulatory risks or spending $\text{HKD } 500\text{k}+$ upfront on custom software.

### Persona 2: The Chief Compliance Officer (CCO)

**Role:** Head of Legal & Compliance at a Licensed Brokerage ($10$-$30$ staff).
**Pain Point:** Fear of "Shadow IT"-employees secretly using ChatGPT with client PII, risking PCPD fines and SFC audit failures.
**Goal:** Needs proof that AI execution happens in an ephemeral, audited, zero-data-retention RAM sandbox with Human-in-the-Loop controls.

### Persona 3: Cyberport CCMF Grant Assessor

**Role:** Technical & Commercial Evaluator for the Cyberport Creative Micro Fund.
**Goal:** Verifies market viability, technological novelty (ZDR architecture, multi-agent loops), founder-market fit, and clear 6-month grant budget allocation.

## 3. Visual Identity & Design System Alignment (DESIGN.md)

The application strictly enforces the JS&C Editorial Design Tokens to maintain visual consistency across all digital touchpoints:

```css
:root {
--color-bg: #f4f4ef; /_ Warm Cream _/
--color-surface: #ffffff; /_ Pure White Cards _/
--color-ink: #161714; /_ Near-Black Text _/
--color-muted: #5c5e56; /_ Olive-Gray Descriptions _/
--color-line: #d6d8d1; /_ Subtle Dividers _/
--color-accent: #80988f; /_ Sage Green Accent _/
--color-accent-soft: #e3e9e6; /_ Soft Sage Chip Fill _/

--font-serif: "Georgia", serif; /_ Headings h1, h2, Brand _/
--font-sans: "Inter", sans-serif; /_ Body, UI Buttons _/
--font-mono: "IBM Plex Mono", monospace; /_ Audit Logs, Code _/
}
```

**Layout Guidelines**

**Minimalist High-Contrast:** Editorial feel with thin $1\text{px}$ borders (--color-line), sharp card corners (--radius-lg: 1rem), and zero heavy drop shadows.
**Typography Hierarchy:** Georgia display headers paired with clean Inter body text. Eyebrows styled in uppercase sage green (0.72rem, letter-spacing: 0.1em).
**Restrained Animations:** Fast, purposeful transitions ($220\text{ms}$ ease). Interactive cards lift $2\text{px}$ on hover.

## 4. Functional Requirements & Core Feature Modules

### Module 1: Sticky Editorial Header

**Brand Mark:** Jonathan Simpson & Co. | Automation (Georgia font, uppercase, 0.9rem).
**Navigation Links:** Smooth scroll anchors to #simulator, #connectors, #pricing, #roadmap.
**Primary CTA Button:** Pill-shaped (border-radius: 999px), near-black background (--color-ink), linking to https://jonathansimpson.co.

### Module 2: Hero Section ("The 2026 HK Financial Pivot")

**Eyebrow:** 2026 Strategic Briefing & Live Demo
**Headline:** Automating the Hub: Compliant Agentic AI for HK Finance.
**Subheadline:** Demonstrates $70\%$ operational cost reduction using Zero-Data-Retention multi-agent pipelines for SFC-licensed SMEs.
**Key Trust Badges:** "Juniors Do the Meaningful Work" | "100% PCPD & SFC Compliant".

### Module 3: Interactive Pipeline Simulator (#simulator)

The core interactive visual demo allowing prospects to execute a simulated AI workflow.

**Workflow Selector Tabs:**
- SFC Type 9: Multi-Custodian Portfolio NAV Consolidation.
- SFC Type 1: KYC & AML Background Screening.
- SFC Type 6: Due Diligence & Bank Statement Reconciliation.

**Simulated Trigger Controls:**
"Simulate File Drop (PDF/XLSX)" or "Trigger via Granola / Outlook Webhook".

**Live Visual Pipeline Canvas (4-Step Animated Flow):**

- **Step 1: Secure Ingestion & PII Redaction:** Animates masking of names, HKID numbers, and bank account figures.
- **Step 2: Ephemeral RAM Execution:** Pulsing indicator representing processing in local HK/SG data center memory buffers.
- **Step 3: Multi-Agent Governance:** Visual AI-vs-AI verification check comparing output to SFC guidelines.
- **Step 4: Non-PII Audit Dispatch:** Renders formatted clean summary output and outputs a cryptographic SHA-256 execution proof.

```
SIMULATOR PIPELINE CANVAS
========================================================================================
[ 01 Ingest & Mask ] ──► [ 02 Ephemeral RAM ] ──► [ 03 AI-vs-AI Gate ] ──► [ 04 Clean Output ]
(PII Redacted) (HK Virtual Node) (SFC Rule Verified) (Audit Log SHA256)
========================================================================================
```

### Module 4: Universal Connector Gateway Matrix (#connectors)

A interactive visual grid demonstrating integration capabilities without requiring live OAuth logins.

**Productivity & Communication Suite:**
- Granola: Ingests AI meeting notes and transcripts via webhook.
- Microsoft 365 / Outlook / Teams: Inbox monitoring and automated calendar/document flow.
- Google Workspace / Gmail: Attachment parsing and automated ticket creation.
- Slack / Discord / Notion: Operational alert pings and Skills.md SOP synchronization.

**Financial & Enterprise Suite:**
- BlackRock Aladdin: Portfolio IBOR positions and risk analytics integration.
- Multi-Custodian Web Adapters: Headless scrapers for HSBC, UBS, Julius Baer, and LGT portal exports.
- Xero / Accounting: Automated bank reconciliation and ledger entries.

**Interactive Connector Toggle:** Users click any connector card to view its simulated payload schema and authentication protocol (OAuth2 PKCE vs. Encrypted API Key).

### Module 5: Arbitrage Economics & Reference Pricing (#pricing)

An interactive ROI calculator paired with reference pricing cards.

**Interactive ROI Slider:** User inputs current junior analyst headcount ($1$-$5$ FTEs) to calculate instant annual savings.

**Reference Pricing Tiers:**

- **Starter (Foundation):** $\text{HKD } 8,000/\text{month}$ ($\text{HKD } 12,000$ setup) - $1$ workflow, micro-firms ($1$-$5$ staff).
- **Core:** $\text{HKD } 12,000/\text{month}$ ($\text{HKD } 15,000$ setup) - $3$ workflows, $4$-$10$ staff.
- **Pro Tier (Featured "Sweet Spot"):** $\text{HKD } 15,000/\text{month}$ ($\text{HKD } 22,000$ setup) - $5$ workflows, priority support, $10$-$25$ staff.
- **Scale / Enterprise:** $\text{HKD } 22,000$-$\text{HKD } 32,000+/\text{month}$ (Custom setup) - Dedicated local LLM hosting, custom API connections.

**Mandatory Pricing Disclaimer Banner:**

“Note: Reference pricing listed above serves as a benchmark. All JS&C solutions are bespoke, custom-engineered pipelines mapped strictly to your internal compliance matrix and software architecture.”

### Module 6: CCMF Deployment Roadmap (#roadmap)

Transparent 6-month budget breakdown mapping the $\text{HKD } 100,000$ Cyberport Creative Micro Fund grant:

- **35% ($\text{HKD } 35\text{k}$):** R&D & Multi-Agent Pipeline Refinement.
- **30% ($\text{HKD } 30\text{k}$):** Independent Security & SFC Compliance Audit.
- **20% ($\text{HKD } 20\text{k}$):** Compliance Infrastructure & HK Virtual Server Nodes.
- **15% ($\text{HKD } 15\text{k}$):** Targeted SME Client Acquisition Workshops in Central.

## 5. Non-Functional & Performance Requirements

**Speed & Latency:** Zero external server wait times during demo runs. Simulated steps run on deterministic client-side timers ($800\text{ms}$-$1200\text{ms}$ per pipeline stage).

**Zero Authentication Overhead:** No login walls, passwords, or registration required to interact with the simulator.

**Mobile Responsiveness:** Breakpoints tuned at $960\text{px}$, $768\text{px}$, and $680\text{px}$. Stacks grid elements seamlessly on mobile screens.

**SEO & Accessibility:** Full WCAG AAA color contrast compliance for text elements, semantic HTML structure, and structured JSON-LD schema markup.
