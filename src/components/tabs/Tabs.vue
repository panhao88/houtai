<template>
  <div>
    <div class="container">
      <draggable v-model="tabList" class="drag" @update="change">
        <div
          v-for="(item, index) in tabList"
          :key="item.name"
          class="content"
          :class="{ active: activeName === item.name }"
          @click="handleClick(item, index)"
          @contextmenu="contextmenu"
        >
          <div class="circle" v-if="activeName === item.name"></div>
          <div class="item" :class="{ pd: activeName === item.name }">
            <div class="name">{{ item.name }}</div>
            <div
              v-if="(activeName === item.name && tabList.length > 1) || (tabList.length === 1 && item.name !=='首页')"
              class="close"
              @click="close"
            >
              <i class="el-icon-close"></i>
            </div>
          </div>
        </div>
      </draggable>
    </div>
    <div
      class="menus"
      v-if="showMenu"
      v-clickoutside="handleClickOutside"
      :style="{ top: top + 'px', left: left + 'px' }"
    >
      <div @click="closeOther">关闭其他</div>
      <div @click="closeLeft">关闭左侧</div>
      <div @click="closeRight">关闭右侧</div>
    </div>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import { mapMutations } from 'vuex'
import draggable from 'vuedraggable'
export default {
  name: '',
  props: {},
  data() {
    return {
      activeName: '',
      top: 0,
      left: 0,
      showMenu: false
    }
  },
  components: {
    draggable
  },
  methods: {
    ...mapMutations(['setTabList']),
    handleClick(tab, index) {
      let route = this.$store.state.tabList.find(item => item.name === tab.name)
      this.activeName = tab.name
      if (this.$route.meta.title !== tab.name) this.$router.push(route.url)
    },
    change(e) {
      e.preventDefault()
    },
    contextmenu(e) {
      e.preventDefault()
      this.showMenu = true
      this.left = e.pageX
      this.top = e.pageY
    },
    handleClickOutside() {
      this.showMenu = false
    },
    close(e) {
      e.stopPropagation()
      localStorage.tabList = []
      if (this.tabList.length === 1 && this.tabList[0].name !== '首页') {
        let arr = [
          {
            name: '首页',
            url: '/'
          }
        ]
        this.setTabList(arr)
        localStorage.setItem('tabList', JSON.stringify(arr))
        this.$router.push('/')
      }
      let arr = this.tabList.filter(item => item.name !== this.$route.meta.title)
      let index = this.tabList.findIndex(item => item.name == this.$route.meta.title)
      if (this.tabList.length > 1) {
        if (index === this.tabList.length - 1) {
          let url = this.tabList[index - 1].url
          this.$router.push(url)
        } else {
          let url = this.tabList[index + 1].url
          this.$router.push(url)
        }
        this.setTabList(arr)
        localStorage.setItem('tabList', JSON.stringify(arr))
      }
    },
    closeOther() {
      localStorage.tabList = []
      let arr = this.tabList.filter(
        item => item.name === this.$route.meta.title
      )
      this.setTabList(arr)
      localStorage.setItem('tabList', JSON.stringify(arr))
      this.showMenu = false
    },
    closeLeft() {
      localStorage.tabList = []
      let index = this.tabList.findIndex(
        item => item.name == this.$route.meta.title
      )
      if (index === 0) {
        this.$message.error('已经是第一个啦')
        this.showMenu = false
      } else {
        let arr = this.tabList.filter((item, idx) => idx >= index)
        this.setTabList(arr)
        this.showMenu = false
        localStorage.setItem('tabList', JSON.stringify(arr))
      }
    },
    closeRight() {
      localStorage.tabList = []
      let index = this.tabList.findIndex(
        item => item.name == this.$route.meta.title
      )
      if (index === this.tabList.length - 1) {
        this.$message.error('已经是最后一个啦')
        this.showMenu = false
      } else {
        let arr = this.tabList.filter((item, idx) => idx <= index)
        this.setTabList(arr)
        this.showMenu = false
        localStorage.setItem('tabList', JSON.stringify(arr))
      }
    }
  },
  directives: {
    Clickoutside
  },
  mounted() {
    this.activeName = this.$route.meta.title
  },
  computed: {
    tabList: {
      get() {
        return this.$store.state.tabList
      },
      set(val) {
        localStorage.tabList = []
        localStorage.setItem('tabList', JSON.stringify(val))
        this.setTabList(val)
      }
    }
  },
  watch: {
    $route(val) {
      this.activeName = val.meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  .drag {
    display: flex;
  }
  .content {
    border: 1px solid #ddd;
    font-size: 12px;
    padding: 2px 10px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
    cursor: pointer;
    .circle {
      height: 8px;
      width: 8px;
      background: #fff;
      border-radius: 50%;
      margin-right: 5px;
    }
    .item {
      position: relative;
      .name {
      }
      .close {
        z-index: 99;
        position: absolute;
        font-size: 12px;
        top: 0;
        right: -6px;
        padding-right: 2px;
        z-index: 2020;
      }
    }
  }
  .active {
    background: #409eff;
    color: #fff;
  }
  .pd {
    padding-right: 10px;
  }
}
.menus {
  position: absolute;
  background: #fff;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  color: #333;
  border-radius: 4px;
  font-size: 12px;
  padding: 5px;
  z-index: 9999;
  cursor: pointer;
  div {
    padding: 7px 5px;
    z-index: 9999;
  }
}
</style>
