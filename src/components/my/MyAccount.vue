<template>
  <div class="my-account" >
    <template v-if="isLogined">
      <div class="account">
        <div class="icon-box">
          <i class="iconfont icon-login_user"></i>
        </div>
        <div>{{ userName }}</div>
      </div>
    </template>
    <template v-else>
      <a class="login" @click="onClickLogin">
        <div class="icon-box">
          <i class="iconfont icon-login_user"></i>
        </div>
        <div>{{ 'Login' | $tt('登陆') }}</div>
      </a>
      <a class="btn-register" @click="onClickRegister">{{ 'Register' | $tt('注册') }}</a>
    </template>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLogin () {
      this.$router.push({name: 'login'})
    },
    onClickRegister () {
      this.$router.push({name: 'register'})
    }
  },
  computed: {
    isLogined () {
      return this.$store.state.account.user !== null
    },
    userId () {
      if (this.isLogined) {
        return this.$store.state.account.user.id
      }
      return null
    },
    userName () {
      if (this.isLogined) {
        return this.$store.state.account.user.profile.name
      }
      return ''
    }
  }
}
</script>

<style lang="scss">
.my-account {
  .login, .account {
    display:inline-block;
    font-size:15px;
  }
  .icon-box {
    display:inline-block;
    width:44px;
    height:44px;
    border-radius:25px;
    border:solid 2px #cee27f;
    background-color:#829757;
    line-height:44px;
    margin-bottom:5px;
    > .iconfont {font-size:26px;font-weight:100}
  }
  .btn-register {
    display:block;
    margin-top:15px;
    font-size:15px
  }
}
</style>