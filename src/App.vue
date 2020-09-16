<template>
  <div id="app">
    <!-- <transition 
    enter-active-class="animate__animated animate__bounceIn" 
    leave-active-class="animate__animated animate__backOutDown"> -->
      <router-view ></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
import 'vue-transition.css'
export default {

}
</script>

<style lang="scss">
@import "./styles/common";
@import "./styles/base";
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

</style>
