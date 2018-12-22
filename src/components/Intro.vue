<template>
  <aside class="intro">
    <Navigation></Navigation>
    <BestMovies></BestMovies>
  </aside>
</template>

<script>
  import Navigation from './Navigation';
  import BestMovies from './BestMovies';

  export default {
    name: 'Intro',
    components: { BestMovies, Navigation },
  };
</script>

<style lang="sass">
  .intro
    @media (min-width: $screen-md)
      width: 20vw
      height: calc(100vh - 60px)
      flex-shrink: 0
      background-color: $color-brown--secondary
      position: relative

      &::after
        content: ""
        position: absolute
        top: 0
        right: 0
        width: 5px
        height: 100%
        background-color: rgba(255, 255, 255, 0.1)

</style>
