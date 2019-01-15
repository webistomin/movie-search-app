import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '../../src/App';
import routes from '../../src/router/';

describe('App.vue', () => {
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
      fetchUserDetails: jest.fn(),
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
      setGenresList: (state, payload) => {
        state.genresList = payload;
      },
      setAuthorizeState: (state, payload) => {
        state.isAuthorized = payload;
      },
    };

    state = {
      requestToken: null,
      sessionId: null,
      favoriteMovies: [],
      genresList: [],
      isAuthorized: false,
    };

    getters = {
      getSessionId: state => state.sessionId,
      getFavoriteMovies: state => state.favoriteMovies,
      getAuthorizeState: state => state.isAuthorized,
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
    vm = shallowMount(App, {
      store,
      localVue,
      router,
    }).vm;
    expect(vm.$el).toMatchSnapshot();
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
      sessionStorage.removeItem('requestToken');
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchRequestToken).toHaveBeenCalled();
    });

    it('if there is request token in sessionStorage, then call mutation "setRequestToken"', () => {
      sessionStorage.setItem('requestToken', JSON.stringify('qwerty123'));
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(state.requestToken).toEqual('qwerty123');
    });
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

  describe('test "fetchGenresList" action', () => {
    it('if there is no genres list in localStorage, then call action "fetchGenresList"', () => {
      localStorage.removeItem('genresList');
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(actions.fetchGenresList).toHaveBeenCalled();
    });

    it('if there is genres list in sessionStorage, then call mutation "setGenresList"', () => {
      localStorage.setItem('genresList', JSON.stringify({ id: 0, title: 'Action' }));
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(state.genresList).toEqual({ id: 0, title: 'Action' });
    });
  });

  describe('test "fetchUserDetails" action', () => {
    it('if there is sessionId in localStorage, then call action "fetchUserDetails"', () => {
      localStorage.setItem('sessionId', JSON.stringify('qwerty123'));
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(state.isAuthorized).toEqual(true);
      expect(state.sessionId).toEqual('qwerty123');
      expect(actions.fetchUserDetails).toHaveBeenCalled();
    });

    it('if there is no sessionId in localStorage, then action "fetchUserDetails" doest call', () => {
      localStorage.removeItem('sessionId');
      vm = shallowMount(App, {
        store,
        localVue,
        router,
      }).vm;
      expect(state.isAuthorized).toEqual(false);
      expect(state.sessionId).toEqual(null);
      expect(actions.fetchUserDetails).not.toHaveBeenCalled();
    });
  });
});
