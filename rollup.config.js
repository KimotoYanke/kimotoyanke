import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
  {
    input: 'src/cli.js',
    external: ['ms'],
    plugins: [babel({
      exclude: 'node_modules/**'
    })],
    output: [
      { file: pkg.main, format: 'cjs' }
    ]
  }
]
