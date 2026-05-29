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

### Defect 06 – ChatGPT Legal Hallucination (Mata v. Avianca)

- **Year Publicized:** 2023
- **Source Link:** https://www.legaldive.com/news/chatgpt-fake-legal-cases-generative-ai-hallucinations/651557/?utm_source=chatgpt.com
- **Category:** AI / LLM / Hallucination
- **AI/LLM Related:** Yes

**Description:**  
A severe case of artificial intelligence hallucination occurred when New York attorney Steven A. Schwartz used ChatGPT to supplement his legal research for a personal injury lawsuit (Roberto Mata v. Avianca) in federal court. The chatbot generated six entirely fabricated judicial decisions, complete with bogus quotes and fake internal citations. Furthermore, when the attorney explicitly asked ChatGPT to confirm if these cases were real or fake, the chatbot doubled down on its hallucination, falsely assuring him that they were authentic and could be found in reputable legal databases like LexisNexis and Westlaw.

**Severity:**  
High / Critical

**Consequences:**  
- Legal & Judicial Impact: The attorney unwittingly submitted a fraudulent legal brief to the U.S. District Court for the Southern District of New York. Judge P. Kevin Castel flagged the filing as an "unprecedented circumstance," leading to a formal hearing for potential court sanctions against the lawyers involved.

- Reputational Damage: The mistake resulted in severe public embarrassment, including a front-page story in The New York Times, severely damaging the reputation of the involved lawyers and their firm.

- Industry Backlash: The incident created widespread fear and a negative mindset among legal professionals, threatening to deter the safe and adoption of legitimate AI-powered technologies in legal workflows.

**Solution / Mitigation:**  
- Mandatory Independent Verification: Legal professionals must strictly follow the rule of independent verification ("Verify, verify, verify!"). Attorneys must manually cross-check any case, quote, or citation generated by an LLM against verified legal databases before submitting them to a court.

- Proper Tool Utilization: General-purpose LLMs like ChatGPT should only be treated as a helpful starting point, "first pass," or "first draft" tool rather than an absolute source of truth for specialized domain knowledge.

- Adoption of Domain-Specific Tech: The legal industry should pivot toward specialized legal tech tools engineered by established vendors who tune their generative AI solutions specifically for law-related use cases, provide verified accuracy rates, and build explicit warnings into the user workflow.

- Professional Education: Attorneys must educate themselves on how generative AI models function, explicitly understanding their inherent risks, limitations, and tendency to generate false information.

---

### Defect 07 – Gemini Image Generation Overcompensation & Bias (Imagen 2)
- **Year Publicized:** 2024
- **Source Link:** https://blog.google/products-and-platforms/products/gemini/gemini-image-generation-issue/?utm_source=chatgpt.com
- **Category:** AI / LLM / Bias
- **AI/LLM Related:** Yes

**Description:**  
When Google launched its image generation feature for the Gemini app (built on the Imagen 2 model), it tuned the model to ensure it displayed a diverse range of people to avoid past AI pitfalls. However, this tuning failed to account for contexts where diversity is historically or logically inaccurate (such as specific historical figures). Furthermore, the model grew overly conservative over time, wrongly interpreting harmless prompts as sensitive and refusing to generate images for them. This overcompensation led the AI to force diversity into inappropriate contexts or refuse valid prompts entirely.

**Severity:**  
High

**Consequences:**  
The AI generated highly inaccurate, embarrassing, and sometimes offensive images (e.g., forced diversity in historically specific settings like the US Founding Fathers). It also sparked widespread public backlash and accusations of internal bias, severely damaging user trust in the model's reliability and objectivity.

**Solution / Mitigation:**  
- Immediate: Google acknowledged the mistake, apologized, and temporarily paused Gemini's ability to generate images of people entirely.
- System Fixes: Google committed to significantly improving the model's tuning so it can accurately reflect prompts that require a specific type of person or historical context without forcing a range of diversity.
- Testing & Guidance: The company promised extensive testing before reactivating the feature and explicitly reminded users that Gemini is a creativity/productivity tool, recommending they rely on Google Search for factual, high-quality information regarding historical or current events.  
---

