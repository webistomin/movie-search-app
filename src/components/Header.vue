<template>
  <header class="page-header">
    <div class="page-header__inner">
      <div class="page-header__block page-header__block--heading">
        <h1 class="page-header__logo">
          <router-link to="/" class="page-header__home">
            <span class="page-header__decor">Movie</span>searcher
          </router-link>
        </h1>
        <button class="page-header__toggler"
                :class="getToggleClass"
                @click="toggleAppNavigation"
                aria-label="Open navigation menu">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="page-header__block page-header__block--search">
        <div class="page-header__wrapper">
          <input type="text" class="page-header__input" title="Search a movie" placeholder="Search a movie...">
          <svg class="page-header__icon page-header__icon--absolute" width="17" height="17">
            <use xlink:href="#icon-magnifier"></use>
          </svg>
        </div>
        <div class="page-header__buttons">
          <button class="page-header__button"
                  :class="{'page-header__button--active' : getRowViewState}"
                  @click="setRowView"
                  title="Row view">
            <svg class="page-header__icon" width="17" height="13">
              <use xlink:href="#icon-details"></use>
            </svg>
            Row view
          </button>
          <button class="page-header__button"
                  :class="{'page-header__button--active' : getGridViewState}"
                  @click="setGridView"
                  title="Grid view">
            <svg class="page-header__icon" width="17" height="13">
              <use xlink:href="#icon-grid"></use>
            </svg>
            Grid view
          </button>
        </div>
      </div>
      <div class="page-header__block page-header__block--user">
        <div class="page-header__account">
          <a href="#" class="page-header__btn btn" v-if="!getAuthorizeState">Sign in</a>
          <template v-else>
            <div class="page-header__userblock">
              <img src="/static/img/content/ava.jpg" width="32" height="32" alt="Avatar" class="page-header__avatar">
              <p class="page-header__text">Hello, <span class="page-header__name">Olia</span>!</p>
            </div>
            <div class="page-header__dropdown">
              <button class="page-header__button page-header__button--arrow"
                      :class="getUserButtonClass"
                      aria-label="Open user menu"
                      @click="toggleUserMenu">
                <svg class="page-header__icon page-header__icon--arrow" width="12" height="12">
                  <use xlink:href="#icon-arrow"></use>
                </svg>
              </button>
              <ul class="page-header__list" :class="getUserMenuClass">
                <li class="page-header__item">
                  <a href="#" class="page-header__link">
                    <svg class="page-header__icon page-header__icon--left" width="17" height="17">
                      <use xlink:href="#icon-heart"></use>
                    </svg>
                    Favorite list
                  </a>
                </li>
                <li class="page-header__item">
                  <a href="#" class="page-header__link">
                    <svg class="page-header__icon page-header__icon--left" width="17" height="17">
                      <use xlink:href="#icon-logout"></use>
                    </svg>
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        isUserMenuOpened: false,
      };
    },
    methods: {
      setRowView() {
        this.$store.commit('setRowView', true);
        this.$store.commit('setGridView', false);
      },
      setGridView() {
        this.$store.commit('setGridView', true);
        this.$store.commit('setRowView', false);
      },
      toggleAppNavigation() {
        // eslint-disable-next-line no-unused-expressions
        this.getNavigationState ? this.$store.commit('setNavigationState', false) : this.$store.commit('setNavigationState', true);
      },
      toggleUserMenu() {
        this.isUserMenuOpened = !this.isUserMenuOpened;
      },
    },
    computed: {
      getUserMenuClass() {
        return this.isUserMenuOpened ? 'page-header__list--opened' : 'page-header__list--closed';
      },
      getUserButtonClass() {
        return this.isUserMenuOpened ? 'page-header__button--opened' : 'page-header__button--closed';
      },
      getAuthorizeState() {
        return this.$store.getters.getAuthorizeState;
      },
      getNavigationState() {
        return this.$store.getters.getNavigationState;
      },
      getRowViewState() {
        return this.$store.getters.getRowViewState;
      },
      getGridViewState() {
        return this.$store.getters.getGridViewState;
      },
      getToggleClass() {
        return this.getNavigationState ? 'page-header__toggler--opened' : 'page-header__toggler--closed';
      },
    },
  };
</script>

