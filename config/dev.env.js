'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MEDIA_BASE_URL: '"http://127.0.0.1:8000"',
  API_HOUSE_URL: '"http://127.0.0.1:8001"',
  API_YP_URL: '"http://127.0.0.1:8002"',
  API_NEWS_URL: '"http://127.0.0.1:8003"'
})
