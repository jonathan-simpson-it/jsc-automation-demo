---
title: 'Redaction isn''t anonymity: when masking client data still triggers PCPD'
date: 2026-07-14T00:00:00.000Z
description: >-
  Why masking client data before sending it to an AI tool often fails to remove
  your PCPD obligations, and what genuinely anonymised data requires under Hong
  Kong law.
keywords:
  - PII redaction AI
  - anonymised data PCPD
  - does masking protect personal data
  - pseudonymisation Hong Kong
  - personal data definition PCPD
category: compliance
image: /images/blog/redaction-vs-anonymisation-pcpd.jpg
faq:
  - question: Is masked data still personal data under PCPD?
    answer: >-
      Usually yes. If the masked data can be linked back to an identifiable
      person (by you, the recipient, or anyone combining it with other
      information), it remains personal data and the full obligations apply.
  - question: What is the difference between redaction and anonymisation?
    answer: >-
      Redaction (or pseudonymisation) removes identifiers but leaves data that
      can be re-linked. Anonymisation is irreversible: there is no reasonable
      way to identify a person from the result, considering all means reasonably
      likely to be used.
  - question: Can I send masked client data to an AI provider?
    answer: >-
      If the masking is reversible or the data can be re-linked, the provider is
      processing personal data on your behalf: you need contractual protection,
      security assessment, and retention controls, not just a redaction script.
  - question: Does removing names and HKID numbers make data safe?
    answer: >-
      Not by itself. In financial data, quasi-identifiers like portfolio value,
      transaction patterns, and dates can often identify a person when combined,
      which is why a formal anonymisation assessment is needed.
imageAlt: >-
  Redaction isn't anonymity: when masking client data still triggers PCPD, a
  compliance automation guide for Hong Kong firms
---

**Masking client data does not automatically remove your PCPD obligations; most "anonymised" data in practice is still personal data.** Under Hong Kong's Personal Data Privacy Ordinance, data remains personal data if a person can be identified from it, taking into account all information reasonably likely to be used. If your redacted records can be re-linked (by you, the AI provider, or anyone with the original data), the Ordinance still applies in full.

This is one of the most expensive misunderstandings in AI adoption. Firms believe a masking script gives them a safe harbour, send data to an AI provider, and discover later that the data was re-identifiable, that the provider stored it, and that the compliance position collapses. This guide explains the distinction, shows where the line is, and gives you a test you can run on your own data.

## Why "we redacted the names" is not an answer

The PDPO defines personal data as data relating to an identifiable person. The definition is deliberately broad: identifiability is judged by what is *reasonably likely* to be used to identify someone, including information held by the data recipient and publicly available data.

That means a redaction test has to answer three questions, not one:

1. **Can the recipient identify the person?** Removing a name does not help if the account number remains.
2. **Can the data be re-linked with other information?** A portfolio statement without a name, but with a distinctive fund mix and balance, may identify the client when combined with a fund fact sheet or public filings.
3. **Can anyone in the chain re-identify it?** The original file often remains somewhere in the workflow, so a redacted copy is trivially linked back.

If the answer to any of these is yes, the redacted data is personal data and the full set of obligations applies: lawful basis, retention limits, security, and transparency.

## Redaction, pseudonymisation, and anonymisation: the vocabulary that matters

| Term | What it means | PCPD status |
|---|---|---|
| **Redaction** | Removing specific fields (names, IDs) from a record | Still personal data if re-linkable |
| **Pseudonymisation** | Replacing identifiers with codes or tokens | Still personal data: a key exists to reverse it |
| **Anonymisation** | Irreversible transformation; no reasonable re-identification | Falls outside the Ordinance |
| **Aggregation** | Combining records so individuals are indistinguishable | Usually outside, but check small cells |

The key point is the middle column. Pseudonymisation (including replacing an HKID with a token) is reversible by design. The PCPD's guidance on anonymisation is consistent with international practice: anonymisation must be **irreversible**, considering all means reasonably likely to be used.

## The re-identification test for financial data

Financial data is particularly vulnerable to re-identification because it is rich in quasi-identifiers. Run this checklist on any dataset you plan to "anonymise":

- [ ] Names, HKID/passport numbers, and addresses removed
- [ ] Account and reference numbers removed or irreversibly transformed
- [ ] Dates and values examined for uniqueness (a single large balance can be identifying)
- [ ] Transaction patterns checked (an unusual trade sequence may map to a known client)
- [ ] Small dataset cells reviewed (in a 10-client fund, masking is nearly impossible)
- [ ] Tested with an actual re-identification attempt by someone outside the team
- [ ] Documented: the anonymisation method, the assessment, and the residual risk decision

If you cannot pass this checklist, your data is still personal data, and you should build the workflow around that assumption rather than the hope that masking saves you.

## What this means for AI adoption

The practical consequences for firms using AI:

**If your data is genuinely anonymised** (the rare case), you can process it with fewer constraints. Anonymised data falls outside the Ordinance's protections.

**If your data is masked but re-identifiable** (the common case), you are still processing personal data. That means the AI provider is a data processor of yours, and you need:

- A data processing agreement covering storage, security, and deletion
- Assessment of where the data is hosted and whether that creates transfer obligations
- Retention controls on the provider's copies
- The same audit trail and accountability you would have for unmasked data

The firms that get this right treat masking as a risk-reduction layer inside a compliant workflow, not as a substitute for one.

## Frequently asked questions

**Is masked data still personal data under PCPD?**
Usually yes. If the masked data can be linked back to an identifiable person (by you, the recipient, or anyone combining it with other information), it remains personal data and the full obligations apply.

**What is the difference between redaction and anonymisation?**
Redaction removes identifiers but leaves data that can be re-linked. Anonymisation is irreversible: no reasonable means can identify a person from the result.

**Can I send masked client data to an AI provider?**
If the masking is reversible or re-linkable, the provider is processing personal data on your behalf: you need contractual protection, security assessment, and retention controls, not just a redaction script.

**Does removing names and HKID numbers make data safe?**
Not by itself. Financial data contains quasi-identifiers like portfolio value and transaction patterns that can identify a person when combined: a formal anonymisation assessment is required.

## Build the workflow around the assumption

The safest design assumption for most firms is: **masked data is still personal data.** Build masking into a compliant pipeline (local redaction, ephemeral processing, contractual protection with any provider, and audit records), and the redaction question stops being a risk and becomes a layer. If you want a review of your current data flows and where re-identification risk actually sits, book a consultation.
