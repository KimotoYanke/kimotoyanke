const path = require('path')
const nodeExternals = require('webpack-node-externals')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const pkg = require('./package.json')

module.exports = {
  target: 'node',
  entry: './src/cli.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'cli.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {node: 9},
                modules: false
              }]
            ],
            plugins: [
              ['@babel/plugin-transform-react-jsx', {
                pragma: 'h'
              }]
            ]
          }
        }
      }
    ]
  },
  externals: [
    nodeExternals({
      whitelist: name => !Object.keys(pkg.dependencies).includes(name)
    })
  ],
  plugins: [
    new UglifyJsPlugin()
  ],
  mode: 'production'

}
