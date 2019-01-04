import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import NavigationPage from '../components/NavigationPage';
import NotFound from '../components/NotFound';
import MoviePage from '../components/MoviePage';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        noScroll: true,
        title: 'Home',
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
        title: 'Sorry. Page not found.',
        noScroll: true,
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: NavigationPage,
      meta: {
        title: 'Search results',
      },
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: NavigationPage,
      meta: {
        title: 'Favorite',
      },
      beforeEnter(to, from, next) {
        if (!localStorage.sessionId) {
          next('/');
        }
        next();
      },
    },
  ],
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'movie') {
    document.title = `${to.meta.title} | TMDb: Movie Searcher`;
  }
  next();
});

export default router;

