<template>
  <div class="home-top" :style="bgStyle">
    <div class="top-bar">
      <HouseArea></HouseArea>
    </div>
    <language></language>
  </div>
</template>

<script>
import HouseArea from '@/components/HouseArea'
import Language from '@/components/Language'

export default {
  computed: {
    bgStyle () {
      return 'background-image:url(' + require('@/assets/home-top-bg.jpg') + ')'
    }
  },
  components: {
    HouseArea,
    Language
  }
}
</script>

<style lang="scss">
.home-top {
  height:250px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .top-bar {
    height:40px;
    background-color:rgba(0, 0, 0, .3);
  }
  .area-location {
    position:absolute;
    left:15px;top:8px;
    color:#fff;
    > .iconfont {
      font-size:20px;
    }
    > span {
      font-size:15px;
      font-weight:bold;
    }
  }
  .language {
    position: absolute;
    right: 12px;
    top: 6px;
  }
}
</style>