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
