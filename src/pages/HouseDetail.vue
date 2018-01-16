<template>
  <div class="page-house-detail has-fixed-header">
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回')}">
      <!-- <a slot="right">收藏</a> -->
    </x-header>
    <Gallery ref="gallery"></Gallery>
    <template v-if="data.id">
      <div class="base-info">
        <div class="header vux-1px-b">
          <div class="name lr-pad">{{ data.nm }}</div>
          <div class="address lr-pad">{{ data.loc }}</div>
          <div class="price lr-pad">{{ data.price | price }}</div>
        </div>
        <div class="table-info lr-pad">
          <div class="item">
            <label>{{ 'Type' | $tt('类型') }}</label>
            <span>{{ data.prop | house-prop-name | $tt}}</span>
          </div>
          <div class="item">
            <label>{{ 'Baths' | $tt('浴室') }}</label>
            <span>{{ data.baths[0] }}.{{ data.baths[1] }}</span>
          </div>
          <div class="item">
            <label>{{ 'Beds' | $tt('卧室') }}</label>
            <span>{{ data.beds | field-display }}</span>
          </div>
          <div class="item">
            <label>{{ 'Living Area' | $tt('居住面积') }}</label>
            <span>{{ data.square_feet | square | field-display}}</span>
          </div>
          <div class="item">
            <label>{{ 'Area' | $tt('区域') }}</label>
            <span>{{ data.area | field-display}}</span>
          </div>
        </div>
      </div>

      <div class="more-information vux-1px-tb" @click="onNearbiesView">
        <a>{{ 'View Recommended Houses' | $tt('查看附近房源') }}</a>
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

    <!-- <FooterNav @item-click="handlerNavClick"></FooterNav> -->
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import Gallery from '@/components/HouseGallery'
import HouseList from '@/components/HouseList'
import Nearbies from '@/components/house/Nearbies'
import FooterNav from '@/components/HouseNav'

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

      return (field.prefix ? field.prefix : '') + value + (field.suffix ? field.suffix : '')
    }
  },
  created () {
    this.$store.dispatch('loading', true)
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
          this.$store.dispatch('loading', false)
        }, 400)
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
    FooterNav
  }
}
</script>

<style lang="scss">
.page-house-detail {
  .base-info {
    background-color:#fff;
    padding-bottom:5px;
    margin-top:10px;
    .lr-pad {padding:0 5px;}
    .name {font-size:16px;font-weight:bold;margin-bottom:3px;}
    .address {color:#777;}
    .price {margin:15px 0;height:28px;font-size:16px;color:red;}
    .header {
      margin-bottom:8px;
    }
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

  .nearby-houses {
    margin-top:10px;
    > h2 {padding-left:5px;;margin:0;font-size:16px;}
  }
}
</style>