const webpack = require("webpack");

module.exports = [{
  cache: true,
  entry: "./js/main.js",
  output: {
    path: "./js/build",
    filename: "main.bundle.js",
    libraryTarget: "umd",
    library: "MatterLine"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      }
    ]
  },
  plugins: [
  ],
  externals: [
    "matter-js"
  ]
}, {
  cache: true,
  entry: "./js/test.js",
  output: {
    path: "./js/build",
    filename: "test.bundle.js",
    libraryTarget: "umd",
    library: ["Tests"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      }
    ]
  },
  plugins: [
  ]
}];
