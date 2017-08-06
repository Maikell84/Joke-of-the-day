/* global app, LOGLEVEL*/

app.debug = {
  toLog: function(logLevel, logText, logObject){
    if(logLevel.value <= app.logLevel.value){
      /* eslint-disable no-console */
      switch (logLevel){
      case LOGLEVEL.ERROR:
        console.error(logText, logObject);
        break;
      case LOGLEVEL.WARNING:
        console.warn(logText, logObject);
        break;
      default:
        console.log(logText, logObject);
        break;
      }
      /* eslint-enable no-console */
    }
  }
};
