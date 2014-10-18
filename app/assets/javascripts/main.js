var Finder = {

	initialize: function(){

		// Add an event listener on the form to catch submission
		var self = this;
		$("form").on('submit', function(event){
			event.preventDefault();

			// Save the values of the fields we ask users to populate
			var city = $("#city").val();
			var state = $("select option:selected").val();
			var location = city + ", " + state;
			
			// Call the get stores function which calls to the Foursquare API
			self.getStores(location);

			// Reset the input field and select dropdown so users can search again
			$("#city").val("");
			$("select option:eq(0)").prop("selected", true);;
		});
	},

	getStores: function(location){
		self = this

		// Create the beggining of the new results html string
		var htmlString = "<p>Results: </p><ul>"
		$.ajax({
			url: "https://api.foursquare.com/v2/venues/search?near=" + location + "&limit=10&query=coffee&client_id=" + Secrets.fourSquareClientId + "&client_secret=" + Secrets.fourSquareClientSecret +"&v=20141010",
			dataType: "jsonp",
			method: "GET",
			success: function(data){

				// Loop through the result data to isolate every venue
				for (var i = 0; i < data.response.venues.length; i ++){

					// Save the venue so that we can access it later with less work
					var venue = data.response.venues[i]

					// Save all of the address (it comes as an array so we have to flatten it to make it readable)
					var address = venue.location.formattedAddress.reduce(function(a,b){
						a += " "
						return a.concat(b);
					});

					// Customize the html with the venue name and the address
					htmlString += "<li>" + venue.name + " - " + address + "</li>";
				}

				// Once the for loop has finished, close the html string and render it (calls the render method)
				htmlString += "</ul>";
				self.render(htmlString);
			}
		});
	},

	render: function(htmlString){

		// Call clear results to clear previous results
		this.clearResults();

		// Append the results div
		$(".results").append(htmlString)
	},

	clearResults: function(){

		// Empty the results div
		$(".results").html("");
	}
}

$(document).ready(function(){
	Finder.initialize();
});
