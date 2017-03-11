    // Initialize Firebase

      var config = {
    apiKey: "AIzaSyAk2Im3EvZU5aM7N5BINkDS_IuK8w0E-0o",
    authDomain: "this-is-a-test-c3574.firebaseapp.com",
    databaseURL: "https://this-is-a-test-c3574.firebaseio.com",
    storageBucket: "this-is-a-test-c3574.appspot.com",    
  };

    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      var train = $("#train-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTime = $("#firstTime-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      var firstTimeConverted=moment(firstTime, "hh:mm").subtract(1, "years"); 
      var currentTime=moment().format("hh:mm"); 
        console.log(currentTime); 
      var diffTime=moment().diff(moment(firstTimeConverted), "minutes"); 
      var timeRemainder= diffTime % frequency; 
      var minutesArrival=frequency - timeRemainder; 
      var next=moment().add(minutesArrival, "minutes");
      var nextTrain=moment(next).format("hh:mm a"); 

      // Code for the push
      dataRef.ref().push({

        train: train,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        arrival: minutesArrival, 
        nextTrain: nextTrain
      });
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

      // full list of items to the Trains well
        newTrain=$("<div>"); 
        newTrain.addClass("well")
        pTrain=$("<p>"); 
        pTrain.text(childSnapshot.val().train + " | Destination: " + childSnapshot.val().destination); 
        pFrequency=$("<p>")
        pFrequency.text("Frequency: every " + childSnapshot.val().frequency + " minutes"); 
        pArrival=$("<p>"); 
        pArrival.text("Arrives in: " + childSnapshot.val().arrival + " minutes"); 
        pNextTime=$("<p>"); 
        pNextTime.text("Next Train Time: " + childSnapshot.val().nextTrain); 
        newTrain.append(pTrain, pFrequency, pArrival, pNextTime); 

      $("#full-train-list").append(newTrain);  

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


