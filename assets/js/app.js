var showTitle = ["Halo", "Tekken", "Elder Scrolls", "Super Mario", "Crash Bandicoot", "Spyro", "Street Fighter", "Hotline Miami"];
var currentGif; var pausedGif; var animatedGif; var stillGif;

function createButtons(){
	$("#Buttons").empty();
	for(var i = 0; i < showTitle.length; i++){
		var showBtn = $("<button>").text(showTitle[i]).addClass("showBtn").attr({"data-name": showTitle[i]});
		$("#Buttons").append(showBtn);
	}

	$(".showBtn").on("click", function(){
		$(".display").empty();

		var thisGame = $(this).data("name");
		var giphyURL = "http://api.giphy.com/v1/gifs/search?q=video+game+" + thisGame + "&limit=10&api_key=9VUK2ivBfoOQCW5790fXXlS490HYTGUs";
		$.ajax({url: giphyURL, method: "GET"}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				if(thisRating == ""){
					thisRating = "unrated";
				}
				var rating = $("<h5>").html("Rated: "+thisRating).addClass("ratingStyle");
				stillGif= $("<img>").attr("data-animated", animatedGif).attr("data-paused", pausedGif).attr("src", pausedGif).addClass("playOnHover");
				var fullGifDisplay = $("<button>").append(rating, stillGif);
				$(".display").append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on("mouseover",".playOnHover", function(){
 	   	$(this).attr("src", $(this).data("animated"));
 });
 $(document).on("mouseleave",".playOnHover", function(){
 	   	$(this).attr("src", $(this).data("paused"));
 });

$("#addShow").on("click", function(){
	var newGame = $("#newInput").val().trim();
	gameTitle.push(newGame);
	createButtons();
	return false;
});

createButtons();