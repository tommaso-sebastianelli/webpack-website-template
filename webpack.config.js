const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ['./src/index.ts'],
  devtool: 'inline-source-map',
  devServer: {
    stats: "errors-only",
    host: process.env.HOST, // default: localhost
    port: process.env.PORT, // default: 8080
    open: true, // open page in browser
    overlay: true, // error overlay
    contentBase: './dist'
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Apply rule for .sass, .scss or .css files
        test: /\.(sa|sc|c)ss$/,

        // Set loaders to transform files.
        // Loaders are applying from right to left(!)
        // The first loader will be applied after others
        use: [{
            // This loader resolves url() and @imports inside CSS
            loader: "css-loader",
          },
          {
            // Then we apply postCSS fixes like autoprefixer and minifying
            loader: "postcss-loader"
          },
          {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
              implementation: require("sass")
            }
          }
        ]
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          // Using file-loader for these files
          loader: "file-loader",

          // In options we can set different things like format
          // and directory to save
          options: {
            outputPath: 'images'
          }
        }]
      },
      {
        // Apply rule for fonts files
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          // Using file-loader too
          loader: "file-loader",
          options: {
            outputPath: 'fonts'
          }
        }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Playground Demo",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development'
};