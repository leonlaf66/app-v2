<template>
  <div>
    <div class="header-house-search">
      <div class="search-input-inner">
        <div class="left" @click="goBack()">
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="middle" :class="{focus: qTextFocus}">
          <div class="search-input">
            <a class="type-selector">{{ typeName }}</a>
            <div class="input-box">
              <autocomplete ref="qInput" v-model="q" @focus="onEntered()" @blue="onBlue" @confirm="onSearchConfirm">
              </autocomplete>
            </div>
            <!--<i class="iconfont icon-remove" @click="onClearSearchText()" v-if="isEntered && q !== ''"></i>-->
          </div>
        </div>
        <div class="right">
          <template v-if="isEntered && qTextFocus">
            <a @click="onSearchConfirm">{{ 'SEARCH' | $tt('搜索') }}</a>
          </template>
          <template v-else>
            <!-- <i class="iconfont icon-menu"></i> -->
          </template>
        </div>
      </div>
      <div class="search-results" v-if="isEntered">
        <template>
          <div class="hots">
            <h2>{{ 'Hot City or Town' | $tt('热门地区') }}</h2>
            <ul class="items">
              <li @click="onHotKeyword(_cityName)" v-for="_cityName of searchOptions.hots">
                {{ _cityName }}
              </li>
            </ul>
          </div>
        </template>
      </div>
      <ul class="toolbar-inner">
        <li @click="onSort(field)" :class="{active: item.active}" v-for="(item, field) in sortItems" :key="field">
          {{ item.title }}
          <i class="iconfont icon-sort"
            :class="{'icon-sort-up': item.dir === 'asc', 'icon-sort-down': item.dir === 'desc'}"></i></li>

        <li @click="showFilters()">
          {{ 'Filters' | $tt('筛选') }}<i class="iconfont icon-shaixuan"></i>
        </li>
      </ul>
    </div>

    <result-filter ref="filter" @confirmed="onFiltersConfirmed"></result-filter>
  </div>
</template>

<script>
import ResultFilter from './filter'
import Autocomplete from './q-input'

