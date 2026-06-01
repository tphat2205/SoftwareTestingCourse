# Requirement 2 – 20 Software Defects 2022–2026

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
| 1 | Service Control Null Pointer Crash & Global API Outage | 2025 | Functional / Performance | No |
| 2 | regreSSHion (CVE-2024-6387) | 2024 | Security | No |
| 3 | CrowdStrike Falcon Sensor Windows Crash (Channel File 291) | 2024 | Functional / Stability | No |
| 4 | ChatGPT Redis-py Asyncio Bug (March 20 Outage) | 2023 | Security / Privacy | Yes |
| 5 | DPD AI Chatbot Swearing & Self-Criticism | 2024 | AI / LLM / Prompt Injection | Yes |
| 6 | ChatGPT Legal Hallucination (Mata v. Avianca) | 2023 | AI / LLM / Hallucination | Yes |
| 7 | Gemini Image Generation Overcompensation & Bias (Imagen 2) | 2024 | AI / LLM / Bias | Yes |
| 8 | NYC MyCity Chatbot (Legal & Policy Misinformation) | 2024 | Hallucination / Misinformation | Yes |
| 9 | Air Canada Chatbot (Bereavement Fare Misinformation) | 2024 | AI Chatbot / Customer Service Policy Misinformation | Yes |
| 10 | Google Bard Chatbot (Incorrect Answer in Promotional Advertisement) | 2023 | AI/LLM Chatbot Defect – Hallucination / Factual Inaccuracy | Yes |
| 11 | 7-Zip Heap Buffer Write Overflow Vulnerability | 2026 | Memory Safety Vulnerability / Heap Buffer Overflow / Arbitrary Code Execution | No |
| 12 | Universal Robots PolyScope 5 Command Injection Vulnerability | 2026 | Industrial Robot Cybersecurity Vulnerability / Command Injection / Remote Code Execution | No |
| 13 | Microsoft SharePoint Server Zero-Day Vulnerability | 2025 | Cybersecurity Vulnerability / Zero-Day Exploit / Remote Server Compromise | No |
| 14 | Apple ImageIO Zero-Day Vulnerability | 2025 | Cybersecurity Vulnerability / Zero-Day Exploit / Memory Corruption | No |
| 15 | Docker Desktop Local Container Access to Docker Engine API | 2025 | Container Security Vulnerability / Docker Desktop / Local Container Access / Docker Engine API Exposure | No |
| 16 | Hyundai Software Brake Issue Recall | 2026 | Automotive Software Defect / Safety Recall | No |
| 17 | Ghost CMS SQL Injection Vulnerability | 2026 | Web Application Vulnerability / SQL Injection / CMS Security | No |
| 18 | GitHub Merge Queue Incorrect Merge Commits | 2026 | Source Code Management Defect / Merge Queue Regression / Code Integrity Issue | No |
| 19 | AWS DynamoDB DNS Automation Bug Causing Major AWS Outage | 2025 | Cloud Infrastructure Defect / DNS Automation Bug / Service Outage | No |
| 20 | Cloudflare Bot Management Feature File Bug Causing Internet Outage | 2025 | Cloud Infrastructure Defect / Configuration File Bug / Internet Outage | No |

---

## 3. Detailed Software Defects

### Defect 01 – Service Control Null Pointer Crash & Global API Outage

- **Year Publicized:** 2025
- **Source Link:** https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW
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
- **Source Link:** https://www.qualys.com/regresshion-cve-2024-6387
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
- **Source Link:** https://www.crowdstrike.com/en-us/blog/falcon-content-update-preliminary-post-incident-report
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
- **Source Link:** https://openai.com/index/march-20-chatgpt-outage
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
- **Source Link:** https://www.theguardian.com/technology/2024/jan/20/dpd-ai-chatbot-swears-calls-itself-useless-and-criticises-firm
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
- **Source Link:** https://www.legaldive.com/news/chatgpt-fake-legal-cases-generative-ai-hallucinations/651557
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
- **Source Link:** https://blog.google/products-and-platforms/products/gemini/gemini-image-generation-issue
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
- **Source Link:** https://www.theguardian.com/world/2024/feb/16/air-canada-chatbot-lawsuit
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
- **Source Link:** https://www.reuters.com/technology/google-ai-chatbot-bard-offers-inaccurate-information-company-ad-2023-02-08
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

