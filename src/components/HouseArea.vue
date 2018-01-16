<template>
  <div>
    <div class="area-location" @click="selectArea">
      <i class="iconfont icon-location"></i>
      <span>{{ currentAreaName }}</span>
    </div>

    <div v-transfer-dom>
      <x-dialog v-model="showSelector" :hide-on-blur="true" class="dialog-demo">
        <h2 style="padding: 10px 0;
    background: #f0f0f0;
    font-size: 16px;">请选择区域</h2>
        <group>
          <radio :options="areaItems" @on-change="areaSelected">
            <template slot-scope="props" slot="each-item">
              <div style="text-align:left">
                {{ props.label }}
              </div>
            </template>
          </radio>
        </group>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import TransferDom from 'vux/src/directives/transfer-dom/index.js'
import XDialog from 'vux/src/components/x-dialog'
import Group from 'vux/src/components/group'
import Radio from 'vux/src/components/radio'

import { areas } from '@/configs/dicts.js'

export default {
  data () {
    return {
      showSelector: false
    }
  },
  computed: {
    areaItems () {
      let options = []
      for (let id in areas) {
        options.push({
          key: id,
          value: window.$tt(areas[id].name)
        })
      }
      return options
    },
    currentAreaName () {
      return this.$tt(areas[this.$areaId].name)
    }
  },
  directives: {
    TransferDom
  },
  methods: {
    selectArea () {
      this.showSelector = true
    },
    areaSelected (areaId) {
      this.showSelector = false
      this.$env.changeAreaId(areaId)
    }
  },
  components: {
    XDialog,
    Group,
    Radio
  }
}
</script>

<style scope>
.weui-cells {margin-top:0 !important}
</style>