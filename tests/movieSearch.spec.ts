import {test, expect} from '../src/fixtures/pageFixtures';
import {testData} from '../src/data/testData';

test('searches for Inception and validates the movie title', async ({
                                                                        homePage,
                                                                        searchResultsPage,
                                                                        movieDetailsPage,
                                                                    }) => {
    await homePage.navigate();
    await homePage.searchForMovie(testData.movieTitle);
    await searchResultsPage.selectMovie(testData.movieTitle);

    await expect(movieDetailsPage.titleHeader).toContainText('Inception');
});