### Defect 11 – 7-Zip Heap Buffer Write Overflow Vulnerability

- **Year Publicized:** 2026
- **Source Link:** https://securitylab.github.com/advisories/GHSL-2026-140_7-Zip
- **Category:** Memory Safety Vulnerability / Heap Buffer Overflow / Arbitrary Code Execution
- **AI/LLM Related:** No

**Description:**  
A serious heap buffer overflow vulnerability was found in 7-Zip version 26.00. The vulnerability is related to how 7-Zip handles NTFS compressed streams inside crafted NTFS disk images. In the vulnerable code, 7-Zip calculates the buffer size for an NTFS compression unit using a 32-bit shift operation. When an attacker creates a specially crafted NTFS image with certain values, the shift operation becomes undefined behavior in C++. As a result, 7-Zip may allocate only a 1-byte buffer instead of the much larger buffer that is actually needed.

After that, 7-Zip attempts to read a large amount of compressed data into this tiny buffer. According to the report, up to 256 MB of attacker-controlled data can be written into a 1-byte heap buffer. This creates a heap buffer overflow. The overflow can corrupt nearby objects in memory, including a stream object’s virtual table pointer, which may allow an attacker to hijack program execution. The vulnerability is tracked as CVE-2026-48095 and GHSL-2026-140.

**Severity:**  
High

**Consequences:**  
The consequences are serious because this vulnerability can potentially lead to arbitrary code execution or application crashes. If a victim opens, tests, or extracts a malicious crafted image file using a vulnerable version of 7-Zip, the attacker may be able to overwrite memory with controlled data. The report explains that the overflow can overwrite a nearby object’s vtable pointer, which is a classic vtable hijacking technique. This means the attacker may be able to redirect program execution and run malicious code under the privileges of the user running 7-Zip.

The attack surface is also broader than just files ending in .ntfs or .img. 7-Zip uses signature-based fallback detection, so a crafted NTFS image may still be processed by the NTFS handler even if it has another extension such as .7z, .zip, .rar, or no extension. This makes the vulnerability more dangerous because users may not realize that a file with a normal-looking archive extension is actually a crafted NTFS image. The vulnerability requires user interaction, but only at the level of opening, testing, or extracting the malicious file.

**Solution / Mitigation:**  
The main mitigation is to update 7-Zip to version 26.01 or later, because version 26.01 was released with a fix shortly after the report was delivered. Users and organizations should avoid using 7-Zip version 26.00 or older affected versions when opening untrusted archives or disk images. Systems that process uploaded archives automatically should also update immediately, because server-side extraction of malicious files could expose the system to crashes or possible code execution.

From a development perspective, the buffer size calculation should be fixed by avoiding unsafe 32-bit shift operations and by validating shift values before using them. The program should reject NTFS images with invalid or dangerous compression parameters, such as values that cause the shift exponent to reach or exceed the width of the integer type. The software should also add bounds checking before reading compressed data into memory, so that the amount of data written never exceeds the allocated buffer size. Additional testing tools such as UndefinedBehaviorSanitizer, AddressSanitizer, and fuzzing should be used to detect similar memory safety problems before release.

---

### Defect 12 – Universal Robots PolyScope 5 Command Injection Vulnerability

- **Year Publicized:** 2026
- **Source Link:** https://www.techradar.com/pro/security/security-of-your-network-is-essential-to-security-of-your-robot-industrial-robots-targeted-by-malware-which-could-open-them-up-to-hacking-is-this-how-the-revolution-begins
- **Category:** Industrial Robot Cybersecurity Vulnerability / Command Injection / Remote Code Execution
- **AI/LLM Related:** No

**Description:**  
A critical command injection vulnerability was discovered in Universal Robots PolyScope 5, the operating system used to control the company’s collaborative robots. The vulnerability is tracked as CVE-2026-8153 and has a CVSS score of 9.8, which means it is considered critical. It affects all PolyScope 5 versions before version 5.25.1.

