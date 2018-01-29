<template>
  <div class="page-register">

    <div class="page-regiser">
      <x-header :title="'Register a Account' | $tt('注册帐号')"></x-header>
    </div>

    <group>
      <x-input v-model="email"
        required
        is-type="email"
        :placeholder="'Please input email address' | $tt('邮箱地址')"
        ref="email">
        <i slot="label" class="iconfont icon-email"></i>
      </x-input>
      <x-input v-model="title"
        required
        :min="2"
        :max="15"
        :placeholder="'Please input your name' | $tt('昵称')"
        ref="title">
        <i slot="label" class="iconfont icon-ren"></i>
      </x-input>
      <x-input v-model="password"
        required
        :min="6"
        :max="16"
        :placeholder="'Please input password' | $tt('密码')"
        ref="password">
        <i slot="label" class="iconfont icon-password"></i>
      </x-input>
      <x-input v-model="password2"
        required
        :min="6"
        :max="16"
        :equalWith="password"
        type="password"
        :placeholder="'Please repeat input password' | $tt('确认密码')"
        ref="password2">
        <i slot="label" class="iconfont icon-password"></i>
      </x-input>
    </group>

    <div class="bottom-container">
      <x-button @click.native="onClickRegister" type="primary">{{ 'Register' | $tt('注册帐号') }}</x-button>
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
      email: '',
      title: '',
      password: '',
      password2: ''
    }
  },
  computed: {
    isAbledRegister () {
      if (!this.$refs.password2) {
        return false
      }
      return this.$refs.email.valid &&
        this.$refs.title.valid &&
        this.$refs.password.valid &&
        this.$refs.password2.valid
    }
  },
  methods: {
    onClickRegister () {
      if (!this.validate()) {
        return false
      }
      let params = {
        email: this.email,
        title: this.title,
        password: this.password
      }

      this.$passportApi('/register', { params }).then((data) => {
        this.$router.push({ name: 'login' })
      })
    },
    validate () {
      this.$refs.email.focus()
      this.$refs.email.blur()

      this.$refs.title.focus()
      this.$refs.title.blur()

      this.$refs.password.focus()
      this.$refs.password.blur()

      this.$refs.password2.focus()
      this.$refs.password2.blur()

      return this.isAbledRegister
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
.page-register {
  .weui-cells {
    .iconfont {
      margin-right:4px
    }
  }
  .bottom-container {
    margin-top:45px;
    padding:0 10px;
  }
}
</style>