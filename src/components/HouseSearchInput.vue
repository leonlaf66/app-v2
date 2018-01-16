<template>
  <div class="search-input-b">
    <input type="text" v-model="q"
      :placeholder="'Search city, postal code, list no' | $tt('搜索城市, 邮编, 房源号')"
      @focus="onFocus()"
      @blur="onBlue">
    <ul class="autocomplate-box" v-show="isShowDdlb">
      <li v-for="item of options" :key="item.title" v-if="item.flag" @click="onSelect(item.title)">
        {{ item.title }} <span>{{ item.desc }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      q: '',
      options: [],
      isShowDdlb: false
    }
  },
  methods: {
    loadOptions (options) {
      this.isShowDdlb = true
      this.options = options
    },
    setQText (q) {
      this.q = q
    },
    reset () {
      this.isShowDdlb = false
    },
    filterOptions (text) {
      for (let idx in this.options) {
        if (text.length > 0 && (this.options[idx].title + '').toLowerCase().indexOf(text.toLowerCase()) !== -1) {
          this.$set(this.options[idx], 'flag', true)
        } else {
          this.$set(this.options[idx], 'flag', false)
        }
      }
    },
    onSelect (text) {
      this.q = text
      let self = this
      setTimeout(function () {
        self.$emit('confirm', text)
      }, 10)
    },
    onFocus () {
      this.$emit('focus')
    },
    onBlue () {
      this.isShowDdlb = false
    }
  },
  watch: {
    q (text) {
      this.filterOptions(text)
      this.$emit('input', text)
    }
  }
}
</script>

<style lang="scss">
.search-input-b {
  input {
    width: 100%;
    border: none;
    font-size: 13px;
    height: 24px;
    &:focus {
      outline:none;
    }
  }

  .autocomplate-box {
    position: fixed;
    z-index: 999999;
    left: 0px;
    right: 0;
    background: #fff;
    top: 45px;
    border: solid 1px #ddd;
    > li {
      position:relative;
      padding: 8px 25px 8px 10px;
      border-bottom: solid 1px #eee;
      font-size:13px;
      color:#333;
      &:active {
        background:#eee;
      }
      > span {
        float:right;
        color:#888;
      }
      &::after {
        content: " ";
        display: inline-block;
        height: 6px;
        width: 6px;
        border-width: 2px 2px 0 0;
        border-color: #C8C8CD;
        border-style: solid;
        -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        position: relative;
        top: -2px;
        position: absolute;
        top: 50%;
        margin-top: -4px;
        right: 11px;
      }
    }
  }
}
</style>