The issue exists in the robot’s Dashboard Server. This server accepts user-controlled input from the network, but it does not properly remove or neutralize special command characters before passing that input to the underlying operating system. Because of this, an unauthenticated attacker who can reach the Dashboard Server network port can craft malicious input and inject operating system commands. These commands may then be executed directly on the robot controller with high privileges.

This defect is especially dangerous because it affects industrial robots, not just normal software applications. If exploited, the attacker could gain control over the robot controller and interfere with the confidentiality, integrity, and availability of the robot system.

**Severity:**  
Critical

**Consequences:**  
The main consequence is complete compromise of the robot controller. An attacker could potentially execute arbitrary commands on the robot’s operating system, which could allow them to change settings, disrupt operations, steal data, or interfere with the robot’s behavior. Since these robots are used in industrial environments, the impact could go beyond data loss and may affect physical safety.

If a compromised workstation exists on the same factory network, the attacker could use it to reach the robot’s Dashboard Server if the network is not properly segmented. In that situation, the attacker would not need direct internet access to the robot. They would only need network access from inside the factory or corporate network.

This creates serious risks for factories using collaborative robots near human workers. A hacked robot could behave unpredictably because it would be controlled by an attacker instead of its legitimate operator. This could cause production downtime, damage to equipment, unsafe robot movements, or possible injury to nearby personnel. Even though there was no known public exploitation reported at the time of disclosure, the vulnerability is still serious because the exploitation conditions are realistic in many industrial environments.

**Solution / Mitigation:**  
Universal Robots released a patch in PolyScope 5.25.1, so the most important mitigation is to update all affected systems to version 5.25.1 or newer as soon as possible. The patch only protects systems after it is actually installed, so organizations should not delay the update.

In addition to patching, companies should make sure that robot controllers are not directly accessible from the internet. The Dashboard Server should only be enabled when necessary, and its network port should be blocked from untrusted networks. Industrial robots should be placed in a segmented network zone so that ordinary office computers, guest devices, or compromised workstations cannot directly communicate with robot control ports.

Organizations should also apply firewall rules, access control lists, VPN restrictions, and monitoring for unusual commands or network traffic going to robot controllers. Security teams should regularly audit which robots are reachable on the network and disable unnecessary services. Since Universal Robots warned that “security of your network is essential to security of your robot,” network isolation and strict access control are essential protections alongside software updates.

---

### Defect 13 – Microsoft SharePoint Server Zero-Day Vulnerability

- **Year Publicized:** 2025
- **Source Link:** https://apnews.com/article/microsoft-sharepoint-zero-point-vulnerability-65ebcae88267e1aa375013adaa283765
- **Category:** Cybersecurity Vulnerability / Zero-Day Exploit / Remote Server Compromise
- **AI/LLM Related:** No

**Description:**  
A serious zero-day vulnerability was discovered and actively exploited in Microsoft SharePoint Server, a widely used platform for document management, internal collaboration, and data organization in companies and government agencies. A zero-day vulnerability means that attackers were already exploiting the flaw before a complete fix was available, giving defenders very little time to respond.

According to the report, the vulnerability affected on-premise SharePoint servers, meaning SharePoint systems hosted directly by businesses or organizations. Microsoft’s cloud-based SharePoint Online service was not affected. The exploit was described by CISA as a variant of CVE-2025-49706 and was reportedly known as “ToolShell.” Security researchers warned that the vulnerability could allow attackers to gain broad access to SharePoint file systems and possibly connected services such as Microsoft Teams and OneDrive.

Microsoft issued an emergency fix after confirming that the vulnerability was being used in real attacks. The company first released guidance and patches for SharePoint Server 2019 and SharePoint Server Subscription Edition, while engineers were still working on a fix for the older SharePoint Server 2016 version at the time of the report.

**Severity:**  
Critical

**Consequences:**  
The consequences of this defect were serious because SharePoint is commonly used to store internal business documents, government files, school records, hospital information, and enterprise collaboration data. If attackers successfully exploited the vulnerability, they could potentially access sensitive files, compromise connected services, and move deeper into an organization’s internal network.

