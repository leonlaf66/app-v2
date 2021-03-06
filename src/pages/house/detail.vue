<template>
  <div class="page-house-detail has-fixed-header">
    <!--顶部导航-->
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回'), preventGoBack: true}" @on-click-back="onClickBack">
      <!-- <a slot="right">收藏</a> -->
      <template slot="right">
        <a class="iconfont icon-marker" style="font-size:26px" @click="onViewMap" v-if="data.latlng"></a>
      </template>
    </x-header>
    <!--图像Gallery-->
    <Gallery ref="gallery"></Gallery>
    <!--房源信息-->
    <template v-if="data.id">
      <div class="base-info">
        <div class="header">
          <div class="name lr-pad">{{ data.nm }}</div>
          <div class="address lr-pad">{{ data.loc }}</div>
          <div class="price lr-pad">{{ data.price | price }}</div>
          <div class="est-price lr-pad" v-if="data.prop !== 'RN' && data.est_sale">
            <label>{{ "UStamite" | $tt('米乐居估价') }}</label>
            <span>{{ data.est_sale | price }}</span>
          </div>
        </div>
        <like-it class="ft" :house="data" @success="onLikeSuccess"></like-it>
      </div>

      <div class="more-information vux-1px-tb" @click="onNearbiesView" v-if="data.prop !== 'LD'">
        <a class="red-text">{{ 'View Recommended Houses' | $tt('查看附近房源') }}</a>
        <i class="ft iconfont icon-right"></i>
      </div>

      <group class="roi-view" :title="'Uestimate' | $tt('投资回报率')" v-if="data.prop !== 'RN'">
        <roi :data="data.roi"></roi>
      </group>

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

    <!--地图-->
    <div v-transfer-dom @touchmove.prevent @scroll.prevent>
      <popup class="map-popup" v-model="showMap" position="bottom" style="top:44px">
        <house-map :loc="{lat: Number(data.latlng[0]), lng: Number(data.latlng[1])}" v-if="data.latlng && showMap"></house-map>
      </popup>
    </div>

    <!--推荐-->
    <nearbies ref="nearbies"></nearbies>

    <!--底部导航-->
    <buttom-nav :house="data"></buttom-nav>
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import TransferDom from 'vux/src/directives/transfer-dom'
import Popup from 'vux/src/components/popup'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import Roi from '@/components/house/roi'
import HouseList from '@/components/house/list'
import Nearbies from '@/components/house/nearbies'
import Gallery from './detail/gallery'
import LikeIt from './detail/LikeIt'
import HouseMap from './detail/map'
import ButtomNav from './detail/bottomNav'
import NativeApp from '@/components/native-app'

export default {
  data () {
    return {
      id: this.$route.params.id,
      data: {},
      showMap: false
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
    onViewMap () {
      this.showMap = !this.showMap
    },
    onClickBack () {
      this.$store.dispatch('loading', true)
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push({name: 'home'})
      }
    },
    onLikeSuccess (status) {
      this.$set(this.data, 'liked', status)
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
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Group,
    Cell,
    Gallery,
    Roi,
    HouseList,
    Nearbies,
    HouseMap,
    LikeIt,
    Popup,
    ButtomNav,
    NativeApp
  }
}
</script>

<style lang="scss">
.page-house-detail {
  margin-bottom: 57px;
  .base-info {
    position:relative;
    background-color:#fff;
    padding-bottom:5px;
    padding-top:5px;
    .header {margin-top:10px;}
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
    .est-price {
      margin-bottom:10px;
      margin-top:-6px;
      color:red;
    }
    .ft {
      position:absolute;
      right:10px;
      top:10px;
    }
  }

  .roi-view {
    .weui-cells__title {
      padding-left:5px;
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

  .house-map {
    background-color:#fff;
    padding:15px 10px 0 10px;
  }
}
</style>