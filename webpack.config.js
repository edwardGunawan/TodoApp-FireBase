var webpack = require('webpack');
var path= require('path');
// webpack NODE_ENV=production webpack -p to do more optimization
// webpack config is exactly the same no matter what environment you running at, if you run in heroku, or the test environment there will be no difference
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    // disabled warning when doing NODE_ENV=production webpack -p
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    /* specify the folder that we want webpack to look at, so we don't need to specify alias every file that we create */
    modulesDirectories: [
      'node_modules',
      './app/api',
      './app/components'
    ],
    alias: {
      app : 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths:[
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  },
  // use the most space in bundle file
  devtool: process.env.NODE_ENV === 'production'? undefined : 'cheap-module-eval-source-map' // we only generating the source map if the webpack is not in production
};
