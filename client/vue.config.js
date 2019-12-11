module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://localhost:3003'
  },
  // lintOnSave: true
  // publicPath: '/dist'
};