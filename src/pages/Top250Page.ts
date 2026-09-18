import {Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";

export class Top250Page extends BasePage {
    readonly firstMovieLink: Locator;

    constructor(page: Page) {
        super(page);
        this.firstMovieLink = page.getByRole('link').getByRole('heading', {level: 4}).first();
    }

    async openFirstMovie(): Promise<void> {
        await this.firstMovieLink.click();
    }
}
