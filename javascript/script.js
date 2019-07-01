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

//Add New Passengers button
$("#add-newUser-btn").on("click", function (event) {
  event.preventDefault();



  // //  User input to add his name and number of passengers 

  // var newName = $("#name-input").val().trim();
  // var passengers = $("#passengers-input").val().trim();

  // var newUser = {
  //   name: newName,
  //   passengers: passengers
  // };

  // // Uploads New user's info to database
  // database.ref("/users").push(newUser);


  // // Logs everything to console
  // console.log(newUser.newName);
  // console.log(newUser.passengers);

  // alert("New Passengers successfully added");

  // // Clears all of the text-boxes
  // $("#name-input").val("");
  // $("#passengers-input").val("");
});

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


  // // Route Schedule Info
  // console.log(pickUp);
  // console.log(destination);
  // console.log(time);

  // // Passengers Info
  // console.log(newName);
  // console.log(passengers);

  //Displays Apply to Route Form
  // $("#addPass").on("click", function() {
  //   $(".myDisplay").toggle()
  // })

  // $("#route-table  > tbody ").empty()
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(pickUp),
    $("<td>").text(destination),
    $("<td>").text(time),
    $("<td>").text(passengers),
    $("<td>").append("<button class='btn btn-primary jpKeys' id=" + key + " data-key=" + key + " data-pass=" + passengers + ">Add</button>")

    // .attr("id", "addPass").on("click", function(){
    //   $(".myDisplay").toggle()
    // })

  );


  // newRow.attr("data-key", key );

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


  // // Route Schedule Info
  // console.log(pickUp);
  // console.log(destination);
  // console.log(time);

  // // Passengers Info
  // console.log(newName);
  // console.log(passengers);

  //Displays Apply to Route Form
  // $("#addPass").on("click", function() {
  //   $(".myDisplay").toggle()
  // })

  // $("#route-table  > tbody ").empty()

  // Create the new row
  // var newRow = $("<tr>").append(
  //   $("<td>").text(pickUp),
  //   $("<td>").text(destination),
  //   $("<td>").text(time),
  //   $("<td>").append("<button class='btn btn-primary jpKeys' data-key=" + key + " data-pass=" + passengers + ">Add</button>")

  //   // .attr("id", "addPass").on("click", function(){
  //   //   $(".myDisplay").toggle()
  //   // })


  // );

// function initialize() {
//     var input = document.getElementById('desIn');
//     new google.maps.places.Autocomplete(input);
// }

// google.maps.event.addDomListener(window, 'load', initialize);


// ******Register, sign-in & sign-out******
    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
        if (firebase.auth().currentUser) {
          // [START signout]
          firebase.auth().signOut();
          // [END signout]
        } else {
          var email = document.getElementById('email').value;
          var password = document.getElementById('password').value;
          if (email.length < 4) {
            alert('Please enter an email address.');
            return;
          }
          if (password.length < 4) {
            alert('Please enter a password.');
            return;
          }
          // Sign in with email and pass.
          // [START authwithemail]
          firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
            // [END_EXCLUDE]
          });
          // [END authwithemail]
        }
        document.getElementById('quickstart-sign-in').disabled = true;
      }
      /**
       * Handles the sign up button press.
       */
      function handleSignUp() {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START createwithemail]
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END createwithemail]
      }
      /**
       * Sends an email verification to the user.
       */
      function sendEmailVerification() {
        // [START sendemailverification]
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          // Email Verification sent!
          // [START_EXCLUDE]
          alert('Email Verification Sent!');
          // [END_EXCLUDE]
        });
        // [END sendemailverification]
      }
      function sendPasswordReset() {
        var email = document.getElementById('email').value;
        // [START sendpasswordemail]
        firebase.auth().sendPasswordResetEmail(email).then(function() {
          // Password Reset Email Sent!
          // [START_EXCLUDE]
          alert('Password Reset Email Sent!');
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode == 'auth/invalid-email') {
            alert(errorMessage);
          } else if (errorCode == 'auth/user-not-found') {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END sendpasswordemail];
      }
      /**
       * initApp handles setting up UI event listeners and registering Firebase auth listeners:
       *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
       *    out, and that is where we update the UI.
       */
      function initApp() {
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-verify-email').disabled = true;
          // [END_EXCLUDE]
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
            document.getElementById('quickstart-sign-in').textContent = 'Sign out';
            document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
            if (!emailVerified) {
              document.getElementById('quickstart-verify-email').disabled = false;
            }
            // [END_EXCLUDE]
          } else {
            // User is signed out.
            // [START_EXCLUDE]
            document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
            document.getElementById('quickstart-sign-in').textContent = 'Sign in';
            document.getElementById('quickstart-account-details').textContent = 'null';
            // [END_EXCLUDE]
          }
          // [START_EXCLUDE silent]
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authstatelistener]
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
        document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
        document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
        document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
      }
      window.onload = function() {
        initApp();
        }

       
