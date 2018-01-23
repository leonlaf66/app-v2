<template>
  <gmap-map :center="loc" :zoom="12" style="height:100vh;background:#ddd;">
    <gmap-marker :position="loc"></gmap-marker>
  </gmap-map>
</template>

<script>
// https://github.com/xkjyeah/vue-google-maps/blob/vue2/src/main.js
// https://github.com/xkjyeah/vue-google-maps/blob/HEAD/API.md
import { load } from 'vue2-google-maps/src/manager'
import GmapMap from 'vue2-google-maps/src/components/map'
import GmapMarker from 'vue2-google-maps/src/components/marker'

export default {
  props: {
    loc: {
      default: {lat: 0, lng: 0}
    }
  },
  created () {
    if (!window.$gmapFlag) {
      load('AIzaSyAKfreY6Rf9fOvsJNcxGMsPPNHpXbvj6wo', '3.exp', ['places'], true)
      window.$gmapFlag = true
    }
  },
  components: {
    GmapMap,
    GmapMarker
  }
}
</script>