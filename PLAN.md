# Technical Implementation Plan & Architecture Blueprint

## Application Metadata

**Application Name:** jsc-automation-demo
**Subdomain:** automation.jonathansimpson.co
**Primary Tech Stack:** Next.js (App Router, Client-Side Simulation), Tailwind CSS, Lucide Icons, Framer Motion.
**Design System Source:** DESIGN.md

## 1. Technical Architecture Overview

To ensure rapid loading, maximum reliability during live presentations, and effortless deployment, the application is engineered as a High-Fidelity Front-End Simulation Engine. It executes realistic AI workflow pipelines using client-side state machines, deterministic mock data queues, and fluid Framer Motion UI transitions.

```
+-----------------------------------------------------------------------------------+
| NEXT.JS @latest (APP ROUTER)                                                          |
| automation.jonathansimpson.co                                                    |
+-----------------------------------------------------------------------------------+
|                                                                                   |
+-------------------------------------+-----------------------------------+
|                                     |                                   |
v                                     v                                   v
[ Global Layout Shell ]     [ Interactive State Machine ]     [ Connector Mock Store ]

- DESIGN.md Design System    - Simulator Steps (1-4)          - OAuth vs API Payload
- Georgia / Inter / Mono     - PII Redaction Engine            - Granola/Aladdin Data
- Responsive Breakpoints     - SHA-256 Hash Generator          - Interactive Drawer
                            |                                   |
                            +-----------------------------------+
                            |
                            v
                      [ Agency Lead Capture Redirect ]
                      https://jonathansimpson.co
```

## 2. Component Structure & Repository Directory Tree

```
jsc-automation-demo/
    ├── src/
    │ ├── app/
    │ │ ├── layout.tsx # Root shell, font loaders, metadata
    │ │ ├── page.tsx # Single-page SPA layout compiling all modules
    │ │ └── globals.css # Design tokens & custom utility classes
    │ ├── components/
    │ │ ├── HeaderNav.tsx # Sticky brand & navigation bar
    │ │ ├── HeroSection.tsx # Executive briefing & trust badges
    │ │ ├── PipelineSimulator/
    │ │ │ ├── SimulatorContainer.tsx # Master state machine wrapper
    │ │ │ ├── WorkflowTabs.tsx # SFC Type 1, 6, 9 selector
    │ │ │ ├── VisualCanvas.tsx # 4-Step animated node graph
    │ │ │ ├── RedactionViewer.tsx # Interactive PII masking component
    │ │ │ └── AuditLogOutput.tsx # Cryptographic SHA-256 output block
    │ │ ├── ConnectorMatrix/
    │ │ │ ├── ConnectorGrid.tsx # Grid layout for Granola, M365, Aladdin, etc.
    │ │ │ └── ConnectorModal.tsx # Payload schema & OAuth details modal
    │ │ ├── PricingCalculator.tsx # Interactive FTE headcount ROI slider & reference plans
    │ │ ├── CcmfRoadmap.tsx # Cyberport grant budget & timeline breakdown
    │ │ └── Footer.tsx # Brand footer with links to main agency site
    │ ├── lib/
    │ │ ├── mockData.ts # Pre-configured payloads for workflows & connectors
    │ │ └── utils.ts # SHA-256 hash generator & currency formatters
    │ └── styles/
    │ └── tokens.ts # Color and typography design tokens
    ├── public/
    │ └── favicon.ico
    ├── tailwind.config.js # Extended with JS&C color palette
    ├── tsconfig.json
    └── package.json
```

## 3. Tailwind CSS & Design Token Integration (tailwind.config.js)

```js
/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    "./src/pages/**/_.{js,ts,jsx,tsx,mdx}",
    "./src/components/\*\*/_.{js,ts,jsx,tsx,mdx}",
    "./src/app/\*_/_.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "jsc-bg": "#f4f4ef", // Warm Cream
        "jsc-surface": "#ffffff", // Pure White
        "jsc-ink": "#161714", // Near Black
        "jsc-muted": "#5c5e56", // Olive Gray
        "jsc-line": "#d6d8d1", // Light Divider Line
        "jsc-accent": "#80988f", // Sage Green Accent
        "jsc-accent-soft": "#e3e9e6", // Soft Sage Fill
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        "jsc-lg": "1rem",
        "jsc-pill": "999px",
      },
      boxShadow: {
        "jsc-soft": "0 12px 30px -24px rgba(18, 20, 16, 0.15)",
      },
    },
  },
  plugins: [],
};
```

## 4. Interactive Simulator State Machine Mechanics

The pipeline simulation relies on a React state machine managing the $4$-stage execution lifecycle:

```typescript
// State Interface Blueprint
export type WorkflowType = "sfc_type9_nav" | "sfc_type1_kyc" | "sfc_type6_dd";
export type StepStatus = "idle" | "processing" | "complete" | "flagged";

export interface ISimulatorState {
  activeWorkflow: WorkflowType;
  currentStep: 1 | 2 | 3 | 4;
  isExecuting: boolean;
  stepStatuses: Record<1 | 2 | 3 | 4, StepStatus>;
  piiMaskCount: number;
  executionHash: string;
  logs: string[];
}
```

### Deterministic Execution Sequence

**User Trigger:** User clicks "Execute Pipeline" or selects a mock input file (e.g., HSBC_Custodian_NAV_20260728.pdf).

**Step 1: Secure Ingestion & Sanitization ($0\text{ms}$-$1000\text{ms}$):**
State sets currentStep = 1, status processing. Visually animates text redaction on mock document viewer (masking Client Name $\rightarrow$ [REDACTED_PII_01]).

**Step 2: Ephemeral RAM Processing ($1000\text{ms}$-$2200\text{ms}$):**
State sets currentStep = 2. Displays pulsing HK virtual server node status (RAM Buffer: Ephemeral Sandbox 0x8F2A).

**Step 3: Multi-Agent AI-vs-AI Governance ($2200\text{ms}$-$3400\text{ms}$):**
State sets currentStep = 3. Renders dual agent verification logs (Agent_Alpha: Variance Check vs Agent_Beta: SFC Rule Gate).

**Step 4: Non-PII Audit Dispatch ($3400\text{ms}+$):**
State sets currentStep = 4, status complete. Generates a unique cryptographic hash (SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855). Displays clean system of record output (e.g., formatted NAV report summary ready for CCO approval).

## 5. Development Deliverables & Sprints

**Sprint 1: Base Setup & Design Tokens**
Initialize Next.js 14 App Router with TypeScript. Configure tailwind.config.js with DESIGN.md color variables and typography standards. Build global HeaderNav and Footer components with direct links to jonathansimpson.co.

**Sprint 2: Pipeline Simulator Component Suite**
Implement WorkflowTabs and VisualCanvas node graph. Develop RedactionViewer with animated masking effects. Integrate cryptographic SHA-256 mock hash generator for audit logs.

**Sprint 3: Connector Matrix & ROI Calculator**
Build interactive grid featuring Granola, M365, Slack, BlackRock Aladdin, and Xero. Implement modal drawers displaying OAuth2/API credential configuration code snippets. Build interactive headcount ROI slider ($\text{HKD } 580\text{k}/\text{yr}$ savings formula).

**Sprint 4: Reference Pricing & CCMF Grant Roadmap**
Render reference pricing cards (Starter, Core, Pro, Scale/Enterprise) with clear bespoke solution disclaimer banner. Build Cyberport CCMF $\text{HKD } 100,000$ 6-month budget visualization chart. Deploy static export build to subdomain automation.jonathansimpson.co.
