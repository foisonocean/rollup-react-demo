import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

const ENV = JSON.stringify(process.env.NODE_ENV || 'development')

const isProd = ENV === '"production"'

const config = {
  entry: 'src/index.js',
  dest: 'build/js/main.js',
  format: 'iife',
  sourceMap: isProd ? false : 'inline',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      namedExports: {
        'node_modules/react/react.js': [
          'Component',
          'PureComponent',
          'PropTypes'
        ],
        'node_modules/react-dom/index.js': [
          'render'
        ]
      }
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': ENV,
    })
  ],
}

if (isProd) {
  // skip development modules
  config.plugins.unshift({
    resolveId: (importee, importer) => {
      switch (importee) {
        default:
          return  undefined
      }
    }
  })

  // uglify the code
  config.plugins.push(uglify())
}

export default config
