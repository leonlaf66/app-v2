<template>
  <div>
    <router-view></router-view>
    <FooterNav></FooterNav>
  </div>
</template>

<script>
import FooterNav from '@/components/FooterNav'

export default {
  components: {
    FooterNav
  }
}
</script>