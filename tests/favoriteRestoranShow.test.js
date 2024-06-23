/* eslint-disable no-new */
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-show-presenter';

describe('Showing all favorite restaurant', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };
  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurant have been liked', () => {
    it('should render the information that no restaurant have been liked', () => {
      const favoriteRestoran = {
        getAllRestoran: jest.fn().mockImplementation(() => []),
      };

      const presenter = new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestoran,
      });

      const restaurant = [];
      presenter._displayRestaurant(restaurant);

      expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
    });
    it('should ask for the favorite restaurant', () => {
      const favoriteRestoran = {
        getAllRestoran: jest.fn().mockImplementation(() => []),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestoran,
      });
      expect(favoriteRestoran.getAllRestoran).toHaveBeenCalledTimes(1);
    });
    it('should show the information that no restaurant have been liked', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
        done();
      });

      const favoriteRestoran = {
        getAllRestoran: jest.fn().mockImplementation(() => []),
      };

      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestoran,
      });
    });
  });
  describe('When favorite restaurant exist', () => {
    it('should show the restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
        done();
      });
      const favoriteRestoran = {
        getAllRestoran: jest.fn().mockImplementation(() => [
          {
            id: '1',
            name: 'Melting Pot',
            description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. ...',
            pictureId: '14',
            city: 'Medan',
            rating: 4.2,
          },
          {
            id: '2',
            name: 'Kafe Kita',
            description: 'Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. ...',
            pictureId: '25',
            city: 'Gorontalo',
            rating: 4,
          },
        ]),
      };
      new FavoriteRestaurantShowPresenter({
        view,
        favoriteRestoran,
      });
    });
  });
});
