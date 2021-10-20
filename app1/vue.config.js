const path = require("path");

module.exports = {
  devServer: {
    port: 8081,
     // 关闭主机检查，使微应用可以被 fetch
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // 自定义 webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    output: {
      library: 'app1',
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_app1`,
    },
  },
};
