import TheRestoranDbSource from '../../data/therestorandb-source';
import { createRestoranItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
 <div class="content">
    <div class="hero">
      <main class="content-hero">
        <div class="hero_inner">
          <h1 class="hero_title">Rasakan <span>Masakan Favorit</span> Anda</h1>
          <p class="hero_subtitle">Nikmati Hidangan Terbaik Dari Seluruh Dunia.</p>
          <a href="#" class="cta">Learn More</a>
        </div>
      </main>
      <picture>
        <source media="(max-width: 480px)" srcset="../images/hero-image_4-small.jpg" type="image/jpg">
        <source media="(max-width: 650px)" srcset="../images/hero-image_4-medium.jpg" type="image/jpeg">
        <source media="(max-width: 1200px)" srcset="../images/hero-image_4-large.jpg" type="image/jpeg">
        <img width="100%" src="../images/hero-image_4.jpg" alt="jumbotron">
      </picture>
    </div>
    <h2 class="content__heading">Restaurant List</h2>
    <div id="restaurants" class="restaurants"></div>
  </div>
    `;
  },

  async afterRender() {
    try {
      const restaurant = await TheRestoranDbSource.listRestaurant();
      console.log(restaurant); // Ensure the data is being logged
      const restaurantContainer = document.querySelector('#restaurants');
      restaurant.forEach((data) => {
        const listR = createRestoranItemTemplate(data);
        restaurantContainer.innerHTML += listR;
      });

      restaurant.forEach((data) => {
        const restaurantElement = document.querySelector(`#restaurant-${data.id}`);
        if (restaurantElement) {
          restaurantElement.addEventListener('click', () => {
            window.location.href = `#/detail/${data.id}`;
          });
        }
      });
    } catch (error) {
      console.error(error); // Log any errors
    }
  },
};

export default Home;
