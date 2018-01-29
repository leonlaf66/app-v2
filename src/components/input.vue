<script>
import XInput from 'vux/src/components/x-input'
import isEmail from 'validator/lib/isEmail'
import isMobilePhone from 'validator/lib/isMobilePhone'
const validators = {
  'email': {
    fn: isEmail,
    msg: ['Email ', '邮箱']
  },
  'china-mobile': {
    fn (str) {
      return isMobilePhone(str, 'zh-CN')
    },
    msg: ['Phone Number ', '手机号码']
  },
  'china-name': {
    fn (str) {
      return str.length >= 2 && str.length <= 6
    },
    msg: ['Name ', '中文姓名']
  }
}
export default {
  prpos: {
    msgs: {}
  },
  methods: {
    validate () {
      if (typeof this.equalWith !== 'undefined') {
        this.validateEqual()
        return
      }
      this.errors = {}
      if (!this.currentValue && !this.required) {
        this.valid = true
        return
      }
      if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = this.$tt('Required', '必填哦')
        this.getError()
        return
      }
      if (typeof this.isType === 'string') {
        const validator = validators[this.isType]
        if (validator) {
          let value = this.currentValue
          if (this.isType === 'china-mobile' && this.mask === '999 9999 9999') {
            value = this.currentValue.replace(/\s+/g, '')
          }
          this.valid = validator[ 'fn' ](value)
          if (!this.valid) {
            this.forceShowError = true
            this.errors.format = this.$tt(validator[ 'msg' ]) + this.$tt('Format error', '格式不对哦~')
            this.getError()
            return
          } else {
            delete this.errors.format
          }
        }
      }
      if (typeof this.isType === 'function') {
        const validStatus = this.isType(this.currentValue)
        this.valid = validStatus.valid
        if (!this.valid) {
          this.errors.format = validStatus.msg
          this.forceShowError = true
          this.getError()
          return
        } else {
          delete this.errors.format
        }
      }
      if (this.min) {
        if (this.currentValue.length < this.min) {
          this.errors.min = this.$tt(`not be less than ${this.min} characters!`, `最少应该输入${this.min}个字符哦`)
          this.valid = false
          this.getError()
          return
        } else {
          delete this.errors.min
        }
      }
      if (this.max) {
        if (this.currentValue.length > this.max) {
          this.errors.max = this.$tt(`not be more than ${this.min} characters!`, `最多可以输入${this.max}个字符哦`)
          this.valid = false
          this.forceShowError = true
          return
        } else {
          this.forceShowError = false
          delete this.errors.max
        }
      }
      this.valid = true
    },
    validateEqual () {
      if (!this.equalWith && this.currentValue) {
        this.valid = false
        this.errors.equal = this.$tt('Must be consistent', '输入必须一致')
        return
      }
      let willCheck = this.dirty || this.currentValue.length >= this.equalWith.length
      // 只在长度符合时显示正确与否
      if (willCheck && this.currentValue !== this.equalWith) {
        this.valid = false
        this.errors.equal = this.$tt('Must be consistent', '输入必须一致')
        return false
      } else {
        if (!this.currentValue && this.required) {
          this.valid = false
        } else {
          this.valid = true
          delete this.errors.equal
        }
      }
    }
  },
  mixins: [XInput]
}
</script>