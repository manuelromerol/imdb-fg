import {Locator, Page} from '@playwright/test';
import {BasePage} from "../BasePage";

export class NavMenuDrawer extends BasePage {
    readonly top250moviesLink: Locator;

    constructor(page: Page) {
        super(page);
        this.top250moviesLink = page.getByLabel('Go to Top 250 movies');
    }

    async selectTop250Movies(): Promise<void> {
        await this.top250moviesLink.click();
    }
}