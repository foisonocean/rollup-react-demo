import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'

const ENV = JSON.stringify(process.env.NODE_ENV || 'development')

const isProd = ENV === '"production"'

const config = {
  entry: 'src/index.tsx',
  dest: 'build/js/main.js',
  format: 'iife',
  sourceMap: isProd ? false : 'inline',
  plugins: [
    typescript({
      cacheRoot: '.typescript-compile-cache',
      clean: isProd ? true : false,
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js', 'jsx', 'ts', 'tsx', '.json'],
    }),
    commonjs({
      namedExports: {
        'node_modules/react/react.js': [
          // Components
          'Component',
          'PureComponent',
          // Creating React Elements
          'createElement',
          'createFactory',
          // Transforming Elements
          'cloneElement',
          'isValidElement',
          'Children',

          // Prop types
          'PropTypes'
        ],
        'node_modules/react-dom/index.js': [
          'render',
          'findDOMNode',
          'unmountComponentAtNode',
          'unstable_batchedUpdates',
          'unstable_renderSubtreeIntoContainer'
        ],
      }
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
    },
  })

  // uglify the code
  config.plugins.push(uglify())
}

export default config
