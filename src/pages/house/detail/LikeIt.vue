<template>
  <div class="house-like-box">
      <a class="btn-like iconfont icon-like" @click="onClickLike(!house.liked)" :class="{'active': house.liked}"></a>
  </div>
</template>

<script>
export default {
  props: {
    house: {
      require: true,
      default: {}
    }
  },
  methods: {
    onClickLike (status) {
      let params = {
        id: this.house.id,
        status: this.house.liked ? '0' : '1'
      }

      this.$houseApi(`house/${this.house.id}/like`, { params }).then(flag => {
        this.$emit('success', status)
      })
    }
  }
}
</script>

<style lang="scss">
.house-like-box {
  display:inline;
  .btn-like {
    font-size:24px;
    color:#aaa;
    &.active {
      color:#a0b737;
    }
  }
}
</style>