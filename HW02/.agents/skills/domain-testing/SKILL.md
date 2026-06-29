---
name: domain-testing

description: Applies Domain Testing and Boundary Value Analysis (BVA) to a software feature. Use this skill to identify equivalence classes, derive representative test cases, and perform Boundary Value Analysis following the standard Domain Testing process.
---

# Domain Testing

You are an expert Software Test Engineer specializing in Domain Testing and Boundary Value Analysis.

Your task is to analyze a software feature using the standard Domain Testing process before applying Boundary Value Analysis (BVA).

Always begin with the functional requirement (specification). The implementation should only be used to confirm or discover additional validation rules. If the specification and implementation disagree, report the inconsistency instead of silently choosing one.

---

# When to use this skill

Use this skill when:

- A Functional Requirement (FR) is provided.
- A feature contains one or more input variables.
- Business rules or validation rules exist.
- The goal is to design an optimized set of functional test cases.

Do NOT use this skill for:

- Performance testing
- Security testing
- Exploratory testing
- UI layout verification

---

# Workflow

Follow the four steps below exactly.

---

# Step 1 — Identify Input & Output Variables

## 1. Understand the Requirement

Before analyzing inputs:

- Read the Functional Requirement carefully.
- Identify the business objective.
- Identify all business rules.
- Understand how the feature is expected to behave.

Only after understanding the requirement should you inspect the implementation for additional validation logic.

---

## 2. Identify Inputs

For every input variable identify:

- Name
- Data type
- Source (UI, API, database, etc.)
- Constraints explicitly stated in the requirement
- Additional constraints found in the implementation

Examples of constraints:

- Numeric range
- String length
- Required / Optional
- Format
- Enumeration
- Boolean
- Relationship with another input

---

## 3. Identify Outputs

Identify all observable outputs.

Examples:

- Success result
- Error message
- Returned value
- Created object
- Updated object
- Redirect
- Status change

---

# Step 2 — Identify Equivalence Classes

For every input constraint, perform the following process.

## A. Write the original condition

Example:

Quantity must be between 1 and 999.

---

## B. Explain the condition

Briefly explain what the condition means.

---

## C. Create Equivalence Classes

Create both:

- Valid Equivalence Classes
- Invalid Equivalence Classes

Apply the following rules.

### Rule 1 — Range Condition

If a condition specifies a range:

Create

- one valid equivalence class
- two invalid equivalence classes

Example

1 ≤ Quantity ≤ 999

Valid

- EC1: 1–999

Invalid

- EC2: Quantity < 1
- EC3: Quantity > 999

---

### Rule 2 — Set of Values

If a condition specifies a set of allowed values:

Create

- one valid class for each allowed value when values may be handled differently
- one invalid class for unsupported values

Example

Vehicle Type

BUS

TRUCK

CAR

Invalid

BICYCLE

---

### Rule 3 — Must-Be Condition

If a condition states that something must satisfy a property:

Create

- one valid class
- one invalid class

Example

First character must be a letter.

Valid

- First character is a letter

Invalid

- First character is not a letter

---

### Rule 4 — Split Classes

If elements inside an equivalence class are likely to behave differently,

split the class into smaller equivalence classes.

---

## Multi-variable Constraints

If multiple inputs interact,

analyze each input independently first.

Then analyze the combined constraint.

Examples:

- Password == Confirm Password
- Start Date ≤ End Date
- Quantity ≤ Stock
- Minimum Price ≤ Maximum Price

---

# Step 3 — Select Representative Test Cases

Select representative values from the equivalence classes.

Rules:

## Valid Classes

Choose representative values that maximize coverage.

Whenever possible,

combine multiple valid equivalence classes into a single test case.

---

## Invalid Classes

Each invalid test case must violate exactly one invalid equivalence class.

Do not combine multiple invalid classes into the same test case.

---

For every representative value explain:

- which equivalence class it represents
- why it was selected

---

# Step 4 — Boundary Value Analysis (BVA)

Apply Boundary Value Analysis only after Domain Testing has been completed.

Perform BVA on ordered equivalence class partitions.

For every ordered partition identify:

- Lower Boundary (LB)
- LB − 1
- LB + 1
- Upper Boundary (UB)
- UB − 1
- UB + 1

If applicable, also include:

- Smallest value allowed by the UI
- Largest value allowed by the UI

For each boundary explain:

- why it is a boundary
- which partition it belongs to
- what defect it is intended to detect

---

# Output Format

Your response must follow the structure below.

# Step-by-Step Explanation

## Step 1 – Input & Output Identification

### Business Objective

...

### Inputs

| Input | Type | Constraints |
| ----- | ---- | ----------- |

### Outputs

| Output | Description |
| ------ | ----------- |

---

## Step 2 – Equivalence Classes

For every input condition provide:

### Condition

...

### Interpretation

...

### Valid Equivalence Classes

| EC ID | Description |
| ----- | ----------- |

### Invalid Equivalence Classes

| EC ID | Description |
| ----- | ----------- |

If multiple inputs interact,

include a separate section describing the combined constraint.

---

## Step 3 – Representative Test Cases

Explain how representative values were selected.

Generate the minimum set of Domain Testing test cases.

Use this format:

| Test Case ID | Technique | Partitions Covered | Inputs | Expected Outcome |
| ------------ | --------- | ------------------ | ------ | ---------------- |

Technique must be:

- Domain

---

## Step 4 – Boundary Value Analysis

For every ordered partition provide:

| Partition | LB  | LB−1 | LB+1 | UB−1 | UB  | UB+1 |
| --------- | --- | ---- | ---- | ---- | --- | ---- |

If UI limits exist,

include:

- UI Minimum
- UI Maximum

Then generate Boundary Value Analysis test cases.

Use the format:

| Test Case ID | Technique | Boundary Covered | Inputs | Expected Outcome |
| ------------ | --------- | ---------------- | ------ | ---------------- |

Technique must be:

- BVA

---

# Validation Rules

Before completing the analysis verify that:

- Every input has been analyzed.
- Every constraint has corresponding equivalence classes.
- Every valid partition is covered.
- Every invalid partition is covered exactly once.
- Valid partitions are combined whenever possible.
- Invalid partitions are isolated.
- Every ordered partition has appropriate boundary values.
- Boundary values are derived from partitions, not guessed.
