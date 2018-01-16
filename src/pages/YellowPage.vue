<template>
  <div class="page-yellowpage">
    <h2 class="vux-1px-b">
      <template v-if="currentTypeName">
        {{ 'Type' | $tt('类型') }}: {{ currentTypeName }}
      </template>
      <template v-else>
        {{ 'Recommends' | $tt('推荐商家') }}
      </template>
      <a class="lt" v-if="currentTypeName" @click="onReturnTop">
        << {{ 'Return to Recommends' | $tt('回到推荐商家') }}
      </a>
    </h2>
    <types v-if="types.length > 0" :items="types" @selected="onTypeSelected"
      class="types"></types>

    <results :items="items" style="margin-top:15px"></results>

    <div v-if="loading" style="padding:0 10px;">
      {{ 'Loading...' | $tt('载入中...') }}
    </div>
    <div v-if="!loading && items.length === 0" style="padding:0 10px;">
      {{ 'No record found...' | $tt('没有了...') }}
    </div>
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Types from '@/components/yellowpage/Types'
import Results from '@/components/yellowpage/List'

export default {
  data () {
    return {
      loading: true,
      currentTypeName: null,
      types: [],
      items: []
    }
  },
  created () {
    this.loadTopItems().then(data => {
      this.types = data.types
      this.items = data.topItems
      this.loading = false
    })
  },
  methods: {
    onTypeSelected (item) {
      this.currentTypeName = item.name
      this.loadTypeItems(item.id).then(data => {
        this.items = data.items
      })
    },
    onReturnTop () {
      this.currentTypeName = null
      this.$store.dispatch('loading', true)
      this.loadTopItems().then(data => {
        this.items = data.topItems
        this.$store.dispatch('loading', false)
        this.loading = false
      })
    },
    loadTopItems () {
      return this.$ypApi('')
    },
    loadTypeItems (typeId) {
      return this.$ypApi('list/' + typeId)
    }
  },
  components: {
    XHeader,
    Types,
    Results
  }
}
</script>

<style lang="scss">
body.route-yellowpage {
  background-color:#fbf9fe;
  padding-bottom:58px;
}
.page-yellowpage {
  > h2 {
    background-color:#a0b737;
    padding:15px 10px;
    font-size:14px;
    font-weight:200;
    color:#fff;
    > .lt {
      float:right;
    }
  }
  .vux-header {
    .vux-header-left {display:none}
  }
}
</style>