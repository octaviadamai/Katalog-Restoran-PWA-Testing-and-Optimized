/* eslint-disable class-methods-use-this */
import { createRestoranItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantSearchView {
  getTemplate() {
    return `
          <div class="content">
      <input id="query" type="text">
      <h2 class="content__heading">Your Liked Restaurant</h2>
     
              <div id="restaurant" class="restaurants">
            </div>
          </div>
        `;
  }

  getFavoriteRestaurantTemplate() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Favorites Restaurant</h2>
        <div id="restaurant" class="restaurants">
        </div>
      </div>
    `;
  }

  showFavoriteRestaurant(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestoranItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurant').innerHTML = html;
    document.getElementById('restaurant').dispatchEvent(new Event('restaurant:updated'));
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">No Restaurant Available</div>
    `;
  }
}

export default FavoriteRestaurantSearchView;
