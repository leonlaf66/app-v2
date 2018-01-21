<template>
  <div class="house-gallery" v-if="is_active" style="height:60vw;background:#e6e6e6">
    <carousel :watch-items="items">
        <carousel-item v-for="(item, index) in items" :key="item.url" >
            <div class="image" :style="'background-image:url(' + item.url + ')'" @click="onPreviewerWith(index)"></div>
        </carousel-item>
    </carousel>

    <div v-transfer-dom>
      <previewer :list="previewerItems" ref="previewer"></previewer>
    </div>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'vue-l-carousel'
import TransferDom from 'vux/src/directives/transfer-dom'
import Previewer from 'vux/src/components/previewer'

export default {
  name: 'house-gallery',
  data () {
    return {
      is_active: false,
      items: [],
      previewerItems: []
    }
  },
  methods: {
    loadImages (mlsId, listNo, count) {
      this.is_active = true
      this.items = []
      for (let i = 0; i < count; i++) {
        this.items.push({
          'url': this.$house.getImageUrl(mlsId, listNo, i)
        })
        this.previewerItems.push({
          'src': this.$house.getImageUrl(mlsId, listNo, i)
        })
      }
    },
    onPreviewerWith (idx) {
      this.$refs.previewer.show(idx)
    }
  },
  directives: {
    TransferDom
  },
  beforeDestroy () {
    this.is_active = false
    this.items = []
  },
  components: {
    Carousel,
    CarouselItem,
    Previewer
  }
}
</script>

<style lang="scss">
.house-gallery {
  .v-carousel {width:100%;position:relative}
  .v-carousel, .v-carousel-items {overflow:hidden}
  .v-carousel-dots {position:absolute;bottom:3px;left:0;width:100%;text-align:center}
  .v-carousel-dot {cursor:pointer;display:inline-block;width:10px;height:10px;margin:0 5px;border-radius:5px;background:rgba(0,0,0,.5)}
  .v-carousel-dot.active {background:#FFF;cursor:default}
  .v-carousel-nav {cursor:pointer;position:absolute;line-height:30px;color:#fff;padding:0 5px;background:rgba(0,0,0,.5);top:50%;margin-top:-15px}
  .v-carousel-nav.prev {left:0}
  .v-carousel-nav.next {right:0}
  .v-carousel-item {width:100%;float:left}

  .image {
    height:60vw;
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
  }
}
</style>