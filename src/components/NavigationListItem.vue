<template>
  <li class="main__nav__item">
    <router-link :to="linkPath"
                 class="main-nav__link"
                 :active-class="'main-nav__link--active'">
      <svg class="main-nav__icon" width="17" height="17">
        <use :xlink:href="`#${linkIcon}`"></use>
      </svg>
      {{linkTitle}}
    </router-link>
  </li>
</template>

<script>
  export default {
    name: 'NavigationListItem',
    props: {
      linkPath: {
        type: String,
        required: true,
      },
      linkIcon: {
        type: String,
        required: true,
      },
      linkTitle: {
        type: String,
        required: true,
      },
    },
  };
</script>

<style scoped>

</style>
