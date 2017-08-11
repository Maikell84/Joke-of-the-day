/* global app*/

app.api = {
  getJoke: function(last_post){
    // Ask icanhazdadjoke-API for a joke

    $.ajax({
      method: 'GET',
      url: "https://icanhazdadjoke.com",
      headers: {
        Accept: "application/json"
      },
      success: function(response){
        $(".joke-text").html(response.joke);
      }
    });
  }
};
