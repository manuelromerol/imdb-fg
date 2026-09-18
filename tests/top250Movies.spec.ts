import {test, expect} from '../src/fixtures/pageFixtures';

test('opens the first movie from IMDb Top 250', async ({
                                                           homePage,
                                                           top250Page,
                                                           navMenuDrawer,
                                                           movieDetailsPage,
                                                       }) => {
    await homePage.navigate();
    await homePage.openNavigationMenu();
    await navMenuDrawer.selectTop250Movies();
    await top250Page.openFirstMovie();

    await expect(movieDetailsPage.titleHeader).toBeVisible();
    await expect(movieDetailsPage.rating).toBeVisible();
    await expect(movieDetailsPage.releaseYear).toBeVisible();
});
