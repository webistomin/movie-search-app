import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NavigationPage from '../../src/components/NavigationPage';
import routes from '../../src/router/';

describe('BestMovies.vue', () => {
  let actions;
  let store;
  let state;
  let mutations;
  let getters;
  let router;
  let vm;
  let mockedRoute;
  let localVue;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();

    actions = {
      fetchNowPlayingMovies: jest.fn(),
      fetchMoviesWithSearchQuery: jest.fn(),
      fetchTopRatedMovies: jest.fn(),
      fetchUpcomingMovies: jest.fn(),
      fetchFavoriteMovies: jest.fn(),
      fetchPopularMovies: jest.fn().mockImplementation(() => Promise.resolve('called')),
    };

    mutations = {
      setLoadingState: (state, payload) => {
        state.loadingState = payload;
      },
    };

    state = {
      loadingState: false,
      nowPlayingMovies: [],
      popularMovies: [],
      favoriteMovies: [],
      upcomingMovies: [],
      topRatedMovies: [],
      searchMovies: [],
    };

    getters = {
      getNowPlayingMovies: state => state.nowPlayingMovies,
      getPopularMovies: state => state.popularMovies,
      getFavoriteMovies: state => state.favoriteMovies,
      getUpcomingMovies: state => state.upcomingMovies,
      getTopRatedMovies: state => state.topRatedMovies,
      getSearchMovies: state => state.searchMovies,
    };

    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters,
    });

    localVue = createLocalVue();
    localVue.use(Vuex);
    router = routes;
  });

  it('Matches snapshot', () => {
    vm = shallowMount(NavigationPage, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  it('set default data', () => {
    vm = shallowMount(NavigationPage, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.isBusy).toEqual(false);
  });

  describe('test created hook', () => {
    it('fetch Now Playing movies if route.meta.title === Now Playing', () => {
      mockedRoute = { meta: { title: 'Now Playing' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(actions.fetchNowPlayingMovies).toHaveBeenCalled();
    });
    it('doesnt fetch Now Playing movies if route.meta.title === Now Playing and array is not empty', () => {
      state.nowPlayingMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'Now Playing' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(false);
      expect(actions.fetchNowPlayingMovies).not.toHaveBeenCalled();
    });

    it('fetch Popular movies if route.meta.title === Popular', async () => {
      mockedRoute = { meta: { title: 'Popular' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(await actions.fetchPopularMovies).toHaveBeenCalled();
    });
    it('doesnt fetch Popular movies if route.meta.title === Popular and array is not empty', async () => {
      state.popularMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'Popular' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(false);
      expect(await actions.fetchPopularMovies).not.toHaveBeenCalled();
    });
    it('use then hook if route.name !== "movie"', async () => {
      mockedRoute = { meta: { title: 'Popular' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(await actions.fetchPopularMovies).toHaveBeenCalled();
      expect(state.loadingState).toEqual(false);
    });
    it('doesnt use then hook if route.name === "movie"', async () => {
      mockedRoute = { meta: { title: 'Popular' }, name: 'movie' };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(await actions.fetchPopularMovies).toHaveBeenCalled();
      expect(state.loadingState).toEqual(true);
    });

    it('fetch Top Rated movies if route.meta.title === Top Rated', () => {
      mockedRoute = { meta: { title: 'Top Rated' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(actions.fetchTopRatedMovies).toHaveBeenCalled();
    });
    it('doesnt fetch Top Rated movies if route.meta.title === Top Rated and array is not empty', () => {
      state.topRatedMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'Top Rated' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(false);
      expect(actions.fetchTopRatedMovies).not.toHaveBeenCalled();
    });

    it('fetch Upcoming movies if route.meta.title === Upcoming', () => {
      mockedRoute = { meta: { title: 'Upcoming' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(actions.fetchUpcomingMovies).toHaveBeenCalled();
    });
    it('doesnt fetch Upcoming movies if route.meta.title === Upcoming and array is not empty', () => {
      state.upcomingMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'Upcoming' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(false);
      expect(actions.fetchUpcomingMovies).not.toHaveBeenCalled();
    });

    it('fetch Favorite movies if route.meta.title === Favorite', () => {
      mockedRoute = { meta: { title: 'Favorite' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(actions.fetchFavoriteMovies).toHaveBeenCalled();
    });
    it('doesnt fetch Favorite movies if route.meta.title === Favorite and array is not empty', () => {
      state.favoriteMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'Favorite' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(false);
      expect(actions.fetchFavoriteMovies).not.toHaveBeenCalled();
    });

    it('fetch Search results movies if route.meta.title === Search results', () => {
      mockedRoute = { meta: { title: 'Search results' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(actions.fetchMoviesWithSearchQuery).toHaveBeenCalled();
    });
    it('doesnt fetch Search results movies if route.meta.title === Search results and array is not empty', () => {
      state.searchMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'Search results' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(actions.fetchMoviesWithSearchQuery).not.toHaveBeenCalled();
    });

    it('fetch Popular movies if default', async () => {
      mockedRoute = { meta: { title: 'default' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(true);
      expect(await actions.fetchPopularMovies).toHaveBeenCalled();
    });
    it('doesnt fetch Popular movies if default and array is not empty', async () => {
      state.popularMovies.push({ id: 0, title: 'Prison Break' });
      mockedRoute = { meta: { title: 'default' } };
      vm = shallowMount(NavigationPage, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(state.loadingState).toEqual(false);
      expect(await actions.fetchPopularMovies).not.toHaveBeenCalled();
    });
  });
});
