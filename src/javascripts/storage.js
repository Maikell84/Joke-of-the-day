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
		includeNSFW: {
	  	get: function(){
	      return window.localStorage.getItem("nsfw");
	    },
	    set: function(value){
	      window.localStorage.setItem("nsfw", value);
	    }
		}
	},
	joke: {
		  get: function(date){
	      return window.localStorage.getItem("nsfw");
	    },
	    set: function(date, value){
	      window.localStorage.setItem("nsfw", value);
	    }
	}
}