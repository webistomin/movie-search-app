<template>
  <div>
    <h2 class="movies__title">{{$route.meta.title}}</h2>
    <MoviesList :moviesList="getMoviesForCurrentRoute"
                v-if="getMoviesForCurrentRoute"
                v-infinite-scroll="fetchMoreMovies"
                infinite-scroll-disabled="isBusy"
                infinite-scroll-distance="50"
                infinite-scroll-immediate-check="false"/>
  </div>
</template>

<script>
  import infiniteScroll from 'vue-infinite-scroll';
  import MoviesList from './MoviesList';

  export default {
    name: 'NavigationPage',
    data() {
      return {
        isBusy: false,
      };
    },
    components: { MoviesList },
    directives: { infiniteScroll },
    mounted() {
      switch (this.$route.meta.title) {
        case 'Now Playing':
          if (this.$store.getters.getNowPlayingMovies.length === 0) {
            this.$store.commit('setLoadingState', true);
            this.$store.dispatch('fetchNowPlayingMovies');
          }
          break;
        case 'Popular':
          if (this.$store.getters.getPopularMovies.length === 0) {
            this.$store.commit('setLoadingState', true);
            this.$store.dispatch('fetchPopularMovies');
          }
          break;
        case 'Top Rated':
          if (this.$store.getters.getTopRatedMovies.length === 0) {
            this.$store.commit('setLoadingState', true);
            this.$store.dispatch('fetchTopRatedMovies');
          }
          break;
        case 'Upcoming':
          if (this.$store.getters.getUpcomingMovies.length === 0) {
            this.$store.commit('setLoadingState', true);
            this.$store.dispatch('fetchUpcomingMovies');
          }
          break;
        default:
          if (this.$store.getters.getPopularMovies.length === 0) {
            this.$store.commit('setLoadingState', true);
            this.$store.dispatch('fetchPopularMovies');
          }
          break;
      }
    },
    computed: {
      getMoviesForCurrentRoute() {
        switch (this.$route.meta.title) {
          case 'Now Playing':
            return this.$store.getters.getNowPlayingMovies;
          case 'Popular':
            return this.$store.getters.getPopularMovies;
          case 'Top Rated':
            return this.$store.getters.getTopRatedMovies;
          case 'Upcoming':
            return this.$store.getters.getUpcomingMovies;
          default:
            return this.$store.getters.getPopularMovies;
        }
      },
      getLoadingState() {
        return this.$store.getters.getLoadingState;
      },
    },
    methods: {
      fetchMoreMovies() {
        this.isBusy = true;
        switch (this.$route.meta.title) {
          case 'Now Playing':
            this.$store.commit('setNowPlayingCurrentPage');
            this.$store.dispatch('fetchNowPlayingMovies')
              .then(() => {
                this.isBusy = false;
              });
            break;
          case 'Popular':
            this.$store.commit('setPopularCurrentPage');
            this.$store.dispatch('fetchPopularMovies')
              .then(() => {
                this.isBusy = false;
              });
            break;
          case 'Top Rated':
            this.$store.commit('setTopRatedCurrentPage');
            this.$store.dispatch('fetchTopRatedMovies')
              .then(() => {
                this.isBusy = false;
              });
            break;
          case 'Upcoming':
            this.$store.commit('setUpcomingCurrentPage');
            this.$store.dispatch('fetchUpcomingMovies')
              .then(() => {
                this.isBusy = false;
              });
            break;
          default:
            this.$store.commit('setPopularCurrentPage');
            this.$store.dispatch('fetchPopularMovies')
              .then(() => {
                this.isBusy = false;
              });
            break;
        }
      },
    },
  };
</script>

<style>

</style>
