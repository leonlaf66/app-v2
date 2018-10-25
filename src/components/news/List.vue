<template>
  <div class="news-list">
    <a class="news-item vux-1px-b" v-for="item in items" @click="$emit('selected', item.id)" :key="item.id">
      <div class="item-inner">
        <div class="image" :style="item.image_url | image-style">
        </div>
        <div class="extends">
          <h2>{{ item.title }}</h2>
          <div class="info">阅读 {{ item.hits }} 收藏 0</div>
          <div class="public-at">{{ item.publish_at.substring(0, 16)}}</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'news-list',
  props: ['items'],
  filters: {
    imageStyle (url) {
      if (url.substring(0, 1) === '//') {
        url = process.env.MEDIA_BASE_URL + '/' + url.substring(2)
      }
      return `background-image:url(${url})`
    }
  }
}
</script>

<style lang="scss">
.news-list {
  background-color:#fff;
  .news-item {
    display:block;
    padding:10px 7px;
    &:active {
      background:#f6f6f6;
    }
  }
  .item-inner {
    position:relative;
    height:100px;
    border-radius: 4px;
  }
  .image, .extends {position:absolute;top:0;}
  .image {
    left:0;
    height:100%;width:140px;
    background-size: cover;
    background-position: center center;
  }
  .extends {
    height:100%;
    left: 150px;right:0;
    > h2 {
      margin:0;padding:0;font-size:14px;
    }
  }
  .public-at {
    position:absolute;
    bottom:0;
    color:#777;
  }
  .info {
    position:absolute;
    bottom:0;
    right:0;
    color:#777;
  }
}
</style>