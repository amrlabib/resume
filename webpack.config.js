const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      }
    ],
  },
  plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: './src/index.html', to: './' },
          { from: './src/images/favicon', to: './favicon' },
          { from: './src/images/og-image.png', to: './og-image.png' },
        ]}
       ),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs'),
    },
    compress: true,
    port: 9000,
    allowedHosts: 'all'
  }
};
