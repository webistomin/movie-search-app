<template>
  <section class="best">
    <div class="best__block">
      <h2 class="best__title title">Today best choice</h2>
    </div>
    <BestList :movies-list="getPopularMovies"/>
  </section>
</template>

<script>
  import BestList from './BestList';

  export default {
    name: 'BestMovies',
    components: { BestList },
    created() {
      if (this.$route.name !== 'popular') {
        this.$store.dispatch('fetchPopularMovies')
          .then(() => {
            if (this.$route.name !== 'movie') {
              this.$store.commit('setLoadingState', false);
            }
          });
      }
    },
    computed: {
      getPopularMovies() {
        return this.$store.getters.getPopularMovies;
      },
    },
  };
</script>

<style lang="sass">
  .best
    display: none
    background-color: $color-brown--secondary

    &__title
      padding-top: 24px
      padding-bottom: 24px
      text-align: center
      background-color: $color-brown

    &__list
      display: flex
      flex-direction: column
      align-items: center
      padding-top: 20px

    &__item
      display: flex
      min-width: 122px
      margin-bottom: 20px

    &__link
      display: flex
      outline: none

      &:hover,
      &:focus
        .best__name,
        .best__rate
          color: $color-text--secondary
          transition: all 0.3s ease-in-out

        .best__icon
          fill: $color-text--secondary
          transition: all 0.3s ease-in-out

      &:active
        .best__name,
        .best__rate
          color: $color-action
          transition: all 0.3s ease-in-out

        .best__icon
          fill: $color-action
          transition: all 0.3s ease-in-out

    &__name
      display: block
      max-width: 63px
      overflow: hidden
      text-overflow: ellipsis
      font-size: 12px
      color: $color-text
      margin-bottom: 8px
      transition: all 0.3s ease-in-out

    &__rate
      font-size: 12px
      color: $color-text
      transition: all 0.3s ease-in-out

    &__icon
      fill: $color-text
      transition: all 0.3s ease-in-out

    &__img
      border-radius: 4px

    &__pic
      position: relative
      margin-right: 10px
      width: 41px
      height: 41px

      &::before
        width: 3px
        height: 100%
        content: ""
        position: absolute
        left: 0
        top: 0

      &--gold
        &::before
          background-color: $color-gold

      &--silver
        &::before
          background-color: $color-silver

    &__block
      &--padding
        padding: 5px 0

    @media (min-width: $screen-xs)
      &__list
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-around

    @media (min-width: $screen-sm)
      display: block

      &__list
        padding-top: 25px

      &__item
        margin-bottom: 25px

    @media (min-width: $screen-md)
      &__title
        text-align: left
        padding-top: 23px
        padding-bottom: 22px
        padding-left: 44px

    @media (min-width: $screen-xl)
      &__list
        flex-direction: column
        padding-left: 44px
        padding-right: 44px
        align-items: flex-start

      &__pic
        width: initial
        height: initial

      &__item
        margin-bottom: 10px





</style>
