<template>
  <li class="best__item">
    <router-link :to="`/movie/${movieId}`" class="best__link">
      <picture class="best__pic"
               :class="getBorderColor">
        <img :src="getPosterSrc"
             :alt="movieTitle"
             width="41"
             height="41"
             class="best__img">
      </picture>
      <div class="best__block best__block--padding">
        <span class="best__name">{{movieTitle}}</span>
        <span class="best__rate" v-if="movieRate">
          <svg class="best__icon" width="12" height="12">
            <use xlink:href="#icon-like"></use>
          </svg>
          {{movieRate}}
      </span>
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
      movieRate: {
        type: Number,
        required: true,
      },
    },
    computed: {
      getBorderColor() {
        return this.movieCount >= 3 ? 'best__pic--silver' : 'best__pic--gold';
      },
      getPosterSrc() {
        return this.moviePoster ? `https://image.tmdb.org/t/p/w92/${this.moviePoster}` : '/static/img/content/image-not-found.svg';
      },
    },
  };
</script>

<style>
</style>
