const itActsAsFavoriteRestaurantModel = (FavoriteRestaurant) => {
  it('should return the restaurant that has been added', async () => {
    FavoriteRestaurant.putRestoran({ id: 1 });
    FavoriteRestaurant.putRestoran({ id: 2 });

    expect(await FavoriteRestaurant.getRestoran(1)).toEqual({ id: 1 });
    expect(await FavoriteRestaurant.getRestoran(2)).toEqual({ id: 2 });
    expect(await FavoriteRestaurant.getRestoran(3)).toEqual(undefined);
  });

  it('should refuse a restaurant from being added if it does not have the correct property', async () => {
    FavoriteRestaurant.putRestoran({ aProperty: 'property' });

    expect(await FavoriteRestaurant.getAllRestoran()).toEqual([]);
  });

  it('can return all of the restaurants that have been added', async () => {
    FavoriteRestaurant.putRestoran({ id: 1 });
    FavoriteRestaurant.putRestoran({ id: 2 });

    expect(await FavoriteRestaurant.getAllRestoran()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite restaurant', async () => {
    FavoriteRestaurant.putRestoran({ id: 1 });
    FavoriteRestaurant.putRestoran({ id: 2 });
    FavoriteRestaurant.putRestoran({ id: 3 });

    await FavoriteRestaurant.deleteRestoran(1);

    expect(await FavoriteRestaurant.getAllRestoran()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
    FavoriteRestaurant.putRestoran({ id: 1 });
    FavoriteRestaurant.putRestoran({ id: 2 });
    FavoriteRestaurant.putRestoran({ id: 3 });

    await FavoriteRestaurant.deleteRestoran(4);

    expect(await FavoriteRestaurant.getAllRestoran()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
  it('should be able to search for restaurant', async () => {
    FavoriteRestaurant.putRestoran({ id: 1, name: 'restaurant a' });
    FavoriteRestaurant.putRestoran({ id: 2, name: 'restaurant b' });
    FavoriteRestaurant.putRestoran({ id: 3, name: 'restaurant abc' });
    FavoriteRestaurant.putRestoran({ id: 4, name: 'ini mah restaurant abcd' });

    expect(await FavoriteRestaurant.searchRestoran('restaurant a')).toEqual([
      { id: 1, name: 'restaurant a' },
      { id: 3, name: 'restaurant abc' },
      { id: 4, name: 'ini mah restaurant abcd' },
    ]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestaurantModel };
