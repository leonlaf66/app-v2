<template>
  <picker :data="items" v-model="value"></picker>
</template>

<script>
import Picker from 'vux/src/components/picker'
let days = []
let date = new Date()
let dateOut = function (date) {
  return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
}
days.push(dateOut(date))
for (let i = 0; i < 20; i++) {
  date.setDate(date.getDate() + 1)
  days.push(dateOut(date))
}

let times = []
for (let i = 7; i < 21; i++) {
  let time = ('0' + i).slice(-2)
  times.push(time + ':00')
  times.push(time + ':30')
}

export default {
  data () {
    return {
      value: [days[1], times[0], times[1]],
      items: [
        days,
        times,
        times
      ]
    }
  },
  mounted () {
    this.$emit('input', this.value)
  },
  watch: {
    'value' () {
      this.$emit('input', this.value)
    }
  },
  components: {
    Picker
  }
}
</script>