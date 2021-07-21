const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const NOT_PRODUCTION = process.env.NODE_ENV !== "production";
let BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// 代理服务地址配置
const proxyObj = {
  sit: {
    api: "",
  },
  uat: {
    api: "",
  },
  production: {
    api: "",
  }
};

module.exports = {
  // 设置打包文件相对路径
  publicPath: "./",
  devServer: {
    proxy: {
      "/api": {
        target: proxyObj.sit.api,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/cmsBaseUrl": {
        target: proxyObj.sit.cmsBaseUrl,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/cmsBaseUrl": ""
        }
      },
      "/imgapi": {
        target: proxyObj.sit.image,
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/imgapi": ""
        }
      }
    }
  },
  configureWebpack: config => {
    if (NOT_PRODUCTION) {
      // 开发环境生产sm文件,会在source下面生成一个webpack文件里面src是vue源码
      config.devtool = "source-map";
    } else {
      // 生产环境,抽离公共脚本，样式,（生成的文件比开发环境下要多）删除console
      let optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: "all",
              test: /node_modules/,
              name: "vendor",
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
            },
            common: {
              chunks: "all",
              test: /[\\/]src[\\/]js[\\/]/,
              name: "common",
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            styles: {
              name: "styles",
              test: /\.(sa|sc|c|le)ss$/,
              chunks: "all",
              enforce: true
            },
            runtimeChunk: {
              name: "manifest"
            }
          }
        },
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              warnings: false,
              compress: {
                pure_funcs: ["console.log", "console.debug", "console.warn"]
              }
            }
          })
        ]
      };
      Object.assign(config, {
        optimization
      });
    }

    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src/"), // 路径重写
          "@@": path.resolve(__dirname, "./src/assets/")
        } // 别名配置
      }
    });
  },
  css: {
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          // px单位转为rem单位，移动端等比缩放适配
          require("postcss-px2rem")({
            remUnit: 37.5
          })
        ]
      }
    },
    modules: false,
    // 是否使用css分离插件 ExtractTextPlugin,将样式和脚本分开
    extract: true,
    // 开启 CSS source maps,生成未被压缩的样式(可能是和其他配置冲突了，暂时未发现有用)
    sourceMap: true
  },
  // 生产环境生产sm文件,会在source下面生成一个webpack文件里面src是vue源码
  productionSourceMap: true,
  chainWebpack: config => {
    // 生产环境打包查看模块树状图
    if (!NOT_PRODUCTION) {
      config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type => addStyleResource(config.module.rule("less").oneOf(type))); // 全局引用less文件
  },
  // 多线程编译打包
  parallel: require("os").cpus().length > 1,
  lintOnSave: true
};
// 全局导入less基础样式
function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        // 需要全局导入的less
        path.resolve(__dirname, "./src/assets/less/base.less")
      ]
    });
}
