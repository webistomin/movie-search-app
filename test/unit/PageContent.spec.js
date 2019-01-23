import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import PageContent from '../../src/components/PageContent';
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
      isLoading: false,
      message: 'Hello',
    };

    getters = {
      getLoadingState: state => state.isLoading,
      getMessage: state => state.message,
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
    vm = shallowMount(PageContent, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  it('Sets the correct default data', () => {
    vm = shallowMount(PageContent, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$data.isScrolled).toEqual(false);
    expect(vm.$data.timer).toEqual(null);
  });

  describe('test "getMessage" computed', () => {
    it('return message if it exists', () => {
      vm = shallowMount(PageContent, {
        store,
        localVue,
        router,
      }).vm;
      expect(vm.getMessage).toEqual('Hello');
    });
  });

  describe('test "isNoScroll" computed', () => {
    it('return true if meta.noScroll exists', () => {
      mockedRoute = { meta: { noScroll: true } };
      vm = shallowMount(PageContent, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(vm.isNoScroll).toEqual(true);
    });
  });

  describe('test "onScrolling" method', () => {
    jest.useFakeTimers();
    it('set "isScrolled " while scrolling', () => {
      vm = shallowMount(PageContent, {
        store,
        localVue,
        router,
      }).vm;
      vm.onScrolling();
      expect(vm.$data.isScrolled).toEqual(true);
      setTimeout(() => {
        expect(vm.$data.isScrolled).toEqual(false);
      }, 100);
      jest.runAllTimers();
    });
  });
});
