---
title: Can HK financial firms use AI on client data? What PCPD and SFC actually allow
date: 2026-07-03T00:00:00.000Z
description: >-
  A plain-English guide to what the Personal Data Privacy Ordinance and SFC
  rules permit when Hong Kong financial firms use AI on client data, with a
  practical compliance checklist.
keywords:
  - AI compliance Hong Kong
  - PCPD AI client data
  - is ChatGPT legal for finance HK
  - using AI on client data Hong Kong
  - SFC AI compliance
category: compliance
image: /images/blog/ai-on-client-data-hk.jpg
faq:
  - question: Is it legal to feed client data into ChatGPT in Hong Kong?
    answer: >-
      Only if you have the client's consent and ensure the data is not stored or
      used for training by the provider. Public consumer AI tools generally fail
      the PCPD's six data protection principles in practice, which is why most
      licensed firms prohibit them for client data without masking or
      contractual safeguards.
  - question: Does PCPD require consent before using AI on client data?
    answer: >-
      PCPD has six data protection principles covering purpose limitation,
      retention, security, and direct marketing. Consent is one lawful basis,
      but firms also need data minimisation, reasonable security measures, and
      clear privacy policies describing how AI is used.
  - question: What does the SFC require when a licensed firm adopts AI?
    answer: >-
      The SFC expects firms to maintain accountability, ensure adequate
      governance over outsourced or automated functions, keep audit trails, and
      prevent harm to clients. Any material outsourcing of functions to an AI
      vendor typically falls under the SFC's outsourcing requirements.
  - question: Can anonymised client data be used freely in AI systems?
    answer: >-
      Genuinely anonymised data falls outside the Ordinance, but most
      "anonymisation" in practice is reversible masking, which still counts as
      personal data. If identity can be re-derived, the full PCPD obligations
      still apply.
imageAlt: >-
  Can HK financial firms use AI on client data? What PCPD and SFC actually
  allow: a compliance automation guide for Hong Kong firms
---

**The short answer: yes, if your use is lawful, fair, and properly governed.** Hong Kong's Personal Data Privacy Ordinance (PDPO, Cap. 486) does not ban AI, and the SFC does not prohibit licensed firms from using it. What both regulators require is accountability: a lawful basis for processing, security that matches the sensitivity of the data, and governance you can demonstrate on request.

Most firms we speak to are not being stopped by the rules. They are being stopped by uncertainty about what the rules require, and by consumer AI tools that quietly store and reuse the data you feed them. This guide gives you the actual framework, the specific obligations, and a checklist your compliance officer can use.

## What does PCPD actually say about AI and personal data?

The PDPO is a principles-based law. It contains six data protection principles (DPPs), and every use of AI on personal data (including client data) must satisfy them.

| Principle | What it means for AI | Common failure |
|---|---|---|
| DPP1: Purpose & consent | You need a lawful basis; processing must relate to the stated purpose | Generic "we use AI" consent language |
| DPP2: Accuracy | Data used to train or prompt must be accurate | Duplicated or stale client records |
| DPP3: Retention | Data must not be kept longer than needed | Providers storing prompts for "improvement" |
| DPP4: Security | Reasonable security for the sensitivity of the data | Sending unredacted files to a public LLM |
| DPP5: Transparency | Openness about policies and practices | No policy on AI data handling |
| DPP6: Access & correction | Clients can access and correct their data | No process for data subject requests |

The Privacy Commissioner has published practical guidance on AI for organisations. The headline expectation is not "don't use AI"; it is **assess the risk, document your basis, and apply protections proportional to the data**.

## What does the SFC expect from licensed firms using AI?

The SFC approaches AI through its existing regulatory framework rather than a dedicated AI rulebook. Three expectations matter most:

1. **Senior management accountability.** You cannot outsource responsibility. The licensed firm remains responsible for outcomes produced by AI, however the work is performed.
2. **Governance over automated functions.** If AI materially affects client outcomes (reporting, NAV calculation, screening, trading), you need the same controls you would have over a human performing that function: defined responsibilities, monitoring, and documented procedures.
3. **Outsourcing discipline.** Where AI is delivered by a third party (including API-based model providers), the SFC's outsourcing expectations apply to material functions: due diligence on the provider, contractual safeguards, and oversight of performance.

A practical consequence: a firm that uses a consumer chatbot on client data because "the staff wanted to try it" has already created an issue: the usage was never assessed, the provider was never vetted, and the data trail is unrecoverable. A firm that deploys a masked, ephemeral pipeline with defined sign-off has a defensible position.

## Can staff use ChatGPT or other public tools on client data?

In practice, almost never, and here is why. Consumer AI tools typically store prompts, use them for training, and operate outside Hong Kong's jurisdiction and any data-processing agreement. That conflicts with DPP3 (retention) and DPP4 (security) almost immediately.

What firms typically do instead:

- **Mask first, then process.** Strip identifiers (HKID numbers, account numbers, names) before any payload leaves your perimeter.
- **Use enterprise accounts** with data-processing agreements, zero-training commitments, and regional hosting where available.
- **Route through a governed pipeline** so that masking, processing, and deletion are systematic rather than discretionary.

## The compliance checklist for adopting AI on client data

Run this before any AI deployment touches client data:

- [ ] Data Protection Impact Assessment completed and filed
- [ ] Lawful basis documented for each processing purpose
- [ ] Data minimisation: only the fields needed for the task
- [ ] Security measures proportional to data sensitivity (encryption in transit and at rest)
- [ ] Retention and deletion policy covering the AI provider's copies
- [ ] Provider due diligence: jurisdiction, training practices, subprocessors
- [ ] Written data processing agreement with the vendor
- [ ] Privacy policy updated to describe AI processing
- [ ] Staff policy: what may and may not be entered into AI tools
- [ ] Audit trail of significant processing events
- [ ] Data subject access process that still works with AI systems
- [ ] Board or senior management sign-off recorded

## A practical example: monthly NAV reporting

Take a boutique asset manager generating monthly client NAV reports. The prohibited shortcut is exporting the client list into a public AI tool to draft commentary. A compliant alternative:

1. Extract only the fields the task needs (portfolio value, holdings, performance).
2. Mask client identity at the source.
3. Process in an ephemeral environment that stores nothing after execution.
4. Have a human review the output before dispatch.
5. Log the execution to an audit record.

Nothing in that sequence requires a regulator's permission. It requires discipline.

## Frequently asked questions

**Is it legal to feed client data into ChatGPT in Hong Kong?**
Only if you have the client's consent and ensure the data is not stored or used for training by the provider. Consumer tools generally fail the data protection principles in practice, which is why most licensed firms prohibit them for client data without masking or contractual safeguards.

**Does PCPD require consent before using AI on client data?**
Consent is one lawful basis, but firms also need purpose limitation, data minimisation, reasonable security, and privacy policies describing how AI is used.

**What does the SFC require when a licensed firm adopts AI?**
Accountability, governance over automated functions, audit trails, and, where AI is outsourced to a vendor, compliance with outsourcing expectations, including provider due diligence and contractual safeguards.

**Can anonymised client data be used freely in AI systems?**
Genuinely anonymised data falls outside the Ordinance, but most "anonymisation" in practice is reversible masking. If identity can be re-derived, the full obligations still apply.

## Start with an assessment, not a ban

The firms getting this right are not the ones that banned AI. They are the ones that assessed it, documented their basis, and put protections around it. If you would like a compliance diagnostic mapped to your firm's specific data flows, book a consultation. We walk through your current AI usage and build the governance framework around it.
