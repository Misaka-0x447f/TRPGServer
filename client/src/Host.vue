<template>
  <div class="master-root">
    <div class="container">
      <router-view class="router-view"></router-view>
    </div>
  </div>
</template>
<style lang="stylus">
  body
    width 100%
    height 100%
    margin 0
    background background-0
    display flex
    align-content center
    justify-content center
    font-family font-std
    -webkit-font-smoothing subpixel-antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color plain-text-0
    perspective 4500px
    overflow hidden
  
  ::-webkit-scrollbar {
    width: 0.3em;
    background-color: transparent;
  }

  /* Add a thumb */
  ::-webkit-scrollbar-thumb {
    background: scrollbar;
    border-radius: 10px;
  }
</style>
<style lang="stylus" scoped>
  .master-root {
    width: 100vw;
    height: 100vh;
  }

  .container {
    width 100%
    height 100%
    overflow hidden
  }

  .router-view {
    height: 100%;
    margin-right: 2.55em;
  }
</style>
