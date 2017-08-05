/* global module*/

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine-jquery', 'jasmine'],
    files: [
      'www/lib/js/jquery.min.js',
      'www/lib/js/bootstrap.min.js',
      'www/lib/js/material.min.js',
      'www/lib/js/ripples.min.js',
      'www/js/**/*.js',
      'test/**/*js'
    // ],
    // plugins: [
    //   'karma-jasmine',
    //   'karma-jasmine-jquery'
    ]
  });
};
