<template>
  <li class="movies__item">
    <img :src="movieImg"
         width="185" height="278"
         :alt="movieTitle"
         class="movies__img">
    <div class="movies__block">
      <span class="movies__name">{{movieTitle}}</span>
      <p class="movies__desc">{{movieOverview}}</p>
      <span class="movies__rate">
        <svg class="movies__icon" width="12" height="12">
          <use xlink:href="#icon-like"></use>
        </svg>
        {{movieRate}} average
      </span>
      <time class="movies__date">
        <svg class="movies__icon" width="12" height="12">
          <use xlink:href="#icon-calendar"></use>
        </svg>
        {{movieDate}}
      </time>
      <ul class="movies__genres" v-if="getGenresList">
        <li class="movies__genre"
            v-for="genre of getMovieGenres"
            :key="genre">
          {{genre}}
        </li>
      </ul>
      <router-link :to="`movie/${movieId}`" class="movies__btn btn">More</router-link>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'MovieItem',
    props: {
      movieId: {
        type: Number,
        required: true,
      },
      movieTitle: {
        type: String,
        required: true,
      },
      movieOverview: {
        type: String,
        required: true,
      },
      movieImg: {
        type: String,
        required: true,
      },
      movieGenres: {
        type: Array,
        required: true,
      },
      movieRate: {
        type: Number,
        required: true,
      },
      movieDate: {
        type: String,
        required: true,
      },
    },
    computed: {
      getGenresList() {
        return this.$store.getters.getGenresList;
      },
      getMovieGenres() {
        const genresIds = this.movieGenres;
        const genresList = this.getGenresList;
        const movieGenres = [];

        if (genresList.length !== 0 && genresIds.length !== 0) {
          for (let i = 0; i < genresIds.length; i += 1) {
            for (let j = 0; j < genresList.length; j += 1) {
              if (genresIds[i] === genresList[j].id) {
                movieGenres.push(genresList[j].name);
              }
            }
          }
        }

        return movieGenres;
      },
    },
  };
</script>

<style>

</style>
