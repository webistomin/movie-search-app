<template>
  <div>
    <Header></Header>
    <main class="page-content">
      <template v-if="1 === 0">
        <div class="loader"></div>
      </template>
      <template v-else>
        <Intro></Intro>
        <MoviesList></MoviesList>
        <Socials></Socials>
      </template>
    </main>
  </div>
</template>

<script>
  import Header from './Header';
  import Intro from './Intro';
  import MoviesList from './MoviesList';
  import Socials from './Socials';

  export default {
    name: 'Index',
    components: { Socials, MoviesList, Intro, Header },
  };
</script>

<style lang="sass">
  @import "../assets/sass/blocks/btn"
  @import "../assets/sass/blocks/title"

  .page-content
    @media (min-width: $screen-md)
      display: flex
</style>
