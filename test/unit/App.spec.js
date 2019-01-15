import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '../../src/App';
import routes from '../../src/router/';


describe('App.js', () => {
  let actions;
  let store;
  let state;
  let mutations;
  let router;
  let vm;
  let mockedRoute;
  let localVue;

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    actions = {
      fetchNewSession: jest.fn(),
      fetchNewTweets: jest.fn(),
    };

    store = new Vuex.Store({
      actions,
    });

    localVue = createLocalVue();
    localVue.use(Vuex);
    router = routes;
  });

  describe('test "fetchNewSession" action', () => {
    it('if route.query.approved === true, then call action', () => {
      mockedRoute = { query: { approved: 'true' } };
      vm = shallowMount(App, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(actions.fetchNewSession).toHaveBeenCalled();
    });

    it('if route.query.approved !== true, then doesnt call action', () => {
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchNewSession).not.toHaveBeenCalled();
    });
  });

  describe('test "fetchTweets" action', () => {
    it('call action on created hook', () => {
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchNewTweets).toHaveBeenCalled();
    });
  });
});
