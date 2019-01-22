import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Navigation from '../../src/components/Navigation';
import routes from '../../src/router/';
import { priceFilter, dateFilter } from '../../src/assets/js/filters';

describe('Header.vue', () => {
  let actions;
  let store;
  let state;
  let mutations;
  let getters;
  let router;
  let vm;
  let localVue;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();

    actions = {
      fetchMovieDetails: jest.fn(),
    };

    mutations = {
      setLoadingState: (state, payload) => {
        state.loadingState = payload;
      },
    };

    state = {
      isNavigationOpened: false,
    };

    getters = {
      getNavigationState: state => state.isNavigationOpened,
    };

    store = new Vuex.Store({
      state,
      mutations,
      actions,
      getters,
    });

    localVue = createLocalVue();
    localVue.filter('getFormattedPrice', priceFilter);
    localVue.filter('getFormattedDate', dateFilter);
    localVue.use(Vuex);
    router = routes;
  });

  it('Matches snapshot', () => {
    vm = shallowMount(Navigation, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test "getNavigationClass" computed', () => {
    it('return "main-nav--opened" if nav opened', () => {
      vm = shallowMount(Navigation, {
        store,
        localVue,
        router,
      }).vm;
      state.isNavigationOpened = true;
      expect(vm.getNavigationClass).toEqual('main-nav--opened');
    });

    it('return "main-nav--closed" if nav closed', () => {
      vm = shallowMount(Navigation, {
        store,
        localVue,
        router,
      }).vm;
      state.isNavigationOpened = false;
      expect(vm.getNavigationClass).toEqual('main-nav--closed');
    });
  });
});
