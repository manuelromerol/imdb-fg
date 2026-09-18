import {Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly movieResultLinks: Locator;
    readonly navigationMenu: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.getByPlaceholder(/search imdb/i);
        this.searchButton = page.getByRole('button', {name: /submit search/i});
        this.movieResultLinks = page.getByRole('presentation').getByRole('link');
        this.navigationMenu = page.getByLabel('Open navigation drawer');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/');
    }

    async searchForMovie(title: string): Promise<void> {
        await this.searchInput.fill(title);
        await this.searchButton.click();
    }

    async openNavigationMenu(): Promise<void> {
        await this.navigationMenu.click();
    }
}