### Defect 08 – NYC MyCity Chatbot (Legal & Policy Misinformation)

- **Year Publicized:** 2024
- **Source Link:** https://apnews.com/article/new-york-city-chatbot-misinformation-6ebc71db5b770b9969c906a7ee4fae21
- **Category:** Hallucination / misinformation
- **AI/LLM Related:** Yes

**Description:**  
NYC’s MyCity chatbot was an AI-powered chatbot launched by New York City in October 2023 as a “one-stop shop” to help small business owners understand city rules, regulations, and administrative procedures. However, in 2024, the chatbot was publicly criticized after it was found giving incorrect, misleading, and sometimes illegal advice. For example, it falsely suggested that an employer could fire a worker for complaining about sexual harassment, not disclosing a pregnancy, or refusing to cut their dreadlocks. It also gave wrong information about city waste policies, such as saying businesses could put trash in black garbage bags and were not required to compost. In one extreme example, the chatbot even claimed that a restaurant could serve cheese that had been bitten by a rat, as long as customers were informed about the situation.

**Severity:**  
High

**Consequences:**  
The consequences of this defect were serious because the chatbot was hosted on an official government website, meaning users might trust its answers as reliable guidance from New York City. If small business owners followed the chatbot’s false advice, they could violate labor laws, anti-discrimination rules, workplace protection policies, health regulations, food safety standards, and city sanitation requirements. This could expose businesses to lawsuits, fines, regulatory penalties, customer safety risks, and reputational damage. Workers could also be harmed if employers relied on the chatbot’s misinformation to justify illegal actions such as firing employees for protected complaints, pregnancy-related reasons, or hairstyle discrimination. The incident also damaged public trust in government AI systems and showed the danger of deploying LLM-based chatbots without strong testing, legal review, and guardrails. Experts quoted in the report warned that government-backed AI tools carry higher stakes because citizens and businesses tend to place more trust in public-sector information.

**Solution / Mitigation:**  
The chatbot should be restricted to verified official city documents, tested thoroughly before public release, and monitored by legal/policy experts. It should provide source citations for every answer, refuse to answer legal questions when uncertain, and clearly redirect users to official agencies or human support for high-risk topics. The city should also add stronger guardrails and temporarily disable unsafe responses until accuracy is validated.

---

### Defect 09 – Air Canada Chatbot (Bereavement Fare Misinformation)

- **Year Publicized:** 2024
- **Source Link:** https://www.theguardian.com/world/2024/feb/16/air-canada-chatbot-lawsuit?utm_source=chatgpt.com
- **Category:** AI Chatbot / Customer Service Policy Misinformation
- **AI/LLM Related:** Yes

**Description:**  
Air Canada used a chatbot on its website to answer customer questions about airline policies. In this case, a customer named Jake Moffatt asked the chatbot about bereavement fares because he needed to travel to attend a family member’s funeral. The chatbot told him that he could buy a ticket first and then apply for a bereavement fare refund within 90 days after the ticket was issued.

Based on this information, Moffatt bought full-price tickets. However, when he later submitted the refund request, Air Canada refused to give him the bereavement fare discount. The airline said that bereavement fares could not be applied after travel had already been completed. This showed that the chatbot had provided misleading information that contradicted Air Canada’s real policy.

This defect is related to AI/LLM because the chatbot acted as an automated customer service tool and generated incorrect policy guidance. The problem was not just a small wording mistake; the chatbot gave advice that directly influenced the customer’s purchasing decision.

**Severity:**  
High

**Consequences:**  
The main consequence was financial harm to the customer. Moffatt paid more money for his flight because he trusted the chatbot’s answer and believed he could receive a refund later. When Air Canada refused the refund, he had to take legal action to recover the fare difference.

The case also created legal consequences for Air Canada. The airline argued that the chatbot was responsible for its own actions, but the tribunal rejected this argument. The tribunal stated that the chatbot was part of Air Canada’s website, so Air Canada was responsible for the information it provided. As a result, Air Canada was ordered to pay the customer C$650.88 for the fare difference, C$36.14 in pre-judgment interest, and C$125 in fees.

