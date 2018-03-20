<template>
  <div class="house-roi">
    <grid :cols="2">
      <grid-item>
        <div class="grid-center roi-item">
          <span v-if="data.est_roi_cash">{{ data.est_roi_cash | percent}}</span>
          <span v-else>{{ 'Unknown' | $tt('未提供') }}</span>
          <label>{{ 'Uestimated ROI (Cash)' | $tt('投资回报(全款)') }}</label>
        </div>
      </grid-item>
      <grid-item>
        <div class="grid-center roi-item">
          <span v-if="data.est_annual_income_cash">{{ data.est_annual_income_cash | price}}</span>
          <span v-else>{{ 'Unknown' | $tt('未提供') }}</span>
          <label>{{ 'Net Income (Cash)' | $tt('年净收入预期(全款)') }}</label>
        </div>
      </grid-item>
      <grid-item>
        <div class="grid-center roi-item">
          <span v-if="data.ave_roi_cash">{{ data.ave_roi_cash | percent}}</span>
          <span v-else>{{ 'Unknown' | $tt('未提供') }}</span>
          <label>{{ 'Area ROI (Cash)' | $tt('周边投资回报(全款)') }}</label>
        </div>
      </grid-item>
      <grid-item>
        <div class="grid-center roi-item">
          <span v-if="data.ave_annual_income_cash">{{ data.ave_annual_income_cash | price}}</span>
          <span v-else>{{ 'Unknown' | $tt('未提供') }}</span>
          <label>{{ 'Area Avg. Net Income (Cash)' | $tt('区域平均年净收入(全款)') }}</label>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import Grid from 'vux/src/components/grid/grid'
import GridItem from 'vux/src/components/grid/grid-item'
export default {
  props: ['data'],
  components: {
    Grid,
    GridItem
  }
}
</script>

<style lang="scss">
  .house-roi {
    .weui-grid {
      text-align:center;
      font-size:12px;
      white-space:nowrap; overflow:hidden;
      padding: 7px 0;
    }
    .roi-item {
      &>span, &>label {display:block;}
      &>span {
        margin-bottom:5px;
        color:#99bd2a;
      }
      &>label {
        color:#333;
      }
    }
  }
</style>