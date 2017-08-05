var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
    // navigator.app.overrideButton("backbutton", true);
    // navigator.app.overrideButton("menubutton", true);
    document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
    document.addEventListener("pause", this.onPause.bind(this), false);
    document.addEventListener("resume", this.onResume.bind(this), false);
    document.addEventListener("menubutton", this.onMenuKeyDown.bind(this), false);
    $.material.init();
    app.api.getJoke();

    // console.log(app.storage.firstStart.get());

    if(app.storage.firstStart.get() == null){
      window.location.href = "settings.html";
      $("#welcome-message").show();
      app.storage.firstStart.set(true);

    }
  },
  onBackKeyDown: function(){

  },
  onPause: function(){

  },
  onResume: function(){

  },
  onMenuKeyDown: function(){

  }
};

app.initialize();
