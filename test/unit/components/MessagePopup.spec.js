import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MessagePopup from '../../../src/components/MessagePopup';
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

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.resetModules();

    actions = {
      fetchMoviesWithSearchQuery: jest.fn().mockImplementation(() => Promise.resolve('called')),
    };

    mutations = {
      setRequestToken: (state, payload) => {
        state.requestToken = payload;
      },
      setMessage: (state, payload) => {
        state.message = payload;
      },
    };

    state = {
      requestToken: null,
      message: 'hello',
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
    vm = shallowMount(MessagePopup, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
  });

  it('Sets the correct default data', () => {
    vm = shallowMount(MessagePopup, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$data.timeout).toEqual(null);
    expect(vm.$data.isStarted).toEqual(false);
  });

  describe('test "removeMessage" method', () => {
    it('commit "setMessage" with null', () => {
      vm = shallowMount(MessagePopup, {
        store,
        localVue,
        router,
      }).vm;
      vm.removeMessage();
      expect(state.message).toEqual(null);
    });
  });

  describe('test "setMessageTimeout" method', () => {
    jest.useFakeTimers();
    it('commit "setMessage" after timeout', () => {
      vm = shallowMount(MessagePopup, {
        store,
        localVue,
        router,
      }).vm;
      vm.setMessageTimeout();
      expect(vm.$data.isStarted).toEqual(true);
      expect(vm.$data.timeout).toEqual(1);
      setTimeout(() => {
        expect(vm.$data.isStarted).toEqual(false);
        expect(state.message).toEqual(null);
      }, 5000);
      jest.runAllTimers();
    });
  });

  describe('test "updated" hook', () => {
    it('Has a updated hook', () => {
      vm = shallowMount(MessagePopup, {
        store,
        localVue,
        router,
      }).vm;
      expect(typeof MessagePopup.updated).toBe('function');
    });

    jest.useFakeTimers();
    it('clear timeout if started', () => {
      vm = shallowMount(MessagePopup, {
        store,
        localVue,
        router,
      }).vm;
      vm.isStarted = true;
      vm.$forceUpdate();
      expect(clearTimeout).toHaveBeenCalled();
    });

    it('doest clear timeout if not started', () => {
      vm = shallowMount(MessagePopup, {
        store,
        localVue,
        router,
      }).vm;
      vm.isStarted = false;
      vm.$forceUpdate();
      expect(clearTimeout).not.toHaveBeenCalled();
    });
  });
});
