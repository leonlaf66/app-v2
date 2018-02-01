<template>
  <group>
    <popup-header :show-bottom-border="false">
      <template slot="left-text">
        <i class="iconfont icon-kefu"></i>
        {{ 'Contact Us' | $tt('联系我们') }}
      </template>
    </popup-header>
    <cell v-for="item in items" :title="item.title | $tt" :value="item.value" :key="item.title[0]"></cell>
  </group>
</template>

<script>
import Group from 'vux/src/components/group'
import PopupHeader from 'vux/src/components/popup-header'
import Cell from 'vux/src/components/cell'
export default {
  data () {
    return {
      items: [
        {
          title: ['Mobile', '移动电话'],
          value: '+086 15680728360'
        },
        {
          title: ['Tel', '座机'],
          value: '888-610-3288'
        },
        {
          title: ['Email', '邮箱'],
          value: 'contact@usleju.com'
        },
        {
          title: ['WeChat', '微信ID'],
          value: 'woniuusa'
        }
      ]
    }
  },
  components: {
    Group,
    PopupHeader,
    Cell
  }
}
</script>