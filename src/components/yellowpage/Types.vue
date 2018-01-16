<template>
  <div class="yellow-types" :class="{full: isFull}">
    <grid :cols="4">
      <grid-item v-for="item in displayItems" :key="item.id"  @on-item-click="onSelected(item)">
        <img slot="icon" :src="item.icon">
        <span class="grid-center line-text">{{ item.name }}</span>
      </grid-item>
      <grid-item class="more-btn" v-if="!isFull" @on-item-click="isFull=!isFull">
        <div class="weui-grid__icon">
          <i class="icon iconfont icon-more"></i>
        </div>
        <span class="grid-center">
          {{ 'More...' | $tt('更多分类') }}
        </span>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
import GroupTitle from 'vux/src/components/group-title'

export default {
  props: {
    items: {
      require: true,
      default: []
    }
  },
  data () {
    return {
      isFull: false
    }
  },
  computed: {
    displayItems () {
      return this.isFull ? this.items : this.items.slice(0, 3)
    }
  },
  methods: {
    onSelected (item) {
      this.$emit('selected', item)
      this.isFull = false
    }
  },
  components: {
    Grid,
    GridItem,
    GroupTitle
  }
}
</script>

<style lang="scss">
.yellow-types {
  background-color:#fff;
  .grid-center {
    display: block;
    margin-top:10px;
    text-align: center;
    color: #666;
  }
  .weui-grid__icon {
    width:40px;
    height:40px;
  }
  .weui-grid {
    padding:8px 0;
  }
  .more-btn {
    .icon {font-size:32px;color:#999;}
  }
  &.full {
    position: fixed;
    background:#fff;
    top:46px;
    bottom: 58px;
    z-index:99;
  }
}
</style>