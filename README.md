## Requirements

This application uses [Apache Cordova](http://cordova.apache.org/).
So the basic requirements are [Node.js](http://nodejs.org) including npm.
Additionally you will need the SDKs depending on what platforms you want to build the application for.

## Setup

Install dependancies like bootstrap with npm:

    npm install

Build Javascripts und Stylesheets from `src/` -folder:

    ./node_modules/gulp/bin/gulp.js run

Add target-platform:

    cordova platform add android

Build the application:

    cordova build android
