<template>
  <div class="page-login" v-if="is_ready">
    <x-header :title="'Member Center' | $tt('个人中心')">
      <a class="btn-register" slot="right" @click="onClickRegister">{{ 'Regisery' | $tt('注册') }}</a>
    </x-header>

    <div class="logo">
      <img :src="require('@/assets/logo.png')">
    </div>

    <group>
      <x-input ref="email" v-model="email" is-type="email" required :placeholder="'Please input email address' | $tt('请输入邮箱地址')">
        <i slot="label" class="iconfont icon-email" style="margin-right:4px"></i>
      </x-input>
      <x-input ref="password" v-model="password" required type="password" :placeholder="'Please input password' | $tt('请输入密码')">
        <i slot="label" class="iconfont icon-password" style="margin-right:4px"></i>
      </x-input>
    </group>

    <div class="bottom-container">
      <x-button @click.native="login" type="primary">{{ 'Login' | $tt('登陆') }}</x-button>
    </div>
  </div>
</template>

<script>
import XHeader from 'vux/src/components/x-header'
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
import XInput from '@/components/input'
import XButton from 'vux/src/components/x-button'
export default {
  data () {
    return {
      is_ready: false,
      email: '',
      password: ''
    }
  },
  computed: {
    isLogined () {
      return this.$store.state.account.user !== null
    },
    isAbledLogin () {
      if (!this.$refs.password) {
        return false
      }
      return this.$refs.email.valid &&
        this.$refs.password.valid
    }
  },
  mounted () {
    if (this.isLogined) {
      this.$router.push({name: 'my'})
      return
    }
    this.is_ready = true
  },
  methods: {
    login () {
      if (!this.validate()) {
        return false
      }

      this.$passportApi('/login', {
        params: {
          username: this.email,
          password: this.password
        }
      }).then((data) => {
        this.$store.dispatch('login', data)
        this.$router.back()
      })
    },
    validate () {
      this.$refs.email.focus()
      this.$refs.email.blur()

      this.$refs.password.focus()
      this.$refs.password.blur()

      return this.isAbledLogin
    },
    onClickRegister () {
      this.$router.push({name: 'register'})
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    XInput,
    XButton
  }
}
</script>

<style lang="scss">
.page-login {
  .context-box {
    padding: 0 10px;
  }
  .logo {
    margin-top:10px;
    padding:20px 0;
    text-align:center;
    > img {width:90px;}
  }
  .bottom-container {
    margin-top:45px;
    padding:0 10px;
  }
}
</style>