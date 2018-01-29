<template>
  <div class="page-schedule">
    <x-header :left-options="{backText: $tt('RETURN', '返回')}" :title="'My Schedules' | $tt('我的预约')"></x-header>
    <house-list :items="items" @item-remove="onRemoveItem">
      <template slot="top" slot-scope="props">
        <div class="item-top">
          <i class="iconfont icon-time"></i>
          {{ props.item.day_date }} ( {{ props.item.time_start }} to {{ props.item.time_end}} )
          <span class="status">
            {{ props.item.status === 0 ? '未确认' : '已确认' }}
          </span>
        </div>
      </template>
    </house-list>
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
      this.$memberApi('schedule/list').then(items => {
        this.items = items
        this.ready = true
      })
    },
    onRemoveItem (item, idx) {
      let params = {
        id: item.id
      }

      this.$memberApi('schedule/remove', { params }).then(flag => {
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

<style lang="scss">
.page-schedule {
  .item-top {
    position:relative;
    height:25px;
    margin-bottom:5px;
    color:#000;
    background-color:#eee;
    padding:2px 5px;
    border-radius:4px;
    .status {
      position:absolute;
      right:10px;
      top:8px;
      color:#5d9639;
    }
  }
  .house-listex .desc > h2 {
    font-size:15px;
    font-weight:200;
    margin-bottom:4px;
  }
}
</style>