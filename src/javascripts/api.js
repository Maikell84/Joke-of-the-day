/* global app*/

app.api = {
  getJoke: function(last_post){
    // Ask Reddit-API for a list of jokes
    // Unfortunately reddit doesn't let us filter out NSFW posts. So we have to do it ourselves by
    // getting a list of jokes and take the first Joke that is SFW
    var limit = 1;
    var showNSFW = app.storage.settings.showNSFW.get();
    var after = "";

    if(last_post != null){
      after = "&after=" + last_post;
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
          // If Display of NSFW Content is ok, or the content is non-nsfw, we're done
          if(showNSFW || !nsfw){
            break;
          }

          if(i == (limit-1)){
            // User doesn't want NSFW, but we could not find any SFW-Joke, So we have to call the api again
            // We give the "name"-value of the last element, so reddit starts
            app.api.getJoke(name);
            break;
          }
        }

        // var id = response.data.children["0"].data.id;
        $(".joke-header").html(title);
        $(".joke-text").html(text);
        if(nsfw){
          $(".nsfw-icon").show();
        }
        else{
          $(".nsfw-icon").hide();
        }
        // Save Joke in Database
        app.storage.webSQL.insertJoke(1, name, title, text, nsfw);
      }
    });
  }
};
