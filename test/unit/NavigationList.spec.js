import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NavigationList from '../../src/components/NavigationList';
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
    vm = shallowMount(NavigationList, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  it('set correct default data', () => {
    vm = shallowMount(NavigationList, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.navigationLinks).toEqual([
      {
        id: 0,
        routePath: '/now-playing',
        iconName: 'icon-calendar',
        title: 'Now Playing',
      },
      {
        id: 1,
        routePath: '/popular',
        iconName: 'icon-popular',
        title: 'Popular',
      },
      {
        id: 2,
        routePath: '/top-rated',
        iconName: 'icon-top',
        title: 'Top Rated',
      },
      {
        id: 3,
        routePath: '/upcoming',
        iconName: 'icon-trailer',
        title: 'Upcoming',
      },
    ]);
  });
});
