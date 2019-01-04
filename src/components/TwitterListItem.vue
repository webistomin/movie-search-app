<template>
  <li class="socials__item" v-html="tweet"></li>
</template>

<script>
  export default {
    name: 'TwitterListItem',
    props: {
      tweet: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style>

</style>
