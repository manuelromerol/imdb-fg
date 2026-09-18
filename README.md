# IMDb Playwright Test Automation Framework

Scalable end-to-end test automation for [IMDb](https://www.imdb.com) using
TypeScript, Playwright Test, page objects, and custom fixtures.

## Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Test Execution Commands](#test-execution-commands)
- [Project Structure](#project-structure)
- [Framework Design](#framework-design)
- [Playwright Configuration](#playwright-configuration)
- [Continuous Integration](#continuous-integration)
- [Cloudflare and Access Restrictions](#cloudflare-and-access-restrictions)
- [Reports and Artifacts](#reports-and-artifacts)

## Project Overview

The framework provides:

- TypeScript-based Playwright tests
- Page Object Model classes with semantic locators
- Custom Playwright fixtures for dependency injection
- HTML and list reporters
- Video and screenshots for failed tests
- Persistent worker-specific browser profiles for session reuse

## Prerequisites

- Node.js 20 or newer
- npm

## Installation

```bash
npm install
npx playwright install chromium
```

## Test Execution Commands

| Command                                  | Description |
|------------------------------------------| --- |
| `npm test`                               | Run all Playwright tests |
| `npm test -- --headed`                   | Run tests with a visible browser |
| `npm test -- tests/movieSearch.spec.ts`  | Run the movie search scenario |
| `npm test -- tests/top250Movies.spec.ts` | Run the Top 250 scenario |
| `npm test -- --debug`                    | Run with Playwright Inspector |
| `npm test -- --ui`                       | Open Playwright UI mode |
| `npx playwright test`                    | Run all Playwright tests |
| `npx playwright show-report`             | Open the latest HTML report |

Additional Playwright arguments can be passed after `--`.

## Project Structure

```text
config/
src/
├── data/                 # Test data and constants
├── fixtures/             # Custom Playwright fixtures
├── pages/                # Page Objects and page components
│   └── components/
└── utils/                # Shared utilities
tests/                    # E2E specifications
playwright.config.ts      # Playwright configuration
tsconfig.json             # TypeScript configuration
package.json              # Scripts and dependencies
```

## Framework Design

### Page Objects

Page classes encapsulate locators and user interactions. Locators are declared
as readonly properties near the beginning of each class and use Playwright
semantic APIs such as:

- `getByRole`
- `getByPlaceholder`
- `getByLabel`
- `getByTestId`

Avoided intentionally the usage of `locator()` with `CSS` or `XPath` for element identification per project requirements.

Business assertions remain in the test specifications and use Playwright's
auto-retrying `expect` assertions.

### Fixtures

Tests import `test` and `expect` from:

```text
src/fixtures/pageFixtures.ts
```

The fixture creates and injects `HomePage`, `SearchResultsPage`,
`Top250Page`, `MovieDetailsPage`, and `NavMenuDrawer` instances into each test.
No singleton page objects or builders are used.

Example:

```ts
import { expect, test } from '../src/fixtures/pageFixtures';

test('validates a movie title', async ({ homePage, movieDetailsPage }) => {
  await homePage.navigate();
  await expect(movieDetailsPage.titleHeader).toBeVisible();
});
```

## Playwright Configuration

`playwright.config.ts` configures:

- Base URL: `https://www.imdb.com`
- Chromium with Desktop Chrome device settings
- Serial workers for stable persistent browser profiles
- List and HTML reporters
- Trace on first retry
- Video retention on failure
- Screenshots on failure

The custom `page` fixture in `src/fixtures/pageFixtures.ts` uses
`playwright-extra` and a worker-specific persistent context. This supports
browser profile reuse and session continuity during authorized test runs.

## Continuous Integration

The repository includes a GitHub Actions workflow at
`.github/workflows/playwright.yml`. It runs automatically after every push to
the `main` branch and for pull requests targeting `main`.

The workflow:

1. Checks out the repository.
2. Sets up Node.js 20 with npm dependency caching.
3. Installs dependencies with `npm ci`.
4. Installs Chrome and its required system dependencies.
5. Runs the Playwright test suite in CI mode.
6. Uploads the HTML report as an artifact, even when tests fail.

## Cloudflare and Access Restrictions

Some browser-compatibility mechanisms are included to make authorized testing
more reliable when the site applies protections designed for bots or automated
agents. These include persistent browser contexts, worker-specific profiles,
session reuse, and the optional `playwright-extra` compatibility setup.

These settings are intended to support normal, permitted browser sessions and
reproducible test execution. They are not a guarantee that IMDb or its security
providers will allow automation, and they should not be used to circumvent
Cloudflare challenges, CAPTCHA, rate limits, or other access controls.

Please refer to the `pageFixtures.ts` file for reference.

## Reports and Artifacts

After a test run:

- HTML reports are written to `playwright-report/`.
- Traces are collected on the first retry.
- Videos and screenshots are retained for failed tests.

These generated directories are excluded from source control by `.gitignore`.
