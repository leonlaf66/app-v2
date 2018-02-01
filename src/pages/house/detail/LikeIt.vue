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
      if (!this.$store.state.account.user) {
        this.$router.push({name: 'login'})
        return false
      }

      let params = {
        id: this.house.id,
        status: status ? '1' : '0'
      }

      this.$houseApi(`house/${this.house.id}/like`, { params }).then(result => {
        this.onSuccess(status, result)
      })
    },
    onSuccess (status, result) {
      let toastText = this.$tt('Added', '已收藏')
      let toastType = 'success'

      if (!status) {
        toastText = this.$tt('Canceled', '已取消')
        toastType = 'cancel'
      }

      this.$vux.toast.show({
        text: toastText,
        type: toastType
      })
      this.$emit('success', status)
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