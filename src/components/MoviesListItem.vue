<template>
  <li class="movies__item">
    <img :src="`https://image.tmdb.org/t/p/w185/${movieImg}`" width="185" height="278" alt="#" class="movies__img">
    <div class="movies__block">
      <span class="movies__name">{{movieTitle}}</span>
      <p class="movies__desc">{{movieOverview}}</p>
      <ul class="movies__genres">
        <li class="movies__genre"
            v-for="genre of movieGenres"
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
    },
  };
</script>

<style>

</style>
