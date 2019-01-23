import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Socials from '../../src/components/Socials';
import routes from '../../src/router/';

describe('Header.vue', () => {
  let actions;
  let store;
  let state;
  let mutations;
  let getters;
  let router;
  let vm;
  let localVue;
  let mockedRoute;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();

    actions = {};

    mutations = {};

    state = {
      tweets: [{ id: 0, title: 'Good news' }],
      isLoading: false,
      movieReviews: [{ id: 0, title: 'Good movie' }],
    };

    getters = {
      getTweets: state => state.tweets,
      getLoadingState: state => state.isLoading,
      getMovieReviews: state => state.movieReviews,
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
    vm = shallowMount(Socials, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test isTwitterPostsVisible computed', () => {
    it('return true if array isnt empty and route.name !== movie', () => {
      vm = shallowMount(Socials, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.isTwitterPostsVisible).toEqual(true);
    });

    it('return false if array empty and route.name !== movie', () => {
      vm = shallowMount(Socials, {
        store,
        localVue,
        router,
      }).vm;
      state.tweets = [];
      expect(vm.isTwitterPostsVisible).toEqual(false);
    });

    it('return false if array isnt empty and route.name === movie', () => {
      mockedRoute = { name: 'movie' };
      vm = shallowMount(Socials, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(vm.isTwitterPostsVisible).toEqual(false);
    });
  });

  describe('test isSocialsVisible computed', () => {
    it('return true if array isnt empty and route.name === movie and isnt loading', () => {
      mockedRoute = { name: 'movie' };
      vm = shallowMount(Socials, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      state.loadingState = false;
      state.movieRevies = [{ id: 0, title: 'Good Movie' }];
      expect(vm.isSocialsVisible).toEqual(true);
    });
  });

  describe('test getPageTitle computed', () => {
    it('return Last reviews if route.name === movie', () => {
      mockedRoute = { name: 'movie' };
      vm = shallowMount(Socials, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(vm.getPageTitle).toEqual('Last reviews');
    });
    it('return Last news if route.name !== movie', () => {
      vm = shallowMount(Socials, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getPageTitle).toEqual('Last news');
    });
  });
});
