<template>
  <aside class="socials" id="socials">
    <div class="socials__block">
      <h2 class="socials__title title">{{getPageTitle}}</h2>
      <SocialsList
        v-if="$route.name === 'movie' && !getLoadingState && getMovieReviews.length !== 0"
        :reviews-list="getMovieReviews"/>
      <TwitterList v-else-if="getTweets.length !== 0 && $route.name !== 'movie'"
                   :tweets-list="getTweets"
      />
      <p class="socials__error" v-else-if="!getLoadingState">Nothing to see here :(</p>
    </div>
  </aside>
</template>

<script>
  import SocialsList from './SocialsList';
  import TwitterList from './TwitterList';

  export default {
    name: 'Socials',
    components: { TwitterList, SocialsList },
    computed: {
      getPageTitle() {
        return this.$route.name === 'movie' ? 'Last reviews' : 'Last news';
      },
      getMovieReviews() {
        return this.$store.getters.getMovieReviews;
      },
      getLoadingState() {
        return this.$store.getters.getLoadingState;
      },
      getTweets() {
        return this.$store.getters.getTweets;
      },
    },
  };
</script>

<style lang="sass">
  .socials
    background-color: $color-brown--secondary

    &__error
      color: $color-gold
      text-align: center

    &__title
      padding-top: 24px
      padding-bottom: 24px
      text-align: center
      background-color: $color-brown

    &__name
      display: block
      margin-bottom: 20px


    &__pic
      margin-right: 16px

    &__avatar
      border-radius: 50%
      border: 2px solid $color-gold

    &__name
      color: $color-text--secondary

    &__list
      padding: 30px 0

    &__item
      position: relative
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin: 0 auto
      margin-bottom: 30px

      &:last-child
        margin-bottom: 0

      & .user,
      .tweet,
      .timePosted,
      .interact
        box-sizing: border-box
        max-width: 300px
        width: 100%

      & .user a
        display: block
        margin-bottom: 10px
        outline: none
        transition: all 0.3s ease-in-out
        color: $color-gold

        &:hover,
        &:active,
        &:focus
          color: $color-action
          transition: all 0.3s ease-in-out

      & .tweet
        color: $color-text
        margin: 0 auto
        margin-bottom: 10px
        word-break: break-word

      & .timePosted
        margin-bottom: 10px

        & a
          font-size: 12px
          outline: none
          transition: all 0.3s ease-in-out

          &:hover,
          &:focus
            color: $color-gold
            transition: all 0.3s ease-in-out

          &:active
            color: $color-action

      & .interact
        display: flex
        justify-content: flex-start

        & a
          font-size: 0
          width: 30px
          height: 30px
          display: block
          background-position: center
          background-repeat: no-repeat
          margin-right: 20px
          border-radius: 50%
          transition: all 0.3s ease-in-out

          &:hover,
          &:focus
            background-color: $color-action
            transition: all 0.3s ease-in-out

        & a.twitter_reply_icon
          background-image: url("~/static/img/content/icon-bubble.svg")


        & a.twitter_retweet_icon
          background-image: url("~/static/img/content/icon-reply.svg")

        & a.twitter_fav_icon
          background-image: url("~/static/img/content/icon-favorite.svg")

    &__message
      position: relative
      box-sizing: border-box
      padding: 15px
      background-color: $color-text--secondary
      max-width: 300px
      border-radius: 10px
      font-size: 12px
      line-height: 17px
      font-weight: 400
      color: $color-brown
      word-break: break-word

      & a
        color: $color-brown
        font-weight: 700
        text-decoration: underline

      &::after
        content: ''
        position: absolute
        top: 0
        left: 50%
        width: 0
        height: 0
        border: 16px solid transparent
        border-bottom-color: $color-text--secondary
        border-top: 0
        border-left: 0
        margin-left: -11px
        margin-top: -14px

      &::selection
        color: $color-text--secondary
        background-color: $color-brown

    @media (min-width: $screen-md)
      width: 20vw
      flex-shrink: 0
      box-sizing: border-box
      padding: 12px
      padding-top: 0
      overflow-y: scroll
      height: calc(100vh - 60px)
      position: relative
      scrollbar-width: thin
      scrollbar-color: $color-gold rgba(0, 0, 0, .3)

      &::after
        content: ""
        position: absolute
        top: 0
        left: 0
        width: 5px
        height: 100%
        background-color: rgba(255, 255, 255, 0.1)
        z-index: 11

      &::-webkit-scrollbar-track
        border-radius: 10px
        background-color: transparent
        background-clip: content-box

      &::-webkit-scrollbar
        width: 7px
        background-color: transparent

      &::-webkit-scrollbar-thumb
        border-radius: 10px
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
        background-color: $color-gold

      &__title
        background-color: transparent
        color: $color-text

      &__list
        padding: 0 10px

      &__item
        align-items: center
</style>
