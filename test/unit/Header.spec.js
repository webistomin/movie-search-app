import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Header from '../../src/components/Header';
import routes from '../../src/router/';

describe('Header.vue', () => {
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
      fetchMoviesWithSearchQuery: jest.fn().mockImplementation(() => Promise.resolve('called')),
      removeNewSession: jest.fn(),
    };

    mutations = {
      setRequestToken: (state, payload) => {
        state.requestToken = payload;
      },
      setRowView: (state, payload) => {
        state.isRowView = payload;
      },
      setGridView: (state, payload) => {
        state.isGridView = payload;
      },
      setNavigationState: (state, payload) => {
        state.isNavigationOpened = payload;
      },
    };

    state = {
      requestToken: null,
      isRowView: false,
      isGridView: true,
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
    localVue.use(Vuex);
    router = routes;
  });

  it('Matches snapshot', () => {
    vm = shallowMount(Header, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  it('Sets the correct default data', () => {
    vm = shallowMount(Header, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$data.isUserMenuOpened).toEqual(false);
  });

  it('Has a created hook', () => {
    vm = shallowMount(Header, {
      store,
      localVue,
      router,
    }).vm;
    expect(typeof Header.created).toBe('function');
  });

  describe('test "fetchMoviesWithSearchQuery" method', () => {
    it('call "fetchMoviesWithSearchQuery" action', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      vm.fetchMoviesWithSearchQuery();
      expect(actions.fetchMoviesWithSearchQuery).toHaveBeenCalled();
    });

    it('push "/search" to router', async () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      await vm.fetchMoviesWithSearchQuery();
      expect(vm.$route.path).toEqual('/search');
    });
  });

  describe('test "logOut" method', () => {
    it('call "removeNewSession" action', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      vm.logOut();
      expect(actions.removeNewSession).toHaveBeenCalled();
    });
  });

  describe('test "setRowView" method', () => {
    it('commit "setRowView" and "setGridView"', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      vm.setRowView();
      expect(state.isRowView).toEqual(true);
      expect(state.isGridView).toEqual(false);
    });
  });

  describe('test "setGridView" method', () => {
    it('commit "setRowView" and "setGridView"', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      vm.setGridView();
      expect(state.isRowView).toEqual(false);
      expect(state.isGridView).toEqual(true);
    });
  });

  describe('test "toggleAppNavigation" method', () => {
    it('commit "setNavigationState" with false if navigation opened', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      store.commit('setNavigationState', true);
      vm.toggleAppNavigation();
      expect(state.isNavigationOpened).toEqual(false);
    });

    it('commit "setNavigationState" with true if navigation closed', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      store.commit('setNavigationState', false);
      vm.toggleAppNavigation();
      expect(state.isNavigationOpened).toEqual(true);
    });
  });
});
