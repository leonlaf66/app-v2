<template>
  <div class="page-my">
    <top-banner class="top-banner">
      <my-account class="my-account" slot="myAccount"></my-account>
    </top-banner>
    
    <group label-width="5em" v-once style="margin-top:0">
      <cell primary="content" :title="'My Favorites' | $tt('我的收藏')" @click.native="$router.push({name: 'my-favorites'})"></cell>
      <cell primary="content" :title="'My Schedule' | $tt('我的预约')" @click.native="$router.push({name: 'my-schedules'})"></cell>
    </group>
    <group label-width="5em" v-if="$store.state.account.user">
      <cell primary="content" :title="'Logout' | $tt('退出登陆')" @click.native="logout"></cell>
    </group>
    <!--
    <group label-width="5em" v-once>
      <cell primary="content" :title="'About Us' | $tt('关于我们')" is-link :disabled="true"></cell>
    </group>
    -->
  </div>
</template>

<script>
import TopBanner from '@/components/my/Banner'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

import MyAccount from '@/components/my/MyAccount'

export default {
  name: 'page-my',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  components: {
    TopBanner,
    Group,
    Cell,
    MyAccount
  }
}
</script>

<style lang="scss">
.page-my {
  .top-banner {
    position:relative;
  }
  .my-account {
    position:absolute;
    top:50%;
    margin-top:-30px;
    width:100%;
    text-align:center;
  }
}
</style>