import twitterFetcher from 'twitter-fetcher';

export default {
  state: {
    tweets: [],
  },
  mutations: {
    setTweets(state, payload) {
      state.tweets = payload;
    },
  },
  actions: {
    fetchTweets({ commit }) {
      const config = {
        profile: { screenName: 'themoviedb' },
        domId: '',
        maxTweets: 20,
        enableLinks: true,
        showUser: true,
        showTime: true,
        showImages: false,
        dateFunction: '',
        showRetweet: false,
        customCallback: (tweets) => {
          commit('setTweets', tweets);
        },
        showInteraction: true,
      };
      twitterFetcher.fetch(config);
    },
  },
  getters: {
    getTweets(state) {
      return state.tweets;
    },
  },
};
