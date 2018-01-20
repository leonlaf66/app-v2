<template>
  <div>
    <router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import FooterNav from '@/components/footerNav'

export default {
  components: {
    FooterNav
  }
}
</script>