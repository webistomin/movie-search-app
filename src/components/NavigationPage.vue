<template>
  <div>
    <h2 class="movies__title">{{$route.meta.title}}</h2>
    <MoviesList :moviesList="getMoviesForCurrentRoute"
                v-if="getMoviesForCurrentRoute">
    </MoviesList>
  </div>
</template>

<script>
  import MoviesList from './MoviesList';

  export default {
    name: 'NavigationPage',
    components: { MoviesList },
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
    },
  };
</script>

<style>

</style>
