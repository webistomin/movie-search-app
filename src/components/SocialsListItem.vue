<template>
  <li class="socials__item">
    <div class="socials__block socials__block--flex">
      <span class="socials__name">{{reviewAuthor}}</span>
    </div>
    <p class="socials__message" v-html="reviewMessage"></p>
  </li>
</template>

<script>
  export default {
    name: 'SocialsListItem',
    props: {
      reviewAuthor: {
        type: String,
        required: true,
      },
      reviewMessage: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
