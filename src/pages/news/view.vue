<template>
  <div class="page-news-view has-fixed-header">
    <x-header class="fixed" :left-options="{backText: $tt('RETURN', '返回'), preventGoBack: true}" @on-click-back="onClickBack"></x-header>
    <div class="news-view">
      <div class="view-head">
        <h1>{{ data.title }}</h1>
        <div class="date">
          <i class="iconfont icon-time"></i>
          {{ data.publish_at.substring(0, 16) }}
        </div>
      </div>
      <div v-html="data.content" class="view-body">
      </div>
    </div>
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'

export default {
  data () {
    return {
      data: {
        publish_at: ''
      }
    }
  },
  created () {
    this.$store.dispatch('loading', true)
    this.load(this.$route.params.id).then(data => {
      this.$setPageTitle(data.title)
      this.data = data
      this.$store.dispatch('loading', false)
    })
  },
  methods: {
    load (id) {
      return this.$newsApi(`item/${id}`)
    },
    onClickBack () {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push({name: 'home'})
      }
    }
  },
  destroyed () {
    this.data = {
      publish_at: ''
    }
  },
  components: {
    XHeader
  }
}
</script>

<style lang="scss">
.page-news-view {
  .news-view {
    .view-head {
      > h1 {
        padding:35px 0 20px 0;
        text-align:center;
        font-size:18px;
      }
      .date {
        text-align:center;
        margin-top:-15px;
      }
    }
    .view-body {
      padding:10px;
      margin-bottom: 20px;
      line-height: 20px;
      h1, h2, h3, h4, h5, h6 {
        position: relative;
        margin-top: 1em;
        margin-bottom: 16px;
        font-weight: 700;
        line-height: 1.4;
      }
      p {
          margin:15px 0;
          line-height: 20px;
      }
      table {
        border-collapse: collapse;
        border-spacing: 0;
        display: block;
        width: 100%;
        overflow: auto;
        word-break: normal;
        word-break: keep-all;
        th {
          background: #e8e8e8;
          font-weight: bold;
        }
        th, td {
          padding: 5px 10px;
          border: 1px solid #d9d9d9;
          text-align: left !important;
        }
      }
      img {
        display:block;
        margin-left:auto;
        margin-right:auto;
        max-width:100%;
      }
      ul, ol {
        margin-left:15px;
      }
      blockquote {
        padding: 0 15px;
        color: #777;
        border-left: 4px solid #ddd;
      }
    }
  }
}
</style>