<template>
  <div class="page-home has-b-nav">
    <native-app></native-app>
    <div class="banner" :style="bannerBgStyle">
      <div class="bar">
        <area-switcher></area-switcher>
        <language-switcher class="language-switcher"></language-switcher>
      </div>
    </div>
    <top-nav></top-nav>
    <div class="recommended-houses">
      <h2 class="h2-title vux-1px-b">
        {{ 'LUXURY HOUSE' | $tt('精品豪宅') }}
        <a class="lt"></a>
      </h2>
      <keep-alive>
        <rcmd-houses :items="rcmdHouses"></rcmd-houses>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import AreaSwitcher from '@/components/area/switcher'
import LanguageSwitcher from '@/components/language/switcher'
import TopNav from './topNav'
import RcmdHouses from '@/components/house/list'
import NativeApp from '@/components/native-app'

export default {
  computed: {
    bannerBgStyle () {
      return 'background-image:url(' + require('@/assets/home-top-bg.jpg') + ')'
    },
    rcmdHouses () {
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
        vm.$store.dispatch('loading', false)
      })
    } else {
      next()
    }
  },
  components: {
    AreaSwitcher,
    LanguageSwitcher,
    TopNav,
    RcmdHouses,
    NativeApp
  }
}
</script>

<style lang="scss">
.page-home {
  .banner {
    height:250px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .bar {
      height:40px;
      background-color:rgba(0, 0, 0, .3);
      position:relative;
    }
    .language-switcher {
      position: absolute;
      right: 12px;
      top: 5px;
    }
  }
  .recommended-houses {
    margin-top:20px;
  }
}
</style>