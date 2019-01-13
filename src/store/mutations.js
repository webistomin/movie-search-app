export default {
  setGenresList(state, payload) {
    state.genres = payload;
  },
  setRequestToken(state, payload) {
    state.requestToken = payload;
  },
  setAuthorizeState(state, payload) {
    state.isAuthorized = payload;
  },
  setSessionId(state, payload) {
    state.sessionId = payload;
  },
};
