app.api = {
	getJoke: function(){
		$.ajax({
			method: 'GET',
		  url: "https://www.reddit.com/r/Jokes/new.json?sort=hot",
		  success: function(response){
		  	console.log(response);
		  	$(".joke-header").html(response.data.children["0"].data.title);
		  	$(".joke-text").html(response.data.children["0"].data.selftext);
		  }
		});

	}
}