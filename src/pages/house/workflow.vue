<template>
  <div class="page-buy-house-flow has-fixed-header">
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回')}">
    </x-header>
    <img class="flows" :src="myflowUrl">
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'

export default {
  name: 'buy-house-flow',
  computed: {
    myflowUrl () {
      return process.env.MEDIA_BASE_URL + '/imgs/myflow.png'
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang="scss">
.page-buy-house-flow {
  .flows {
    max-width:100%;
  }
}
</style>