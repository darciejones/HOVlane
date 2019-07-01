// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyACRMdNiqiuNeSUPhj84SnFo9JgqLaMCPs",
  authDomain: "project-1-hovlane.firebaseapp.com",
  databaseURL: "https://project-1-hovlane.firebaseio.com",
  projectId: "project-1-hovlane",
  storageBucket: "",
  messagingSenderId: "482262429055",
  appId: "1:482262429055:web:ed991ec279cb78a3"
};


firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var weather; 

//Add route button
$("#add-route-btn").on("click", function (event) {
  event.preventDefault();

  // Admin inputs shuttle information (Pick up location, destination and time of shuttle arrival)
  var pickUp = $("#pickUp-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "hh:mm").format("hh:mm");
  var weather = $("#destination-input").val().trim(); 

  // Variable to hold temporary data for Route
  var newRoute = {
    pickup: pickUp,
    destination: destination,
    time: time,
    passengers: 0
  };

  // Uploads route info to database
  database.ref("/destinations").push(newRoute);

  // Logs everything to console
  console.log(newRoute.pickUp);
  console.log(newRoute.destination);
  console.log(newRoute.time);

  alert("Route successfully added");

  // Clears all of the text-boxes
  $("#pickUp-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
});


// Weather API


function displayWeather() {

  var place = $(this).attr("data-name"); 
  
  var APIkey = "58d010e637ddaa11addf4a7eada12dba";


  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + place + APIkey; 

  
  $.ajax({
      url: queryURL,
      method: "GET"
  })
      .then(function (response) {
          console.log(response);
        
          var city = response.city; 
          var userCity = $("<p>").text("Location: " + city ); 
          var weather = reponse.weather[0].description; 
          var condition = $("<p>").text("Current Weather: " + weather); 
          var temp = response.main.temp; 
          var tempOutside = $("<p>").text("Current Temperature: " + temp)
          $("#weather-section").append(userCity); 
          $("#weather-section").append(condition); 
          $("#weather-section").append(tempOutside); 
        
          
      })
}

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var pickUp = childSnapshot.val().pickup;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var key = childSnapshot.key;
  var passengers = childSnapshot.val().passengers
  console.log(key)

  var newName = childSnapshot.val().name;
  var passengers = childSnapshot.val().passengers;



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(pickUp),
    $("<td>").text(destination),
    $("<td>").text(time),
    $("<td>").text(passengers),
    $("<td>").append("<button class='btn btn-primary jpKeys' id=" + key + " data-key=" + key + " data-pass=" + passengers + ">Add</button>")


  );



  // Append the new row to the table
  $("#route-table > tbody").append(newRow);
});

database.ref("/destinations").on("child_changed", function (childSnapshot) {
  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var pickUp = childSnapshot.val().pickup;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var key = childSnapshot.key;
  var passengers = childSnapshot.val().passengers
  console.log(key)

  var newName = childSnapshot.val().name;
  var passengers = childSnapshot.val().passengers;

  $('#'+key).attr("data-pass", passengers);


});

$("#route-table  > tbody ").on("click", ".jpKeys", function (event) {
  event.preventDefault();
  var key = $(this).attr("data-key");
  var passengers2 = $(this).attr("data-pass");

  var a = parseInt(passengers2);
  console.log(passengers2);

  console.log(typeof (a));

  console.log(key);

  var newCount = a++;

  database.ref("destinations/"+key).update({
    passengers: a
  });

})

