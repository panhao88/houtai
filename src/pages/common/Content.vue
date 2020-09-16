<template>
  <el-container>
    <el-header>
      <nav-header></nav-header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <nav-left></nav-left>
      </el-aside>
      <el-main>
        <tabs></tabs>
        <!-- <transition
          mode="out-in"
          enter-active-class="animate__animated animate__fadeInLeft"
          leave-active-class="animate__animated animate__fadeOutLeft"
        > -->
          <router-view></router-view>
        <!-- </transition> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import NavHeader from "../../components/navHeader/NavHeader"
import NavLeft from "../../components/navLeft/NavLeft"
import NavView from "./Nav"
import Tabs from '../../components/tabs/Tabs'
export default {
  name: "Content",
  components: {
    NavHeader,
    NavLeft,
    NavView,
    Tabs
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() { },
  created() { },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.el-main {
  height: 100vh;
}
.el-aside {
  height: 100vh;
}
.icon {
  font-size: 24px;
  color: #fff;
}
</style>