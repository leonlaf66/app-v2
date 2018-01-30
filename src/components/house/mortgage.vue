<template>
  <div class="house-mortgage">
    <group>
      <div class="title" slot="title">
        <div style="padding:8px 5px">
          <i class="iconfont icon-daikuan"></i>
          {{ 'Mortgage calculator' | $tt('房贷计算器') }}
        </div>
      </div>
    </group>

    <template v-if="data.taxes > 0">
      <group>
        <x-input required v-model="data.price" type="number" :title="'Purchase Price' | $tt('房屋总价')" :show-clear="false">
          <span slot="right">{{ 'USD' | $tt('万美元') }}</span>
        </x-input>
        <x-input required v-model="data.payment" type="number" :title="'Down Payment' | $tt('首付')" :show-clear="false">
          <span slot="right">%</span>
        </x-input>
        <x-input required v-model="data.rate" type="number" :title="'Interest Rate' | $tt('利率')" :show-clear="false">
          <span slot="right">%</span>
        </x-input>
        <x-input required v-model="data.term" type="number" :title="'Mortgage Term' | $tt('贷款年限')" :show-clear="false">
          <span slot="right">{{ 'Years' | $tt('年') }}</span>
        </x-input>
      </group>

      <x-dialog v-model="showResult" :hide-on-blur="true">
        <div style="text-align:center;padding:20px 0">
          <mortgage-result :data="results"></mortgage-result>
        </div>
      </x-dialog>

      <x-button type="primary" @click.native="onClickOk">{{ 'Calculate' | $tt('计算') }}</x-button>
    </template>
    <template v-else>
      <div class="message" style="padding:0 0 10px 10px;color:red">
        抱歉，未知的购房锐，无法计算...
      </div>
    </template>
  </div>
</template>

<script>
import XDialog from 'vux/src/components/x-dialog'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import XInput from '@/components/input'
import XButton from 'vux/src/components/x-button'
import mortgage from '@/tools/house.mortgage'
import MortgageResult from './mortgage/result'

export default {
  data () {
    return {
      data: {
        price: null,
        payment: '20',
        rate: '4.5',
        term: '30',
        taxes: 0
      },
      showResult: false,
      results: {}
    }
  },
  methods: {
    load (price, taxes) {
      if (this.$store.state.app.language === 'zh-CN') {
        this.$set(this.data, 'price', price * 1.0 / 10000)
      } else {
        this.$set(this.data, 'price', price * 1.0)
      }
      this.$set(this.data, 'taxes', parseFloat(taxes))
    },
    onClickOk () {
      let price = null
      if (this.$store.state.app.language === 'zh-CN') {
        price = this.data.price * 10000
      } else {
        price = this.data.price
      }
      this.results = mortgage.calculate(price, this.data.payment, this.data.term, this.data.rate, this.data.taxes)
      this.showResult = true
    }
  },
  components: {
    Group,
    Cell,
    XInput,
    XButton,
    XDialog,
    MortgageResult
  }
}
</script>

<style>
.house-mortgage .weui-cells {
  font-size:13px;
}
.house-mortgage .weui-label {
  color:#888;
}
</style>