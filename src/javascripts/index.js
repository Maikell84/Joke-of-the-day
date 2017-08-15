var LOGLEVEL = {
  ERROR: { value: 0 },
  WARNING: { value: 1 },
  INFO: { value: 2 },
  DEBUG: { value: 3 },
  VERBOSE: { value: 4 }
};

var app = {
  highestJokeID: null,
  currentJokeID: null,
  logLevel: LOGLEVEL.WARNING,
  jokes: [],
  jokeIds: [],
  jokeSource: 1,
  nsfw: 0,
  notifications: 0,
  notificationsFrequency: 1,
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
    $(".version-display").html("v 0.1.0");

    if(app.storage.firstStart.get() == null){
      $(".welcome-message").show();
      app.settings.toggleSettings(true);
      app.storage.firstStart.set(true);
    }

    if(app.storage.settings.showNSFW.get() == "true"){
      app.settings.changeNSFW(true);
      $("#checkbox-nsfw").prop("checked", "checked");
      app.nsfw = 1;
    }

    if(app.storage.settings.showNotifications.get() == "true"){
      app.settings.changeNotifications(true);
      $("#checkbox-notifications").prop("checked", "checked");
      app.notifications = 1;
    }

    if(app.storage.settings.notificationsFrequency.get() != null){
      $("#select-frequency").val(app.storage.settings.notificationsFrequency.get());
      app.notificationsFrequency = 1;
    }

    if(app.storage.settings.jokeSource.get() != null){
      $("#select-source").val(app.storage.settings.jokeSource.get());
      app.jokeSource = app.storage.settings.jokeSource.get();
    }

    app.storage.webSQL.init();
    app.api.getJoke(null);
    app.storage.webSQL.getMaxJokeID();
    app.getLastJokes();
  },
  onBackKeyDown: function(){

  },
  onPause: function(){

  },
  onResume: function(){

  },
  onMenuKeyDown: function(){

  },
  handleJokeID: function(result){
    app.highestJokeID = result.rows.item(0)['max(id)'];
    app.currentJokeID = app.highestJokeID;
  },
  getLastJokes: function(){
    app.storage.webSQL.readJoke(null, function(jokes){
      app.jokes = jokes;
      for(var i = 0; i < jokes.length; i++){
        app.jokeIds.push(jokes[i]['jokeid']);
      }
    });
  },
  displayJoke: function(title, text, name, nsfw){
    $(".joke-header").html(app.utils.escapeHtml(title));
    $(".joke-text").html(app.utils.escapeHtml(text));
    $(".joke-name").html(app.utils.escapeHtml(name));
    if(nsfw){
      $(".nsfw-icon").show();
    }
    else{
      $(".nsfw-icon").hide();
    }
  },
  displayJokeFromDatabase: function(jokes){
    app.displayJoke(jokes[0]['title'], jokes[0]['content'], jokes[0]['jokeid'], jokes[0]['nsfw'] == 'true');
  }
};

app.initialize();
