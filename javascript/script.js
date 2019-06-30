
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

//Add route button
$("#add-route-btn").on("click", function (event) {
  event.preventDefault();

  // Admin inputs shuttle information (Pick up location, destination and time of shuttle arrival)
  var pickUp = $("#pickUp-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "hh:mm").format("hh:mm");


  // Variable to hold temporary data for Route
  var newRoute = {
    pickup: pickUp,
    destination: destination,
    time: time
  };

  // Uploads route info to database
  database.ref().push(newRoute);

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

//Add New Passengers button
$("#add-newUser-btn").on("click", function (event) {
  event.preventDefault();

  //  User input to add his name and number of passengers 

  var name = $("#name-input").val().trim();
  var passengers = $("#passengers-input").val().trim();

  var newUser = {
    name: name,
    passengers: passengers
  };

  // Uploads New user's info to database
  database.ref().push(newUser);


  // Logs everything to console
  console.log(newUser.name);
  console.log(newUser.passengers);

  alert("New Passengers successfully added");

  // Clears all of the text-boxes
  $("#name-input").val("");
  $("#passengers-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var pickUp = childSnapshot.val().pickup;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;

  var name = childSnapshot.val().name;
  var passengers = childSnapshot.val().passengers;


  // Route Schedule Info
  console.log(pickUp);
  console.log(destination);
  console.log(time);

  // Passengers Info
  console.log(name);
  console.log(passengers);

  //*************************************************************************************************
  //  THESE FORMULAS ARE FROM THE TRAIN SCHEDULER. WE HAVE TO MAKE OUR OWN!!!

  // var diffTime = moment().diff(moment(firstTrain, "hh:mm"));
  // var tRemainder = diffTime % frequency;
  // var minutesAway = moment(frequency - tRemainder, "minutes").format("m");
  // var arrivalTime = moment().add(minutesAway, "minutes").format("hh:mm");
  // console.log("minutesAway: ", minutesAway);
  // console.log("tRemainder: ", tRemainder);
  // console.log("freq: ", frequency);
  // console.log("diffTime: ", diffTime);

  //********************************************************************************************* */


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(pickUp),
    $("<td>").text(destination),
    $("<td>").text(time)
  );

  // Append the new row to the table
  $("#route-table > tbody").append(newRow);
});