const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "doit",
    path: path.resolve(__dirname, 'bin')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
