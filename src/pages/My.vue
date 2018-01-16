<template>
  <div>
    <top-banner v-once></top-banner>
    
    <group label-width="5em" v-once style="margin-top:0">
      <cell primary="content" :title="'My Favorites' | $tt('我的收藏')" is-link></cell>
      <cell primary="content" :title="'My Schedule' | $tt('我的预约')" is-link></cell>
    </group>
    <group label-width="5em" v-once>
      <cell primary="content" :title="'About Us' | $tt('关于我们')" is-link></cell>
    </group>
  </div>
</template>

<script>
import TopBanner from '@/components/my/Banner'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'

export default {
  name: 'page-my',
  components: {
    TopBanner,
    Group,
    Cell
  }
}
</script>

<style lang="scss">
.route-my {
  background:#fbf9fe;
  .vux-label {color:#999;}
}
</style>