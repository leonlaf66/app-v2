<template>
  <div class="my-top-banner" :style="bgStyle">
    <slot name="logo"></slot>
    <slot name="myAccount"></slot>
  </div>
</template>

<script>
export default {
  computed: {
    bgStyle () {
      return 'background-image: url(' + require('@/assets/my-bg.jpg') + ')'
    }
  }
}
</script>

<style lang="scss">
.my-top-banner {
  width:100%;
  height:168px;
  text-align:content;
  background-size: cover;
  background-position: center center;
  color:#fff;
  a {
    color:#fff;
  }
}
</style>