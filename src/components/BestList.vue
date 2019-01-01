<template>
  <ul class="best__list">
    <best-list-item v-for="item of 5"/>
  </ul>
</template>

<script>
  import BestListItem from './BestListItem';

  export default {
    name: 'BestList',
    components: { BestListItem },
  };
</script>

<style>

</style>
