<template>
  <ul class="socials__list"
      v-if="isListVisible">
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
    computed: {
      isListVisible() {
        return this.reviewsList && this.reviewsList.length !== 0 && !this.getLoadingState;
      },
      getLoadingState() {
        return this.$store.getters.getLoadingState;
      },
    },
  };
</script>

<style>

</style>
