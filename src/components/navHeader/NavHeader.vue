<template>
  <div class="headerNav">
    <div class="t-left" data-step="1" data-intro="欢迎语">欢迎来到小爱后台系统</div>
    <div class="t-right">
      <div class="time" data-step="2" data-intro="当前时间">{{now}}</div>
      <div class="weather" data-step="3" data-intro="今日天气">
        <div v-if="hour < 20" class="w-img">
          <img :src="weather.dayPictureUrl" />
        </div>
        <div v-if="hour >= 20" class="w-img">
          <img :src="weather.nightPictureUrl" />
        </div>
        <div>{{weather.weather}}</div>
      </div>
      <div class="user" data-step="4" data-intro="当前用户">亲爱的, {{user.username}}</div>
      <div class="out" @click="logout" data-step="5" data-intro="退出">退出</div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" :show-close="false" :append-to-body="true">
      <h2 class="flex a-center j-center">是否需要新手指引</h2>
      <span slot="footer" class="dialog-footer">
        <el-button @click="not">不再提示</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import introJs from 'intro.js'
import axios from "axios"
export default {
  name: "NavHeader",
  data() {
    return {
      weather: {},
      timer: null,
      now: new Date().toLocaleString(),
      hour: '',
      user: JSON.parse(localStorage.adminUser),
      dialogVisible: false
    };
  },
  methods: {
    getWeather() {
      this.$api
        .jsonp({
          url:
            "http://api.map.baidu.com/telematics/v3/weather?location=%E6%88%90%E9%83%BD&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
        })
        .then(res => {
          if (res.status === "success") {
            this.weather = res.results[0].weather_data[0]
          }
        });
    },
    logout() {
      localStorage.removeItem('adminUser')
      localStorage.removeItem('tabList')
      this.$store.commit('setTabList', [{ name: '首页', url: '/' }])
      this.$router.push('/login')
      this.$message.success('欢迎下次光临')
    },
    guide() {
      introJs().setOptions({
        prevLabel: "上一步",
        nextLabel: "下一步",
        skipLabel: "跳过",
        doneLabel: "立即体验",
        hidePrev: true,
        hideNext: true,
      }).oncomplete(function () {
        //点击跳过按钮后执行的事件
      }).onexit(function () {
        //点击结束按钮后， 执行的事件
      }).start()
    },
    sure() {
      this.dialogVisible = false
      this.$nextTick(() => {
        this.guide()
      })
    },
    not() {
      this.dialogVisible = false
      localStorage.setItem('showIntro', 0)
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.now = new Date().toLocaleString();
    }, 1000);
    this.getWeather()
    this.hour = this.$dayjs(Date.now()).format('HH')
    if (localStorage.getItem('showIntro') !== '0') this.dialogVisible = true
    else this.dialogVisible = false
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
};
</script>

<style scoped lang="scss">
.headerNav {
  background: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  color: #2e5e85;
  border-bottom: 1px solid #f0f2f5;
  display: flex;
  justify-content: space-between;
  .t-left {
    margin-left: 30px;
  }
  .t-right {
    margin-right: 50px;
    display: flex;
    align-items: center;
    .weather {
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 20px;
      .w-img {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 8px;
        img {
          height: 25px;
          width: 38px;
        }
      }
    }
    .out {
      cursor: pointer;
      color: #409eff;
      margin-left: 12px;
    }
  }
}
</style>
