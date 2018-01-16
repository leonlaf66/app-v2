<template>
  <ul class="house-list" v-if="isOnline">
    <li class="house-item vux-1px-b" v-for="item in items" @click="gotoHouse(item.id)" :key="item.id">
      <div class="item-inner">
        <div v-bg-set :style="item | image" class="image bg-img">
          <div class="price">
            <span>{{ item.price | price }}</span>
          </div>
        </div>
        <!--
        <visual class="image" :image="item | image" background='cover'>
          <div class="price">
            <span>{{ item.price | price }}</span>
          </div>
        </visual>-->
        <div class="desc">
          <h2>{{ item.nm }}</h2>
          <div class="address">{{ item.loc }}</div>
          <div class="info">
            <span>{{ item.beds }} {{ 'beds' | $tt('卧室') }}</span>
            <span>{{ item.baths[0] }}.{{ item.baths[1] }} {{ 'baths' | $tt('洗手间') }}</span>
            <span>{{ item.square | square }}</span>
          </div>
          <ul class="tags">
            <li class="red" v-if="isActive(item.status)">{{ 'Active' | $tt('销售中') }}</li>
            <li class="green">{{ item.l_days | list-day-desc }}</li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'house-list',
    props: {
      replaceRedirect: {
        default: false
      },
      items: {
        require: true,
        default: []
      }
    },
    data () {
      return {
        isOnline: false
      }
    },
    filters: {
      image (item) {
        return 'background-image:url(' + window.$house.getImageUrl(item.mls_id, item.id) + ')'
      },
      listDayDesc (days) {
        return window.$tt(`${days} days on market`, `已上市${days}天`)
      }
    },
    created () {
      this.isOnline = true
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
    }
  }
</script>

<style lang="scss">
.house-list {
  .house-item {
    padding:10px 7px;
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
}
</style>