This incident also damaged Air Canada’s reputation. It showed that customers may be misled when companies use automated chatbots without enough supervision. It also raised an important issue: companies cannot avoid responsibility by blaming the chatbot when the chatbot gives wrong information to customers.

**Solution / Mitigation:**  
Air Canada should improve the chatbot by connecting it only to verified and updated company policy documents. The chatbot should not be allowed to generate answers about refunds, fare rules, legal rights, or customer compensation unless the answer is clearly supported by official policy.

For sensitive cases such as bereavement travel, cancellations, refunds, and compensation, the chatbot should provide a direct link to the official policy page and recommend that the customer contact a human support agent before making a purchase. This would reduce the risk of customers making financial decisions based on incorrect chatbot answers.

The company should also test the chatbot regularly using real customer scenarios. High-risk chatbot responses should be reviewed by customer service and legal teams. If the chatbot gives uncertain or conflicting information, it should clearly say that it cannot confirm the answer instead of giving misleading advice. Most importantly, Air Canada should accept responsibility for the information provided by its chatbot because the chatbot is part of the company’s customer service system.

---

### Defect 10 – Google Bard Chatbot (Incorrect Answer in Promotional Advertisement)

- **Year Publicized:** 2023
- **Source Link:** https://www.reuters.com/technology/google-ai-chatbot-bard-offers-inaccurate-information-company-ad-2023-02-08/?utm_source=chatgpt.com
- **Category:** AI/LLM Chatbot Defect – Hallucination / Factual Inaccuracy
- **AI/LLM Related:** Yes

**Description:**  
Google introduced its AI chatbot Bard as a competitor to ChatGPT and promoted it through an online advertisement. In the promotional video, Bard was asked: “What new discoveries from the James Webb Space Telescope can I tell my 9-year-old about?” Bard answered that the James Webb Space Telescope was used to take the first pictures of a planet outside Earth’s solar system, also known as an exoplanet.

However, this answer was factually incorrect. The first images of exoplanets were not taken by the James Webb Space Telescope. They were taken in 2004 by the European Southern Observatory’s Very Large Telescope. This means Bard produced a hallucinated or inaccurate answer in an official Google advertisement. The error was especially serious because it appeared during Google’s public promotion of Bard, at a time when Google was trying to show that it could compete with Microsoft and OpenAI in the AI chatbot market.

**Severity:**  
[Low / Medium / High / Critical]

**Consequences:**  
The defect caused major reputational and financial damage to Google’s parent company, Alphabet. After the inaccurate answer was reported, Alphabet lost about $100 billion in market value, and its shares dropped as much as 9% during regular trading. This showed that even one visible factual error in an AI product demonstration can strongly affect investor confidence, especially when the company is presenting the product as part of its future AI strategy.

The incident also damaged public trust in Bard’s reliability. Since the mistake appeared in an official advertisement rather than in a private test, it suggested that the chatbot’s responses had not been checked carefully enough before being published. The error made Google look rushed in its attempt to compete with Microsoft’s AI-powered Bing and OpenAI’s ChatGPT. It also highlighted a broader risk of LLM-based systems: they can generate confident-sounding answers that are wrong, especially when answering factual questions.

**Solution / Mitigation:**  
Google should apply a stricter review process before using AI-generated answers in advertisements, demos, or official product announcements. Any factual claim made by Bard in public promotional material should be verified by human experts before publication. This is especially important for scientific, historical, legal, medical, or financial information, where incorrect answers can seriously damage trust.

Bard should also be improved with stronger grounding in reliable sources. For factual questions, the chatbot should cite trusted references or retrieve information from verified databases instead of generating answers only from its language model. If the system is uncertain, it should clearly say that it may not know the answer instead of presenting incorrect information confidently.

Google also stated that it would combine external feedback with internal testing through a Trusted Tester program. This kind of testing should be expanded so that users, experts, and internal reviewers can identify hallucinations before the chatbot is widely released. Overall, the key mitigation is to combine AI-generated responses with human review, source verification, factual grounding, and careful testing before public deployment.

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
