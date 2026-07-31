---
title: 'PCPD amendments and your data lifecycle: a practical map'
date: 2026-11-01T00:00:00.000Z
description: >-
  What the evolving PCPD framework means for how Hong Kong firms handle client
  data across its lifecycle: from collection and use to retention, deletion,
  and cross-border transfer.
keywords:
  - PCPD data lifecycle
  - personal data lifecycle Hong Kong
  - PCPD retention requirements
  - cross border data transfer HK
  - data lifecycle management finance
category: compliance
image: /images/blog/pcpd-data-lifecycle-map.jpg
draft: true
faq:
  - question: 'What is a data lifecycle, and why does it matter?'
    answer: >-
      The journey of personal data from collection to deletion. Mapping it
      (collection, use, retention, sharing, transfer, destruction) is how a firm
      demonstrates the six data protection principles are being met at every
      stage.
  - question: How long can you keep client data under PCPD?
    answer: >-
      Only as long as needed for the purpose for which it was collected. Firms
      should set retention schedules per data category, apply them
      systematically, and be able to show deletion was performed.
  - question: What changed recently for cross-border data transfers in HK?
    answer: >-
      The PCPD's amendment framework introduces a new mechanism for regulating
      cross-border transfers: firms should review where their data goes,
      including AI processing locations, and document the transfer basis.
  - question: How do AI systems change the data lifecycle?
    answer: >-
      They create new collection and transfer points (API calls, model
      providers, subprocessors) and new retention risks (provider storage,
      training copies). The lifecycle map must include every system that touches
      the data.
imageAlt: >-
  PCPD amendments and your data lifecycle: a practical map, a compliance
  automation guide for Hong Kong firms
---

**A data lifecycle map is the practical instrument behind PCPD compliance, and the amendment framework now moving through Hong Kong's legislative process makes it harder to ignore.** The map shows where personal data enters the firm, where it goes, who touches it, how long it lives, and how it dies. Every data protection principle (purpose, accuracy, retention, security, transparency, access) is enforced at a specific stage of that lifecycle.

For financial firms, the lifecycle has quietly multiplied: client data now moves through portals, AI tools, API calls, and provider systems that did not exist when most privacy policies were written. This guide maps the lifecycle end to end and flags the stages where AI adoption creates the most exposure.

## The six stages of the data lifecycle

### 1. Collection

Data enters the firm: onboarding documents, KYC records, statements, meeting notes, correspondence. The obligations at this stage are purpose and notice: what is collected, why, and what the client is told. The failure mode is collecting more than the purpose needs "because we might need it later."

### 2. Use

The data is processed for the purpose collected: screening, reconciliation, reporting, relationship management. The obligation is use limitation: processing must relate to the stated purpose. AI usage is the new risk here: a model called for one purpose can become a processing point for another.

### 3. Retention

The data is stored, and this is where most firms are weakest. Retention must be limited to what the purpose requires, and the requirement applies to *every copy*: archives, backups, inboxes, and the AI provider's storage.

### 4. Sharing

Data moves to third parties: custodians, auditors, lawyers, counterparties. The obligation is on the controller to ensure the recipient's handling is lawful, which means contractual protection and due diligence, not an email attachment and a hope.

### 5. Transfer

Data moves across borders, including to a model provider's servers. Cross-border transfer is the area where the legislative landscape is shifting, and where AI adoption creates new transfer points overnight.

### 6. Destruction

Data is deleted when the purpose ends. The obligation is real deletion, not "moved to an archive." Firms should be able to demonstrate deletion, which is why ephemeral processing architectures are so valuable: deletion is structural rather than scheduled.

## Where AI changes the map

AI systems alter the lifecycle at four points:

| Stage | AI-specific exposure |
|---|---|
| Use | A model processes data in ways the client was not told about |
| Retention | Provider storage, debugging logs, and training copies extend data life without consent |
| Sharing | Subprocessors receive data the firm has never vetted |
| Transfer | API routing sends data to jurisdictions outside any documented basis |

The practical response is the same discipline as everywhere else: map every system that touches client data, including the AI pipeline; document the basis for each touch; and ensure retention and deletion cover the provider's copies, by contract, and by architecture where possible.

## Building the map at your firm

A working lifecycle map does not need to be a consulting artefact. Build it as a simple table:

| Stage | Systems involved | Data types | Purpose | Retention | Transfer location |
|---|---|---|---|---|---|
| Collection | Onboarding portal, email | KYC docs, ID | Client onboarding | 7 years (regulatory) | HK only |
| Use | Reconciliation pipeline | Statements, NAV | Reporting | Ephemeral (ZDR) | HK node |
| Retention | CRM, archives | Client records | Relationship | Per schedule | HK + cloud DR |
| Sharing | Auditors, custodians | Files, reports | Compliance | Contractual | Various |

Once every system is listed, the gaps reveal themselves: the CRM copy nobody scheduled for deletion, the AI tool nobody mapped, the backup that never expires. The map is the audit trail's foundation: when a regulator or client asks "what happens to my data," the map is the answer.

## The checklist for each data system

- [ ] System is listed on the lifecycle map
- [ ] Purpose of processing documented
- [ ] Collection limited to the purpose
- [ ] Retention schedule defined and enforced
- [ ] Sharing and transfers documented with legal basis
- [ ] AI and API processing points included
- [ ] Deletion verified, not assumed
- [ ] Client access and correction process tested

## Frequently asked questions

**What is a data lifecycle, and why does it matter?**
The journey of personal data from collection to deletion. Mapping it is how a firm demonstrates the data protection principles are met at every stage.

**How long can you keep client data under PCPD?**
Only as long as needed for the purpose of collection. Set retention schedules per data category, apply them systematically, and be able to show deletion was performed.

**What changed recently for cross-border data transfers in HK?**
The PCPD amendment framework introduces a new mechanism for regulating cross-border transfers: review where your data goes, including AI processing locations, and document the transfer basis.

**How do AI systems change the data lifecycle?**
They create new collection and transfer points and new retention risks. The lifecycle map must include every system that touches the data.

## Map it before it maps you

Every firm we work with has data in systems it has not fully mapped. The exercise is a few days of work and it changes every subsequent AI decision. If you want to run the mapping exercise against your stack (or have us walk you through a lifecycle map for a candidate workflow), book a consultation.
