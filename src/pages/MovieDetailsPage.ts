import {Locator, Page} from '@playwright/test';
import {BasePage} from "./BasePage";

export class MovieDetailsPage extends BasePage{
    readonly titleHeader: Locator;
    readonly rating: Locator;
    readonly releaseYear: Locator;

    constructor(page: Page) {
      super(page);
        this.titleHeader = page.getByRole('heading', {level: 1});
        this.rating = page
            .getByRole('link')
            .filter({has: page.getByTestId('hero-rating-bar__aggregate-rating__score')});
        this.releaseYear = page
            .getByRole('link')
            .filter({hasText: /^\d{4}$/});
    }

}
