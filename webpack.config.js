var webpack = require('webpack');
var path= require('path');
var envFile = require('node-env-file');
// webpack NODE_ENV=production webpack -p to do more optimization
// webpack config is exactly the same no matter what environment you running at, if you run in heroku, or the test environment there will be no difference
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// node-env-file will throw error on file if it doesn't exist, thats exactly what is going to happpen in the production, there is no production file in the config folder, there is no config folder in production
try { // load in the file
  envFile(path.join(__dirname, 'config/'+process.env.NODE_ENV + '.env')); // environment name as the file name (NODE_ENV), it is going to have envFile to load our file, set all appropriate var in process.env
} catch(e){

}

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
    }),
    // define plugins let you define var in bundle using webpack config file
    new webpack.DefinePlugin({
      'process.env': { // we can pass in all the argument that we like for the environment so that we can get the variable inside the env file
        NODE_ENV: JSON.stringify (process.env.NODE_ENV), // wrap all the string for us so they work appropriately // value evalutate as js, it set it up to the variable test equal to when setting the plugins, when defined a stirng it should be '"test"'
        API_KEY: JSON.stringify (process.env.API_KEY),
        AUTH_DOMAIN: JSON.stringify (process.env.AUTH_DOMAIN),
        DATABASE_URL: JSON.stringify (process.env.DATABASE_URL),
        STORAGE_BUCKET: JSON.stringify (process.env.STORAGE_BUCKET),
        GITHUB_ACCESS_TOKEN: JSON.stringify(process.env.GITHUB_ACCESS_TOKEN)
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
