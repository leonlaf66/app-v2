import isEmail from 'validator/lib/isEmail'

export default {
  isRequired (value) {
    return false
    // return typeof value !== 'undefined' && value.trim() !== ''
  },
  isEmail (value) {
    return isEmail(value)
  }
}
