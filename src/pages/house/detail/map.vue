<template>
  <div class="house-detail-gmap"></div>
</template>

<script>
export default {
  data () {
    return {
      gmap: null
    }
  },
  mounted () {
    this.gmap = new window.google.maps.Map(this.$el, {
      center: this.loc,
      zoom: 8
    })

    return new window.google.maps.Marker({
      position: this.loc,
      map: this.gmap
    })
  },
  props: {
    loc: {
      default: {lat: 0, lng: 0}
    }
  }
}
</script>

<style>
.house-detail-gmap {
  height:95vh;
}
</style>