'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  GOOGLE_MAP_KEY: '"AIzaSyAKfreY6Rf9fOvsJNcxGMsPPNHpXbvj6wo"',
  MEDIA_BASE_URL: '"http://media.usleju.cn"',
  API_HOUSE_URL: '"http://127.0.0.1:8001"',
  API_YP_URL: '"http://127.0.0.1:8002"',
  API_NEWS_URL: '"http://127.0.0.1:8003"',
  API_PASSPORT_URL: '"http://127.0.0.1:8004"',
  API_MEMBER_URL: '"http://127.0.0.1:8005"'
})
