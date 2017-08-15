/* global app */

$(document).on("click", "#checkbox-nsfw", function(){
  app.settings.changeNSFW($(this).prop("checked"));
});

$(document).on("click", "#checkbox-notifications", function(){
  app.settings.changeNotifications($(this).prop("checked"));
});

$(document).on("change", "#select-frequency", function(){
  app.settings.changeNotificationFrequency($(this).val());
});

$(document).on("change", "#select-source", function(){
  app.settings.changeSource($(this).val());
});

$(document).on("click", ".to-settings-link", function(){
  app.settings.toggleSettings(true);
});

$(document).on("click", ".to-index-link", function(){
  app.settings.toggleSettings(false);
});

$(document).on("click", ".previous-joke", function(){
  if(app.currentJokeID > 0){
    app.currentJokeID--;
    app.storage.webSQL.readJoke(app.currentJokeID, app.displayJokeFromDatabase);
  }
});

$(document).on("click", ".next-joke", function(){
  if(app.currentJokeID < app.highestJokeID ){
    app.currentJokeID++;
    app.storage.webSQL.readJoke(app.currentJokeID, app.displayJokeFromDatabase);
  }
});

$(document).on("click", ".new-joke", function(){
  app.api.getJoke();
});
