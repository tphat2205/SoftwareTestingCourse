# HW04 – Automation Testing

**Student:** ĐOÀN THÀNH PHÁT — 23127241 — 23KTPM2

---

## Self-Assessment

| **No.** | **Criteria** | **Max Grade** | **Self-Assessed Grade** |
| --- | --- | --- | --- |
| **1** | Task 1 - Feature A (FR-06: Product Detail) | 25 | |
| **1** | Task 1 - Feature B (FR-10: Order State Machine) | 25 | |
| **1** | Task 1 - Feature C (FR-15: Product CRUD) | 25 | |
| **2** | Task 2 — Demo video | 15 | |
| **3** | Agent Skills | 10 | |
| | **Total** | **100** | |

---

## Test Summary Report

| Metric | Value |
|--------|-------|
| **Number of features** | 3 |
| **Test cases automated** | 36 |
| **Test cases executed** | 108 |
| **Test cases passed** | 99 |
| **Test cases failed** | 9 |
| **Number of browser runs** | 9 (3 features × 3 browsers) |
| **Number of bugs found** | 4 |
| **Demo video link** | *(to be added)* |

---

## Features Tested

| Pool | Feature | # TCs | Test File | Data File |
|------|---------|-------|-----------|-----------|
| A | FR-06: Product Detail View | 12 | `tests/product-detail.spec.ts` | `test-data/product-detail.json` |
| B | FR-10: Order State Machine | 12 | `tests/order-state-machine.spec.ts` | `test-data/order-state-machine.json` |
| C | FR-15: Product CRUD | 12 | `tests/product-crud.spec.ts` | `test-data/product-crud.json` |

---

## Browsers

| Browser | Engine | Playwright Channel |
|---------|--------|--------------------|
| Google Chrome | Chromium | `chrome` |
| Microsoft Edge | Chromium | `msedge` |
| Mozilla Firefox | Gecko | (default) |

---

## Bugs Found

| # | Bug | Severity | Feature | Issue Link |
|---|-----|----------|---------|------------|
| 1 | Double-click required to add to cart | High | FR-06 | [#1](https://github.com/tphat2205/SoftwareTestingCourse/issues/1) |
| 2 | Admin update renames ALL products | Critical | FR-15 | [#2](https://github.com/tphat2205/SoftwareTestingCourse/issues/2) |
| 3 | Canceled → Delivered transition allowed | High | FR-10 | [#3](https://github.com/tphat2205/SoftwareTestingCourse/issues/3) |
| 4 | User can cancel shipping orders | Medium | FR-10 | [#4](https://github.com/tphat2205/SoftwareTestingCourse/issues/4) |

---

## Repository

- **GitHub:** [https://github.com/tphat2205/SoftwareTestingCourse](https://github.com/tphat2205/SoftwareTestingCourse)

---

## Reports & Documents

| File | Description |
|------|-------------|
| `main-report-hw04.md` | Main automation testing report |
| `ai-critique.md` | AI Critique (200-300 words) |
| `ai-audit-report.md` | AI Audit Report |
| `reports/` | HTML test reports (Playwright) |
| `tests/` | Test spec files |
| `test-data/` | Test data JSON files |
| `playwright.config.ts` | Playwright configuration |
