$(document).ready(function(){

$("#search-form").on('submit', function(event){
	event.preventDefault();
	var location = $("#location").val();
	getStores(location);
});

function getStores(location){
	$.ajax({
		url: "http://api.yelp.com/v2/search?term=coffee&limit=10&oauth_token=2VRHs5xCwuxFMOt75QZcfGA40NMe4e9o&oauth_consumer_key=siqb9GMY4J8dtVU0haVjOA&location=" + location,
		dataType: "jsonp",
		method: "GET",
		success: function(data){
			console.log(data)
		}
	});
}


});