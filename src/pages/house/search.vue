<template>
  <div class="page-house-purchase" v-if="isActive">
    <search-header 
      :query="query"
      @sort="onSort"
      @q="onQInput"
      @filters="onFileters"></search-header>
    <scroller
      ref="scroller"
      noDataText="没有了..."
      :on-infinite="onInfinite"
      style="top:86px;height:auto;bottom:0">
      <result-list :items="results" ></result-list>
      <div v-if="results.length === 0">&nbsp;</div>
    </scroller>
  </div>
</template>

<script>
import SearchHeader from './search/header'
import ResultList from '@/components/house/list'

export default {
  name: 'page-house-search',
  data: function () {
    return {
      isActive: false,
      position: null,
      query: {
        q: '',
        filters: {
          prop: ['MF', 'SF', 'CC']
        },
        sort: ['ldays', 'desc'],
        page: 1
      },
      results: []
    }
  },
  created () {
    this.load().then(data => {
      this.results = data.items
    })
  },
  methods: {
    load () {
      let params = {
        type: this.$route.params.type,
        q: this.query.q,
        filters: this.query.filters,
        sort: this.query.sort,
        page: this.query.page
      }

      this.$store.dispatch('loading', true)
      return this.$houseApi('/house/search', { params }).then(data => {
        if (data.items.length === 0 && this.$refs.scroller) {
          this.$refs.scroller.finishInfinite(2)
        }
        this.$store.dispatch('loading', false)
        return data
      })
    },
    refresh () {
      this.setPage(1)
      this.load().then(data => {
        this.results = data.items
        if (this.$refs.scroller) {
          this.$refs.scroller.scrollTo(0, 0)
        }
      })
    },
    setPage (page) {
      this.$set(this.query, 'page', page)
    },
    setFilters (filters) {
      this.$set(this.query, 'filters', filters)
    },
    setSort (sort) {
      this.$set(this.query, 'sort', sort)
    },
    resetSort () {
      this.setSort(['ldays', 'desc'])
    },
    setQInput (q) {
      this.$set(this.query, 'q', q)
      this.setFilters({})
    },
    onInfinite (done) {
      this.setPage(this.query.page + 1)
      this.load().then(data => {
        if (data.items.length === 0) return
        this.results = this.results.concat(data.items)
        done()
      })
    },
    onQInput (text) {
      this.setQInput(text)
      this.resetSort()
      this.refresh()
    },
    onSort (field, dir) {
      this.setSort([field, dir])
      this.refresh()
    },
    onFileters (filters) {
      this.setFilters(filters)
      this.refresh()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'home') {
      next(vm => {
        vm.isActive = true
        vm.setQInput('')
        if (to.params.type === 'purchase') {
          vm.setFilters({
            prop: ['SF', 'MF', 'CC']
          })
        }
        vm.resetSort()
        vm.refresh()
      })
    } else if (from.name === 'house-detail') {
      next(vm => {
        vm.isActive = true
        if (vm && vm.$refs.scroller) {
          setTimeout(function () {
            vm.$refs.scroller.scrollTo(0, vm.position, false)
          }, 10)
        }
        vm.$store.dispatch('loading', false)
      })
    } else {
      next(vm => {
        vm.isActive = true
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'house-detail') {
      if (this.$refs.scroller) {
        this.position = this.$refs.scroller.getPosition().top
      }
    } else {
      this.isActive = false
      this.setQInput('')
      this.resetSort()
      this.setPage(1)
      this.results = []
    }
    next()
  },
  route: {
    canReuse () {
      return false
    }
  },
  components: {
    SearchHeader,
    ResultList
  }
}
</script>

<style>
.page-house-purchase .house-list {margin-bottom:20px}
</style>