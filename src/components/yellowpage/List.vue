<template>
  <div class="yellowpage-list">
    <a class="yellowpage-item vux-1px-b" v-for="item in items" :key="item.id" 
      @click="onSelected(item.id)">
      <div class="item-inner link-bar" style="height:100%;position:relative;height:84px;">
        <div class="image" :style="item.photo_url | imageBgStyle"></div>
        <div class="info">
          <rater class="rater" v-model="item.rating" :font-size="20" disabled></rater>
          <div class="name">{{ item.name }}</div>
          <div class="field">
            {{ 'Type' | $tt('类型') }}
            <span>{{ item.type.name }}</span>
          </div>
          <div class="field">
            {{ 'Business' | $tt('业务范围') }}
            <span>{{ item.business || '暂未知'}}</span></div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
import Rater from 'vux/src/components/rater'

export default {
  props: {
    items: {
      require: true,
      default: []
    }
  },
  methods: {
    onSelected (id) {
      let params = {id: id}
      this.$router.push({name: 'yellowpage-detail', params})
    }
  },
  filters: {
    imageBgStyle (url) {
      return `background-image:url(${url})`
    }
  },
  components: {
    Rater
  }
}
</script>

<style lang="scss">
.yellowpage-list {
  background:#fff;
  .yellowpage-item {
    display:block;
    position:relative;
    min-height:84px;
    overflow: hidden;
  }
  .image {
    position:absolute;
    top:2px;
    left:5px;
    width:80px;
    height:80px;
    background-size: 100% 100%;
    background-position: center center;
    margin-left:auto;
    margin-right:auto;
  }
  .info {
    margin-left:100px;
    padding-top:8px;
    .name {
      font-size:15px;
      margin-bottom:5px;
      color: #000;
    }
    .field {
      margin-top:7px;
      color:#999;
      > span {margin-left:5px;color:#333;}
    }
  }
  .rater {
    position:absolute;
    top:5px;right:5px;
    .vux-rater-box {
      font-size:16px !important;
      width: 16px !important;
      height:16px !important;
    }
  }
}
</style>