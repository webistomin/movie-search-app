<template>
  <section class="message"
            :class="{'message--hidden' : !isVisible,
                     'message--visible' : isVisible}">
    <button class="message__btn" @click="removeMessage">Close</button>
    <p class="message__text">
      {{getMessage}}
    </p>
  </section>
</template>

<script>
  export default {
    name: 'MessagePopup',
    data() {
      return {
        timeout: null,
        isStarted: false,
      };
    },
    computed: {
      isVisible() {
        return Boolean(this.$store.getters.getMessage);
      },
      getMessage() {
        return this.$store.getters.getMessage;
      },
    },
    methods: {
      removeMessage() {
        this.$store.commit('setMessage', null);
      },
      setMessageTimeout() {
        this.isStarted = true;
        this.timeout = setTimeout(() => {
          this.$store.commit('setMessage', null);
          this.isStarted = false;
        }, 5000);
      },
    },
    updated() {
      if (this.isStarted) {
        clearTimeout(this.timeout);
      }
    },
  };
</script>

<style lang="sass">
  .message
    box-sizing: border-box
    position: fixed
    right: 20px
    top: 20px
    padding: 30px 10px
    padding-right: 30px
    background-color: $color-gold
    border-radius: 10px
    width: 300px
    text-align: center
    z-index: 20

    &--hidden
      visibility: hidden
      opacity: 0
      transition: visibility 0s linear 0.33s, opacity 0.33s linear

    &--visible
      visibility: visible
      opacity: 1
      transition: visibility 0s linear 0.33s, opacity 0.33s linear
      transition-delay: 0s

    &__btn
      font-size: 0
      position: absolute
      width: 20px
      height: 20px
      top: 10px
      right: 10px
      outline: none

      &::before,
      &::after
        content: ""
        position: absolute
        top: 50%
        left: 0
        width: inherit
        height: 2px
        background-color: $color-brown
        transition: all 0.3s ease-in-out
        transform: translateY(-50%) rotate(45deg)

      &::after
        transform: translateY(-50%) rotate(-45deg)

      &:hover
        &::before,
        &::after
          background-color: $color-action
          transition: all 0.3s ease-in-out

    &__text
      color: $color-brown

      &::selection
        color: $color-text--secondary
</style>
