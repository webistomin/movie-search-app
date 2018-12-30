<template>
  <li class="socials__item">
    <div class="socials__block socials__block--flex">
      <picture class="socials__pic">
        <!--<img src="static/img/content/ava.jpg" width="32" height="32" alt="#" class="socials__avatar">-->
        <img class="socials__avatar" src="https://image.tmdb.org/t/p/w150_and_h150_face/pjVuFgU4nprXldc3cGA8DMczt4d.jpg" srcset="https://image.tmdb.org/t/p/w150_and_h150_face/pjVuFgU4nprXldc3cGA8DMczt4d.jpg 1x, https://image.tmdb.org/t/p/w300_and_h300_face/pjVuFgU4nprXldc3cGA8DMczt4d.jpg 2x" alt="The Midi-chlorian Count" width="32" height="32">
      </picture>
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
