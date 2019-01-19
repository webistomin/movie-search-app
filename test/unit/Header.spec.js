import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
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
      setSearchQuery: (state, payload) => {
        state.searchQuery = payload;
      },
    };

    state = {
      requestToken: null,
      isRowView: false,
      isGridView: true,
      isNavigationOpened: false,
      userDetails: { avatar: { gravatar: { hash: 'qwerty123' } } },
      searchQuery: null,
    };

    getters = {
      getNavigationState: state => state.isNavigationOpened,
      getUserDetails: state => state.userDetails,
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

  describe('test "toggleUserMenu" method', () => {
    it('set "isUserMenuOpened" to contrasting value', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      vm.toggleUserMenu();
      expect(vm.$data.isUserMenuOpened).toEqual(true);
    });
  });

  describe('test "getAvatarSrc" computed', () => {
    it('return correct avatar', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getAvatarSrc).toEqual('https://www.gravatar.com/avatar/qwerty123');
    });
  });

  describe('test "getUserMenuClass" computed', () => {
    it('return "page-header__list--opened" if user menu opened', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
        data() {
          return {
            isUserMenuOpened: true,
          };
        },
      }).vm;
      expect(vm.getUserMenuClass).toEqual('page-header__list--opened');
    });

    it('return "page-header__list--closed" if user menu closed', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
        data() {
          return {
            isUserMenuOpened: false,
          };
        },
      }).vm;
      expect(vm.getUserMenuClass).toEqual('page-header__list--closed');
    });
  });

  describe('test "getUserButtonClass" computed', () => {
    it('return "page-header__button--opened" if user menu opened', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
        data() {
          return {
            isUserMenuOpened: true,
          };
        },
      }).vm;
      expect(vm.getUserButtonClass).toEqual('page-header__button--opened');
    });

    it('return "page-header__button--closed" if user menu closed', () => {
      vm = shallowMount(Header, {
        store,
        localVue,
        router,
        data() {
          return {
            isUserMenuOpened: false,
          };
        },
      }).vm;
      expect(vm.getUserButtonClass).toEqual('page-header__button--closed');
    });
  });

  describe('test "searchQuery" computed', () => {
    it('commit "setSearchQuery" after throttling input', () => {
      vm = mount(Header, {
        store,
        localVue,
        router,
      });
      const input = vm.find('.page-header__input');
      input.setValue('Prison break');
      expect(state.searchQuery).toEqual('Prison break');
    });
  });
});
