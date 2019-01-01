<template>
  <ul class="movies__list"
      :class="{'movies__list--grid' : getGridViewState,
              'movies__list--row' : getRowViewState}"
      v-if="moviesList"
      :style="'perspective:' + getPerspectiveValue + 'px'">
    <movie-item
      v-for="item of moviesList"
      :key="item.id"
      :movie-id="item.id"
      :movie-title="item.title"
      :movie-overview="getMovieOverview(item.overview)"
      :movie-img="getPosterSrc(item.poster_path)"
      :movie-genres="item.genre_ids"
      :movie-rate="item.vote_average"
      :movie-date="item.release_date"/>
  </ul>
</template>

<script>
  import MovieItem from './MoviesListItem';

  export default {
    name: 'MoviesList',
    components: { MovieItem },
    props: {
      moviesList: {
        type: Array,
        required: true,
      },
    },
    methods: {
      getMovieOverview(overview) {
        return this.getGridViewState ? `${overview.slice(0, 80)}...` : overview;
      },
      getPosterSrc(poster) {
        return poster ? `https://image.tmdb.org/t/p/w185/${poster}` : 'static/img/content/image-not-found.svg';
      },
    },
    computed: {
      getPerspectiveValue() {
        return this.moviesList.length * 278;
      },
      getRowViewState() {
        return this.$store.getters.getRowViewState;
      },
      getGridViewState() {
        return this.$store.getters.getGridViewState;
      },
    },
  };
</script>

<style lang="sass">
  .movies
    position: relative
    box-sizing: border-box
    background-color: $color-brown--secondary

    &__title
      font-family: $font-family--secondary
      text-transform: uppercase
      color: $color-text--secondary
      text-align: center
      font-size: 20px
      margin: 0
      padding-top: 20px
      margin-bottom: 10px

    &__list
      display: flex
      flex-wrap: wrap
      justify-content: space-around
      perspective: 2200px
      transform-style: preserve-3d
      padding: 10px

      &--grid

        & .movies__item
          position: relative
          box-sizing: border-box
          min-width: 176px
          text-align: center
          margin-bottom: 10px
          transition: all 0.6s ease-in-out
          transform-style: preserve-3d

          &:hover
            transform: rotateY(180deg)
            box-shadow: 1px 0px 0 0 $color-gold, -1px 0 0 0 $color-gold, 0 1px 0 0 $color-gold, 0 -1px 0 0 $color-gold

        & .movies__img
          backface-visibility: hidden
          height: 100%
          object-fit: cover

        & .movies__block
          display: flex
          flex-direction: column
          box-sizing: border-box
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          padding: 20px
          background-color: $color-brown
          transform: rotateY(180deg)
          backface-visibility: hidden

    &__name,
    &__desc,
    &__genre,
    &__date,
    &__rate
      color: $color-text--secondary
      font-size: 13px

    &__date,
    &__rate
      display: none

    &__genres
      margin-top: auto
      margin-bottom: 10px

    &__genre
      display: inline
      position: relative

      &::after
        content: ", "

      &:last-child
        &::after
          display: none

    &__name
      display: block
      margin-bottom: 20px
      overflow: hidden
      max-width: 100%
      text-overflow: ellipsis
      font-weight: 700
      color: $color-gold
      font-size: 15px

    &__desc
      max-height: 100px
      overflow: hidden

    &__btn
      margin-top: auto

    &__desc
      line-height: 14px
      margin-bottom: 10px

    &__icon
      fill: $color-text--secondary

    @media (min-width: $screen-md)
      width: 60vw
      flex-shrink: 0
      overflow-y: scroll
      height: calc(100vh - 60px)

      &--noscroll
        overflow: hidden

      &::-webkit-scrollbar-track
        border-radius: 10px
        background-color: transparent
        background-clip: content-box

      &::-webkit-scrollbar
        width: 7px
        background-color: transparent

      &::-webkit-scrollbar-thumb
        border-radius: 10px
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3)
        background-color: $color-gold

      &__list
        justify-content: space-between
        perspective: 1200px
        padding: 10px

        &--row
          flex-direction: column

          & .movies__item
            display: flex
            width: 100%
            flex-shrink: 0
            transform: none
            margin-bottom: 10px
            box-shadow: 1px 0px 0 0 $color-gold, -1px 0 0 0 $color-gold, 0 1px 0 0 $color-gold, 0 -1px 0 0 $color-gold

            &:hover
              transform: none

          & .movies__block
            transform: none
            position: relative
            height: auto
            justify-content: flex-start
            text-align: left
            transition: none
            background-color: $color-brown
            display: flex
            flex-direction: column
            box-sizing: border-box
            width: 100%
            padding: 20px

          & .movies__btn
            max-width: 100px
            text-align: center

          & .movies__name
            max-width: 300px

          & .movies__date
            display: block

          & .movies__rate
            display: block
            margin-top: auto
            margin-bottom: 10px

          & .movies__img
            object-fit: cover

      &__item
        padding-top: 0

    @media (min-width: $screen-xl)

      &__list
        &--row
          flex-direction: row

          & .movies__item
            width: 530px
</style>
