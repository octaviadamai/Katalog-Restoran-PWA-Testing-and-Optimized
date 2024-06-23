class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestoran }) {
    this._view = view;
    this._favoriteRestoran = favoriteRestoran;

    this._showFavoriteRestaurant();
  }

  async _showFavoriteRestaurant() {
    const restaurant = await this._favoriteRestoran.getAllRestoran();
    this._displayRestaurant(restaurant);
  }

  _displayRestaurant(restaurant) {
    this._view.showFavoriteRestaurant(restaurant);
  }
}

export default FavoriteRestaurantShowPresenter;
