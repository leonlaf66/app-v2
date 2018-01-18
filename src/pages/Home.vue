<template>
  <div class="page-home has-b-nav">
    <HomeTopBanner v-once></HomeTopBanner>
    <HomeMenu v-once></HomeMenu>

    <div class="recommended-houses">
      <h2 class="h2-title vux-1px-b">
        {{ 'LUXURY HOUSE' | $tt('精品豪宅') }}
        <a class="lt"></a>
      </h2>
      <keep-alive>
        <HouseList :items="topHouses"></HouseList>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import HomeTopBanner from '@/components/HomeTopBanner'
import HomeMenu from '@/components/HomeMenu'
import HouseList from '@/components/HouseList'

export default {
  name: 'page-home',
  computed: {
    topHouses () {
      return this.$store.state.topHouse.items
    }
  },
  created () {
    this.$store.dispatch('loadTopHouseItems')
  },
  beforeRouteEnter (to, from, next) {
    if (from.name !== 'house-detail') {
      next(vm => {
        vm.$scrollTop(0)
      })
    } else {
      next()
    }
  },
  components: {
    HomeTopBanner,
    HomeMenu,
    HouseList
  }
}
</script>

<style lang="scss" scoped>
.search-top {
  position: fixed;
  top: 0;right: 0;left: 0;
  z-index:10;
}
.recommended-houses, .recent-news {
  margin-top: 05px;
  background: #fff;
  padding-top: 10px;
}
</style>