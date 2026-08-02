---
name: usability-tester
description: Hỗ trợ tự động hoá quá trình kiểm tra giao diện (GUI) và Usability Heuristics trên một ứng dụng web.
---

# Usability Tester Agent Skill

This skill turns the AI agent into an automated UI/UX tester capable of evaluating web pages against standard heuristics (like Jakob Nielsen's or WCAG).

## Capabilities
1. **Automated GUI Checklist Execution:** Use the `browser_subagent` to navigate to a target URL, take full-page screenshots, and inspect the DOM structure for accessibility and layout rules.
2. **Heuristic Evaluation:** Evaluate specific heuristics (e.g., contrast ratio, missing alt texts, mixed languages, missing focus rings).
3. **Bug Report Generation:** Automatically compile a Bug & Usability Findings Log based on the issues found.

## How to Trigger
User says: "Run usability test on [URL]" or "Check GUI heuristics for [URL]".

## Workflow

1. **Authentication Check:** 
   - Ask the user if the target URL requires authentication. 
   - If yes, instruct the user to log in manually through the browser interface before proceeding.

2. **Visual & DOM Inspection (via `browser_subagent`):**
   - **Task:** Navigate to the URL and capture a full-page screenshot.
   - **Task:** Inspect the DOM for specific UI antipatterns:
     - Are there elements without proper labels (F-01)?
     - Are error states or destructive actions using appropriate semantic colors (G-05)?
     - Is the page responsive when zoomed? (G-13)
     - Are there mixed languages in the UI text (G-14)?

3. **Checklist Mapping:**
   - Map the findings against the provided checklist (e.g., the 88-item EMS checklist).
   - Flag any items as `Failed` with explicit evidence.

4. **Report Generation:**
   - Create or update `Bug_Usability_Findings_Log.md`.
   - Ensure every bug has a Severity rating (1-Cosmetic, 2-Minor, 3-Major, 4-Catastrophic).
   - Reference the exact heuristic violated (e.g., "Nielsen #5", "WCAG 2.4.7").

## Important Rules
- **Do not hallucinate visual feedback:** If you cannot verify an interaction (like a hover effect), state clearly that manual testing is required.
- **Provide actionable fixes:** Always propose a "Đề xuất sửa" (Proposed Fix) for every bug found.
