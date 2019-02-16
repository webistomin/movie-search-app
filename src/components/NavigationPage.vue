<template>
  <div class="movies__wrapper">
    <h2 class="movies__title">{{$route.meta.title}}</h2>
    <MoviesList :moviesList="getMoviesForCurrentRoute"
                v-if="getMoviesForCurrentRoute"
                v-infinite-scroll="fetchMoreMovies"
                infinite-scroll-disabled="isBusy"
                infinite-scroll-distance="50"
                :infinite-scroll-immediate-check="true"/>
    <p class="movies__error" v-else>Nothing found :(</p>
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
    created() {
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
            this.$store.dispatch('fetchPopularMovies')
              .then(() => {
                if (this.$route.name !== 'movie') {
                  this.$store.commit('setLoadingState', false);
                }
              });
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
        case 'Favorite':
          if (this.$store.getters.getFavoriteMovies.length === 0) {
            this.$store.commit('setLoadingState', true);
            this.$store.dispatch('fetchFavoriteMovies', true);
          }
          break;
        case 'Search results':
          if (this.$store.getters.getSearchMovies.length === 0) {
            this.$store.dispatch('fetchMoviesWithSearchQuery', true);
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
          case 'Favorite':
            return this.$store.getters.getFavoriteMovies;
          case 'Search results':
            return this.$store.getters.getSearchMovies;
          default:
            return this.$store.getters.getPopularMovies;
        }
      },
      getLoadingState() {
        return this.$store.getters.getLoadingState;
      },
      getFavoriteCurrentPage() {
        return this.$store.getters.getFavoriteCurrentPage;
      },
      getFavoriteTotalPages() {
        return this.$store.getters.getFavoriteTotalPages;
      },
      getNowPlayingCurrentPage() {
        return this.$store.getters.getNowPlayingCurrentPage;
      },
      getNowPlayingTotalPages() {
        return this.$store.getters.getNowPlayingTotalPages;
      },
      getPopularCurrentPage() {
        return this.$store.getters.getPopularCurrentPage;
      },
      getPopularTotalPages() {
        return this.$store.getters.getPopularTotalPages;
      },
      getTopRatedCurrentPage() {
        return this.$store.getters.getTopRatedCurrentPage;
      },
      getTopRatedTotalPages() {
        return this.$store.getters.getTopRatedTotalPages;
      },
      getUpcomingCurrentPage() {
        return this.$store.getters.getUpcomingCurrentPage;
      },
      getUpcomingTotalPages() {
        return this.$store.getters.getUpcomingTotalPages;
      },
      getSearchCurrentPage() {
        return this.$store.getters.getSearchCurrentPage;
      },
      getSearchTotalPages() {
        return this.$store.getters.getSearchTotalPages;
      },
    },
    methods: {
      fetchMoreMovies() {
        this.isBusy = true;
        switch (this.$route.meta.title) {
          case 'Now Playing':
            if (this.getNowPlayingCurrentPage < this.getNowPlayingTotalPages) {
              this.$store.commit('setNowPlayingCurrentPage');
              this.$store.dispatch('fetchNowPlayingMovies')
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
          case 'Popular':
            if (this.getPopularCurrentPage < this.getPopularTotalPages) {
              this.$store.commit('setPopularCurrentPage');
              this.$store.dispatch('fetchPopularMovies')
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
          case 'Top Rated':
            if (this.getTopRatedCurrentPage < this.getTopRatedTotalPages) {
              this.$store.commit('setTopRatedCurrentPage');
              this.$store.dispatch('fetchTopRatedMovies')
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
          case 'Upcoming':
            if (this.getUpcomingCurrentPage < this.getUpcomingTotalPages) {
              this.$store.commit('setUpcomingCurrentPage');
              this.$store.dispatch('fetchUpcomingMovies')
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
          case 'Favorite':
            if (this.getFavoriteCurrentPage < this.getFavoriteTotalPages) {
              this.$store.commit('setFavoriteCurrentPage');
              this.$store.dispatch('fetchFavoriteMovies', true)
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
          case 'Search results':
            if (this.getSearchCurrentPage < this.getSearchTotalPages) {
              this.$store.commit('setSearchCurrentPage');
              this.$store.dispatch('fetchMoviesWithSearchQuery', true)
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
          default:
            if (this.getPopularCurrentPage < this.getPopularTotalPages) {
              this.$store.commit('setPopularCurrentPage');
              this.$store.dispatch('fetchPopularMovies')
                .then(() => {
                  this.isBusy = false;
                });
            }
            break;
        }
      },
    },
  };
</script>

<style lang="sass">
  .movies

    &__title
      font-family: $font-family--secondary
      text-transform: uppercase
      color: $color-text--secondary
      text-align: center
      font-size: 20px
      margin: 0
      padding-top: 20px
      margin-bottom: 10px


    &__error
      font-size: 14px
      text-align: center
      padding: 20px
      color: $color-text--secondary

</style>
