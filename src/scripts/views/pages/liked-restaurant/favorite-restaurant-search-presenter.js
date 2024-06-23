/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class FavoriteRestaurantSearchPresenter {
  constructor({ favoriteRestoran, view }) {
    this._favoriteRestoran = favoriteRestoran;
    this._view = view;

    this._listenToSearchRequestByUser();
  }

  _listenToSearchRequestByUser() {
    this._view.runWhenUserIsSearching((latestQuery) => {
      this._searchRestoran(latestQuery);
    });
  }

  async _searchRestoran(latestQuery) {
    this._latestQuery = latestQuery.trim();
    let foundRestaurant;
    if (this.latestQuery.length > 0) {
      foundRestaurant = await this._favoriteRestoran.searchRestoran(this.latestQuery);
    } else {
      foundRestaurant = await this._favoriteRestoran.getAllRestoran();
    }
    this._showFoundRestaurant(foundRestaurant);
  }

  _showFoundRestaurant(restaurant) {
    this._view.showFavoriteRestaurant(restaurant);
  }

  get latestQuery() {
    return this._latestQuery;
  }
}

export default FavoriteRestaurantSearchPresenter;
