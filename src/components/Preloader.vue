<template>
  <div class="loader-body" id="loader">
    <div class="loader">
      <svg height="400" width="400" id="preloader">
        <g filter="url(#goo)">
          <circle class="outer" cx="200" cy="200" r="150"></circle>
          <circle class="drop" cx="200" cy="200" r="20"></circle>
        </g>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur">
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo">
              </feColorMatrix></feGaussianBlur></filter>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Preloader',
  };
</script>

<style>
</style>
