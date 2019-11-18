module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'http://localhost:3003'
  },
  publicPath: '/dist'
};