<template>
  <div class="news-type-selector">
    <Tab>
      <TabItem selected @on-item-click="onSelected(null)">最新新闻</TabItem>
      <TabItem @on-item-click="onSelect">{{ current.label }}</TabItem>
    </Tab>
    <div v-transfer-dom>
      <x-dialog v-model="show" :hide-on-blur="true">
        <h2 style="padding: 10px 0;background: #f0f0f0;font-size: 16px;">请选择新闻分类</h2>
        <group style="margin-top: 0;">
          <cell is-link :title="item.name" @click.native="onSelected(item.id, item.name)" v-for="item in items" :key="item.id"></cell>
        </group>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import Tab from 'vux/src/components/tab/tab'
import TabItem from 'vux/src/components/tab/tab-item'
import TransferDom from 'vux/src/directives/transfer-dom/index.js'
import XDialog from 'vux/src/components/x-dialog'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import Radio from 'vux/src/components/radio'

export default {
  props: {
    items: {
      required: true,
      default: []
    }
  },
  data () {
    return {
      show: false,
      current: {
        id: null,
        label: '新闻分类'
      }
    }
  },
  methods: {
    onSelect () {
      this.show = true
    },
    onSelected (id, label) {
      if (id) {
        this.current.label = label
      }
      this.show = false
      this.$emit('changed', id)
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Tab,
    TabItem,
    XDialog,
    Group,
    Cell,
    Radio
  }
}
</script>

<style scope>
.news-type-selector .weui-cells {margin-top:0 !important;}
</style>