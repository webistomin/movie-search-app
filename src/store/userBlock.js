import axios from 'axios';

export default {
  state: {
    userDetails: [],
    favoriteMovies: [],
    currentPage: 1,
    totalPages: null,
  },
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload;
    },
    setFavoriteMovies(state, payload) {
      if (payload.shouldConcat) {
        state.favoriteMovies = state.favoriteMovies.concat(payload.movies);
      } else {
        state.favoriteMovies = payload.movies;
      }
    },
    setFavoriteCurrentPage(state) {
      state.currentPage += 1;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload;
    },
  },
  actions: {
    async markMovieAsFavorite({ commit, rootState, state }, payload) {
      const userId = state.userDetails.id;
      const personalAPIKey = rootState.shared.personalAPIKey;
      const sessionID = rootState.shared.sessionId;
      const message = payload.favoriteState ? 'Film has been added to favorite list' : 'Film has been removed from favorite list';
      await axios
        .post(`https://api.themoviedb.org/3/account/${userId}/favorite?api_key=${personalAPIKey}&session_id=${sessionID}`,
          {
            media_type: 'movie',
            media_id: payload.movieID,
            favorite: payload.favoriteState,
          })
        .then(() => {
          commit('setMessage', message);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    fetchUserDetails({ commit, rootState }) {
      axios
        .get(`https://api.themoviedb.org/3/account?api_key=${rootState.shared.personalAPIKey}&session_id=${rootState.shared.sessionId}`)
        .then((response) => {
          commit('setUserDetails', response.data);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
    async fetchFavoriteMovies({ commit, rootState, state }, payload) {
      const accountID = state.userDetails.id;
      await axios
        .get(`https://api.themoviedb.org/3/account/${accountID}/favorite/movies?api_key=${rootState.shared.personalAPIKey}&session_id=${rootState.shared.sessionId}&language=en-US&sort_by=created_at.asc&page=${state.currentPage}`)
        .then((response) => {
          commit('setFavoriteMovies', {
            movies: response.data.results,
            shouldConcat: payload,
          });
          commit('setTotalPages', response.data.total_pages);
          commit('setLoadingState', false);
        })
        .catch((error) => {
          commit('setErrorMessage', error.message);
        });
    },
  },
  getters: {
    getUserDetails(state) {
      return state.userDetails;
    },
    getFavoriteMovies(state) {
      return state.favoriteMovies;
    },
    getFavoriteTotalPages(state) {
      return state.totalPages;
    },
    getFavoriteCurrentPage(state) {
      return state.currentPage;
    },
  },
};
