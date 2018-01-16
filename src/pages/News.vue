<template>
  <div class="page-news" v-if="is_online">
    <scroller
      ref="scroller"
      noDataText="该分类下没有新闻了"
      :on-infinite="onInfinite">
        <banner :items="banners"></banner>
        <types :items="types" @changed="onTypeChanged"></types>
        <results class="news-result" @selected="onSelected" :items="items"></results>
    </scroller>
  </div>
</template>

<script>
import Banner from '@/components/news/Banner'
import Types from '@/components/news/TypeSelector'
import Results from '@/components/news/List'

export default {
  name: 'page-news',
  data () {
    return {
      is_online: false,
      position: null,
      banners: [],
      types: [],
      currentTypeId: null,
      items: {},
      page: 1
    }
  },
  created () {
    this.is_online = true
    this.$newsApi('banners')
      .then(items => {
        this.banners = items
      })

    this.$newsApi('types')
      .then(items => {
        this.types = items
      })

    this.loadNews().then(data => {
      this.items = data.items
    })
  },
  methods: {
    onSelected (id) {
      this.page = 1
      this.$router.push({
        name: 'news-view',
        params: {
          id: id
        }
      })
    },
    loadNews () {
      let params = {
        type_id: this.currentTypeId,
        page: this.page
      }

      this.$store.dispatch('loading', true)
      return this.$newsApi('list', { params })
        .then(data => {
          if (data.items.length === 0) {
            this.$refs.scroller.finishInfinite(2)
          }
          this.$store.dispatch('loading', false)
          return data
        })
    },
    onInfinite (done) {
      this.page ++
      this.loadNews().then(data => {
        if (data.items.length === 0) return
        this.items = this.items.concat(data.items)
        done()
      })
    },
    onTypeChanged (id) {
      this.page = 1
      this.currentTypeId = id
      this.loadNews().then(data => {
        this.items = data.items
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'news-view') {
      next(vm => {
        if (vm && vm.$refs.scroller) {
          setTimeout(function () {
            vm.$refs.scroller.scrollTo(0, vm.position, false)
          }, 10)
        }
      })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'news-view') {
      this.position = this.$refs.scroller && this.$refs.scroller.getPosition() && this.$refs.scroller.getPosition().top
    }
    next()
  },
  beforeDestroy () {
    this.is_online = true
    this.banners = []
    this.types = []
    this.items = []
  },
  components: {
    Banner,
    Types,
    Results
  }
}
</script>

<style lang="scss">
body.route-news{
  background:#fbf9fe;
  padding-bottom:60px;
  .news-result {
    margin: 0 8px;
  }
}
</style>