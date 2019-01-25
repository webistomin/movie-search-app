import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import SocialsList from '../../../src/components/SocialsList';
import routes from '../../../src/router/';

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
      isLoading: false,
    };

    getters = {
      getLoadingState: state => state.isLoading,
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
    vm = shallowMount(SocialsList, {
      store,
      localVue,
      router,
      propsData: {
        reviewsList: [{ id: 0, content: 'Good movie', author: 'Alexey' }],
      },
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  describe('test isListVisible computed', () => {
    it('return true if array isnt empty and isnt loading', () => {
      vm = shallowMount(SocialsList, {
        store,
        localVue,
        router,
        propsData: {
          reviewsList: [{ id: 0, content: 'Good movie', author: 'Alexey' }],
        },
      }).vm;
      state.loadingState = false;
      expect(vm.isListVisible).toEqual(true);
    });
  });
});
