<template>
  <nav class="main-nav main-nav--closed">
    <ul class="main-nav__list">
      <li class="main__nav__item">
        <router-link to="/latest" class="main-nav__link"
                     :active-class="'main-nav__link--active'">
          <svg class="main-nav__icon" width="17" height="17">
            <use xlink:href="#icon-movie"></use>
          </svg>
          Latest
        </router-link>
      </li>
      <li class="main__nav__item">
        <router-link to="/now-playing" class="main-nav__link"
                     :active-class="'main-nav__link--active'">
          <svg class="main-nav__icon" width="17" height="17">
            <use xlink:href="#icon-calendar"></use>
          </svg>
          Now Playing
        </router-link>
      </li>
      <li class="main__nav__item">
        <router-link to="/popular" class="main-nav__link"
                     :active-class="'main-nav__link--active'">
          <svg class="main-nav__icon" width="17" height="17">
            <use xlink:href="#icon-popular"></use>
          </svg>
          Popular
        </router-link>
      </li>
      <li class="main__nav__item">
        <router-link to="/top-rated" class="main-nav__link"
                     :active-class="'main-nav__link--active'">
          <svg class="main-nav__icon" width="17" height="17">
            <use xlink:href="#icon-top"></use>
          </svg>
          Top Rated
        </router-link>
      </li>
      <li class="main__nav__item">
        <router-link to="/upcoming" class="main-nav__link"
                     :active-class="'main-nav__link--active'">
          <svg class="main-nav__icon" width="17" height="17">
            <use xlink:href="#icon-trailer"></use>
          </svg>
          Upcoming
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'Navigation',
  };
</script>

<style lang="sass">
  .main-nav
    width: 100%
    top: 68px
    left: 0
    position: absolute
    background-color: $color-brown--secondary
    z-index: 10

    &--closed
      transform: scaleY(0)
      transform-origin: top
      transition: transform 0.3s ease-in-out

    &--opened
      transform: scaleY(1)
      transform-origin: top
      transition: transform 0.3s ease-in-out

    &__link
      box-sizing: border-box
      position: relative
      padding: 15px 0
      display: flex
      align-items: center
      justify-content: center
      font-size: 13px
      font-weight: 400
      color: $color-text
      transition: all 0.3s ease-in-out
      outline: none

      &:hover,
      &:focus
        color: $color-text--secondary
        transition: all 0.3s ease-in-out

        & .main-nav__icon
          fill: $color-text--secondary
          transition: all 0.3s ease-in-out

      &:active
        color: $color-action
        transition: all 0.3s ease-in-out

        & .main-nav__icon
          fill: $color-action
          transition: all 0.3s ease-in-out

      &--active
        color: $color-action

        & .main-nav__icon
          fill: $color-action

    &__icon
      fill: $color-text
      position: absolute
      left: calc(50% - 70px)
      transition: all 0.3s ease-in-out

    @media (min-width: $screen-sm)
      &__list
        padding: 15px 0

    @media (min-width: $screen-md)
      position: static
      transform: none
      min-height: auto

      &__link
        justify-content: flex-start
        padding-left: 67px

      &__icon
        left: 38px

</style>
