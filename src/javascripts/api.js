/* global app*/

app.api = {
  getJoke: function(){
    switch(app.jokeSource){
    case 2:
      app.api.callIcanhazdadjoke();
      break;
    default:
      app.api.callReddit(null, null);
      break;
    }
  },
  callReddit: function(lastPost){
    // Ask Reddit-API for a list of jokes
    // Unfortunately reddit doesn't let us filter out NSFW posts. So we have to do it ourselves by
    // getting a list of jokes and take the first Joke that is SFW
    var limit = 1;
    var showNSFW = app.storage.settings.showNSFW.get();
    var after = "";
    var display = true;

    if(lastPost != null){
      after = "&after=" + lastPost;
    }

    if(!showNSFW){
      limit = 20;
    }

    $.ajax({
      method: 'GET',
      url: "https://www.reddit.com/r/Jokes/hot.json?sort=hot&limit=" + limit + after,
      success: function(response){
        // console.log(response);
        var title;
        var text;
        var nsfw;
        var name;

        for(var i = 0; i <= limit-1; i++){
          title = response.data.children[i].data.title;
          text = response.data.children[i].data.selftext;
          nsfw = response.data.children[i].data.over_18;
          name = response.data.children[i].data.name;

          // If we already displayed this joke
          if(app.jokeIds.includes(name)){
            if(i == (limit-1)){
              // We have displayed all the jokes in the current selection. So we have to ask the api for the next X jokes
              // We give the "name"-value of the last element, so reddit starts
              app.api.callReddit(name);
              display = false;
              break;
            }
            else{
              continue;
            }
          }

          // If Display of NSFW Content is ok, or the content is non-nsfw, we're done
          if(app.nsfw || !nsfw){
            break;
          }

          if(i == (limit-1)){
            // User doesn't want NSFW, but we could not find any SFW-Joke, So we have to call the api again
            // We give the "name"-value of the last element, so reddit starts
            app.api.callReddit(name);
            break;
          }
          display = true;
        }

        if(display){
          app.displayJoke(title, text, name, nsfw);
          // Save Joke in Database
          app.storage.webSQL.insertJoke(1, name, title, text, nsfw);
          app.jokeIds.push(name);
        }
      }
    });
  },
  callIcanhazdadjoke: function(){
    $.ajax({
      method: 'GET',
      url: "https://icanhazdadjoke.com",
      headers: {
        Accept: "application/json"
      },
      success: function(response){
        var text = response.joke;
        app.displayJoke("ICanHazDadJoke:", text, null, false);
        app.storage.webSQL.insertJoke(2, null, null, text, 0);
      }
    });
  }
};
