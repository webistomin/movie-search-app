import {shallowMount, createLocalVue, mount} from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../../src/App'
import sharedMutations from '../../src/store/mutations'

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('App.vue', () => {
  let actions;
  let store;
  let state;
  let mutations;
  let router;

  beforeEach(() => {
    actions = {
      fetchTweets: jest.fn(),
      fetchGenresList: jest.fn(),
      fetchRequestToken: jest.fn(),
      fetchUserDetails: jest.fn(),
      fetchNewSession: jest.fn(),
    };
    state = {
      genres: [],
      requestToken: null,
    };
    mutations = sharedMutations;
    store = new Vuex.Store({
      state,
      actions,
      mutations,
    });
    router = new VueRouter()
  });

  it('При создании вызывается "fetchTweets"', () => {
    const wrapper = shallowMount(App, { store, router, localVue })
    expect(actions.fetchTweets).toHaveBeenCalled()
  });

  it('При создании вызывается "fetchGenresList", если нет в localStorage', () => {
    const wrapper = shallowMount(App, { store, router, localVue });
    if (!localStorage.genresList) {
      expect(actions.fetchGenresList).toHaveBeenCalled()
    }
  });

  it('Если в localStorage есть жанры, то берутся оттуда', () => {
    const wrapper = shallowMount(App, { store, router, localVue });
    localStorage.setItem('genresList', JSON.stringify([{id: 28, name: "Action"}]));

    if (localStorage.getItem('genresList')) {
      mutations.setGenresList(state, JSON.parse(localStorage.getItem('genresList')))
    } else {
      expect(actions.fetchGenresList).toHaveBeenCalled()
    }

    expect(state.genres).toEqual([{id: 28, name: "Action"}]);
  });

  it('Если approved, то установить сессию', () => {
    const wrapper = shallowMount(App, {store, router, localVue});

    (function name() {
      return router.push({query: {approved: true}})
    }());

    if (wrapper.vm.$route.query.approved === true) {
      expect(actions.fetchNewSession).toHaveBeenCalled()
    }
  });

  // it('Если в localStorage есть sessionID, то берутся оттуда', () => {
  //   const wrapper = shallowMount(App, {store, router, localVue});
  //   localStorage.clear();
  //
  //   localStorage.setItem('sessionId', JSON.stringify([{id: 28, name: "Action"}]));
  //
  //   if (localStorage.getItem('sessionId')) {
  //     expect(actions.fetchUserDetails).toHaveBeenCalled()
  //   }
  // });

  it('Если нет реквест токена, то вызывается action "fetchRequestToken"', () => {
    const wrapper = shallowMount(App, {store, router, localVue});
    if (!sessionStorage.getItem('requestToken')) {
      expect(actions.fetchRequestToken).toHaveBeenCalled()
    }
  })

  it('Если есть реквест токен, то берется из sessionStorage', () => {
    const wrapper = shallowMount(App, {store, router, localVue});
    sessionStorage.setItem('requestToken', JSON.stringify('qwerty123'));
    if (sessionStorage.requestToken) {
      mutations.setRequestToken(state, JSON.parse(sessionStorage.getItem('requestToken')));
      expect(state.requestToken).toEqual('qwerty123');
    }
  })

});
