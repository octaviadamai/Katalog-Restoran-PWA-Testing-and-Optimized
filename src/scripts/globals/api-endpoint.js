/* eslint-disable import/extensions */
import CONFIG from './config.js';

const API_ENDPOINT = {
  HOME_RESTORAN: `${CONFIG.BASE_URL}list`,
  ADD_REVIEW: `${CONFIG.BASE_URL}review`,
  SEARCH_RESTORAN: `${CONFIG.BASE_URL}search?q=<query>`,
  DETAIL: (id) => `${CONFIG.BASE_URL}detail/${id}`,
};

export default API_ENDPOINT;
