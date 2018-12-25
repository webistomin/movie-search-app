<template>
  <div>
    <h2 class="movies__title">{{$route.meta.title}}</h2>
    <MoviesList :moviesList="getNowPlayingMovies" v-if="getNowPlayingMovies"></MoviesList>
  </div>
</template>

<script>
  import MoviesList from './MoviesList';

  export default {
    name: 'NavigationPage',
    components: { MoviesList },
    mounted() {
      if (this.$route.meta.title === 'Now Playing') {
        this.$store.commit('setLoadingState', true);
        this.$store.dispatch('fetchNowPlayingMovies');
      }
    },
    computed: {
      getLoadingState() {
        return this.$store.getters.getLoadingState;
      },
      getNowPlayingMovies() {
        return this.$store.getters.getNowPlayingMovies;
      },
    },
  };
</script>

<style>

</style>
