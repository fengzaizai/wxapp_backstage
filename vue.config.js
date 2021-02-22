//配置别名
module.exports = {
  configureWebpack: {
    resolve: {
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'netword':'@/netword',
        'views':'@/views',
      }
    }
  }
}
