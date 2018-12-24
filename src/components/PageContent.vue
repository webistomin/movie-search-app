<template>
  <main class="page-content">
    <template v-if="1 === 0">
      <div class="loader"></div>
    </template>
    <template v-else>
      <Intro/>
      <section class="movies">
        <MoviesList/>
      </section>
      <Socials/>
    </template>
  </main>
</template>

<script>
  import Intro from './Intro';
  import MoviesList from './MoviesList';
  import Socials from './Socials';
  import MoviesPage from './MoviePage';

  export default {
    name: 'PageContent',
    components: { MoviesPage, Socials, MoviesList, Intro },
  };
</script>

<style lang="sass">
  @import "../assets/sass/blocks/btn"
  @import "../assets/sass/blocks/title"

  .page-content
    @media (min-width: $screen-md)
      display: flex


  .movies
    box-sizing: border-box
    background-color: $color-brown--secondary

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
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
        background-color: $color-gold
</style>
