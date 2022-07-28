const webpack = require('webpack');
const path = require('path');
// jQueryで使用
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const IS_DEV = (process.env.NODE_ENV === 'dev');

const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, "./src/html/**/*.html")],
  {
    ignore: path.resolve(__dirname, "./src/html/**/_*.html"),
  }
)();

const htmlGlobPlugins = (entries, srcPath) => {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        filename: `./${key}.html`,
        template: `./src/html/${key}.html`,
        favicon: "./src/favicon.ico",
        chunks: [`${key}`], //使用的js是哪隻
        inject: true,
        hash: true
      })
  );
}
const MODE = "production";
module.exports = {
  //打包的進入點
  // entry: ['@babel/polyfill', "./src/js/index.js",  "./src/js/products.js"],
  entry: {
    main: "./src/js/main.js",
    index: "./src/js/index.js",
    products: "./src/js/products.js",
    collections: "./src/js/collections.js",
    project_shopcart: "./src/js/project_shopcart.js",
    project_shopcart_step1: "./src/js/project_shopcart_step1.js",
    project_shopcart_step2: "./src/js/project_shopcart_step2.js",
    project_shopcart_step3: "./src/js/project_shopcart_step3.js",
    login: "./src/js/login.js",
  },
  // entry: ["regenerator-runtime/runtime.js", "./src/main.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: ' [name].bundle.js',
    // filename: `./js/${outputFile}.js`,
    // filename: "assets/js/[name].min.js",
  },
  mode: IS_DEV,
  plugins: [
    new MiniCssExtractPlugin({
      // filename: "style.css",
      filename: `./css/[name].css`,
    }),

    new HtmlWebpackPlugin({
      title: "Home",
      favicon: "./src/favicon.ico",
      template: "./src/index.html",
      chunks: ["index"], //使用的js是哪隻
      inject: true,
      hash: true,
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    // new CleanWebpackPlugin({
    //   cleanAfterEveryBuildPatterns: ["dist"],
    // }),
    ...htmlGlobPlugins(entries, "./src"), //  追加
  ],

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader", "sass-loader"
        ],
      },
      {
        //for public footer/header
        test: /\.(html)$/,
        // type: "asset/resource",
        include: path.join(__dirname, "src/views"),
        use: {
          loader: "html-loader",
          options: {
            // interpolate: true,
            esModule: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext][query]",
        },
      },
      {
        test: /\.(eot|ttf|woff)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        generator: {
          filename: "js/[name][ext][query]",
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  // devServer: {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*'
  //   }
  // },
};  
// });