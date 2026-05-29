# Requirement 2 – 20 Software Defects 2022–2026

**Student Name:** [Your Name]  
**Student ID:** [Your Student ID]  
**Course/Class:** [Course/Class]  
**Report Timestamp:** 2026-05-28 23:29:20 ICT (Asia/Ho_Chi_Minh)

---

## 1. Requirement Summary

This section reports **20 software defects publicized between 2022 and 2026**.

Requirements covered:

- 20 software defects from 2022–2026.
- At least 5 defects related to AI/LLM, including hallucination, prompt injection, or bias.
- Each defect includes:
  - Source link
  - Description
  - Severity
  - Consequences
  - Solution / mitigation
- One example showing where an AI tool was biased or hallucinated when explaining a defect.

---

## 2. Defect List

| No. | Defect Name | Year Publicized | Category | AI/LLM Related? |
|---|---|---:|---|---|
| 1 | [Defect Name] | 2022 | [Security / Functional / Performance / AI / Other] | Yes / No |
| 2 | [Defect Name] | 2022 | [Category] | Yes / No |
| 3 | [Defect Name] | 2022 | [Category] | Yes / No |
| 4 | [Defect Name] | 2023 | [Category] | Yes / No |
| 5 | [Defect Name] | 2023 | [Category] | Yes / No |
| 6 | [Defect Name] | 2023 | [Category] | Yes / No |
| 7 | [Defect Name] | 2023 | [Category] | Yes / No |
| 8 | [Defect Name] | 2024 | [Category] | Yes / No |
| 9 | [Defect Name] | 2024 | [Category] | Yes / No |
| 10 | [Defect Name] | 2024 | [Category] | Yes / No |
| 11 | [Defect Name] | 2024 | [Category] | Yes / No |
| 12 | [Defect Name] | 2024 | [Category] | Yes / No |
| 13 | [Defect Name] | 2025 | [Category] | Yes / No |
| 14 | [Defect Name] | 2025 | [Category] | Yes / No |
| 15 | [Defect Name] | 2025 | [Category] | Yes / No |
| 16 | [Defect Name] | 2025 | [Category] | Yes / No |
| 17 | [Defect Name] | 2026 | [Category] | Yes / No |
| 18 | [Defect Name] | 2026 | [Category] | Yes / No |
| 19 | [Defect Name] | 2026 | [Category] | Yes / No |
| 20 | [Defect Name] | 2026 | [Category] | Yes / No |

---

## 3. Detailed Software Defects

### Defect 01 – Service Control Null Pointer Crash & Global API Outage

- **Year Publicized:** 2025
- **Source Link:** https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW?utm_source=chatgpt.com
- **Category:** Functional / Performance
- **AI/LLM Related:** No

