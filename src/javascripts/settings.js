/* global app */

app.settings = {
  changeNSFW: function(value){
    app.storage.settings.showNSFW.set(value);
    $("#checkbox-nsfw").siblings(".toggle-label").html(value === true ? "Show" : "Don't show");
  },
  changeNotifications: function(value){
    app.storage.settings.showNotifications.set(value);
    $("#checkbox-notifications").siblings(".toggle-label").html(value == true ? "On" : "Off");
  },
  changeNotificationFrequency: function(value){
    app.storage.settings.notificationsFrequency.set(value);
  },
  changeSource: function(value){
    app.jokeSource = value;
    app.storage.settings.jokeSource.set(value);
  },
  toggleSettings: function(show){
    if(show){
      $(".index").hide();
      $(".settings").show();
    }
    else{
      $(".index").show();
      $(".settings").hide();
    }
  }
};
