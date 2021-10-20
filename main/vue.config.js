const path = require("path");
const { name } = require("./package");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  filenameHashing: true,
//   lintOnSave: process.env.NODE * ENV !== "production",
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    hot: true,
    disableHostCheck: true,
    // 修改默认端口，和注册时一直
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 解决主应用加载子应用出现跨域问题
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // 自定义 webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
    // 让主应用能正确识别微应用暴露出来的一些信息
    output: {
      library: 'app2',
      libraryTarget: "umd", // 把子应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp*${name}`,
    },
  },
};
