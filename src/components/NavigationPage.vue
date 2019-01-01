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
    mounted() {
      console.log(this.$route);
    },
  };
</script>

<style>

</style>
