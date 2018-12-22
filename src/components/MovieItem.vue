<template>
  <li class="movies__item">
    <img src="static/img/content/poster185.jpg" width="185" height="278" alt="#" class="movies__img">
    <div class="movies__block">
      <span class="movies__name">Thor</span>
      <p class="movies__desc">Lorem ipsum dolor sit amet.</p>
      <span class="movies__duration">
              <svg class="movies__icon" width="12" height="12">
            <use xlink:href="#icon-clock"></use>
          </svg>
              165 min</span>
      <ul class="movies__genres">
        <li class="movies__genre">Drama</li>
        <li class="movies__genre">Drama</li>
        <li class="movies__genre">Drama</li>
        <li class="movies__genre">Drama</li>
      </ul>
      <a href="#" class="movies__btn btn">More</a>
    </div>
  </li>
</template>

<script>
  export default {
    name: 'MovieItem',
  };
</script>

<style>

</style>
