import {shallowMount, createLocalVue } from '@vue/test-utils'
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
    localStorage.clear();

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
      sessionId: null,
      isAuthorized: null,
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
    const wrapper = shallowMount(App, { store, router, localVue });
    actions.fetchTweets();
    
    expect(actions.fetchTweets).toHaveBeenCalled()
  });

  it('При создании вызывается "fetchGenresList", если нет в localStorage', () => {
    const wrapper = shallowMount(App, { store, router, localVue });
    if (!localStorage.genresList) {
      actions.fetchGenresList();
    }

    expect(actions.fetchGenresList).toHaveBeenCalled()
  });

  it('Если в localStorage есть жанры, то берутся оттуда', () => {
    const wrapper = shallowMount(App, { store, router, localVue });
    localStorage.setItem('genresList', JSON.stringify([{id: 28, name: "Action"}]));

    if (localStorage.getItem('genresList')) {
      mutations.setGenresList(state, JSON.parse(localStorage.getItem('genresList')));
    }

    expect(state.genres).toEqual([{id: 28, name: "Action"}]);
  });

  it('Если approved, то установить сессию', () => {
    const wrapper = shallowMount(App, {store, router, localVue});

    (function name() {
      return router.push({query: {approved: 'true'}})
    }());

    if (wrapper.vm.$route.query.approved === 'true') {
      actions.fetchNewSession();
    }

    expect(actions.fetchNewSession).toHaveBeenCalled()
  });

  it('Если в localStorage есть sessionID, то берутся оттуда', () => {
    const wrapper = shallowMount(App, {store, router, localVue});

    localStorage.setItem('sessionId', JSON.stringify('qwerty1'));

    if (localStorage.sessionId) {
      store.commit('setSessionId', JSON.parse(localStorage.sessionId));
      store.commit('setAuthorizeState', true);
      store.dispatch('fetchUserDetails');

      mutations.setSessionId(state, JSON.parse(localStorage.sessionId));
      mutations.setAuthorizeState(state, true);
      actions.fetchUserDetails();
    }

    expect(actions.fetchUserDetails).toHaveBeenCalled();
    expect(state.sessionId).toEqual('qwerty1');
    expect(state.isAuthorized).toEqual(true);
  });

  it('Если нет реквест токена, то вызывается action "fetchRequestToken"', () => {
    const wrapper = shallowMount(App, {store, router, localVue});
    if (!sessionStorage.getItem('requestToken')) {
      actions.fetchRequestToken();
    }

    expect(actions.fetchRequestToken).toHaveBeenCalled()
  });

  it('Если есть реквест токен, то берется из sessionStorage', () => {
    const wrapper = shallowMount(App, {store, router, localVue});
    sessionStorage.setItem('requestToken', JSON.stringify('qwerty123'));

    if (sessionStorage.requestToken) {
      mutations.setRequestToken(state, JSON.parse(sessionStorage.getItem('requestToken')));
    }

    expect(state.requestToken).toEqual('qwerty123');
  });

});
