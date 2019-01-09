<template>
  <ul class="main-nav__list">
    <NavigationListItem
      v-for="link of navigationLinks"
      :key="link.id"
      :link-path="link.routePath"
      :link-icon="link.iconName"
      :link-title="link.title"
    />
  </ul>
</template>

<script>
  import NavigationListItem from './NavigationListItem';

  export default {
    name: 'NavigationList',
    components: { NavigationListItem },
    data() {
      return {
        navigationLinks: [
          {
            id: 0,
            routePath: '/now-playing',
            iconName: 'icon-calendar',
            title: 'Now Playing',
          },
          {
            id: 1,
            routePath: '/popular',
            iconName: 'icon-popular',
            title: 'Popular',
          },
          {
            id: 2,
            routePath: '/top-rated',
            iconName: 'icon-top',
            title: 'Top Rated',
          },
          {
            id: 3,
            routePath: '/upcoming',
            iconName: 'icon-trailer',
            title: 'Upcoming',
          },
        ],
      };
    },
  };
</script>

<style scoped>

</style>
