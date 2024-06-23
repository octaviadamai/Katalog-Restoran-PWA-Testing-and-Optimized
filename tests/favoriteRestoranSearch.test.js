/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import FavoriteRestoranSearchPresenter from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurant/favorite-restaurant-view';

describe('Searching restaurant', () => {
  let presenter;
  let favoriteRestoran;
  let view;

  const searchRestoran = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestoran = {
      getAllRestoran: jest.fn(),
      searchRestoran: jest.fn(),
    };
    presenter = new FavoriteRestoranSearchPresenter({ favoriteRestoran, view });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestoran.searchRestoran.mockImplementation(() => []);
      searchRestoran('restaurant a');
      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked Restaurant', () => {
      favoriteRestoran.searchRestoran.mockImplementation(() => []);
      searchRestoran('restaurant a');

      expect(favoriteRestoran.searchRestoran).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the restaurant found by Favorite restaurant', (done) => {
      document
        .getElementById('restaurant').addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(3);

          done();
        });

      favoriteRestoran.searchRestoran.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestoran('restaurant a');
    });

    it('should show the name of the restaurant found by Favorite restaurant', (done) => {
      document
        .getElementById('restaurant').addEventListener('restaurant:updated', () => {
          const RestaurantName = document.querySelectorAll('.restaurant__name');

          expect(RestaurantName.item(0).textContent).toEqual('restaurant abc');
          expect(RestaurantName.item(1).textContent).toEqual('ada juga restaurant abcde');
          expect(RestaurantName.item(2).textContent).toEqual('ini juga boleh restaurant a');

          done();
        });

      favoriteRestoran.searchRestoran.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'ada juga restaurant abcde' },
            { id: 333, name: 'ini juga boleh restaurant a' },
          ];
        }

        return [];
      });

      searchRestoran('restaurant a');
    });
    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        const RestaurantName = document.querySelectorAll('.restaurant__name');
        expect(RestaurantName.item(0).textContent)
          .toEqual('-');

        done();
      });

      favoriteRestoran.searchRestoran.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestoran('restaurant a');
    });
    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        const RestaurantName = document.querySelectorAll('.restaurant__name');
        expect(RestaurantName.item(0).textContent)
          .toEqual('-');

        done();
      });

      favoriteRestoran.searchRestoran.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestoran('restaurant a');
    });
  });
  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestoran.getAllRestoran.mockImplementation(() => []);
      searchRestoran(' ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestoran('    ');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestoran('');
      expect(presenter.latestQuery.length).toEqual(0);
      searchRestoran('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });
    it('should show all favorite restaurant', () => {
      favoriteRestoran.getAllRestoran.mockImplementation(() => []);
      searchRestoran('    ');
      expect(favoriteRestoran.getAllRestoran).toHaveBeenCalled();
    });
  });
  describe('When no favorite restaurant could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurant').addEventListener('restaurant:updated', () => {
          expect(document.querySelectorAll('.restaurant-item__not__found').length).toEqual(1);
          done();
        });
      favoriteRestoran.searchRestoran.mockImplementation((query) => []);
      searchRestoran('restaurant a');
    });
    it('should not show any restaurant', (done) => {
      document.getElementById('restaurant').addEventListener('restaurant:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(0);
        done();
      });
      favoriteRestoran.searchRestoran.mockImplementation((query) => []);
      searchRestoran('restaurant a');
    });
  });
});
