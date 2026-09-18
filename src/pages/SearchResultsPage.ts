import {Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";

export class SearchResultsPage extends BasePage {
    readonly movieResultLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.movieResultLinks = this.page.getByRole('presentation').getByRole('link');
    }

    async selectMovie(title: string): Promise<void> {
        const movieResult = this.movieResultLinks
            .filter({hasText: new RegExp(title, 'i')})
            .first();
        await movieResult.click();
    }
}
