<template>
  <div>
    <h2 class="movies__title">{{$route.meta.title}}</h2>
    <MoviesList></MoviesList>
  </div>
</template>

<script>
  import MoviesList from './MoviesList';

  export default {
    name: 'NavigationPage',
    components: { MoviesList },
  };
</script>

<style>

</style>