<style lang="sass">
  .page-header
    &__decor
      margin-right: 8px

    &__logo
      margin: 0

    &__home
      display: block
      position: relative
      font-family: $font-family--secondary
      font-size: 18px
      font-weight: 700
      text-transform: uppercase
      color: $color-text--secondary
      transition: all 0.3s ease-in-out
      outline: none

      &:hover,
      &:focus
        color: $color-gold
        transition: all 0.3s ease-in-out

      &:active
        color: $color-action
        transition: all 0.3s ease-in-out

      &::before
        width: 17px
        height: 6px
        content: ""
        position: absolute
        left: 5px
        top: 10px
        background-color: transparent
        background-image: url("~/static/img/content/scarf.svg")

    &__block
      display: flex
      align-items: center
      justify-content: space-between
      padding: 24px 12px

      &--heading,
      &--user,
      &--search
        background-color: $color-brown

    &__buttons
      display: none

    &__toggler
      font-size: 0
      width: 30px
      height: 20px
      background-color: transparent
      position: relative

      &:hover,
      &:focus
        span
          background-color: $color-gold
          transition: all 0.3s ease-in-out

      & span
        display: block
        width: inherit
        height: 2px
        background-color: $color-text--secondary
        position: absolute
        transition: all 0.3s ease-in-out

      &--closed
        & span
          &:first-child
            top: 0

          &:nth-child(2)
            top: 9px

          &:last-child
            bottom: 0

      &--opened
        & span
          &:first-child
            top: 8px
            transform: rotate(45deg)

          &:nth-child(2)
            top: 9px
            opacity: 0

          &:last-child
            transform: rotate(-45deg)
            bottom: 10px

    &__wrapper
      width: 100%
      position: relative

    &__icon
      transition: all 0.3s ease-in-out
      fill: $color-brown

      &--absolute
        position: absolute
        right: 10px
        top: 50%
        transform: translateY(-50%)
        fill: #d4d8da

      &--left
        fill: $color-text
        position: absolute
        left: calc(50% - 70px)
        transition: all 0.3s ease-in-out

      &--white
        fill: $color-text--secondary
        margin-right: 10px

      &--arrow
        fill: $color-text--secondary

    &__input
      width: 100%
      padding: 16.5px 10px
      padding-right: 30px
      box-sizing: border-box
      border: 1px solid #d4d8da
      border-radius: 5px
      font-weight: 400
      font-size: 13px
      background-color: transparent
      color: $color-text--secondary
      transition: all 0.3s ease-in-out

      &:hover
        border-color: $color-gold

        & + .page-header__icon--absolute
          fill: $color-gold

      &:focus
        border-color: $color-gold
        outline: none

        & + .page-header__icon--absolute
          fill: $color-gold

      &::placeholder
        color: $color-text--secondary

    &__account
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center

    &__avatar
      border-radius: 50%
      margin-right: 16px
      border: 3px solid $color-gold

    &__button
      transition: all 0.3s ease-in-out

      &:hover,
      &:focus
        .page-header__icon
          transition: all 0.3s ease-in-out
          fill: $color-gold

      &--arrow
        width: 32px
        height: 32px
        font-size: 0
        outline: none

      &--closed
        transform: rotate(0deg)

      &--opened
        transform: rotate(-180deg)

    &__userblock
      display: flex
      align-items: center

    &__btn
      display: flex
      display: none
      align-items: center
      justify-content: center
      width: 100px
      text-align: center
      margin: 0 auto

    &__text
      font-size: 13px
      font-weight: 400
      color: $color-text--secondary
      position: relative
      max-width: 100px
      overflow: hidden
      text-overflow: ellipsis

    &__name
      text-decoration: underline

    &__list
      display: block
      position: absolute
      top: 250px
      left: 0
      width: 100%
      background-color: $color-brown--secondary
      z-index: 1

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

        & .page-header__icon
          fill: $color-text--secondary
          transition: all 0.3s ease-in-out

      &:active
        color: $color-action
        transition: all 0.3s ease-in-out

        & .page-header__icon
          fill: $color-action
          transition: all 0.3s ease-in-out


    @media (min-width: $screen-sm)

      &__inner
        display: flex
        flex-wrap: wrap

      &__block
        box-sizing: border-box

        &--heading
          width: 100%

        &--search,
        &--user
          width: 50%

      &__list
        top: 165px

    @media (min-width: $screen-md)
      &__decor
        display: none

      &__inner
        flex-wrap: nowrap
        align-items: flex-start

      &__block
        box-sizing: border-box
        flex-shrink: 0
        min-height: 60px

        &--heading,
        &--user
          width: 20vw

        &--search
          width: 60vw
          padding: 13px 12px
          flex-shrink: 0
          padding-left: 30px
          padding-right: 56px

        &--heading
          position: relative
          padding: 20px 12px
          padding-left: 45px

          &::after
            content: ""
            position: absolute
            top: 0
            right: 0
            width: 5px
            height: 100%
            background-color: rgba(255, 255, 255, 0.1)

        &--user
          padding: 11px 12px
          position: relative

          &::after
            content: ""
            position: absolute
            top: 0
            left: 0
            width: 5px
            height: 100%
            background-color: rgba(255, 255, 255, 0.1)

      &__toggler
        display: none

      &__input
        padding-top: 8.5px
        padding-bottom: 8.5px

      &__buttons
        display: flex
        margin-left: 42px

      &__button
        font-size: 0
        width: 34px
        height: 34px
        outline: none

        & .page-header__icon
          fill: $color-text--secondary

        &--active
          & .page-header__icon
            fill: $color-gold

      &__account
        justify-content: center

      &__list
        width: 20vw
        top: 60px
        left: 0
        z-index: 10
        background-color: $color-brown

    @media (min-width: $screen-lg)
      &__decor
        display: inline
</style>
