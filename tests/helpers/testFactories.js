/* eslint-disable import/prefer-default-export */
import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import FavoriteRestoranIdb from '../../src/scripts/data/favorite-restoran-idb';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestoran: FavoriteRestoranIdb,
    restaurant,
  });
};
export { createLikeButtonPresenterWithRestaurant };
