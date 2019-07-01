
// customer id = 	MTcyMDMwMjJ8MTU2MTU4ODA1Ny40Mg
// seat geek api = "e4c666478155378c49daac3546b974565be0c50f5528a811bf9cd1f9414a6c15"

var showImage;
var showArray = []; 

function displayEvent() {
   
   var eventType = $(this).attr("event-data"); 
   var place = $(this).attr("place-data")
   var queryURL = "https://api.seatgeek.com/2/events?q=" + eventType + "&taxonomies" + place + "&city"
   var clientID = "client_id=MTcyMDMwMjJ8MTU2MTU4ODA1Ny40Mg";
   var clientSecret = "&client_secret=e4c666478155378c49daac3546b974565be0c50f5528a811bf9cd1f9414a6c15";

   var newEvent = $("#event-search").val().trim()
   var userLocation = $("#city-search").val().trim()

   queryURL= queryURL + clientID + clientSecret;
   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(response){

      var events = response.events[0].short_title;
   var getIndex = showArray.indexOf(events);
   var venue = response.events[0].venue.name;
   var street = response.events[0].venue.address;
   var city = response.events[0].venue.city;
   var address = street + " " + city;

   if (response.events.length === 0) {
      alert("Event not found")
   }

   if (getIndex === -1) {
      showArray.push(events);
   }

   if (response.events[0].performers[0].image !== null) {
      showImage = response.events[0].performers[0].image;

   } else if (!response.events[0].performers[0].image) {
      for (var i = 0; i < backUpImage.length; i++) {
         if (backUpImage[i].name == event) {
            showImage = backUpImage[j].image;
            showImage = "images/not-found-png-3.png";
         }

      }


      
   }

   for (i = 0; i < events.length; i++) {
    
      var eventType = response.events[i].type; 
      var eventName = response.events[i].short_title; 
      var eventAddress = response.events[i].venue.city + response.events[i].venue.state + response.events[i].venue.postal_code; 
      var eventTime = response.events[i].datetime_local; 
      var eventLink = response.events[i].url; 

      var newImage = $("<img>").attr("src", showImage);
      var imageDiv = $("<div>");
      imageDiv.html(newImage); 
   
      var newHeadline = $("<h2>"); 
      newHeadline.html(eventName); 
      var newType = $("<p>"); 
      newType.html(eventType)
      var newAddress = $("<p>"); 
    newAddress.html(eventAddress); 
      var newTime = $("<p>"); 
      newTime.html(eventTime); 
      var newLink = $("<p>"); 
      newLink.html(eventLink); 
   
      $("#event-section").append(newImage); 
      $("#event-section").append(eventName); 
      $("#event-section").append(eventType); 
      $("#event-section").append(eventAddress); 
      $("#event-section").append(eventTime);
      $("#event-section").append(eventLink); 
      console.log(response); 
   }


 
   });

   

}

   $("#search").on("click", function () {
      event.preventDefault();
      
      displayEvent(); 
      
   }); 
