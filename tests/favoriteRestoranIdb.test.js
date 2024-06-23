import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestoranContract';
import FavoriteRestoranIdb from '../src/scripts/data/favorite-restoran-idb';

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteRestoranIdb.getAllRestoran()).forEach(async (restaurant) => {
      await FavoriteRestoranIdb.deleteRestoran(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestoranIdb);
});
