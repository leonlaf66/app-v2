<template>
  <div class="page-buy-house-flow has-fixed-header">
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回')}">
    </x-header>
    <img class="flows" src="/static/imgs/myflow.png">
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'

export default {
  name: 'buy-house-flow',
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