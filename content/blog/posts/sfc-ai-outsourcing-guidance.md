---
title: >-
  SFC guidance on AI and outsourcing for licensed firms: a plain-English
  walkthrough
date: 2026-07-08T00:00:00.000Z
description: >-
  What SFC-licensed firms in Hong Kong need to know when adopting AI:
  accountability, governance, outsourcing discipline, and the approval gates
  compliance officers should demand.
keywords:
  - SFC AI guidance
  - SFC outsourcing requirements AI
  - using AI in SFC licensed firm
  - AI governance Hong Kong
  - SFC licensed firm AI
category: compliance
image: /images/blog/sfc-ai-outsourcing-guidance.jpg
faq:
  - question: Does the SFC have specific AI rules for licensed firms?
    answer: >-
      The SFC regulates AI through its existing framework (senior management
      accountability, proper systems and controls, and its outsourcing
      requirements), rather than a dedicated AI rulebook. Firms must be able to
      demonstrate governance proportionate to the AI's role.
  - question: When does using AI count as outsourcing for SFC purposes?
    answer: >-
      When a material function is performed by a third party, including AI
      delivered via API or platform. That triggers the SFC's outsourcing
      expectations: due diligence, contractual safeguards, and ongoing oversight
      of the provider.
  - question: Who is accountable if an AI system makes an error?
    answer: >-
      The licensed firm. AI does not shift regulatory responsibility; senior
      management remains accountable for outcomes, and the firm must be able to
      explain and audit how the AI reached its result.
  - question: Do we need approval before using AI for reporting or compliance functions?
    answer: >-
      Not a formal filing, but you need documented governance: a risk
      assessment, defined escalation, audit trails, and sign-off appropriate to
      the function's materiality to clients.
imageAlt: >-
  SFC guidance on AI and outsourcing for licensed firms: a plain-English
  walkthrough, a compliance automation guide for Hong Kong firms
---

**The SFC does not have a single "AI rulebook". It regulates AI through the framework licensed firms already operate under.** That means senior management accountability, proper systems and controls, and the outsourcing requirements that apply whenever a material function is performed by a third party. The practical question for a licensed firm is not "is AI allowed" but "can we demonstrate how it is governed."

This walkthrough translates what the SFC expects into concrete decisions: what needs approval, what needs documenting, and where the audit trail must live. It is written for compliance officers and COOs at boutique asset managers, IAMs, and family offices, the firms where AI is now a board-level topic and the answer has been "wait and see."

## How the SFC approaches AI: the three pillars

The SFC has consistently signalled three expectations for firms using AI and automated systems:

1. **Accountability.** Responsibility for client outcomes sits with the licensed firm, not the technology provider. A firm cannot point to an AI vendor and say "the system made the error."
2. **Governance.** AI that affects clients must sit inside the firm's systems-and-controls framework: defined ownership, monitoring, escalation, and review, the same discipline applied to a human performing the function.
3. **Transparency with regulators.** When asked, the firm can explain what AI does, where it is used, how it is controlled, and how clients are protected.

These are not new duties. They are existing duties applied to a new tool. That is good news: the path to compliance is documentation and control, not permission-seeking.

## When does AI usage become "outsourcing"?

This is the classification that matters most in practice. The SFC's outsourcing requirements apply when a material function (one that materially affects client outcomes or regulatory compliance) is delegated to a third party.

AI changes the analysis in one important way: even a modest tool can be outsourcing. If a portfolio monitoring function is performed by an AI service provided through an API, the third party is performing a function the firm is responsible for. That triggers:

- **Due diligence on the provider**: jurisdiction, security, subprocessors, financial stability
- **Contractual protections**: data processing terms, confidentiality, access and audit rights, service levels
- **Ongoing oversight**: monitoring performance and re-assessing the arrangement

The common failure here is treating AI tools like software subscriptions. A licence fee is not a governance assessment. If the vendor handles client data, vendor onboarding must be treated with the same discipline as any other material third-party arrangement.

## What compliance officers should demand before any deployment

The approval gate is where most firms can fix the problem before it exists. Before an AI deployment touches client data or client-facing output, demand these five things:

1. **A risk assessment**: what does the AI do, what data does it touch, what happens if it fails
2. **A lawful basis and data-flow map**: where data goes, who hosts it, what is retained
3. **A control matrix**: who owns the function, how output is validated, how errors escalate
4. **An audit trail design**: what gets logged, where it is stored, who can review it
5. **Sign-off by function**: proportionate to materiality, from team lead to board for client-facing systems

If a proposal cannot produce these five, it is not ready. If it can, the conversation with senior management changes from "should we" to "here is how we will."

## The audit trail that regulators actually ask for

When a regulator asks about an AI system, the question is usually some version of: "show me what happened with this client, in this period, and why this output was produced." A defensible audit trail answers that with:

- **Inputs captured**: what data entered the pipeline, in what form
- **Processing events**: what the system did, in what order, with what version of rules
- **Validation results**: which checks passed or failed, including automated reviews
- **Human decisions**: who reviewed, what they changed, when they signed off
- **Cryptographic proof**: an unalterable record that the log itself has not been modified

For ZDR (zero-data-retention) architectures, the audit trail is where compliance evidence lives, because the raw data is gone by design. The log proves what happened without retaining the underlying data, which is why a well-designed ephemeral pipeline can satisfy both the retention rules and the audit expectation.

## A practical checklist for the next adoption review

- [ ] Classified each AI usage: in-house tool, vendor system, or material outsourcing
- [ ] Named a responsible owner for each AI function
- [ ] Completed vendor due diligence for any third-party AI touching client data
- [ ] Signed data processing agreements with all providers
- [ ] Defined validation and sign-off for AI-generated output
- [ ] Designed audit logging before deployment, not after
- [ ] Updated the compliance manual and staff usage policy
- [ ] Briefed senior management and recorded their sign-off

## Frequently asked questions

**Does the SFC have specific AI rules for licensed firms?**
The SFC regulates AI through its existing framework (senior management accountability, systems and controls, and outsourcing requirements), rather than a dedicated AI rulebook. Firms must demonstrate governance proportionate to the AI's role.

**When does using AI count as outsourcing for SFC purposes?**
When a material function is performed by a third party, including AI delivered via API or platform. That triggers due diligence, contractual safeguards, and ongoing oversight of the provider.

**Who is accountable if an AI system makes an error?**
The licensed firm. AI does not shift regulatory responsibility; senior management remains accountable, and the firm must be able to explain and audit how the AI reached its result.

**Do we need approval before using AI for reporting or compliance functions?**
Not a formal filing, but you need documented governance: risk assessment, defined escalation, audit trails, and sign-off proportionate to the function's materiality.

## Where to start

If your firm is evaluating AI for reporting, reconciliation, or compliance functions, the conversation should start with a governance diagnostic, not a vendor demo. Book a consultation and we will map your candidate workflows against the five approval gates above.
