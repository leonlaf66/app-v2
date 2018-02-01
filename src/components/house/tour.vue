<template>
  <div class="house-tour-box">
    <popup-header>
      <template slot="left-text">
        <i class="iconfont icon-kanfang"></i>
        {{ 'Go Tour This House' | $tt('预约看房') }}
      </template>
    </popup-header>

    <div class="done-tour" v-if="house.tour">
      <template v-if="$store.state.app.language === 'zh-CN'">
        历史预约: {{ house.tour.day }} {{ house.tour.time_from }} 至 {{ house.tour.time_to }} <span class="c-grey">{{ house.tour.confirmed ? '已确认' : '未确认' }}</span>
      </template>
      <template v-else>
        History: {{ house.tour.day }} {{ house.tour.time_from }} to {{ house.tour.time_to }} <span class="c-grey">{{ house.tour.confirmed ? 'Confirmed' : 'Not Confirmed' }}</span>
      </template>
    </div>
    <day-time-range v-model="tourValue"></day-time-range>
    <x-button type="primary" @click.native="onClickOk">{{ 'Schedule Tour' | $tt('预约') }}</x-button>
  </div>
</template>

<script>
import PopupHeader from 'vux/src/components/popup-header'
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
        this.$emit('confirm', flag)
      })
    }
  },
  components: {
    PopupHeader,
    Group,
    DayTimeRange,
    XButton
  }
}
</script>

<style>
.house-tour-box .weui-btn {border-radius:0;}
.house-tour-box .done-tour {
  background:#fff;
  padding:15px 10px;
}
</style>