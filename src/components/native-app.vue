<template>
  <div class="native-app-download" v-if="isShow">
    <a @click="close" href="#" class="btn-close"><span></span></a>
    <img class="logo" src="https://passport.usleju.com/static/img/logo.png">
    <h3>{{ 'OPEN APP' | $tt('打开米乐居APP')}}</h3>
    <a href="http://www.usleju.com/mobile-app-download.php" target="_blank" class="btn-open">
      {{ 'OPEN' | $tt('立即打开') }}
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    isShow () {
      return this.$store.state.app.isShowDownload
    }
  },
  methods: {
    close () {
      this.$store.dispatch('closeDownload')
    }
  }
}
</script>

<style lang="scss">
.native-app-download {
  background:#fff;
  height:55px;
  position:relative;
  .logo {
    max-height:85%;
    position: absolute;
    left: 32px;
    top: 3px;
  }
  > h3 {
    position:absolute;
    left:95px;
    line-height:55px;
    color:#555;
  }
  .btn-open {
    display:block;
    position:absolute;
    right:0;top:0;bottom:0;
    width:100px;
    background:#a0b737;
    text-align:center;
    line-height:55px;
    font-size:15px;
    color:#fff;
  }
}

.native-app-download .btn-close{
  display:block;
  width:35px;
  height:55px;
  position:absolute;
  line-height:60px;
  text-align:center;
  > span {
    display:inline-block;
    width:14px;height:14px;
    background-image:url(data:image/png;base64,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);
    background-size: cover;
  }
}
</style>