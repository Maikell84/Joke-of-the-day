/* global app*/

app.api = {
  getJoke: function(){
    $.ajax({
      method: 'GET',
      url: "https://www.reddit.com/r/Jokes/new.json?sort=hot",
      success: function(response){
        // console.log(response);
        var title = response.data.children["0"].data.title;
        var text = response.data.children["0"].data.selftext;
        // var nsfw = response.data.children["0"].data.over_18;
        // var id = response.data.children["0"].data.id;
        $(".joke-header").html(title);
        $(".joke-text").html(text);
      }
    });
  }
};
