<template>
  <section class="movie" ref="movieBlock"  v-if="!$store.getters.getLoadingState">
    <div class="movie__background"
         :style="{ 'background-image': 'url(' + getBackroundPath + ')' }">
      <h2 class="movie__tagline">{{getMovieDetails.tagline}}</h2>
    </div>
    <div class="movie__inner">
      <figure class="movie__pic">
        <picture>
          <source media="(min-width: 1900px)" :srcset="getImageHiResSrc">
          <img :src="getImageSrc" :alt="getMovieDetails.title" class="movie__img">
        </picture>
        <figcaption class="movie__rate" v-if="getMovieDetails.vote_average">
          <svg viewBox="0 0 36 36" class="circular-chart"
               :class="getChartColor">
            <path class="circle-bg"
                  d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path class="circle"
                  :stroke-dasharray="getChartLength"
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
      <h2 class="movie__title" v-if="getMovieDetails.title">
        {{getMovieDetails.title}}
      </h2>
      <button class="movie__btn btn">
        <svg class="movie__icon" width="17" height="17">
          <use xlink:href="#icon-heart"></use>
        </svg>
        Add to favorite
      </button>
      <div class="movie__block" v-if="getMovieDetails.production_countries.length !== 0">
        <span class="movie__option">Country:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="country of getMovieDetails.production_countries">
            {{country.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block" v-if="getMovieDetails.production_companies">
        <span class="movie__option">Production&nbsp;companies:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="company of getMovieDetails.production_companies">
            {{company.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block" v-if="getMovieDetails.release_date">
        <span class="movie__option">Release date:</span>
        <span class="movie__value">
          {{getMovieDetails.release_date | getFormattedDate}}
        </span>
      </div>
      <div class="movie__block" v-if="getMovieDetails.genres">
        <span class="movie__option">Category:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="genre of getMovieDetails.genres">
            {{genre.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block" v-if="getMovieDetails.runtime">
        <span class="movie__option">Runtime:</span>
        <span class="movie__value">{{getMovieDetails.runtime}} minutes</span>
      </div>
      <div class="movie__block" v-if="getMovieDetails.budget">
        <span class="movie__option">Budget:</span>
        <span class="movie__value">{{getMovieDetails.budget | getFormattedPrice}}</span>
      </div>
      <div class="movie__block" v-if="getMovieDetails.revenue">
        <span class="movie__option">Revenue:</span>
        <span class="movie__value">{{getMovieDetails.revenue | getFormattedPrice}}</span>
      </div>
      <div class="movie__block" v-if="getMovieCredits.length !== 0">
        <span class="movie__option">Crew:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="person of getMovieCredits.crew.slice(0,10)">
            {{person.name}}
          </li>
        </ul>
      </div>
      <div class="movie__block" v-if="getMovieCredits.length !== 0">
        <span class="movie__option">Actors:</span>
        <ul class="movie__values">
          <li class="movie__value"
              v-for="person of getMovieCredits.cast.slice(0,10)">
            {{person.name}}
          </li>
        </ul>
      </div>
      <h2 class="movie__title movie__title--decor" v-if="getMovieDetails.overview">
        The Plot
      </h2>
      <p class="movie__desc" v-if="getMovieDetails.overview">
        {{getMovieDetails.overview}}
      </p>
      <h2 class="movie__title movie__title--decor" v-if="getMovieImages.length !== 0">
        Photos
      </h2>
      <carousel v-if="getMovieImages.length !== 0"
                :perPageCustom="[[320, 1], [1199, 3]]"
                :mouse-drag="true"
                :autoplay="true"
                :loop="true"
                paginationActiveColor="#ffd564">
        <slide v-for="poster of getMovieImages" :key="poster.file_path">
          <img :src="`https://image.tmdb.org/t/p/w185/${poster.file_path}`" alt="" class="movie__img">
        </slide>
      </carousel>
      <h2 class="movie__title movie__title--decor" v-if="getSimilarMovies.length !== 0">
        Similar movies
      </h2>
      <MoviesList :movies-list="getSimilarMovies"
                  v-if="getSimilarMovies.length !== 0"/>
      <h2 class="movie__title movie__title--decor" v-if="getRecommendedMovies.length !== 0">
        Recomendations
      </h2>
      <MoviesList :movies-list="getRecommendedMovies"
      v-if="getRecommendedMovies.length !== 0"/>
    </div>
  </section>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import MoviesList from './MoviesList';
  // import store from '../store/index';

  export default {
    name: 'MoviePage',
    // beforeRouteEnter(to, from, next) {
    //   store.commit('setLoadingState', true);
    //   next(() => {
    //     Promise.all([
    //       store.dispatch('fetchMovieDetails', to.params.id),
    //       store.dispatch('fetchMovieCredits', to.params.id),
    //       store.dispatch('fetchMovieImages', to.params.id),
    //       store.dispatch('fetchSimilarMovies', to.params.id),
    //       store.dispatch('fetchRecommendedMovies', to.params.id),
    //       store.dispatch('fetchMovieReviews', to.params.id),
    //     ])
    //       .then(() => {
    //         store.commit('setLoadingState', false);
    //       });
    //   });
    // },
    // beforeRouteUpdate(to, from, next) {
    //   this.$store.commit('setLoadingState', true);
    //   Promise.all([
    //     this.$store.dispatch('fetchMovieDetails', to.params.id),
    //     this.$store.dispatch('fetchMovieCredits', to.params.id),
    //     this.$store.dispatch('fetchMovieReviews', to.params.id),
    //     this.$store.dispatch('fetchMovieImages', to.params.id),
    //     this.$store.dispatch('fetchSimilarMovies', to.params.id),
    //     this.$store.dispatch('fetchRecommendedMovies', to.params.id),
    //   ])
    //     .then(() => {
    //       next();
    //       this.$store.commit('setLoadingState', false);
    //     });
    // },
    created() {
      this.$store.commit('setLoadingState', true);
      Promise.all([
        this.$store.dispatch('fetchMovieDetails', this.$route.params.id),
        this.$store.dispatch('fetchMovieCredits', this.$route.params.id),
        this.$store.dispatch('fetchMovieImages', this.$route.params.id),
        this.$store.dispatch('fetchSimilarMovies', this.$route.params.id),
        this.$store.dispatch('fetchRecommendedMovies', this.$route.params.id),
        this.$store.dispatch('fetchMovieReviews', this.$route.params.id),
      ])
        .then(() => {
          this.$store.commit('setLoadingState', false);
        });
    },
    computed: {
      getMovieDetails() {
        return this.$store.getters.getMovieDetails;
      },
      getMovieCredits() {
        return this.$store.getters.getMovieCredits;
      },
      getMovieImages() {
        return this.$store.getters.getMovieImages;
      },
      getSimilarMovies() {
        return this.$store.getters.getSimilarMovies;
      },
      getRecommendedMovies() {
        return this.$store.getters.getRecommendedMovies;
      },
      getBackroundPath() {
        return this.getMovieDetails.backdrop_path ? `https://image.tmdb.org/t/p/w780/${this.getMovieDetails.backdrop_path}` : '/static/img/content/backdrop-default.jpg';
      },
      getImageSrc() {
        return this.getMovieDetails.poster_path ? `https://image.tmdb.org/t/p/w185/${this.getMovieDetails.poster_path}` : '/static/img/content/image-not-found.svg';
      },
      getImageHiResSrc() {
        return `https://image.tmdb.org/t/p/w342/${this.getMovieDetails.poster_path}`;
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
      getChartLength() {
        return `${this.getMovieDetails.vote_average * 10}, 100`;
      },
    },
    filters: {
      getFormattedPrice(value) {
        switch (true) {
          case Math.abs(Number(value)) >= 1.0e+9:
            return `${Math.round(Math.abs(Number(value)) / 1.0e+9)} billion dollars`;
          case Math.abs(Number(value)) >= 1.0e+6:
            return `${Math.round(Math.abs(Number(value)) / 1.0e+6)} million dollars`;
          case Math.abs(Number(value)) >= 1.0e+3:
            return `${Math.round(Math.abs(Number(value)) / 1.0e+3)} thousand dollars`;
          default:
            return `${Math.abs(Number(value))} dollars`;
        }
      },
      getFormattedDate(date) {
        return new Date(Date.parse(date)).toDateString();
      },
    },
    components: {
      MoviesList,
      Carousel,
      Slide,
    },
  };
</script>

<style lang="sass">
  .VueCarousel-slide
    cursor: grab

    &:active
      cursor: grabbing

    &:focus
      outline: none

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
      background-position: center
      position: relative
      box-sizing: border-box
      transition: background-image 0.3s ease-in-out

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
      height: 100%
      box-sizing: border-box
      object-fit: cover

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
