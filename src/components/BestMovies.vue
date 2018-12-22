<template>
  <section class="best">
    <div class="best__block">
      <h2 class="best__title title">Today best choice</h2>
    </div>
    <ul class="best__list">
      <li class="best__item">
        <a href="" class="best__link">
          <picture class="best__pic best__pic--gold">
            <img src="img/best@1x.jpg" alt="#" width="41" height="41" class="best__img">
          </picture>
          <div class="best__block best__block--padding">
            <span class="best__name">Gravity</span>
            <div class="best__rating"></div>
          </div>
        </a>
      </li>
      <li class="best__item">
        <a href="#" class="best__link">
          <picture class="best__pic best__pic--gold">
            <img src="img/best@1x.jpg" alt="#" width="41" height="41" class="best__img">
          </picture>
          <div class="best__block best__block--padding">
            <span class="best__name">Gravity</span>
            <div class="best__rating"></div>
          </div>
        </a>
      </li>
      <li class="best__item">
        <a href="#" class="best__link">
          <picture class="best__pic best__pic--gold">
            <img src="img/best@1x.jpg" alt="#" width="41" height="41" class="best__img">
          </picture>
          <div class="best__block best__block--padding">
            <span class="best__name">Gravity</span>
            <div class="best__rating"></div>
          </div>
        </a>
      </li>
      <li class="best__item">
        <a href="#" class="best__link">
          <picture class="best__pic best__pic--silver">
            <img src="img/best@1x.jpg" alt="#" width="41" height="41" class="best__img">
          </picture>
          <div class="best__block best__block--padding">
            <span class="best__name">Gravity</span>
            <div class="best__rating"></div>
          </div>
        </a>
      </li>
      <li class="best__item">
        <a href="#" class="best__link">
          <picture class="best__pic best__pic--silver">
            <img src="img/best@1x.jpg" alt="#" width="41" height="41" class="best__img">
          </picture>
          <div class="best__block best__block--padding">
            <span class="best__name">Gravity</span>
            <div class="best__rating"></div>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'BestMovies',
  };
</script>

<style lang="sass">
  .best
    display: none
    background-color: $color-brown--secondary

    &__title
      padding-top: 24px
      padding-bottom: 24px
      text-align: center
      background-color: $color-brown

    &__list
      display: flex
      flex-direction: column
      align-items: center
      padding-top: 20px

    &__item
      display: flex
      min-width: 122px
      margin-bottom: 20px

    &__link
      display: flex

      &:hover,
      &:focus
        .best__name
          color: $color-text--secondary
          transition: all 0.3s ease-in-out

      &:active
        .best__name
          color: $color-action
          transition: all 0.3s ease-in-out

    &__name
      display: block
      max-width: 63px
      overflow: hidden
      text-overflow: ellipsis
      font-size: 12px
      color: $color-text
      margin-bottom: 8px
      transition: all 0.3s ease-in-out

    &__img
      border-radius: 4px

    &__pic
      position: relative
      margin-right: 10px

      &::before
        width: 3px
        height: 100%
        content: ""
        position: absolute
        left: 0
        top: 0

      &--gold
        &::before
          background-color: $color-gold

      &--silver
        &::before
          background-color: $color-silver

    &__rating
      width: 63px
      height: 9px
      background-color: transparent
      background-image: url("~/static/img/content/stars.svg")
      background-size: contain
      background-repeat: no-repeat

    &__block
      &--padding
        padding: 5px 0

    @media (min-width: $screen-xs)
      &__list
        display: flex
        flex-direction: row
        flex-wrap: wrap
        justify-content: space-around

    @media (min-width: $screen-sm)
      display: block

      &__list
        padding-top: 25px

      &__item
        margin-bottom: 25px

    @media (min-width: $screen-md)
      &__title
        text-align: left
        padding-top: 23px
        padding-bottom: 22px
        padding-left: 44px
</style>
