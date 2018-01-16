'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MEDIA_BASE_URL: '"http://media.usleju.cn"',
  API_HOUSE_URL: '"http://172.104.15.126:8001"',
  API_YP_URL: '"http://172.104.15.126:8002"',
  API_NEWS_URL: '"http://172.104.15.126:8003"'
})
