/* global app */

$(document).on("click", "#checkbox-nsfw", function(){
  app.settings.changeNSFW($(this).prop("checked"));
});

$(document).on("click", "#checkbox-notifications", function(){
  app.settings.changeNotifications($(this).prop("checked"));
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
  },
  changeNotification: function(value){
    app.storage.settings.showNotifications.set(value);
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
