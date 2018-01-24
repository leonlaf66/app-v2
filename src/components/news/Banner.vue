<template>
  <div class="news-banner" style="height:240px;background:#e6e6e6">
    <carousel :watch-items="items">
        <carousel-item :key="item.id" v-for="(item, idx) in items">
          <a class="image" :style="item.image | bgImageStyle" @click="$emit('news-click', item.news_id)">
            <div class="title">{{ item.title }}</div>
          </a>
        </carousel-item>
    </carousel>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'vue-l-carousel'

export default {
  props: {
    items: {
      required: true,
      default: []
    }
  },
  filters: {
    bgImageStyle (url) {
      return `background-image:url(${url})`
    }
  },
  components: {
    Carousel,
    CarouselItem
  }
}
</script>


<style lang="scss">
.news-banner {
  .v-carousel {width:100%;position:relative}
  .v-carousel, .v-carousel-items {overflow:hidden}
  .v-carousel-dots {
    position:absolute;bottom:35px;left:0;width:100%;text-align:center
  }
  .v-carousel-dot {
    cursor:pointer;display:inline-block;width:10px;height:10px;margin:0 5px;border-radius:5px;background:rgba(0,0,0,.5);
  }
  .v-carousel-dot.active {background:#FFF;cursor:default}
  .v-carousel-nav {cursor:pointer;position:absolute;line-height:30px;color:#fff;padding:0 5px;background:rgba(0,0,0,.5);top:50%;margin-top:-15px}
  .v-carousel-nav.prev {left:0}
  .v-carousel-nav.next {right:0}
  .v-carousel-item {width:100%;float:left;position:relative;}

  .image {
    display:block;
    height:240px;
    background-repeat:no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .title {
    position:absolute;
    bottom:0;
    left:0;right:0;
    color: #fff;
    background: rgba(0,0,0,.3);
    height: 32px;
    line-height: 32px;
    text-align: center;
    width: 100%;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>