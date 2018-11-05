<template>
  <div id="app">
    <div v-transfer-dom>
      <loading v-model="isLoading" :text="'Loading' | $tt('加载中')"></loading>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import TransferDom from 'vux/src/directives/transfer-dom/index.js'
import Loading from 'vux/src/components/loading'
import FooterNav from '@/components/footerNav'

export default {
  name: 'app',
  computed: {
    lang () {
      return this.$store.state.app.language
    },
    isLoading () {
      return this.$store.state.app.isLoading
    },
    showMessage () {
      return true
    }
  },
  created () {
    this.initArea()
  },
  methods: {
    initArea () {
      let areaId = window.location.pathname.substring(1, 3)
      if (['ma', 'ca', 'ga', 'ny', 'il'].indexOf(areaId) !== -1) {
        this.$store.commit('CHENGE_AREA', areaId)
      } else {
        this.$router.replace({ name: 'home', params: { area_id: 'ma' } })
      }
    }
  },
  directives: {
    TransferDom
  },
  components: {
    FooterNav,
    Loading
  }
}
</script>

<style lang="scss">
html, body {
  background:#fbf9fe;
  height:100%;
}
body {
  margin:0;
  padding:0;
  font-size:13px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
input::-webkit-input-placeholder{
    color: #999;
    font-size:14px;
}
input::-webkit-input-placeholder {
  line-height:2em;
}
</style>

<style lang="less">
  @import '~vux/src/styles/1px.less';
</style>
