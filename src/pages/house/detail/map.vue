<template>
  <div class="house-detail-gmap">
    <remote-script oid="google" src="http://maps.google.cn/maps/api/js?key=AIzaSyAKfreY6Rf9fOvsJNcxGMsPPNHpXbvj6wo&v=3.exp" @load="onJsLoaded"></remote-script>
    <div class="gmap"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      state: {
        jsIsLoaded: false
      },
      gmap: null
    }
  },
  computed: {
    jsIsLoaded () {
      return this.state.jsIsLoaded || (window.google && window.google.maps)
    }
  },
  mounted () {
    if (this.jsIsLoaded) {
      this.load()
    }
  },
  methods: {
    onJsLoaded () {
      this.state.jsIsLoaded = true
      this.load()
    },
    load () {
      this.gmap = new window.google.maps.Map(this.$el.querySelector('.gmap'), {
        center: this.loc,
        zoom: 8
      })

      return new window.google.maps.Marker({
        position: this.loc,
        map: this.gmap
      })
    }
  },
  props: {
    loc: {
      default: {lat: 0, lng: 0}
    }
  }
}
</script>

<style>
.house-detail-gmap .gmap{
  height:95vh;
}
</style>