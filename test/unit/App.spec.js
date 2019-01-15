import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '../../src/App';
import routes from '../../src/router/';
import projectStore from '../../src/store';


describe('App.js', () => {
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
      fetchNewSession: jest.fn(),
      fetchGenresList: jest.fn(),
      fetchRequestToken: jest.fn(),
      fetchTweets: jest.fn(),
      fetchFavoriteMovies: jest.fn(),
    };

    mutations = {
      setRequestToken: (state, payload) => {
        state.requestToken = payload;
      },
      setSessionId: (state, payload) => {
        state.sessionId = payload;
      },
      setFavoriteMovies: (state, payload) => {
        state.favoriteMovies = payload;
      },
    };

    state = {
      requestToken: null,
      sessionId: null,
      favoriteMovies: [],
    };

    getters = {
      getSessionId: state => state.sessionId,
      getFavoriteMovies: state => state.favoriteMovies,
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
      expect(actions.fetchTweets).toHaveBeenCalled();
    });
  });

  describe('test "fetchRequestToken" action', () => {
    it('if there is no request token in sessionStorage, then call action "fetchRequestToken"', () => {
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      sessionStorage.removeItem('requestToken');
      expect(actions.fetchRequestToken).toHaveBeenCalled();
    });

    // it('if there is request token in sessionStorage, then call mutation "setRequestToken"', () => {
    //   vm = shallowMount(App, {
    //     store,
    //     localVue,
    //     router,
    //   }).vm;
    //   sessionStorage.setItem('requestToken', 'qwerty123');
    //   console.log(sessionStorage.getItem('requestToken'));
    //   expect(state.requestToken).toEqual('qwerty123');
    // });
  });

  describe('test "fetchFavoriteMovies" action', () => {
    it('if getSessionId && getFavoriteMovies.length === 0 && $route.name !== "Favorite", then call action "fetchFavoriteMovies"', () => {
      store.commit('setSessionId', 'qwerty123');
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchFavoriteMovies).toHaveBeenCalled();
    });

    it('if there is no sessionId, doesnt call action', () => {
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchFavoriteMovies).not.toHaveBeenCalled();
    });

    it('if there is favorite movies, doesnt call action', () => {
      store.commit('setSessionId', 'qwerty123');
      store.commit('setFavoriteMovies', [{ id: 0, title: 'Prison Break' }]);
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchFavoriteMovies).not.toHaveBeenCalled();
    });

    it('if route.name === favorite, doesnt call action', () => {
      store.commit('setSessionId', 'qwerty123');
      mockedRoute = { path: '/favorite', name: 'Favorite', query: { approved: 'true' } };
      vm = shallowMount(App, {
        store,
        localVue,
        router,
        beforeCreate() {
          this._route = mockedRoute;
        },
      }).vm;
      expect(actions.fetchFavoriteMovies).not.toHaveBeenCalled();
    });
  });

  describe('test "fixCrappyScrollBehavior" on route change', () => {
    jest.useFakeTimers();
    it('call fixCrappyScrollBehavior on route change', () => {
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      vm.$router.push('/now-playing');
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 250);
    });

    it('set scrollTo correct', () => {
      document.body.innerHTML = `
       <div>
        <ul class="movies"></ul>
       </div> 
      `;
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      vm.fixCrappyScrollBehavior();
      expect(document.querySelector('.movies').scrollTop).toEqual(0);
    });
  });
});
