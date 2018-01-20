<template>
  <div class="page-house-detail has-fixed-header">
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回')}">
      <!-- <a slot="right">收藏</a> -->
    </x-header>
    <Gallery ref="gallery"></Gallery>
    <template v-if="data.id">
      <div class="base-info">
        <div class="header">
          <div class="name lr-pad">{{ data.nm }}</div>
          <div class="address lr-pad">{{ data.loc }}</div>
          <div class="price lr-pad">{{ data.price | price }}</div>
        </div>
      </div>

      <div class="more-information vux-1px-tb" @click="onNearbiesView" v-if="data.prop !== 'LD'">
        <a class="red-text">{{ 'View Recommended Houses' | $tt('查看附近房源') }}</a>
        <i class="ft iconfont icon-right"></i>
      </div>

      <div class="grouped-details" v-if="data.details">
        <group :title="group.title" :key="idx" v-for="(group, idx) in data.details">
          <cell :key="field"
            :title="item.title"
            :value="item | fieldValue"
            align-items="flex-start"
            v-for="(item, field) in group.items">
          </cell>
        </group>
      </div>
    </template>

    <nearbies ref="nearbies"></nearbies>

    <buttom-nav @item-click="handlerNavClick"></buttom-nav>
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import HouseList from '@/components/house/list'
import Nearbies from '@/components/house/nearbies'
import Gallery from './detail/gallery'
import ButtomNav from './detail/bottomNav'

export default {
  data () {
    return {
      id: this.$route.params.id,
      data: {}
    }
  },
  filters: {
    fieldValue (field) {
      let value = field.value instanceof Array ? field.value.join(',') : field.value
      if (!value || value === '') {
        return window.$tt('Unknown', '未提供')
      }

      return (field.prefix ? field.prefix + ' ' : '') + value + (field.suffix ? ' ' + field.suffix : '')
    }
  },
  created () {
    this.loadData(this.$route.params.id)
  },
  methods: {
    loadData (id) {
      this.id = id
      this.$store.dispatch('loading', true)
      this.$houseApi.get(`/house/${this.id}/`).then(data => {
        this.$setPageTitle(data.nm)
        this.data = data
        this.loadGallery(data.mls_id, data.id, data.img_cnt)
        setTimeout(() => {
          this.$scrollTop(0)
        }, 400)
        this.$store.dispatch('loading', false)
      })
    },
    loadGallery (mlsId, listNo, imgCnt) {
      imgCnt = parseInt(imgCnt)
      this.$refs.gallery.loadImages(mlsId, listNo, imgCnt)
    },
    onNearbiesView () {
      this.$refs.nearbies.setShow(this.id)
    },
    handlerNavClick (type) {
      //
    }
  },
  beforeDestroy () {
    this.data = {}
  },
  watch: {
    '$route' (to, from) {
      if (to.name === from.name) { // 在本页跳转
        this.$refs.nearbies.setHidden()
        this.loadData(to.params.id)
      }
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    Gallery,
    HouseList,
    Nearbies,
    ButtomNav
  }
}
</script>

<style lang="scss">
.page-house-detail {
  margin-bottom: 57px;
  .base-info {
    background-color:#fff;
    padding-bottom:5px;
    margin-top:15px;
    .lr-pad {padding:0 5px;}
    .name {font-size:16px;font-weight:bold;margin-bottom:3px;}
    .address {color:#777;}
    .price {padding:15px 5px;font-size:16px;color:red;}
    .table-info {
      font-size:0;
      .item {
        display:inline-block;width:50%;padding-bottom:5px;font-size:13px;
        > label {
          &:after {content: ':'}
        }
        > span {
          color:#777;
        }
      }
    }
  }

  .more-information {
    position: relative;
    padding:10px 0;
    text-align:center;
    > .ft {
      position: absolute;
      right: 5px;
      top: 8px;
      color: #C8C8CD;
    }
  }

  .grouped-details {
    .weui-cells__title {
      padding-left:5px;
    }
  }

  .nearby-houses {
    margin-top:10px;
    > h2 {padding-left:5px;;margin:0;font-size:16px;}
  }
}
</style>