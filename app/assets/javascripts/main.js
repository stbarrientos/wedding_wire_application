var Finder = {

	initialize: function(){
		var self = this;
		$("form").on('submit', function(event){
			event.preventDefault();
			var city = $("#city").val();
			var state = $("select option:selected").val();
			var location = city + ", " + state;
			console.log(location);
			self.getStores(location);
			$("#city").val("");
			$("select option:eq(0)").prop("selected", true);;
		});
	},

	getStores: function(location){
		self = this
		var htmlString = "<p>Results:</p><ul>"
		$.ajax({
			url: "https://api.foursquare.com/v2/venues/search?near=" + location + "&limit=10&query=coffee&client_id=" + Secrets.fourSquareClientId + "&client_secret=" + Secrets.fourSquareClientSecret +"&v=20141010",
			dataType: "jsonp",
			method: "GET",
			success: function(data){
				for (var i = 0; i < data.response.venues.length; i ++){
					var venue = data.response.venues[i]
					var address = venue.location.formattedAddress.reduce(function(a,b){
						a += " "
						return a.concat(b);
					});
					htmlString += "<li>" + venue.name + " - " + address + "</li>";
				}
				htmlString += "</ul>";
				self.render(htmlString);
			}
		});
	},

	render: function(htmlString){
		this.clearResults();
		$(".results").append(htmlString)
	},

	clearResults: function(){
		$(".results").html("");
	}
}

$(document).ready(function(){
	Finder.initialize();
});
