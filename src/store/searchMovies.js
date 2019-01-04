import axios from 'axios';

export default {
  state: {
    searchQuery: '',
    currentPage: 1,
    totalPages: null,
    searchMovies: [],
  },
  mutations: {
    setSearchQuery(state, payload) {
      state.searchQuery = payload;
    },
    setSearchCurrentPage(state) {
      state.currentPage += 1;
    },
    setSearchTotalPages(state, payload) {
      state.totalPages = payload;
    },
    setSearchMovies(state, payload) {
      if (payload.shouldConcat) {
        state.searchMovies = state.searchMovies.concat(payload.movies);
      } else {
        state.searchMovies = payload.movies;
      }
    },
  },
  actions: {
    fetchMoviesWithSearchQuery({ state, commit, rootState }, payload) {
      if (state.searchQuery.length !== 0) {
        const encodedQuery = encodeURI(state.searchQuery);
        axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=${rootState.shared.personalAPIKey}&language=en-US&query=${encodedQuery}&page=${state.currentPage}&include_adult=false`)
          .then((response) => {
            commit('setSearchMovies', {
              movies: response.data.results,
              shouldConcat: payload,
            });
            commit('setSearchTotalPages', response.data.total_pages);
          });
      }
    },
  },
  getters: {
    getSearchQuery(state) {
      return state.searchQuery;
    },
    getSearchCurrentPage(state) {
      return state.currentPage;
    },
    getSearchTotalPages(state) {
      return state.totalPages;
    },
    getSearchMovies(state) {
      return state.searchMovies;
    },
  },
};
