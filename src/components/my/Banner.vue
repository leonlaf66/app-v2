<template>
  <div class="my-top-banner" :style="bgStyle">
    <div class="logo">
      <img src="/static/imgs/logo.png">
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    bgStyle () {
      return 'background-image: url(/static/imgs/my-bg.jpg)'
    }
  }
}
</script>

<style lang="scss">
.my-top-banner {
  position:relative;
  width:100%;
  height:168px;
  background-size: cover;
  background-position: center center;
  .logo {
    padding:5px;
    border-radius:5px;
    position:absolute;
    width:92px;height:85px;
    left:50%;margin-left:-46px;
    top:50%;margin-top:-45px;
  }
}
</style>