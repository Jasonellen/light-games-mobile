var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
const pxtorem = require('postcss-pxtorem');
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    pxtorem({
      rootValue: 75,
      propWhiteList: [],
    })
  ]
}