export default {
  name: 'header-house-search',
  props: {
    query: {
      require: true,
      default () {
        return {
          q: '',
          sort: ['ldays', 'desc']
        }
      }
    }
  },
  data () {
    return {
      isEntered: false,
      qTextFocus: false,
      filterQText: '',
      private: {
        q: '',
        filters: {},
        sort: ['ldays', 'desc']
      },
      searchOptions: {
        hots: [],
        options: {}
      },
      sortItems: {
        ldays: {
          title: window.$tt('List Date', '上市时间'),
          dir: 'desc',
          defDir: 'desc',
          active: false
        },
        price: {
          title: window.$tt('Price', '价格'),
          dir: 'asc',
          defDir: 'asc',
          active: false
        },
        beds: {
          title: window.$tt('Beds', '卧室数'),
          dir: 'desc',
          defDir: 'desc',
          active: false
        }
      }
    }
  },
  computed: {
    q: {
      get () {
        return this.query.q
      },
      set (val) {
        this.private.q = val
      }
    },
    filters: {
      get () {
        return this.query.filters
      },
      set (vals) {}
    },
    sort: {
      get () {
        return this.query.sort || ['ldays', 'desc']
      },
      set (vals) {
        this.private.sort = vals
      }
    },
    type () {
      return this.$route.params.type
    },
    typeName () {
      return this.type === 'lease' ? this.$tt('Lease', '租房') : this.$tt('SELL', '购房')
    }
  },
  mounted () {
    this.$set(this.sortItems[this.sort[0]], 'active', true)
    this.loadSearchOptions()
  },
  methods: {
    loadSearchOptions () {
      this.$houseApi('house/' + this.type + '/search-options').then(data => {
        this.searchOptions = data
      })
    },
    showFilters () {
      if (this.$refs.hasOwnProperty('filter')) {
        this.$refs['filter'].setShow(this.filters, this.type)
      }
    },
    clearSort (exField = null) {
      for (let key in this.sortItems) {
        if (exField && exField === key) continue

        this.$set(this.sortItems[key], 'active', false)
        this.$set(this.sortItems[key], 'dir', this.sortItems[key].defDir)
      }
    },
    onHotKeyword (kw) {
      this.q = kw
      this.$refs.qInput.setQText(kw)
      this.onSearchConfirm()
    },
    onEntered () {
      this.$refs.qInput.loadOptions(this.searchOptions.options)
      this.isEntered = true
      this.qTextFocus = true
    },
    onBlue () {
      this.qTextFocus = false
    },
    onSearchConfirm () {
      this.$refs.qInput.reset()
      this.isEntered = false
      this.sort = {field: 'ldays', dir: 'desc'}
      this.filters = {}

      this.$emit('q', this.private.q)
    },
    onSort (field) {
      this.clearSort(field)
      if (!this.sortItems[field].active) {
        this.$set(this.sortItems[field], 'active', true)
      } else {
        this.$set(this.sortItems[field], 'dir', this.sortItems[field].dir === 'asc' ? 'desc' : 'asc')
      }
      this.$emit('sort', field, this.sortItems[field].dir)
    },
    onFiltersConfirmed (filterValues) {
      this.$emit('filters', filterValues)
    },
    onClearSearchText () {
      this.q = ''
      this.onSearchConfirm()
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  resetSort () {
    this.$set(this.sortItems['ldays'], 'active', true)
  },
  watch: {
    type () {
      this.loadSearchOptions()
      this.$refs.qInput.setQText('')
    },
    q () {
      this.clearSort()
      this.onSort('ldays')
    }
  },
  components: {
    ResultFilter,
    Autocomplete
  }
}
</script>

<style lang="scss">
.header-house-search {
  position:fixed;
  top:0;left:0;right:0;
  z-index:10;
  .search-input-inner {
    position:relative;
    height:44px;
    background-color:rgb(160, 183, 55);
    border-bottom: solid 1px #fff;
    line-height:44px;
    color:#fff;
    .left, .right, .middle {
      position:absolute;
      top:0;
      bottom:0;
    }
    .left {
      left:0;
      width:37px;
      padding-left:10px;
      .iconfont {
        font-size:24px;
      }
    }
    .right {
      right:0;
      width:42px;
      text-align:center;
      .iconfont {
        font-size:24px;
        color:#fff;
      }
    }
    .middle {
      left:37px;
      right:12px;
      &.focus {
        right:42px;
      }
    }
    .search-input {
      display: inline-block;
      height: 26px;
      width: 100%;
      background: #fff;
      vertical-align: middle;
      border-radius: 16px;
      position:relative;
      border: solid 1px #fff;
      overflow: hidden;
      > .type-selector {
        display: inline-block;
        text-align: center;
        background: #f74c31;
        color: #fff;
        font-size: 12px;
        border-radius: 4px;
        background-clip: padding-box;
        vertical-align: middle;
        padding:2px 3px;
        margin-top:4px;
        position:absolute;
        line-height: 12px;
        left: 10px;
        > .iconfont {font-size:12px}
      }
      > .icon-remove {
        position:absolute;
        line-height: 23px;
        right: 10px;
        color:#bbb;
      }
      > .input-box {
        position:absolute;
        top:0;
        left:44px;
        bottom: 0;
        right:30px;
        line-height: 26px;
      }
    }
  }

  .search-results {
    position:fixed;
    left:0;right:0;
    top:44px;
    bottom:0;
    z-index:10;
    background:#fff;
  }

  .toolbar-inner {
    height:40px;
    font-size:0;
    line-height:40px;
    background-color:#fff;
    border-bottom: solid 1px #bbb;
    .icon-sort {
      font-size:12px;
      color:#bbb;
    }
    > li {
      display:inline-block;
      width:25%;
      text-align:center;
      font-size:14px;
      &.active {
        color:#F05E4B;
        .icon-sort {
          color:#F05E4B;
        }
      }
    }
  }

  .search-results {
    background: #f2f2f2;
    .options {
      > li {
        padding: 15px 10px;
        border-bottom: solid 1px #eee;
        color:#333;
        > span {
          float:right;color:#888;
        }
        &:active {
          background:#eee;
        }
      }
    }
    .hots {
      > h2 {
        font-weight:200;
        font-size: 14px;
        margin: 0;
        padding: 8px 10px;
        background: #dedede;
      }
      .items {
        padding: 10px;font-size:0;
        > li {display:inline-block;width:25%;font-size:13px;padding:10px 0;}
      }
    }
  }
}
body.en-US .header-house-search {
  .middle {
    &.focus {
      right:62px;
    }
  }
  .search-input-inner .right {
    right:14px;
  }
  .search-input-inner .search-input > .input-box {
    left: 50px;
  }
}
</style>