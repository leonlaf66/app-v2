<template>
  <div v-transfer-dom>
    <popup v-model="show" position="right">
      <div class="filters" style="width:85vw">
        <div class="filter" v-for="(rule, field) of filters" :key="field">
          <label>{{ typeof rule.title === 'object' ? $tt(rule.title) : rule.title}}</label>
          <ul class="options">
            <li :class="{active: isItemActived(item)}" v-for="(item, value) of rule.options">
              <a @click="itemChanged(field, value)">
                {{ typeof item.label === 'object' ? $tt(item.label) : item.label}}
              </a>
            </li>
          </ul>
        </div>

        <flexbox class="filters-buttons">
          <flexbox-item>
            <x-button type="default" @click.native="clear()">{{ 'Clear' | $tt('清除') }}</x-button>
          </flexbox-item>
          <flexbox-item style="margin-left:0">
            <x-button type="primary" @click.native="submit()">{{ 'OK' | $tt('确认') }}</x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from 'vux/src/components/popup'
import TransferDom from 'vux/src/directives/transfer-dom/index.js'
import XButton from 'vux/src/components/x-button'
import { Flexbox, FlexboxItem } from 'vux/src/components/flexbox'
import filtersCall from '@/configs/house-filters/index.js'

export default {
  props: ['value'],
  data () {
    return {
      show: false,
      filters: [],
      values: {},
      rawValues: {}
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    setShow (values, type) {
      this.filters = filtersCall(type)
      this.values = Object.assign({}, values)
      this.rawValues = Object.assign({}, values)

      this.reset()
      this.show = true
    },
    setHidden () {
      this.show = false
    },
    isItemActived (item) {
      return item.selected
    },
    itemChanged (field, vId) {
      if (field === 'prop') { // 允许多选
        this.$set(this.filters[field].options[vId], 'selected', !this.filters[field].options[vId].selected)

        let oldVals = this.values.hasOwnProperty(field) ? this.values[field] : []
        if (!(oldVals instanceof Array)) {
          oldVals = [oldVals]
        }

        let findIdx = oldVals.indexOf(vId)
        if (findIdx !== -1) {
          oldVals.splice(findIdx, 1)
        } else {
          oldVals.push(vId)
        }

        this.$set(this.values, field, oldVals)
      } else { // 只能单选
        for (let optId in this.filters[field].options) {
          if (this.filters[field].options[optId].selected) {
            this.$set(this.filters[field].options[optId], 'selected', false)
          } else {
            this.$set(this.filters[field].options[optId], 'selected', optId === vId)
          }
        }
        this.$set(this.values, field, vId)
      }
    },
    submit () {
      this.setHidden()
      this.$emit('confirmed', this.values)
    },
    reset () {
      this.values = Object.assign({}, this.rawValues)

      for (let field in this.filters) {
        for (let theVal in this.filters[field].options) {
          if (this.values.hasOwnProperty(field)) {
            if (this.values[field] instanceof Array) {
              this.$set(this.filters[field].options[theVal], 'selected', this.values[field].indexOf(theVal) !== -1)
            } else if (this.values[field] === theVal) {
              this.$set(this.filters[field].options[theVal], 'selected', true)
            }
          } else {
            this.$set(this.filters[field].options[theVal], 'selected', false)
          }
        }
      }
    },
    clear () {
      this.values = {}
      for (let field in this.filters) {
        for (let theVal in this.filters[field].options) {
          this.$set(this.filters[field].options[theVal], 'selected', false)
        }
      }
    }
  },
  beforeDestroy () {
    this.filters = []
    this.values = {}
    this.rawValues = {}
    this.clear()
  },
  components: {
    Popup,
    XButton,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang="scss">
.filters {
  background:#fff;
  padding:10px 0 45px 0;
  .filter {
    margin-bottom:10px;
    > label {
      display:block;
      margin-bottom:10px;
      padding-left:10px;
      font-weight:bold;
      font-size:14px;
      &:after {content: ':'}
    }
  }
  .options {
    font-size:0;
    padding:0 10px;
    > li {
      display:inline-block;
      vertical-align: top;
      width:33.33333%;
      font-size:13px;
      margin-bottom:7px;
      > a {
        display:block;
        margin-right:8px;
        background:#f2f2f2;
        padding:3px 0;
        border-radius:4px;
        text-align:center;
      }
      &.active > a{
        background:#99bd2a;
        color:#fff;
      }
    }
  }
  .filters-buttons {
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .weui-btn {
    border-radius:0 !important;
    &.weui-btn_primary {background-color:#f23030}
  }
}
</style>