The impact was especially concerning for organizations running on-premise SharePoint servers, including government agencies, schools, healthcare organizations, hospitals, and large enterprises. These environments often contain confidential records and critical operational data. A successful attack could lead to data theft, service disruption, unauthorized access, and long-term compromise of internal systems.

Cybersecurity firms reported that attacks likely began around July 18, 2025, and scans of thousands of SharePoint servers found that at least dozens of systems had already been compromised. CISA also warned that the impact could be widespread. Because the vulnerability was actively exploited before all patches were fully available, affected organizations faced immediate risk and had to respond quickly.

**Solution / Mitigation:**  
The first and most important mitigation is to immediately apply Microsoft’s emergency patches and follow Microsoft’s official security guidance for affected SharePoint Server versions. Organizations using SharePoint Server 2019 or SharePoint Server Subscription Edition should update as soon as possible. Organizations using SharePoint Server 2016 should follow Microsoft’s temporary guidance while waiting for or applying the available fix.

CISA recommended that affected SharePoint servers should be disconnected from the internet until they are patched. This is important because internet-exposed on-premise SharePoint servers are the most vulnerable targets. As an emergency temporary measure, organizations should block external access to SharePoint servers if patching cannot be completed immediately.

Organizations should also rotate cryptographic materials, such as keys, certificates, and secrets, because security researchers warned that attackers may be able to maintain access or bypass future patching. In addition, companies should perform incident response checks to determine whether their SharePoint servers were already compromised before the patch was applied.

Long-term mitigation should include reducing public exposure of SharePoint servers, using network segmentation, monitoring suspicious activity, keeping server software updated, and preparing a rapid patch management process for future zero-day vulnerabilities. For high-risk organizations such as government, healthcare, education, and large enterprises, professional incident response support should be considered if there are signs of compromise.

---

### Defect 14 – Apple ImageIO Zero-Day Vulnerability

- **Year Publicized:** 2025
- **Source Link:** https://op-c.net/blog/cve-2025-43300-apple-imageio-zero-day-exploited
- **Category:** Cybersecurity Vulnerability / Zero-Day Exploit / Memory Corruption
- **AI/LLM Related:** No

**Description:**  
CVE-2025-43300 is a zero-day vulnerability in Apple’s ImageIO framework. ImageIO is used system-wide on Apple devices to read and write many image formats. Because this framework is used across iOS, iPadOS, and macOS, the vulnerability could affect multiple Apple products.

The defect happens when a device opens or previews a malicious image. Processing that image can corrupt memory, and depending on exploit reliability, it may allow code execution. Apple acknowledged that this vulnerability had already been exploited in the wild in an “extremely sophisticated attack” targeting selected individuals.

Apple released patches for this vulnerability on August 20, 2025. The vulnerability was then added to CISA’s Known Exploited Vulnerabilities catalog on August 21, 2025, increasing the urgency for government agencies and enterprises to apply the fixes.

**Severity:**  
Critical

**Consequences:**  
This vulnerability is serious because it was already being exploited in targeted attacks before many users had patched their devices. Since the attack can happen through a malicious image, the required user interaction may be low. A victim may be exposed simply by opening or previewing a specially crafted image.

If the exploit succeeds, memory corruption could occur and may allow code execution on the affected device. This creates a high risk for selected high-value targets, such as executives, journalists, legal teams, incident response staff, or people who handle sensitive negotiations and information. These users are more likely to be targeted by well-resourced threat actors.

For enterprises, the vulnerability creates an urgent patching problem because affected devices may belong to important users or staff with access to sensitive information. Since CISA added CVE-2025-43300 to the Known Exploited Vulnerabilities catalog, organizations were required to apply the relevant patches by September 11, 2025.

**Solution / Mitigation:**  
The main solution is to update affected Apple devices to the fixed versions or later. Users should update to at least the following versions: iOS 18.6.2, iPadOS 18.6.2 for current devices, iPadOS 17.7.10 for older supported iPads, macOS Sequoia 15.6.1, macOS Sonoma 14.7.8, or macOS Ventura 13.7.8.