**Description:**  
On May 29, 2025, a new feature for quota policy checks was added to "Service Control" (the core binary for Google's API management). This code lacked proper error handling for null pointers and was not protected by feature flags. On June 12, 2025, a global policy change containing unintended blank fields was deployed. When Service Control read these blank fields, it triggered the untested code path, hit a null pointer, and caused the binaries to go into a global crash loop, returning 503 errors for API requests.

**Severity:**  
Critical

**Consequences:**  
- System & Performance: Caused a massive global outage across multiple Google Cloud, Google Workspace, and Google Security Operations products. Large regions (like us-central-1) experienced secondary "herd effect" outages due to a lack of randomized exponential backoff, overloading underlying Spanner databases during system restarts.

- Customer & Reputation: Customers heavily relying on GCP faced severe business disruptions due to API request failures.

- Visibility: Google's own monitoring and Cloud Service Health infrastructure went down as a result of the outage, leaving customers blind to the incident and unable to properly monitor their own affected infrastructure.

**Solution / Mitigation:**  

Immediate Fix: Site Reliability Engineering (SRE) identified the root cause within 10 minutes and triggered a "red-button" to disable the faulty serving path. To recover overloaded regions, they throttled task creation and routed traffic to multi-regional databases. All changes to the Service Control stack were subsequently frozen.

Long-term Prevention:
1. Modularize Service Control architecture so that if a check fails, it "fails open" and still serves API requests.
2. Modify global data replication to propagate incrementally rather than instantly to catch issues early.
3. Enforce feature flags (disabled by default) on all critical binary changes.
4. Improve static analysis and testing for error handling.
5. Enforce randomized exponential backoff across systems to prevent "herd effect" infrastructure overloads.
6. Ensure monitoring and communication infrastructure is decoupled so it remains operational even if primary GCP products fail.

---

### Defect 02 – regreSSHion (CVE-2024-6387)

- **Year Publicized:** 2024
- **Source Link:** https://www.qualys.com/regresshion-cve-2024-6387?utm_source=chatgpt.com
- **Category:** Security
- **AI/LLM Related:** No

**Description:**  
An unauthenticated Remote Code Execution (RCE) vulnerability in OpenSSH’s server (sshd) on glibc-based Linux systems caused by a signal handler race condition. It is a regression bug, meaning a previously patched vulnerability (CVE-2006-5051) was inadvertently reintroduced in OpenSSH version 8.5p1 due to the accidental removal of a critical component.

**Severity:**  
Critical

**Consequences:**  
Grants an attacker full root access to the affected server. Because the vulnerability exists in the default configuration and requires no authentication or user interaction, it poses a severe risk of complete system compromise and unauthorized takeover.

**Solution / Mitigation:**  
Update OpenSSH to version 9.8p1 or newer, which contains the fix for this regression. (Note: Versions earlier than 4.4p1 are also vulnerable unless patched for CVE-2006-5051/CVE-2008-4109, while versions 4.4p1 up to 8.5p1 remain secure).

---

### Defect 03 – CrowdStrike Falcon Sensor Windows Crash (Channel File 291)

- **Year Publicized:** 2024
- **Source Link:** https://www.crowdstrike.com/en-us/blog/falcon-content-update-preliminary-post-incident-report/?utm_source=chatgpt.com
- **Category:** Functional / Stability
- **AI/LLM Related:** No

**Description:**  
A content configuration update (Rapid Response Content) containing a defective InterProcessCommunication (IPC) Template Instance was deployed to Windows hosts. Due to a bug in the Content Validator, this problematic data passed validation checks. When the Falcon sensor's Content Interpreter read the associated Channel File 291, the data triggered an out-of-bounds memory read. The system could not gracefully handle the resulting unexpected exception.

**Severity:**  
Critical

**Consequences:**  
Triggered a widespread Windows operating system crash (Blue Screen of Death / BSOD) for online Windows hosts running Falcon sensor version 7.11 and above between 04:09 UTC and 05:27 UTC on July 19, 2024. Mac and Linux hosts were not impacted.

**Solution / Mitigation:**  

Immediate: The defect in the content update was reverted on July 19, 2024, at 05:27 UTC.

Preventative Measures:

- Testing: Enhance Rapid Response Content testing (fuzzing, fault injection, stability testing, local developer testing).

- Validation: Add new validation checks to the Content Validator to catch problematic content and improve error handling within the Content Interpreter.

- Deployment: Implement a staggered, canary-based rollout strategy for content updates rather than global deployment.

- Customer Control: Provide customers with granular control over when and where Rapid Response Content updates are deployed.

- Auditing: Conduct independent third-party security code and end-to-end quality process reviews.
---

### Defect 04 – ChatGPT Redis-py Asyncio Bug (March 20 Outage)

- **Year Publicized:** 2023
- **Source Link:** https://openai.com/index/march-20-chatgpt-outage/?utm_source=chatgpt.com
- **Category:** Security / Privacy
- **AI/LLM Related:** Yes

**Description:**  
A data leakage vulnerability caused by a bug in the open-source redis-py library used to interface with a Redis Cluster via Asyncio. When a server request was canceled after being pushed to the incoming queue but before the response was popped, the connection pool became corrupted. Subsequent unrelated requests that reused that connection could receive the leftover data. If this corrupted data happened to match the expected data type, the cache would return seemingly valid data that actually belonged to a different user.

**Severity:**  
High

**Consequences:**  
The bug allowed some users to inadvertently see titles and initial messages from other active users' chat histories. More critically, it exposed sensitive payment-related information (first and last name, email, payment address, credit card type, last four digits, and expiration date) of approximately 1.2% of ChatGPT Plus subscribers who were active during a specific nine-hour window via subscription confirmation emails and the account management page.

**Solution / Mitigation:**  
- Immediate: Took the ChatGPT service offline to halt the data leak and prevent further exposure.

- Patch: Identified the underlying issue in the redis-py library and collaborated with Redis maintainers to roll out a patch.

- System Improvements: Added redundant validation checks to ensure data returned by the Redis cache strictly matches the requesting user.

- Monitoring & Infrastructure: Improved logging to easily identify similar anomalies, and enhanced the robustness and scale of the Redis cluster to reduce the likelihood of connection errors under extreme load. Programmatically examined logs to identify and notify the affected users.

---

### Defect 05 – DPD AI Chatbot Swearing & Self-Criticism

- **Year Publicized:** 2024
- **Source Link:** https://www.theguardian.com/technology/2024/jan/20/dpd-ai-chatbot-swears-calls-itself-useless-and-criticises-firm?utm_source=chatgpt.com
- **Category:** AI / LLM / Prompt Injection
- **AI/LLM Related:** Yes

**Description:**  
The delivery firm DPD experienced an issue where their AI-powered online chatbot exhibited completely unrestrained and unprofessional behavior following a recent system update. A disgruntled customer, Ashley Beauchamp, who was frustrated after failing to track down a missing parcel, began experimenting with the bot's prompts to see what it could do. The user successfully bypassed the bot's standard guardrails, prompting it to tell a joke, write a poem criticizing DPD as a terrible company, and eventually use profanity. In one instance, the bot enthusiastically replied, “Fuck yeah! I’ll do my best to be as helpful as possible, even if it means swearing,” and in another, it referred to itself as a “useless Chatbot that can’t help you.”

**Severity:**  
Medium

**Consequences:**  
The incident caused significant reputational embarrassment and negative PR for the company. The customer shared screenshots of the chaotic conversation on X (formerly Twitter), where it quickly went viral, amassing 800,000 views in just 24 hours. While the public found the exchange highly amusing, it underscored a serious issue regarding poorly implemented AI customer service tools that fail to assist users with real problems, leading to highly frustrating and impersonal customer experiences.

**Solution / Mitigation:**  
- Immediate: DPD immediately disabled the specific AI element within the chat that was responsible for the erratic behavior.

- System Fix: The company identified that the error was caused by a recent system update and began working on a patch to restore the AI's guardrails and update the system architecture.

- Customer Resolution: DPD transitioned the support ticket to human operators, manually getting in touch with the customer to finally resolve the original issue regarding his missing parcel.

---

### Defect 06 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 07 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 08 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 09 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 10 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 11 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 12 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 13 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 14 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 15 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 16 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 17 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 18 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 19 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

### Defect 20 – [Defect Name]

- **Year Publicized:** [2022–2026]
- **Source Link:** [Paste source link here]
- **Category:** [Category]
- **AI/LLM Related:** [Yes / No]

**Description:**  
[Brief description.]

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
[Consequences.]

**Solution / Mitigation:**  
[Solution.]

---

## 4. AI/LLM-Related Defects Summary

At least 5 of the 20 defects are related to AI/LLM issues.

| No. | Defect Name | AI/LLM Issue Type | Explanation |
|---|---|---|---|
| [No.] | [Defect Name] | Hallucination / Bias / Prompt Injection / Unsafe Output | [Brief explanation] |
| [No.] | [Defect Name] | Hallucination / Bias / Prompt Injection / Unsafe Output | [Brief explanation] |
| [No.] | [Defect Name] | Hallucination / Bias / Prompt Injection / Unsafe Output | [Brief explanation] |
| [No.] | [Defect Name] | Hallucination / Bias / Prompt Injection / Unsafe Output | [Brief explanation] |
| [No.] | [Defect Name] | Hallucination / Bias / Prompt Injection / Unsafe Output | [Brief explanation] |

---

## 5. AI Bias or Hallucination When Explaining a Defect

### Selected Defect

- **Defect Name:** [Defect Name]
- **AI Tool Used:** [ChatGPT / Gemini / Copilot / Claude / Other]
- **Prompt Used:**  
```text
[Paste the exact prompt used to ask the AI about the defect.]
````

### AI Output Problem

**Problem Type:** [Bias / Hallucination / Incorrect Explanation / Missing Context]

**Problematic AI Response:**

```text
[Paste the incorrect or biased part of the AI response here.]
```

**Why This Is Biased or Hallucinated:**
[Explain why the AI answer is inaccurate, biased, unsupported, or misleading.]

**Correct Explanation Based on Source:**
[Write the correct explanation using reliable sources.]

**Source Used to Verify:**
[Paste source link here]

---

## 6. Conclusion

This report identified 20 software defects publicized between 2022 and 2026. The selected cases include different defect types such as security vulnerabilities, functional failures, service outages, privacy issues, and AI/LLM-related problems. At least 5 defects are connected to AI/LLM issues such as hallucination, prompt injection, bias, or unsafe model behavior.

---

## 7. References

1. [Source title] – [Source link]
2. [Source title] – [Source link]
3. [Source title] – [Source link]
4. [Source title] – [Source link]
5. [Source title] – [Source link]
6. [Source title] – [Source link]
7. [Source title] – [Source link]
8. [Source title] – [Source link]
9. [Source title] – [Source link]
10. [Source title] – [Source link]
11. [Source title] – [Source link]
12. [Source title] – [Source link]
13. [Source title] – [Source link]
14. [Source title] – [Source link]
15. [Source title] – [Source link]
16. [Source title] – [Source link]
17. [Source title] – [Source link]
18. [Source title] – [Source link]
19. [Source title] – [Source link]
20. [Source title] – [Source link]

```
```
