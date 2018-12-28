<template>
  <div>
    <!-- this svg is a container for svg icons and should not appear on the page.
To emphasise this I use inline style="display: none" -->
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="icon-magnifier" viewBox="0 0 17 17"><defs><path id="vw4wa" d="M852.69 38.5l-4.26-4.26a6.4 6.4 0 1 1 1.81-1.81l4.26 4.26zm-7.79-5.012a4.587 4.587 0 1 0 0-9.174 4.587 4.587 0 0 0 0 9.174z"/></defs><g><g transform="translate(-838 -22)"><use xlink:href="#vw4wa"/></g></g>
      </symbol>
      <symbol id="icon-arrow" viewBox="0 0 24 24">
        <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/>
      </symbol>
      <symbol id="icon-movie" viewBox="0 0 17 17">
        <defs><path id="4sw7a" d="M54 105c0 .693-.323 1-1 1 0 0-13 0-13.927.002-.955.001-1.126-.31-1.073-1.002V94c.007-.564.885-.923 1.438-1.054L52.47 89.87c.651-.153 1.302.269 1.455.944l.543 2.407-10.643 2.512L54 96zm-4.55-13.441l2.107 1.405 1.625-.383-2.108-1.406zm-3.28.775l2.108 1.405 1.625-.384-2.107-1.406zm-3.198.754l2.107 1.406 1.625-.383-2.107-1.406zm-3.27.772l2.107 1.406 1.625-.384-2.107-1.406zM53 97H39v8h14zm-5 4l-3 2v-4z"/></defs><g><g transform="translate(-38 -89)"><use xlink:href="#4sw7a"/></g></g>
      </symbol>
      <symbol id="icon-calendar" viewBox="0 0 17 17">
        <defs><path id="iau5a" d="M43 135h-2v-2h2zm3 0h-2v-2h2zm3 0h-2v-2h2zm-6 4h-2v-2h2zm3 0h-2v-2h2zm3 0h-2v-2h2zm2-10h-2v-3h2zm-7 0h-2v-3h2zm11 14H38v-15h3v2h4v-2h3v2h4v-2h3zm-2-12H40v10h13zm-1 4h-2v-2h2zm0 4h-2v-2h2z"/></defs><g><g transform="translate(-38 -126)"><use xlink:href="#iau5a"/></g></g>
      </symbol>
      <symbol id="icon-trailer" viewBox="0 0 15 15">
        <defs><path id="e8gsa" d="M54 200v15H39v-15zm-12 13h-2v1h2zm0-2h-2v1h2zm0-2h-2v1h2zm0-2h-2v1h2zm0-6h-2v1h2zm8 7h-7v6h7zm0-7h-7v6h7zm3 12h-2v1h2zm0-2h-2v1h2zm0-2h-2v1h2zm0-2h-2v1h2zm0-2h-2v1h2zm-11 0h-2v1h2zm0-2h-2v1h2zm11 0h-2v1h2zm0-2h-2v1h2z"/></defs><g><g transform="translate(-39 -200)"><use xlink:href="#e8gsa"/></g></g>
      </symbol>
      <symbol id="icon-popular" viewBox="0 0 24 24">
        <path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/>
      </symbol>
      <symbol id="icon-top" viewBox="0 0 24 24">
        <path d="M5 20v2h-2v-2h2zm2-2h-6v6h6v-6zm6-1v5h-2v-5h2zm2-2h-6v9h6v-9zm6-2v9h-2v-9h2zm2-2h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"/>
      </symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24">
        <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/>
      </symbol>
      <symbol id="icon-details" viewBox="0 0 17 13">
        <defs><path id="ee7pa" d="M918 34h3v3h-3zm5 0h12v3h-12zm-5-5h3v3h-3zm5 0h12v3h-12zm-5-5h3v3h-3zm17 0v3h-12v-3z"/></defs><g><g transform="translate(-918 -24)"><use xlink:href="#ee7pa"/></g></g>
      </symbol>
      <symbol id="icon-grid" viewBox="0 0 13 13">
        <defs><path id="rkewa" d="M960 24h3v3h-3zm5 10h3v3h-3zm-5-5h3v3h-3zm-5 0h3v3h-3zm5 5h3v3h-3zm-5 0h3v3h-3zm0-10h3v3h-3zm13 0v3h-3v-3zm-3 5h3v3h-3z"/></defs><g><g transform="translate(-955 -24)"><use xlink:href="#rkewa"/></g></g>
      </symbol>
      <symbol id="icon-heart" viewBox="0 0 24 24">
        <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
      </symbol>
      <symbol id="icon-like" viewBox="0 0 24 24">
        <path d="M21.406 9.558c-1.21-.051-2.87-.278-3.977-.744.809-3.283 1.253-8.814-2.196-8.814-1.861 0-2.351 1.668-2.833 3.329-1.548 5.336-3.946 6.816-6.4 7.401v-.73h-6v12h6v-.904c2.378.228 4.119.864 6.169 1.746 1.257.541 3.053 1.158 5.336 1.158 2.538 0 4.295-.997 5.009-3.686.5-1.877 1.486-7.25 1.486-8.25 0-1.648-1.168-2.446-2.594-2.506zm-17.406 10.442h-2v-8h2v8zm15.896-5.583s.201.01 1.069-.027c1.082-.046 1.051 1.469.004 1.563l-1.761.099c-.734.094-.656 1.203.141 1.172 0 0 .686-.017 1.143-.041 1.068-.056 1.016 1.429.04 1.551-.424.053-1.745.115-1.745.115-.811.072-.706 1.235.109 1.141l.771-.031c.822-.074 1.003.825-.292 1.661-1.567.881-4.685.131-6.416-.614-2.239-.965-4.438-1.934-6.959-2.006v-6c3.264-.749 6.328-2.254 8.321-9.113.898-3.092 1.679-1.931 1.679.574 0 2.071-.49 3.786-.921 5.533 1.061.543 3.371 1.402 6.12 1.556 1.055.059 1.024 1.455-.051 1.584l-1.394.167s-.608 1.111.142 1.116z"/>
      </symbol>
    </svg>
    <index></index>
  </div>
</template>

<script>
import Index from './components/Index';

export default {
  name: 'app',
  components: { Index },
  data() {
    return {
      window: {
        width: 0,
        height: 0,
      },
    };
  },
  mounted() {
    this.$store.dispatch('fetchGenresList');
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
  },
};
</script>

<style lang="sass">
  @import "assets/sass/global/font"
  @import "assets/sass/global/normalize"
  @import "assets/sass/global/scaffolding"
</style>