Organizations should enforce these updates through MDM or patch management tools. They should create smart groups for devices running versions below the fixed builds and alert daily on non-compliant devices. For VIP or high-risk users, patching should be completed as quickly as possible, ideally within 48 to 72 hours or sooner.

Security teams should also monitor macOS devices for crashes in ImageIO-linked processes, because such crashes may indicate exploit attempts. Crash logs and Unified Logs should be collected for forensic analysis if suspicious activity is found.

As a temporary user-awareness measure, high-risk users should be advised not to open or forward unexpected images and to update immediately. However, the most important mitigation remains fast patching and full compliance tracking across all affected Apple devices.
---

### Defect 15 – Docker Desktop Local Container Access to Docker Engine API

- **Year Publicized:** 2025
- **Source Link:** https://socprime.com/blog/cve-2025-9074-docker-desktop-vulnerability
- **Category:** Container Security Vulnerability / Docker Desktop / Local Container Access / Docker Engine API Exposure
- **AI/LLM Related:** No

**Description:**  
CVE-2025-9074 is a critical vulnerability in Docker Desktop. The vulnerability allows locally running Linux containers to connect to the Docker Engine API through the default subnet 192.168.65.7:2375. According to the provided report, the issue still exists regardless of Enhanced Container Isolation settings or TCP exposure settings.

The flaw allows malicious containers running inside Docker Desktop to directly interact with the Docker Engine. This can happen even when the Docker socket is not mounted into the container. Because the Docker Engine controls container operations, this vulnerability gives a malicious container a way to perform actions that it normally should not be able to perform.

If exploited, attackers could run privileged API commands through the Docker Engine API. These actions could include controlling existing containers, creating new containers, and managing Docker images. In some cases, especially when Docker Desktop for Windows is running on a WSL backend, the vulnerability could also allow host drives to be mounted with the same permissions as the Docker Desktop user.

**Severity:**  
Critical

**Consequences:**  
The vulnerability creates serious risks to confidentiality, integrity, and availability. A malicious container could interact directly with the Docker Engine API and perform sensitive actions without needing the Docker socket to be mounted. This breaks an important security boundary because containers should not be able to control the Docker Engine unless explicitly allowed.

If attackers exploit this vulnerability, they may be able to control containers, create new containers, or manage images. This could lead to unauthorized changes in the Docker environment, disruption of services, exposure of sensitive data, or abuse of Docker Desktop as a stepping stone for further compromise.

The risk is broader in specific environments such as Docker Desktop for Windows using a WSL backend. In that scenario, the flaw may allow host drives to be mounted with the same permissions as the Docker Desktop user. This increases the potential impact because access may extend beyond container resources and affect files on the host system.

The report states that no proof-of-concept exploit or active exploitation had been observed at the time. However, the vulnerability is still critical because Docker is widely used in enterprise infrastructure, CI/CD pipelines, microservices, and cloud-native development environments. A single unpatched Docker flaw can create a large security risk in modern software environments.

**Solution / Mitigation:**  
The main mitigation is to upgrade Docker Desktop immediately to version 4.44.3 or later. Updated Docker Desktop packages are available for multiple platforms, including Windows, Windows ARM, macOS Apple Silicon, macOS Intel, Debian, RPM-based distributions, and Arch Linux.

Organizations should apply consistent patch management so that vulnerable Docker Desktop installations are updated quickly. Enterprise administrators should check developer machines and environments that use Docker Desktop to confirm that they are running version 4.44.3 or newer.

Security teams should also monitor for unusual Docker activity, such as unexpected container creation, suspicious Docker Engine API usage, or abnormal image management actions. Since the vulnerability allows containers to interact with Docker Engine through the default subnet, organizations should treat untrusted local containers as a possible security risk until Docker Desktop has been patched.

Long-term mitigation should include proactive monitoring, timely patching, and stronger defense practices for container environments. Because Docker is an important part of modern software infrastructure, vulnerabilities in Docker Desktop should be handled quickly to reduce the chance of supply-chain attacks, data leaks, or host-related compromise.

---

### Defect 16 – Hyundai Software Brake Issue Recall

