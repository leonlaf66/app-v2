<template>
  <div class="page-more" v-once>
    <div class="box">
      <img src="http://ma.usleju.cn/static/img/mobile-qr.png">
      <p class="l1">长按识别二维码，下载APP</p>
      <p class="l2">www.usleju.com</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-more'
}
</script>

<style lang="scss">
.page-more {
  height: 100vh;
  background:#fff;
  text-align:center;
  padding-top:50vh;
  .box {
    display:inline-block;
    margin-top:-175px;
    > img {
      border:solid 1px #333;
    }
    > p.l1 {
      margin-top:5px;
      font-size:18px;
      margin-bottom:8px;
    }
    > p.l2 {
      font-size:18px;
      color:#d90;
    }
  }
}
</style>