import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BestMovies from '../../../src/components/BestMovies';
import routes from '../../../src/router/';

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
      fetchPopularMovies: jest.fn().mockImplementation(() => Promise.resolve('called')),
    };

    mutations = {
      setLoadingState: (state, payload) => {
        state.loadingState = payload;
      },
    };

    state = {
      loadingState: null,
      popularMovies: [{ id: 0, title: 'Prison Break' }],
    };

    getters = {
      getPopularMovies: state => state.popularMovies,
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
    vm = shallowMount(BestMovies, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test "fetchPopularMovies" action', () => {
    it('if route.name !== "popular", then call action', () => {
      vm = shallowMount(BestMovies, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchPopularMovies).toHaveBeenCalled();
    });

    it('if route.name === "popular", then doesnt call action', () => {
      mockedRoute = { path: '/popular', name: 'popular' };
      vm = shallowMount(BestMovies, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(actions.fetchPopularMovies).not.toHaveBeenCalled();
    });

    it('if route.name !== "popular" and !== "movie", then commit mutation', async () => {
      mockedRoute = { path: '/', name: 'Home' };
      vm = shallowMount(BestMovies, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      await actions.fetchPopularMovies;
      expect(state.loadingState).toEqual(false);
    });

    it('if route.name === "movie", then doesnt commit mutation', async () => {
      mockedRoute = { path: '/movie/297802', name: 'movie' };
      vm = shallowMount(BestMovies, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      await actions.fetchPopularMovies;
      expect(state.loadingState).toEqual(null);
    });

    it('getPopularMovies getter work correctly', () => {
      vm = shallowMount(BestMovies, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getPopularMovies).toEqual([{ id: 0, title: 'Prison Break' }]);
    });
  });
});