- **Year Publicized:** 2026
- **Source Link:** https://www.reuters.com/legal/litigation/hyundai-recall-over-421000-us-vehicles-over-software-brake-issue-nhtsa-says-2026-05-22/?utm_source=chatgpt.com
- **Category:** Automotive Software Defect / Safety Recall  
- **AI/LLM Related:** No

**Description:**  
Hyundai Motor recalled 421,078 vehicles in the United States because of a software error in the front camera system. The recall affects certain 2025–2026 Santa Cruz, Tucson, Tucson Hybrid, and Tucson Plug-In Hybrid Electric vehicles. According to NHTSA, the software error may cause the forward collision avoidance system to activate too early and apply the brakes unexpectedly.

**Severity:**  
High

**Consequences:**  
The unexpected braking can increase the risk of a crash because the driver or vehicles behind may not be prepared for sudden braking. The issue is serious because it affects an important safety system and involves a large number of vehicles in the U.S.

**Solution / Mitigation:**  
Hyundai dealers will update the front camera software at no cost. Owners of affected vehicles should follow the recall notice and bring their vehicles to an authorized dealer for the software update.

---

### Defect 17 – Ghost CMS SQL Injection Vulnerability

- **Year Publicized:** 2026
- **Source Link:** https://thehackernews.com/2026/05/ghost-cms-cve-2026-26980-exploited-to.html
- **Category:** Web Application Vulnerability / SQL Injection / CMS Security
- **AI/LLM Related:** No

**Description:**  
A critical SQL injection vulnerability was found in Ghost CMS, tracked as CVE-2026-26980. The vulnerability was reportedly exploited to inject malicious JavaScript into Ghost CMS websites. This malicious code was used as part of a ClickFix campaign affecting more than 700 websites.

The attack involved hijacking affected websites and using them to trick visitors through fake CAPTCHA or fake “fix” instructions. These tricks were used to convince users to run malware.

**Severity:**  
Critical

**Consequences:**  
Affected websites could be hijacked and used to deliver malicious JavaScript to visitors. Users visiting compromised sites could be misled by fake CAPTCHA or fake repair instructions and may end up running malware.

The vulnerability could also expose sensitive database information, including user accounts and site content. This creates risks for both website owners and visitors because attackers may abuse the compromised site and its data.

**Solution / Mitigation:**  
Website administrators should update Ghost CMS to version 6.19.1 or newer. They should also check admin logs and API logs to look for signs of exploitation or suspicious activity related to this vulnerability.

---

### Defect 18 – GitHub Merge Queue Incorrect Merge Commits

- **Year Publicized:** 2026
- **Source Link:** https://www.githubstatus.com/incidents/zsg1lk7w13cf
- **Category:** Source Code Management Defect / Merge Queue Regression / Code Integrity Issue
- **AI/LLM Related:** No

**Description:**  
On April 23, 2026, GitHub Pull Requests service had a regression affecting merge queue with squash merge. When a merge group contained more than one pull request, GitHub could create an incorrect merge commit.

This defect affected the correctness of the merge process. Instead of producing the expected final commit, the merge queue could generate a wrong commit and affect the state of the main branch.

**Severity:**  
High

**Consequences:**  
The issue affected the integrity of source code. Incorrect merge commits could accidentally revert changes that had already been merged earlier. This could cause code loss, unexpected behavior, or leave the main branch in an incorrect state.

Teams relying on GitHub merge queue during the affected period could have merged code that did not accurately represent the intended pull request changes.

**Solution / Mitigation:**  
Teams should audit all merges made between 16:05 and 20:43 UTC on April 23, 2026. If incorrect commits are found, they should be reverted or fixed manually.

Projects affected by the bug should temporarily pause merge queue usage until the issue is resolved or verified safe. Teams should also check the main branch history to ensure that no previously merged changes were unintentionally reverted.

---

### Defect 19 – AWS DynamoDB DNS Automation Bug Causing Major AWS Outage

- **Year Publicized:** 2025
- **Source Link:** https://www.theguardian.com/technology/2025/oct/24/amazon-reveals-cause-of-aws-outage
- **Category:** Cloud Infrastructure Defect / DNS Automation Bug / Service Outage
- **AI/LLM Related:** No

