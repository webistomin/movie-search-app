<template>
  <ul class="socials__list" v-if="reviewsList && reviewsList.length !== 0">
    <socials-list-item
      v-for="review of reviewsList"
      :key="review.id"
      :review-author="review.author"
      :review-message="review.content"
    />
  </ul>
</template>

<script>
  import SocialsListItem from './SocialsListItem';

  export default {
    name: 'SocialsList',
    components: { SocialsListItem },
    props: {
      reviewsList: {
        type: Array,
      },
    },
  };
</script>

<style scoped>

</style>
