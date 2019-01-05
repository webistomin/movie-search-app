<template>
  <li class="best__item">
    <router-link :to="`/movie/${movieId}`" class="best__link">
      <picture class="best__pic"
               :class="getBorderColor">
        <img :src="`https://image.tmdb.org/t/p/w92/${moviePoster}`"
             alt="#"
             width="41"
             height="41"
             class="best__img">
      </picture>
      <div class="best__block best__block--padding">
        <span class="best__name">{{movieTitle}}</span>
        <div class="best__rating"></div>
      </div>
    </router-link>
  </li>
</template>

<script>
  export default {
    name: 'BestListItem',
    props: {
      movieTitle: {
        type: String,
        required: true,
      },
      movieId: {
        type: Number,
        required: true,
      },
      movieCount: {
        type: Number,
        required: true,
      },
      moviePoster: {
        type: String,
        required: true,
      },
    },
    computed: {
      getBorderColor() {
        return this.movieCount >= 3 ? 'best__pic--silver' : 'best__pic--gold';
      },
    },
  };
</script>

<style>
</style>
