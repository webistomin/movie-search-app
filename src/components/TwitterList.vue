<template>
  <ul class="socials__list">
    <TwitterListItem
      v-for="(item, index) of tweetsList"
      :key="index"
      :tweet="item"/>
  </ul>
</template>

<script>
  import TwitterListItem from './TwitterListItem';

  export default {
    name: 'TwitterList',
    components: { TwitterListItem },
    props: {
      tweetsList: {
        type: Array,
        required: true,
      },
    },
  };
</script>

<style>

</style>
