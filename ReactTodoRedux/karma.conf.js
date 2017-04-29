var webpackConfig = require("./webpack.config.js");
/* we have to put the file in webpack fig into karma fig */
module.exports = function(config){
  config.set({
    // specify browser that we want to test in
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],  // to use mocha framework describe and it function to run it
    files:[
      'node_modules/jquery/dist/jquery.min.js', // remove script loader because it is not available in karma, but replace it with node_modules, so we know where to find
      'node_modules/foundation-sites/dist/foundation.min.js',
      'app/tests/**/*.test.jsx'], // matching the gloping pattern that match the file to our test folder, want to get file in ** test folder or subdirectory, that has a file name of * anything end in test.jsx
    preprocessors: { // specifying the string that we want to use in files
      'app/tests/**/*.test.jsx' : ['webpack', 'sourcemap'] // means for all our test files we want to run two things, webpack and sourcemap(so when get errors they actually use the jsx not the bundle file)
    },
    reporters:['mocha'], // the check box or the one that report to the terminal
    client:{ // send details down to the individual framework
      mocha:{
        timeout:'5000' // after 5 sec if the test is not loading then just cancel it
      }
    },
    webpack:webpackConfig, // let us use the webpack config info to create test that use require to load in our module
    webpackServer: {
      noInfo: true
    }
  });
};
