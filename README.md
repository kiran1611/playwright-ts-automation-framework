# Playwright + TypeScript Test Automation Framework

[![Playwright Tests](https://github.com/kiran1611/playwright-ts-automation-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/kiran1611/playwright-ts-automation-framework/actions/workflows/playwright.yml)

End-to-end and API test automation framework built with Playwright and TypeScript, using the Page Object Model, custom fixtures and session reuse. Runs on every push through GitHub Actions.

## What this project demonstrates

- **Page Object Model**: one class per page (`LoginPage`, `InventoryPage`, `CartPage`); locators and actions live in page objects, assertions stay in tests
- **Custom fixtures**: page objects and a logged-in state are injected into tests, so tests don't repeat setup code
- **Session reuse**: a setup project logs in once and saves `storageState`, so tests skip the login screen
- **Data-driven tests**: one login test generates a separate test per data row
- **Test tagging**: `@smoke` and `@regression` tags run through `--grep`
- **API tests**: Playwright's `request` fixture checks status codes and response bodies
- **CI**: GitHub Actions runs the suite on every push and pull request
- **Network mocking**: with `page.route()`
- **Hybrid Test** : API + UI
- **Visual Regression** :visual regression tests (local baselines)
- **Allure reports** : Allure reports as CI artifacts

## Tech stack

Playwright, TypeScript, Node.js, GitHub Actions

## Project structure

```
├── .github/workflows/   # CI pipeline
├── fixtures/            # custom test fixtures (base.ts)
├── pages/               # page objects
├── tests/               # specs, plus auth.setup.ts for the login session
├── playwright.config.ts
└── tsconfig.json
```

## Getting started

Requires Node.js (LTS).

```bash
npm install
npx playwright install
npx playwright test
```

## Useful commands

```bash
npx playwright test --ui                      # interactive UI mode
npx playwright test --headed                  # watch the browser
npx playwright test --grep "@smoke"           # run only smoke tests
npx playwright test --grep-invert "@external" # skip tests that use third-party sites
npx playwright show-report                    # open the HTML report
```

## Design decisions

- **Assertions stay out of page objects.** The same `login()` method is used by both successful and failing login tests, and they expect opposite results.
- **Session reuse speeds up the suite.** Login runs once in a setup project; tests that check the login screen itself opt out, so they start logged out.
- **Cart checks assert the whole list** with `toHaveText([...])`, which retries until the page settles. An earlier version read the page too early and failed on CI.
- **Tests that depend on third-party sites are tagged `@external`** and excluded from CI, so a slow site I don't control can't turn the build red.

## Notes

- Tests target public demo sites ([SauceDemo](https://www.saucedemo.com) and [JSONPlaceholder](https://jsonplaceholder.typicode.com)). JSONPlaceholder is a fake API: it accepts a POST but doesn't save the data.
- The config reads an optional `LOCAL_CHROMIUM_PATH` environment variable for machines that can't download Playwright's browsers. CI doesn't need it.
- Currently runs on Chromium.

## Planned
- Cross-browser runs
- Published HTML report

## Author

Kiran Kumar R · [GitHub](https://github.com/kiran1611)
