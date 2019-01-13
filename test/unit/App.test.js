import { shallowMount, createLocalVue, config } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../../src/App'
import mutations from '../../src/store/mutations'

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

describe('App.vue', () => {
  let actions;
  let store;
  let state;
  // let mutations;
  let router;

  beforeEach(() => {
    actions = {
      fetchTweets: jest.fn(),
      fetchGenresList: jest.fn(),
      fetchRequestToken: jest.fn(),
      fetchUserDetails: jest.fn(),
    };
    state = {
      genres: []
    };
    store = new Vuex.Store({
      state,
      actions,
      // mutations,
    });
    router = new VueRouter()
  });

  // it('При создании вызывается "fetchTweets"', () => {
  //   const wrapper = shallowMount(App, { store, router, localVue })
  //   expect(actions.fetchTweets).toHaveBeenCalled()
  // });

  // it('При создании вызывается "fetchGenresList"', () => {
  //   const wrapper = shallowMount(App, { store, router, localVue })
  //   expect(actions.fetchGenresList).toHaveBeenCalled()
  // });

  it('Если в localStorage есть жанры, то берутся оттуда', () => {
    const wrapper = shallowMount(App, { store, router, localVue });
    localStorage.setItem('genresList', [{id: 28, name: "Action"}]);

    if (localStorage.getItem('genresList')) {
      mutations.setGenresList(state, localStorage.getItem('genresList'))
      expect(actions.fetchGenresList).toHaveBeenCalled()
    }

    expect(state.genres).toEqual([{id: 28, name: "Action"}]);
  });

  // it('Если в localStorage есть sessionID, то берутся оттуда', () => {
  //   const wrapper = shallowMount(App, { store, router, localVue});
  //
  //   localStorage.setItem('sessionId', 123);
  //
  //   if (localStorage.getItem('sessionId')) {
  //     expect(actions.fetchUserDetails).toHaveBeenCalled()
  //   }
  // });
  //
  // it('При создании вызывается "fetchRequestToken"', () => {
  //   const wrapper = shallowMount(App, { store, router, localVue })
  //   expect(actions.fetchRequestToken).toHaveBeenCalled()
  // })


})
