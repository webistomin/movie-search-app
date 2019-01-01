<template>
  <li class="movies__item">
    <img src="/static/img/content/poster185.jpg" width="185" height="278" alt="#" class="movies__img">
    <div class="movies__block">
      <span class="movies__name">The Endless Summer</span>
      <p class="movies__desc">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</p>
      <span class="movies__rate">
        <svg class="movies__icon" width="12" height="12">
          <use xlink:href="#icon-like"></use>
        </svg>
        7.5 average
      </span>
      <time class="movies__date">
        <svg class="movies__icon" width="12" height="12">
          <use xlink:href="#icon-calendar"></use>
        </svg>
        1966-06-15
      </time>
      <ul class="movies__genres">
        <li class="movies__genre">Drama</li>
        <li class="movies__genre">Drama</li>
        <li class="movies__genre">Drama</li>
        <li class="movies__genre">Drama</li>
      </ul>
      <a href="movie.html" class="movies__btn btn">Read more</a>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'MovieListItem',
  };
</script>

<style>

</style>
