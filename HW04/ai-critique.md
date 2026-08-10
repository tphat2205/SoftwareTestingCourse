# AI Critique

During this homework, the AI assistant generated the initial automation scripts. While it provided a solid structural foundation — correctly setting up the data-driven loop and importing JSON test data — it fell short in several key aspects that required human review and correction.

First, the AI failed to accurately grasp the state-machine requirements for FR-10 (Order State Machine). It attempted to use `page.route()` to mock network responses, completely bypassing the actual backend logic. This rendered the tests useless for verifying the real SUT's state transitions. We had to rewrite these tests to use direct API requests (`APIRequestContext`) to properly validate the backend.

Second, the AI missed fundamental UI interactions, such as handling native browser dialogs. In the FR-15 (Product CRUD) tests, the deletion test failed because the AI forgot to attach a `page.on('dialog')` listener to accept the confirmation prompt. Additionally, the AI included overly strict and flaky UI assertions that failed across different browsers.

Third, across all three features, the AI hallucinated `data-testid` selectors that simply do not exist in the SUT. This is a pattern recognition failure — the AI learned from codebases that follow React Testing Library best practices, and projected those patterns onto a SUT that doesn't use them.

This experience reinforces the core principle of collaborating with AI: the AI is a highly capable typist and boilerplate generator, but it lacks deep contextual understanding of the system's architecture and quirks. Human review is absolutely essential to ensure the generated code is not just syntactically correct, but logically sound and truly tests the intended functionality.
