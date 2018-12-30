<template>
  <ul class="best__list">
    <best-item
      v-for="(item, index) of moviesList.slice(0,5)"
      :movie-title="item.title.slice(0,10)"
      :movie-poster="item.poster_path"
      :movie-id="item.id"
      :movie-count="index"
    />
  </ul>
</template>

<script>
  import BestItem from './BestListItem';

  export default {
    name: 'BestList',
    components: { BestItem },
    props: {
      moviesList: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style>

</style>
