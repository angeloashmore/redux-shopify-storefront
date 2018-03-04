import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default [
  // Browser-friendly UMD build.
  {
    input: 'src/index.js',
    output: {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
    },
    plugins: [
      json({
        include: 'package.json',
        preferConst: true,
      }),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  {
    input: 'src/index.js',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      json({
        include: 'package.json',
        preferConst: true,
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
    ],
  },
]
