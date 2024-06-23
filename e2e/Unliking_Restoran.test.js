/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');

  // Let's specify a more accurate locator for the restaurant name
  const likedRestaurantName = locate('.restaurant__name a').first();
  const unlikedRestaurantName = await I.grabTextFrom(likedRestaurantName);

  assert.strictEqual(firstRestaurantName, unlikedRestaurantName);

  // Here, we need to locate the unliked restaurant again
  const unlikedRestaurant = locate('.restaurant__name a').first();
  I.click(unlikedRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Verify that the restaurant has been removed from the favorites list
  I.amOnPage('/#/favorite');
  I.dontSeeElement('.restaurant-item');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
