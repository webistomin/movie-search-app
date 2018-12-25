import axios from 'axios';

export default {
  state: {
    personalAPIKey: '52217232f795bbefbb1b7c951aae98ad',
  },
  mutations: {},
  actions: {
    fetchNowPlayingMovies({ state }) {
      axios
        .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${state.personalAPIKey}&language=en-US&page=1`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {},
};