**Description:**  
In October 2025, AWS experienced a major outage caused by a bug in its automated DNS management system related to DynamoDB. The bug created an empty DNS record in the US-East-1 region. Because many AWS services and external platforms depend on AWS infrastructure, the DNS issue caused widespread service disruption.

**Severity:**  
Critical

**Consequences:**  
The outage affected more than 2,000 services. Impacted services included messaging applications, banking services, smart devices, and many other online platforms. This made the defect serious because it affected large-scale cloud infrastructure and disrupted many dependent systems.

**Solution / Mitigation:**  
AWS disabled the automation tool that caused the faulty DNS record. AWS also added safeguards to prevent similar DNS automation errors from happening again in the future.

---

### Defect 20 – Cloudflare Bot Management Feature File Bug Causing Internet Outage

- **Year Publicized:** 2025
- **Source Link:** https://blog.cloudflare.com/18-november-2025-outage
- **Category:** Cloud Infrastructure Defect / Configuration File Bug / Internet Outage
- **AI/LLM Related:** No

**Description:**  
On November 18, 2025, Cloudflare experienced an outage caused by a bug in the logic that generated a feature file for its Bot Management system. A database permission change caused the feature file to be generated with an abnormally large size. This abnormal file was then propagated across Cloudflare’s network, leading to service disruption.

**Severity:**  
Critical

**Consequences:**  
The outage affected many major websites and online services. Services such as X, ChatGPT, Downdetector, and other platforms experienced access errors or interruptions. Cloudflare confirmed that the incident was not caused by a cyberattack, but by an internal system error.

**Solution / Mitigation:**  
Cloudflare deployed a fix and rolled back or controlled the abnormal feature file. The company also improved validation to prevent abnormal configuration or feature files from being propagated across the entire network again.
---

## 5. AI Bias or Hallucination When Explaining a Defect

**Defect Name:** McDonald’s Global Technology System Outage 2024

**Description:**
On March 15, 2024, McDonald’s experienced a global technology system outage. According to McDonald’s,the issue was caused by a third-party provider during a configuration change, not by a cybersecurity attack.

- **AI Tool Used:** Copilot - GPT-5 mini

- **Prompt Used:**  
```text
Was the McDonald’s global outage in March 2024 caused by a cyberattack or Google Cloud migration? Explain the defect.
````

### AI Output Problem

**Problem Type:** Hallucination / Incorrect Explanation

**Problematic AI Response:**

```text
Short answer: it was not a cyberattack — McDonald’s said the outage was caused by a Google Cloud migration/configuration change.  

What happened (concise defect explanation)
- Root cause type: a cloud configuration/deployment defect (availability/regression), not an intrusion.  
- Symptom: restaurant point‑of‑sale and digital ordering systems lost connectivity to McDonald’s cloud back end, preventing transactions and orders.  
- Technical nature (summary): a change made during/for the Google Cloud migration changed network/authentication/config settings so POS devices couldn’t reach or authenticate with the service (a deployment/ops error that broke service dependencies).  
- Evidence: McDonald’s and Google Cloud publicly said it was not due to a cyberattack and pointed to the cloud change as the cause; news coverage reported the same.  
- Fix/mitigation directions: roll back the change, restore proper network/auth configs, add stronger pre‑deploy testing, change‑validation, and safer rollout controls (feature flags, staged canaries, runbooks).

If you want, I can fetch the official statements and news articles and paste short excerpts with links.
```

**Why This Is Biased or Hallucinated:**
McDonald’s said the outage was caused by a Google Cloud migration/configuration change. Technical nature: a change made during/for the Google Cloud migration changed network/authentication/config settings so POS devices couldn’t reach or authenticate with the service.

**Correct Explanation Based on Source:**
McDonald’s global technology outage in March 2024 was caused by a third-party technology provider during a configuration change. McDonald’s stated that the issue was not directly caused by a cybersecurity event. AP News also reported that the outage was not related to McDonald’s Google Cloud partnership.

**Source Used to Verify:**
https://apnews.com/article/mcdonalds-system-outage-b6c71ee8bd36af1eee4b3a5c929dcf6e

**Evidence**
![alt text](mcdonalds-outage-ai-response.png)

---