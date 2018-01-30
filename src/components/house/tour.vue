<template>
  <div class="house-tour-box">
    <group>
      <div class="title" slot="title">
        <div style="padding:8px 5px">
          <i class="iconfont icon-kanfang"></i>
          {{ 'Go Tour This House' | $tt('预约看房') }}
        </div>
      </div>
    </group>
    <day-time-range v-model="tourValue"></day-time-range>
    <x-button type="primary" @click.native="onClickOk">{{ 'Schedule Tour' | $tt('预约') }}</x-button>
  </div>
</template>

<script>
import Group from 'vux/src/components/group'
import XButton from 'vux/src/components/x-button'
import DayTimeRange from '@/components/dayTimeRange'

export default {
  props: {
    house: {
      require: true,
      default: {}
    }
  },
  data () {
    return {
      tourValue: ['', '', '']
    }
  },
  methods: {
    onClickOk () {
      if (!this.$store.state.account.user) {
        this.$router.push({name: 'login'})
        return false
      }

      if (parseInt(this.tourValue[2].replace(':', '')) <= parseInt(this.tourValue[1].replace(':', ''))) {
        this.$vux.alert.show(this.$tt('Invalid time range', '无效的时间范围'))
        return false
      }

      let data = {
        day: this.tourValue[0],
        time_start: this.tourValue[1],
        time_end: this.tourValue[2]
      }

      this.$houseApi(`house/${this.house.id}/tour`, { method: 'post', data }).then(flag => {
        this.$emit('confirm')
      })
    }
  },
  components: {
    Group,
    DayTimeRange,
    XButton
  }
}
</script>

<style>
.house-tour-box .weui-btn {border-radius:0;}
</style>