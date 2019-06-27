
// customer id = 	MTcyMDMwMjJ8MTU2MTU4ODA1Ny40Mg
// seat geek api = "e4c666478155378c49daac3546b974565be0c50f5528a811bf9cd1f9414a6c15"

var queryURL = "https://api.seatgeek.com/2/events?client_id=MTcyMDMwMjJ8MTU2MTU4ODA1Ny40Mg&client_secret=e4c666478155378c49daac3546b974565be0c50f5528a811bf9cd1f9414a6c15";  


function newQuery() {
   
   
    

}


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    results = response.events; 
    console.log(response.events); 
    
 for (var i = 0; i < response.events.length; i++) {
    console.log(response.events[i].venue.postal_code);
    $("#events").text(response.events[i].venue.postal_code); 
 } 

  }); 