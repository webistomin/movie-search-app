<template>
  <div>
    <Header/>
    <PageContent/>
  </div>
</template>

<script>
  import Header from './Header';
  import PageContent from './PageContent';

  export default {
    name: 'Index',
    components: { PageContent, Header },
  };
</script>

<style>
</style>
