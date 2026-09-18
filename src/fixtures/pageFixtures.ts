import { test as base, Page} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';
import { Top250Page } from '../pages/Top250Page';
import { NavMenuDrawer } from '../pages/components/NavMenuDrawer';

import {chromium} from "playwright-extra";
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';

type PageFixtures = {
  page: Page;
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  top250Page: Top250Page;
  movieDetailsPage: MovieDetailsPage;
  navMenuDrawer: NavMenuDrawer;
};

chromium.use(StealthPlugin());

export const test = base.extend<PageFixtures>({

  page: async ({}, use, testInfo) => {
    const userDataDir = path.join(
        __dirname,
        `../../.user_data_worker_${testInfo.workerIndex}`
    );

    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chrome',
      headless: !!process.env.CI,
      viewport: { width: 1280, height: 720 },
      // args: [
      //   '--disable-blink-features=AutomationControlled',
      //   '--start-maximized',
      // ],
    });

    const page = context.pages()[0] || (await context.newPage());

    await use(page);

    await context.close();
  },

  // Pages
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  top250Page: async ({ page }, use) => {
    await use(new Top250Page(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  movieDetailsPage: async ({ page }, use) => {
    await use(new MovieDetailsPage(page));
  },

  // Components
  navMenuDrawer: async ({ page }, use) => {
    await use(new NavMenuDrawer(page));
  },
});

export { expect } from '@playwright/test';
