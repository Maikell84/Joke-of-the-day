/* global app */

$(document).on("click", "#checkbox-nsfw", function(){
  app.settings.changeNSFW($(this).prop("checked"));
});

$(document).on("click", "#checkbox-notifications", function(){
  app.settings.changeNotifications($(this).prop("checked"));
});

app.settings = {
  changeNSFW: function(value){
    app.storage.settings.showNSFW.set(value);
  },
  changeNotification: function(value){
    app.storage.settings.showNotifications.set(value);
  }
};
