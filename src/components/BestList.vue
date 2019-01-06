<template>
  <ul class="best__list">
    <best-list-item
      v-for="(item, index) of moviesList.slice(0,5)"
      :key="item.id"
      :movie-title="item.title.slice(0,10)"
      :movie-poster="item.poster_path"
      :movie-rate="item.vote_average"
      :movie-id="item.id"
      :movie-count="index"
    />
  </ul>
</template>

<script>
  import BestListItem from './BestListItem';

  export default {
    name: 'BestList',
    components: { BestListItem },
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
