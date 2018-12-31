import Vue from 'vue';
import Vuex from 'vuex';
import shared from './shared';
import nowPlayingMovies from './nowPlayingMovies';
import popularMovies from './popularMovies';
import topRatedMovies from './topRatedMovies';
import upcomingMovies from './upcomingMovies';
import moviePage from './moviePage';
import userDetails from './userDetails';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    shared,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    moviePage,
    userDetails,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  strict: process.env.NODE_ENV !== 'production',
});

export default store;
