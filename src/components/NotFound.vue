<template>
  <section class="error">
    <div class="error__box">
      <h2 class="error__title error__title--first">404 <br> page not found</h2>
      <h2 class="error__title error__title--second">404 <br> page not found</h2>
      <h2 class="error__title error__title--third">404 <br> page not found</h2>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'NotFound',
  };
</script>

<style lang="sass">
  .error
    position: relative
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    min-height: 300px
    background-image: url("~/static/img/content/home-bg.png"), url("~/static/img/content/home-bg.svg"), radial-gradient(at 90% top, #252621 0%, #0a1526 40%)
    background-color: $color-brown
    background-repeat: no-repeat, repeat-y
    background-size: contain
    background-position: bottom
    transform: translate3d(0, 0, 0)

    &::before
      position: absolute
      content: ""
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: $color-brown--secondary
      opacity: 0.7

    &__title
      color: #f5f5f5
      font-weight: bolder
      font-size: 30px
      margin: 0
      outline: none
      padding: 0
      position: relative
      text-align: center

    &__box
      position: relative
      width: 100%
      min-height: 100px
      -webkit-animation: disappear 1s linear
      -webkit-animation-iteration-count: infinite, infinite
      -moz-animation: disappear 1s linear
      -moz-animation-iteration-count: infinite, infinite
      -o-animation: disappear 1s linear
      -o-animation-iteration-count: infinite, infinite
      overflow: hidden

      & .error__title--first
        position: absolute
        width: 100%

      & .error__title--second
        color: $color-gold
        font-weight: bolder
        left: -2px
        position: absolute
        transform: -2px
        width: 100%
        z-index: -1
        -webkit-animation: animate_glitch_1 .2s linear
        -webkit-animation-iteration-count: infinite
        -moz-animation: animate_glitch_1 .2s linear
        -moz-animation-iteration-count: infinite
        -o-animation: animate_glitch_1 .2s linear
        -o-animation-iteration-count: infinite

      & .error__title--third
        color: $color-action
        font-weight: bolder
        left: 2px
        position: absolute
        top: 2px
        width: 100%
        z-index: -1
        -webkit-animation: animate_glitch_2 .3s linear
        -webkit-animation-iteration-count: infinite
        -moz-animation: animate_glitch_2 .3s linear
        -moz-animation-iteration-count: infinite
        -o-animation: animate_glitch_2 .3s linear
        -o-animation-iteration-count: infinite

    @-webkit-keyframes disappear
      0%
        opacity: 0
      2%
        opacity: 1


    @-webkit-keyframes animate_glitch_1
      0%
        transform: translateY(1px) translateX(1px)
      25%
        transform: translateY(3px) translateX(2px)
      50%
        transform: translateY(-1px) translateX(-4px)
      75%
        transform: translateY(2px) translateX(5px)
      100%
        transform: translateY(1px) translateX(-2px)


    @-webkit-keyframes animate_glitch_2
      0%
        transform: translateY(-1px) translateX(-1px)
      25%
        transform: translateY(-3px) translateX(-2px)
      50%
        transform: translateY(1px) translateX(4px)
      100%
        transform: translateY(-1px) translateX(-1px)


    @-moz-keyframes disappear
      0%
        opacity: 0
      2%
        opacity: 1


    @-moz-keyframes animate_glitch_1
      0%
        transform: translateY(1px) translateX(1px)
      25%
        transform: translateY(3px) translateX(2px)
      50%
        transform: translateY(-1px) translateX(-4px)
      75%
        transform: translateY(2px) translateX(5px)
      100%
        transform: translateY(1px) translateX(2px)


    @-moz-keyframes animate_glitch_2
      0%
        transform: translateY(-1px) translateX(-1px)
      25%
        transform: translateY(-3px) translateX(-2px)
      50%
        transform: translateY(1px) translateX(4px)
      100%
        transform: translateY(-1px) translateX(-1px)


    @-o-keyframes disappear
      0%
        opacity: 0
      2%
        opacity: 1


    @-o-keyframes animate_glitch_1
      0%
        transform: translateY(1px) translateX(1px)
      25%
        transform: translateY(3px) translateX(2px)
      50%
        transform: translateY(-1px) translateX(-4px)
      75%
        transform: translateY(2px) translateX(5px)
      100%
        transform: translateY(1px) translateX(-2px)


    @-o-keyframes animate_glitch_2
      0%
        transform: translateY(-1px) translateX(-1px)
      25%
        transform: translateY(-3px) translateX(-2px)
      50%
        transform: translateY(1px) translateX(4px)
      100%
        transform: translateY(-1px) translateX(-1px)


    @media (min-width: $screen-md)
      &__box
        min-height: 200px

      &__title
        font-size: 80px

    @media (min-width: $screen-xl)
      &__box
        min-height: 300px
</style>
