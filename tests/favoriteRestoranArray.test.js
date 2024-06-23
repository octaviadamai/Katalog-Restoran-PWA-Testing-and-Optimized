/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
import { afterEach, describe } from '@jest/globals';
import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestoranContract';

let favoriteRestoran = [];

const FavoriteRestoranArray = {
  searchRestoran(query) {
    return this.getAllRestoran()
      .filter((restaurant) => {
        const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
        const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        return jammedRestaurantName.indexOf(jammedQuery) != -1;
      });
  },
  getRestoran(id) {
    if (!id) {
      return;
    }

    return favoriteRestoran.find((restaurant) => restaurant.id == id);
  },

  getAllRestoran() {
    return favoriteRestoran;
  },

  putRestoran(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestoran
    if (this.getRestoran(restaurant.id)) {
      return;
    }

    favoriteRestoran.push(restaurant);
  },

  deleteRestoran(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestoran = favoriteRestoran.filter((restaurant) => restaurant.id != id);
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestoran = [];
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestoranArray);
});
