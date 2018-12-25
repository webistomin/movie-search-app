import Vue from 'vue';
import Vuex from 'vuex';
import shared from './shared';
import latestMovies from './latestMovies';
import nowPlayingMovies from './nowPlayingMovies';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    shared,
    latestMovies,
    nowPlayingMovies,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
