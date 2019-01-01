<template>
  <ul class="socials__list">
    <socials-list-item v-for="message of 10"/>
  </ul>
</template>

<script>
  import SocialsListItem from './SocialsListItem';

  export default {
    name: 'SocialsList',
    components: { SocialsListItem },
  };
</script>

<style>
</style>
