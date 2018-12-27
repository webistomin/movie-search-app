<template>
  <section class="movie">
    <div class="movie__background"
         v-if="getMovieDetails.backdrop_path"
         :style="{ 'background-image': 'url(' + getBackroundPath + ')' }" >
      <h2 class="movie__tagline">{{getMovieDetails.tagline}}</h2>
    </div>
    <div class="movie__inner">
      <figure class="movie__pic" v-if="getMovieDetails.poster_path">
        <picture>
          <source media="(min-width: 1900px)" srcset="static/img/content/poster342.jpg 1x">
          <img :src="getImageSrc" alt="1" class="movie__img">
        </picture>
        <figcaption class="movie__rate">
          <svg viewBox="0 0 36 36" class="circular-chart"
               :class="getChartColor">
            <path class="circle-bg"
                  d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
                  stroke-dasharray="60, 100"
                  d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" class="percentage">
              {{getMovieDetails.vote_average}}
            </text>
          </svg>
        </figcaption>
      </figure>
      <h2 class="movie__title">{{getMovieDetails.title}}</h2>
      <button class="movie__btn btn">
        <svg class="movie__icon" width="17" height="17">
          <use xlink:href="#icon-heart"></use>
        </svg>
        Add to favorite
      </button>
      <div class="movie__block">
        <span class="movie__option">Country:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="country of getMovieDetails.production_countries">
            {{country.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block">
        <span class="movie__option">Production companies:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="company of getMovieDetails.production_companies">
            {{company.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block">
        <span class="movie__option">Release date:</span>
        <span class="movie__value">{{getMovieDetails.release_date}}</span>
      </div>
      <div class="movie__block">
        <span class="movie__option">Category:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="genre of getMovieDetails.genres">
            {{genre.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block">
        <span class="movie__option">Runtime:</span>
        <span class="movie__value">{{getMovieDetails.runtime}} minutes</span>
      </div>
      <div class="movie__block">
        <span class="movie__option">Budget:</span>
        <span class="movie__value">{{getMovieDetails.budget}}$</span>
      </div>
      <div class="movie__block">
        <span class="movie__option">Revenue:</span>
        <span class="movie__value">{{getMovieDetails.revenue}}$</span>
      </div>
      <div class="movie__block">
        <span class="movie__option">Director:</span>
        <span class="movie__value">Peter Jackson</span>
      </div>
      <div class="movie__block">
        <span class="movie__option">Actors:</span>
        <ul class="movie__values">
          <li class="movie__value">Martin Freeman</li>
          <li class="movie__value">Ian McKellen</li>
          <li class="movie__value">Martin Freeman</li>
          <li class="movie__value">Ian McKellen</li>
          <li class="movie__value">Martin Freeman</li>
          <li class="movie__value">Ian McKellen</li>
        </ul>
      </div>
      <h2 class="movie__title movie__title--decor">The Plot</h2>
      <p class="movie__desc">{{getMovieDetails.overview}}</p>
      <h2 class="movie__title movie__title--decor">Photos</h2>
      <ul class="movie__list">
        <li class="movie__item" v-for="poster of getMovieImages.posters">
          <img :src="`https://image.tmdb.org/t/p/w342/${poster.file_path}`" alt="" class="movie__img">
        </li>
      </ul>
      <h2 class="movie__title movie__title--decor">Similar movies</h2>
      <ul class="movie__list">
      </ul>
      <h2 class="movie__title movie__title--decor">Recomendations</h2>
      <ul class="movie__list">
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'MoviesPage',
    mounted() {
      this.$store.commit('setLoadingState', true);
      // eslint-disable-next-line no-unused-expressions
      Promise.all([
        this.$store.dispatch('fetchMovieDetails', this.$route.params.id),
        this.$store.dispatch('fetchMovieImages', this.$route.params.id),
      ])
        .then(() => {
          this.$store.commit('setLoadingState', false);
        });
    },
    computed: {
      getMovieDetails() {
        return this.$store.getters.getMovieDetails;
      },
      getMovieImages() {
        return this.$store.getters.getMovieImages;
      },
      getBackroundPath() {
        return `https://image.tmdb.org/t/p/w780/${this.getMovieDetails.backdrop_path}`;
      },
      getImageSrc() {
        return `https://image.tmdb.org/t/p/w185/${this.getMovieDetails.poster_path}`;
      },
      getChartColor() {
        switch (true) {
          case this.getMovieDetails.vote_average >= 8:
            return 'green';
          case this.getMovieDetails.vote_average >= 4:
            return 'orange';
          case this.getMovieDetails.vote_average >= 0:
            return 'red';
          default:
            return 'green';
        }
      },
    },
  };
</script>

<style lang="sass">
  .movie
    width: 100%
    height: 100%
    box-sizing: border-box

    &__background
      display: flex
      justify-content: center
      align-items: center
      text-align: center
      width: 100%
      height: 300px
      padding: 30px
      background-image: url("~/static/img/content/backdrop300.jpg")
      background-size: cover
      background-repeat: no-repeat
      position: relative
      box-sizing: border-box

      &::before
        width: 100%
        height: 100%
        content: ""
        position: absolute
        top: 0
        left: 0
        background-color: rgba(76, 65, 69, 0.6)

    &__tagline
      font-family: $font-family--secondary
      color: $color-text--secondary
      position: relative
      margin: 0

    &__pic
      display: block
      width: 189px
      z-index: 1
      position: relative
      margin: 0 auto
      margin-top: -80px
      text-align: center

    &__img
      border: 2px solid $color-gold

    &__rate
      display: flex
      justify-content: center
      align-items: center
      position: absolute
      top: 10px
      left: 10px
      box-sizing: border-box
      width: 48px
      height: 48px
      background-color: $color-brown
      border-radius: 50%
      font-weight: 700
      color: $color-text--secondary

    &__title
      display: inline-block
      margin: 0
      margin-top: 30px
      margin-bottom: 30px
      position: relative
      font-family: $font-family--secondary
      color: $color-text--secondary
      font-size: 20px
      text-transform: uppercase
      text-align: center

      &--decor
        &::before
          width: 17px
          height: 6px
          content: ""
          position: absolute
          left: -25px
          top: 50%
          background-color: transparent
          background-image: url("~/static/img/content/scarf.svg")

    &__inner
      padding: 30px
      position: relative
      text-align: center

    &__block,
    &__values
      display: flex
      align-items: center

    &__block
      margin: 20px 0

    &__values
      flex-wrap: wrap

    &__option
      font-weight: 700
      color: $color-text--secondary
      font-size: 15px
      padding-right: 10px
      text-align: left

    &__value
      font-weight: 400
      color: $color-text--secondary
      font-size: 15px
      position: relative
      padding-right: 4px

      &::after
        content: ", "

      &:last-child
        &::after
          display: none

    &__desc
      font-size: 15px
      line-height: 28px
      color: $color-text--secondary
      text-align: left

    &__list
      display: flex
      justify-content: space-around
      flex-wrap: wrap

    &__item
      margin-bottom: 10px

    &__btn
      display: flex
      align-items: center
      justify-content: center
      margin: 0 auto
      margin-bottom: 35px
      width: 150px

    &__icon
      fill: $color-text--secondary
      margin-right: 10px

    @media (min-width: $screen-sm)
      &__background
        background-image: url("~/static/img/content/backdrop780.jpg")

    @media (min-width: $screen-md)
      &__btn
        position: absolute
        margin: 0
        top: 25px
        right: 25px

      &__inner
        max-width: 1000px
        margin: 0 auto

    @media (min-width: $screen-xl)
      &__background
        height: 500px
        background-image: url("~/static/img/content/backdrop1280.jpg")

      &__pic
        margin-top: -200px
        width: 342px

      &__rate
        width: 80px
        height: 80px

</style>
