<template>
  <div class="page-favorite">
    <x-header :left-options="{backText: $tt('RETURN', '返回')}" :title="'My Favorites' | $tt('我的收藏')"></x-header>
    <house-list :items="items" @item-remove="onRemoveItem"></house-list>
    <div class="no-record" v-if="items.length === 0 && ready">
      {{ 'No record was found' | $tt('没有任何记录') }}
    </div>
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import HouseList from '@/components/house/listex'
export default {
  data () {
    return {
      ready: false,
      items: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      this.$memberApi('favorite/list').then(items => {
        this.items = items
        this.ready = true
      })
    },
    onRemoveItem (item, idx) {
      let params = {
        id: item.id
      }

      this.$memberApi('favorite/remove', { params }).then(flag => {
        this.items.splice(idx, 1)
      })
    }
  },
  components: {
    XHeader,
    HouseList
  }
}
</script>