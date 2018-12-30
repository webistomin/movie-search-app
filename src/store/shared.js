import axios from 'axios';

export default {
  state: {
    personalAPIKey: '52217232f795bbefbb1b7c951aae98ad',
    error: null,
    isLoading: false,
    genres: [],
    isRowView: false,
    isGridView: true,
    isNavigationOpened: false,
    isAuthorized: false,
    requestToken: null,
    sessionId: null,
  },
  mutations: {
    setRequestToken(state, payload) {
      state.requestToken = payload;
    },
    setErrorMessage(state, payload) {
      state.error = payload;
    },
    setLoadingState(state, payload) {
      state.isLoading = payload;
    },
    setGenresList(state, payload) {
      state.genres = payload;
    },
    setRowView(state, payload) {
      state.isRowView = payload;
    },
    setGridView(state, payload) {
      state.isGridView = payload;
    },
    setNavigationState(state, payload) {
      state.isNavigationOpened = payload;
    },
    setAuthorizeState(state, payload) {
      state.isAuthorized = payload;
    },
    setSessionId(state, payload) {
      state.sessionId = payload;
    },
  },
  actions: {
    fetchGenresList({ state, commit }) {
      axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${state.personalAPIKey}&language=en-US`)
        .then((response) => {
          commit('setGenresList', response.data);
          localStorage.genresList = JSON.stringify(response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    fetchRequestToken({ state, commit }) {
      axios
        .get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${state.personalAPIKey}`)
        .then((response) => {
          commit('setRequestToken', response.data.request_token);
          localStorage.requestToken = JSON.stringify(response.data.request_token);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    fetchNewSession({ state, commit }) {
      axios
        .post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${state.personalAPIKey}`, {
          request_token: state.requestToken,
        })
        .then((response) => {
          commit('setSessionId', response.data);
          localStorage.sessionId = JSON.stringify(response.data.session_id);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getSessionId(state) {
      return state.sessionId;
    },
    getRequestToken(state) {
      return state.requestToken;
    },
    getLoadingState(state) {
      return state.isLoading;
    },
    getError(state) {
      return state.error;
    },
    getGenresList(state) {
      return state.genres.genres;
    },
    getRowViewState(state) {
      return state.isRowView;
    },
    getGridViewState(state) {
      return state.isGridView;
    },
    getNavigationState(state) {
      return state.isNavigationOpened;
    },
    getAuthorizeState(state) {
      return state.isAuthorized;
    },
  },
};
