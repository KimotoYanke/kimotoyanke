const path = require('path')
const nodeExternals = require('webpack-node-externals')
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
                targets: {node: 9}
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
  externals:
    [nodeExternals({
      whitelist: name => !Object.keys(pkg.dependencies).includes(name)
    })]

}
