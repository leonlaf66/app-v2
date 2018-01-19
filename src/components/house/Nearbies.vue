<template>
  <div v-transfer-dom>
    <popup v-model="show" position="right" style="left:0">
      <div style="width:100vw">
        <x-header :left-options="{backText: $tt('Return', '返回'), preventGoBack: true}"
          @on-click-back="setHidden">
          {{ 'Recommended Houses' | $tt('附近房源') }}
        </x-header>
        <div class="nearbiy-houses">
          <house-list :items="items" :replace-redirect="true"></house-list>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from 'vux/src/components/popup'
import TransferDom from 'vux/src/directives/transfer-dom'
import XHeader from 'vux/src/components/x-header'
import HouseList from '@/components/HouseList'

export default {
  props: ['value'],
  data () {
    return {
      show: false,
      items: []
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    setShow (id) {
      this.show = true
      this.$store.dispatch('loading', true)
      this.$houseApi(`house/${id}/nearbiy`).then(items => {
        this.items = items
        this.$store.dispatch('loading', false)
      })
    },
    setHidden () {
      this.show = false
    }
  },
  components: {
    Popup,
    XHeader,
    HouseList
  }
}
</script>