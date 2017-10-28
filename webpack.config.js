const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./assets/js/index.js",
  devtool: "source-map",
  output: {
    filename: "./public/bundle.js",
    path: path.resolve(__dirname)
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [new ExtractTextPlugin("./public/styles.css")]
};