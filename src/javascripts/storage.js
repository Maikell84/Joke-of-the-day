/* global app */

app.storage = {
  firstStart: {
    get: function(){
      return window.localStorage.getItem("firstStart");
    },
    set: function(value){
      window.localStorage.setItem("firstStart", value);
    }
  },
  settings: {
    showNSFW: {
      get: function(){
        return window.localStorage.getItem("nsfw");
      },
      set: function(value){
        window.localStorage.setItem("nsfw", value);
      }
    },
    showNotifications: {
      get: function(){
        return window.localStorage.getItem("notifications");
      },
      set: function(value){
        window.localStorage.setItem("notifications", value);
      }
    }
  }
};
