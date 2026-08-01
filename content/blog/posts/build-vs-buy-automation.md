---
title: "Build vs buy: what boutique HK firms actually save"
date: 2026-10-01T00:00:00.000Z
description: >-
  A working comparison of building AI automation in-house versus buying it from
  a vendor: the cost models, the hidden engineering burden, and when each route
  wins for boutique HK firms.
keywords:
  - build vs buy AI automation
  - in-house AI development cost
  - AI vendor vs in-house
  - automation build vs buy Hong Kong
  - AI development cost finance
category: economics
image: /images/blog/build-vs-buy-automation.jpg
draft: true
faq:
  - question: Is it cheaper to build AI automation in-house?
    answer: >-
      Only for firms with the engineering capacity to own a production system
      long-term. The build cost is usually higher than expected because
      production, security, and compliance engineering dominate, not the
      initial demo script.
  - question: What is the hidden cost of building in-house?
    answer: >-
      Ongoing ownership: model updates, security patching, compliance changes,
      connector maintenance, and support. The first year is typically 50-100%
      more than the initial build once these are counted.
  - question: When should a firm build rather than buy?
    answer: >-
      When the workflow is genuinely unique, when data cannot leave the
      perimeter, or when the scale justifies owning the engineering team.
      Otherwise a governed vendor deployment reaches value faster.
  - question: How do you compare build vs buy honestly?
    answer: >-
      Put both on the same cost model: initial cost, annual ownership, time to
      value, and the probability of delivery, then compare against the value of
      the work automated. The comparison decides itself.
imageAlt: >-
  Build vs buy: what boutique HK firms actually save, an economics automation
  guide for Hong Kong firms
---

**Build vs buy for AI automation is rarely decided by the software; it is decided by who will own the system in year two.** The build route's initial appeal (control, customisation, no subscription) dissolves in year two under security patching, model updates, compliance changes, and connector maintenance. For boutique firms in Hong Kong, the honest comparison usually lands on the buy side, with specific exceptions that matter.

This guide puts both routes on the same cost model so the decision is arithmetic rather than preference: the true build cost, the ownership burden, the buy cost, and the test that tells you which route fits your firm.

## The true cost of building

The build route's first error is comparing the demo to the subscription. A demo script (a model called from a notebook) is days of work. A production system is a different category:

| Component | Effort |
|---|---|
| Working prototype | 2-4 weeks |
| Production hardening (error handling, retries, monitoring) | 4-8 weeks |
| Security and data protection (masking, encryption, access control) | 3-6 weeks |
| Compliance engineering (audit trails, approvals, versioning) | 3-6 weeks |
| Connectors and integrations (custodian portals, accounting systems) | 4-12 weeks |
| Testing and sign-off | 2-4 weeks |
| **Total first year** | **4-10 months of engineering** |

At HK market rates for capable engineering, the first year lands well above the buy route's recurring cost, before a single line of maintenance. The build route only makes sense when that engineering capacity exists and is paid for anyway.

## The ownership burden

The decision is made in year two, not year one. Ownership of a built system means:

- **Model updates**: new model versions, retraining, regression testing
- **Security**: patching, vulnerability monitoring, access reviews
- **Compliance**: new circulars and guidance require rule updates and re-verification
- **Connector maintenance**: custodian portals change their formats without notice
- **Support**: someone is accountable when it breaks, at 5:30am

Count 20-30% of the original build effort per year in ownership. Most firms that build discover this after the founding engineer has left, and the system becomes a liability, not an asset.

## What buy actually buys

The buy route is not "pay a subscription and it runs." The reference model for a governed deployment:

| Component | Notes |
|---|---|
| Setup and integration | Mapped to your process, not installed and abandoned |
| Recurring platform and hosting | Infrastructure, support, compliance updates included |
| Connector coverage | Custodians and systems that exist in your stack |
| Compliance engineering | Audit trails and approval gates built to your requirements |
| Ownership | The vendor owns the maintenance burden by contract |

The price is meaningful (in the reference case, roughly 65% below a fully loaded junior analyst; every engagement is bespoke and custom-quoted against scope), but what is really being purchased is *ownership transfer*: the maintenance, the updates, and the accountability for keeping the system alive.

## When build genuinely wins

The arithmetic flips in specific situations:

1. **Genuinely unique workflows**: the process is so specific that no vendor will ever build it; you are the only customer
2. **Data cannot leave the perimeter**: regulatory or contractual constraints that rule out any external processing, however governed
3. **Engineering is a strategic function**: the firm intends to build a team and a platform, and automation is one product of it
4. **Integration depth**: the workflow sits inside proprietary systems no vendor can reach

If none of these apply, the buy route wins on every axis that matters: cost, time to value, and who owns the risk.

## The comparison test

Put both routes on one model and let the numbers decide:

- Initial cost (build: engineering effort; buy: setup fee)
- Annual ownership (build: 20-30% of build per year; buy: recurring fee)
- Time to value (build: 4-10 months; buy: weeks)
- Probability of delivery (build: depends on team continuity; buy: contract)
- Value automated (the cost of the work automated, using the fully loaded FTE model)

Where build and buy come close, the tie-breaker is delivery risk. A governed deployment with a contract, a pilot, and a defined scope carries less execution risk than a build that depends on a small team's continuity.

## Frequently asked questions

**Is it cheaper to build AI automation in-house?**
Only for firms with the engineering capacity to own a production system long-term. Production, security, and compliance engineering dominate the build cost, not the initial demo script.

**What is the hidden cost of building in-house?**
Ongoing ownership: model updates, security patching, compliance changes, connector maintenance, and support. Year one is typically 50-100% more than the initial build once these are counted.

**When should a firm build rather than buy?**
When the workflow is genuinely unique, when data cannot leave the perimeter, or when scale justifies owning the engineering team. Otherwise a governed vendor deployment reaches value faster.

**How do you compare build vs buy honestly?**
Put both on the same cost model: initial cost, annual ownership, time to value, and probability of delivery, then compare against the value of the work automated.

## The decision is about ownership

Whatever the route, the question is the same: who will own this system in year two, your team or a vendor under contract? If you want to run the comparison against your own workflows and costs, book a consultation.
