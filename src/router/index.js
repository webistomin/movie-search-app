import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import NavigationPage from '../components/NavigationPage';
import NotFound from '../components/NotFound';
import MoviePage from '../components/MoviePage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        noScroll: true,
      },
    },
    {
      path: '/now-playing',
      name: 'now-playing',
      component: NavigationPage,
      meta: {
        title: 'Now Playing',
      },
    },
    {
      path: '/popular',
      name: 'popular',
      component: NavigationPage,
      meta: {
        title: 'Popular',
      },
    },
    {
      path: '/top-rated',
      name: 'top-rated',
      component: NavigationPage,
      meta: {
        title: 'Top Rated',
      },
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: NavigationPage,
      meta: {
        title: 'Upcoming',
      },
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MoviePage,
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        noScroll: true,
      },
    },
  ],
  mode: 'history',
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // },
});

