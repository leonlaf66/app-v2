<template>
  <swipeout class="house-listex">
    <swipeout-item class="house-item vux-1px-b" v-for="item, idx in items" :key="item.id">
      <div slot="right-menu">
        <swipeout-button type="primary" @click.native="gotoHouse(item.house.id)">{{ 'OPEN' | $tt('打开') }}</swipeout-button>
        <swipeout-button type="warn" @click.native="$emit('item-remove', item, idx)">{{ 'REMOVE' | $tt('删除') }}</swipeout-button>
      </div>
      <div slot="content">
        <slot name="top" :item="item"></slot>
        <div class="item-inner">
          <div v-bg-set :style="item.house | image" class="image bg-img">
            <div class="price">
              <span>{{ item.house.price | price }}</span>
            </div>
          </div>
          <div class="desc">
            <h2>{{ item.house.nm }}</h2>
            <div class="address">{{ item.house.loc }}</div>
            <div class="info">
              <template v-if="item.house.prop !== 'LD'">
                <span>{{ 'Beds' | $tt('卧室') }} {{ item.house.beds }}</span>
                <span>{{ 'Baths' | $tt('卫生间') }} {{ item.house.baths | baths }} </span>
                <span>{{ item.house.square | square }}</span>
              </template>
              <template v-else>
                <span>{{ item.house.lot_size | square }}</span>
              </template>
            </div>
            <ul class="tags">
              <li class="red" v-if="isActive(item.house.status)">{{ 'Active' | $tt('销售中') }}</li>
              <li class="green">{{ item.house.l_days | list-day-desc }}</li>
            </ul>
          </div>
          <i class="left-allow-flag iconfont icon-arrowleft"></i>
        </div>
      </div>
    </swipeout-item>
  </swipeout>
</template>

<script>
import Swipeout from 'vux/src/components/swipeout/swipeout'
import SwipeoutItem from 'vux/src/components/swipeout/swipeout-item'
import SwipeoutButton from 'vux/src/components/swipeout/swipeout-button'
export default {
  name: 'house-listex',
  props: {
    items: {
      require: true,
      default: []
    }
  },
  filters: {
    image (item) {
      let imgUrl = window.$house.getImageUrl(item.mls_id, item.id)
      if (imgUrl) {
        return 'background-image:url(' + window.$house.getImageUrl(item.mls_id, item.id) + ')'
      }
      return ''
    }
  },
  methods: {
    isActive (status) {
      return status === 'ACT'
    },
    gotoHouse (id) {
      if (this.replaceRedirect) {
        this.$router.replace({name: 'house-detail', params: {'id': id}})
      } else {
        this.$router.push({name: 'house-detail', params: {'id': id}})
      }
    }
  },
  beforeDestroy () {
    this.isOnline = false
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  }
}
</script>

<style lang="scss">
.house-listex {
  .house-item {
    padding:7px 10px;
    background:#fff;
    &:active {
      background:#f6f6f6;
    }
  }
  .item-inner {
    position:relative;
    height:100px;
  }
  .image, .desc {position:absolute;top:0;}
  .image {
    left:0;
    height:100%;width:140px;
    .price {
      position:absolute;
      padding:3px;
      border-radius: 0 2px 0 0;
      background: rgba(160, 183, 55, 0.7);
      font-weight: bold;
      color: #fff;
      left:0;right:0;
      bottom:0;
      font-size: 1rem;
    }
  }
  .desc {
    height:100%;
    left: 150px;right:0;
    > h2, .address, .info {
      white-space:nowrap;
      text-overflow:ellipsis;overflow:hidden;
    }
    > h2 {
      margin:0;padding:0;font-size:14px;
    }
    .address {font-size:12px;color:#777;}
    .info {margin-top:10px;font-size:12px;color:#444;}
  }
  .tags {
    position:absolute;
    bottom:0;
    > li {
      display: inline-block;
      color:#F05E4B;border:solid 1px #F05E4B;display:inline-block;padding:0 2px;
      border-radius:2px;
      font-size:11px;
      margin-right:4px;
      &.red {
        color:#F05E4B;
        border-color:#F05E4B;
      }
      &.green {
        color:#99bd2a;
        border-color:#99bd2a;
      }
    }
  }
  .left-allow-flag {
    position:absolute;
    top:45%;
    right:-11px;
    color:#99bd2a;
  }

  .vux-swipeout-button-box {
      position: absolute;
      top: 7px;
      right: 10px;
      bottom: 10px;
      left: 0;
      font-size: 0;
      text-align: right;
  }
  .vux-swipeout-button-primary {
    background-color: #a0b737;
  }
}
</style>