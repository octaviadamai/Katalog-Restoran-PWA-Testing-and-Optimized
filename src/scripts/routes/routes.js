import Home from '../views/pages/home';
import Detail from '../views/pages/detail';
import Favorite from '../views/pages/like';

const routes = {
  '/': Home, // default page
  '/list': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

export default routes;
