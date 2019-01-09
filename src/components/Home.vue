<template>
  <section class="home">
    <h2 class="home__title">Powered by The Movie Database</h2>
    <a href="#" class="home__link" rel="noopener nofollow" target="_blank">View code</a>
  </section>
</template>

<script>
  import Header from './Header';
  import NavigationPage from './NavigationPage';

  export default {
    name: 'Home',
    components: { NavigationPage, Header },
  };
</script>

<style lang="sass">
  .home
    min-height: 200px
    height: 100%
    box-sizing: border-box
    padding: 0 30px
    position: relative
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    background-image: url("~/static/img/content/home-bg.png"), url("~/static/img/content/home-bg.svg"), radial-gradient(at 90% top, #252621 0%, #0a1526 40%)
    background-color: $color-brown
    background-repeat: no-repeat, repeat-y
    background-size: contain
    background-position: bottom

    &::before
      position: absolute
      content: ""
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: $color-brown--secondary
      opacity: 0.7

    &__title
      color: $color-text--secondary
      font-family: $font-family--secondary
      text-transform: uppercase
      text-align: center
      position: relative
      font-size: 20px

    &__link
      display: block
      text-align: center
      padding: 20px
      color: $color-text--secondary
      position: relative
      text-transform: uppercase
      font-size: 12px

      &::before
        width: 0
        height: 1px
        content: ""
        position: absolute
        left: 0
        bottom: 0
        background-color: $color-text--secondary
        transition: all 0.3s ease-in-out

      &:hover,
      &:focus
        outline: none

        &::before
          width: 100%
          transition: all 0.3s ease-in-out

    @media (min-width: $screen-sm)
      min-height: 400px

    @media (min-width: $screen-md)
      justify-content: flex-start

      &__title
        font-size: 60px

      &__link
        font-size: 20px
</style>
