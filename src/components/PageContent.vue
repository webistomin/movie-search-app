<template>
  <main class="page-content">
    <Intro/>
    <section class="movies">
      <preloader v-if="1 === 0"/>
      <MoviesList v-else/>
    </section>
    <Socials/>
  </main>
</template>

<script>
  import Intro from './Intro';
  import MoviesList from './MoviesList';
  import Socials from './Socials';
  import MoviesPage from './MoviePage';
  import Preloader from './Preloader';

  export default {
    name: 'PageContent',
    components: { Preloader, MoviesPage, Socials, MoviesList, Intro },
  };
</script>

<style lang="sass">
  .page-content
    @media (min-width: $screen-md)
      display: flex
</style>
