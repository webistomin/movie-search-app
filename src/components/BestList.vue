<template>
  <ul class="best__list">
    <best-item v-for="item of 5"></best-item>
  </ul>
</template>

<script>
  import BestItem from './BestListItem';

  export default {
    name: 'BestList',
    components: { BestItem },
  };
</script>

<style>

</style>
