/* eslint-disable no-new */
import FavoriteRestoranIdb from '../../data/favorite-restoran-idb';
import FavoriteRestaurantViews from './liked-restaurant/favorite-restaurant-view';
import FavoriteRestoranShowPresenter from './liked-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestoranSearchPresenter from './liked-restaurant/favorite-restaurant-search-presenter';

const view = new FavoriteRestaurantViews();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestoranShowPresenter({ view, favoriteRestoran: FavoriteRestoranIdb });
    new FavoriteRestoranSearchPresenter({ view, favoriteRestoran: FavoriteRestoranIdb });
  },
};

export default Favorite;
