var config = {
    apiKey: "AIzaSyCY3675xEPh_VRtkDyRY_jq1gc1yRIRSmc",
    authDomain: "moonlagoon-98dd1.firebaseapp.com",
    databaseURL: "https://moonlagoon-98dd1.firebaseio.com",
    projectId: "moonlagoon-98dd1",
    storageBucket: "moonlagoon-98dd1.appspot.com",
    messagingSenderId: "368867838097"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var nameOfTrain = "";
var destinationOfTrain = "";
var timeOfTrain = "";
var minOfNextArrival = "";
//-----------------------------------------
$("#addAfriend").on("click", function(event){
  event.preventDefault(); 

  nameOfTrain = $("#train-name-input").val().trim();
  destinationOfTrain = $("#destination-input").val().trim();
  timeOfTrain = $("#train-time-input").val().trim();
  minOfNextArrival = $("#minutes-between-trains").val().trim();
  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#train-time-input").val("");
  $("#minutes-between-trains").val("");

  database.ref().push({
    nameOfTrain: nameOfTrain,
    destinationOfTrain: destinationOfTrain,
    timeOfTrain: timeOfTrain,
    minOfNextArrival: minOfNextArrival
});

});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  nameOfTrain = childSnapshot.val().trainname;
  destinationOfTrain = childSnapshot.val().destination
  timeOfTrain = childSnapshot.val().firsttime;
  minOfNextArrival = childSnapshot.val().frequency;

  var firsttimeMoment = moment(firsttime, "HH:mm");

  var currenttime = moment();

  var minuteArrival = currenttime.diff(firsttimeMoment, 'minutes');
    var minuteLast = minuteArrival % frequency;
    var awayTrain = frequency - minuteLast;

    var nextArrival = currenttime.add(awayTrain, 'minutes');
    var arrivaltime = nextArrival.format("HH:mm");
    
    $("#AddTrain").append("<tr><td>" + trainname + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivaltime + "</td><td>" + awayTrain + "</td>");
