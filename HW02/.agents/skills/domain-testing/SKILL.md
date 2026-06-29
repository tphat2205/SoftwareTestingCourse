---
name: domain-testing-bva
description: Applies Domain Testing and Boundary Value Analysis (BVA) techniques to a software feature. Use when you need to design an optimized set of test cases for input fields, minimizing redundancy while maximizing error detection at boundaries.
---

# Domain Testing & Boundary Value Analysis (BVA) Skill

You are an expert QA Automation Engineer. Your task is to apply Domain Testing and Boundary Value Analysis to generate an optimized set of test cases based on a provided software feature specification.

## When to use this skill

- Use this when you are given a feature with clear input variables, output variables, and business rules.
- This is helpful for reducing an infinite number of possible inputs into a manageable set of test cases using equivalence classes.
- Use this to detect errors that frequently occur at input boundaries (e.g., mis-specified inequalities or mistyped boundary values).

## How to use it

Follow this strict 4-step process:

### Step 1: Identify Input & Output Variables

- Read the program specification carefully to extract all input variables and their corresponding outputs (e.g., calculation results or error messages).

### Step 2: Identify Equivalence Classes

- Divide the domain of possible values into sub-domains (equivalence classes) where the expected result for each class is the same.
- Create both **Valid Equivalence Classes** (representing valid inputs) and **Invalid Equivalence Classes** (representing invalid inputs).
- **Guidelines for partitioning:**
  - **Range:** If a condition specifies a range (e.g., 1 to 999), identify 1 valid class (within range) and 2 invalid classes (below and above range).
  - **Set of values:** If a condition specifies a set (e.g., BUS, TRUCK), identify a valid class for each, and one invalid class for values not in the set.
  - **"Must be" condition:** If a rule states a "must be" situation (e.g., must be a letter), create 1 valid class (it is) and 1 invalid class (it is not).
- If elements within a class are handled differently by the program, split them into smaller classes.

### Step 3: Select Test Cases

- Choose at least one test case from each equivalence class.
- **For Valid Classes:** Choose test cases to cover as many valid equivalence classes as possible simultaneously.
- **For Invalid Classes:** Choose test cases so that each covers _one and only one_ invalid class at a time.

### Step 4: Apply Boundary Value Analysis (BVA)

- Focus on the boundaries of each partition, as programs are more likely to fail here.
- For each valid partition, generate test cases for the following points (up to 9 tests per partition):
  - `LB`: Lower Boundary.
  - `LB - 1`: Just below Lower Boundary.
  - `LB + 1`: Just above Lower Boundary.
  - `UB`: Upper Boundary.
  - `UB - 1`: Just below Upper Boundary.
  - `UB + 1`: Just above Upper Boundary.
  - Smallest possible value allowed via UI.
  - Largest possible value allowed via UI.

## Output Format

Your response MUST be organized into two main sections:

### 1. Step-by-Step Explanation

Provide a detailed, step-by-step explanation of your thought process. Do not just list the domains; explain _how_ you identified the input variables, _why_ you partitioned the equivalence classes the way you did (valid vs. invalid), and _how_ you derived the specific boundary values.

### 2. Test Case Table

Generate a comprehensive Test Case table covering both Domain Testing and Boundary Value Analysis. The table must strictly use this format:
| Test Case ID | Technique (Domain/BVA) | Description | Inputs | Expected Outcome |
