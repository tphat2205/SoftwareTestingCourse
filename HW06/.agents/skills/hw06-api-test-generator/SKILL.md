---
name: hw06-api-test-generator
description: >-
  AI-driven API test case generator for EShop application (HW06).
  Automates the generation of domain, state transition, security, and schema validation test cases
  based on the provided API specification and EShop requirements.
---

# HW06 API Test Generator Skill

This skill allows the Antigravity agent to act as an automated API test case generator for the EShop SUT, fulfilling the "Create (G9.5)" requirement for HW06.

## Objective
To read the `api_specification.md` and generate comprehensive API test cases that cover four main testing strategies: Domain Partitions, State Transitions, Security, and Schema Validation.

## Pre-requisites
1. The agent must have access to `d:\Project\SoftwareTesting\HW06\eshop-sut\api_specification.md`.
2. The agent must understand the EShop specific security rules (SEC-01 to SEC-07) and state machine (FR-10).

## Execution Pipeline

When the user asks you to "generate tests for API X" using this skill, follow this exact pipeline:

### Stage 1: Context Extraction
1. Use `view_file` to read the relevant section of `api_specification.md` for the requested endpoint.
2. If the API involves State Transitions (like orders), also extract the relevant state machine rules (FR-10).
3. If the API involves Security, extract the required roles and token requirements (FR-12).

### Stage 2: Strategy Formulation
Generate four distinct categories of tests:
*   **Domain Partitions**: Identify all parameters (body, query, path). Generate cases for valid boundaries, invalid formats, empty values, missing fields, and type coercions.
*   **State Transitions**: (If applicable) Generate cases testing valid transitions (e.g., pending -> canceled) and invalid transitions (e.g., delivered -> canceled).
*   **Security (SEC-01 to SEC-07)**: Generate cases for No Auth, Invalid Token, Expired Token, Role Escalation (User trying Admin API), SQL Injection, XSS, and IDOR.
*   **Schema Validation**: Generate cases verifying the exact structure and types of the successful and error response JSONs.

### Stage 3: Output Formatting
Present the generated test cases to the user in a clear Markdown table or structure, ensuring there are at least 35 test cases total.
Format for each test case:
*   **ID**: (e.g., TC-01)
*   **Category**: (Domain / State / Security / Schema)
*   **Name**: (e.g., "Empty email field")
*   **Payload/Action**: (e.g., `{"email": ""}`)
*   **Expected Result**: (e.g., "400 Bad Request or 422 Unprocessable Entity")

### Stage 4: Postman Collection Materialization (Optional)
If requested by the user, help them translate these abstract test cases into actual `pm.test()` assertions to be placed inside a Postman Collection JSON.

## Example Trigger
User: "Use the hw06-api-test-generator skill to generate test cases for POST /api/categories"
Agent: Follows Stages 1 -> 3 immediately.
