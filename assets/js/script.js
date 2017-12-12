// A $( document ).ready() block.
$( document ).ready(function() {
    //console.log( "ready!" ); // Document ready test
	
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBsqjsWufoByR79LHN1vrRCS27_J4dxk0M",
    authDomain: "train-scheduler-8e2d3.firebaseapp.com",
    databaseURL: "https://train-scheduler-8e2d3.firebaseio.com",
    projectId: "train-scheduler-8e2d3",
    storageBucket: "",
    messagingSenderId: "316913363679"
  };
  firebase.initializeApp(config);
// Variables

//=================================================================
var database = firebase.database();
var trainName;
var destination;
var frequency;
var nextArrival;
var minutesAway;
var trainTime;
var indexNumber=0;
var measure =true;
var strkey;
var strindex;
var checkindex; 
var hour;
var minute;
var timeinMin;
var timeinMinTrain;

// functions
//=================================================================
	//function on page load to clear database
	
	function func1() {
 	database.ref('trainSchedule/').remove();
 	database.ref('index').set({number: 0});
	}
	window.onload=func1();
	// function to place current timon page
	
	function time1() {
 	
	$("#time").html("<br>Time Now: " + moment().format('LTS'));
	
	}
	window.onload=setInterval(time1, 1000);

// button click 
//=================================================================
	
	
$(".btnadd").click(function() {
	
	trainName= $("#trainName").val();
	destination= $("#destination").val();
	trainTime= $("#trainTime").val();
	frequency = $("#frequency").val();
	//console.log(trainName + " " + destination + "  " + trainTime +  "  " + frequency);

//create db parameters using index key "indexNumber"
	
	database.ref('trainSchedule/index' + indexNumber).push({
   
 	   Train_Name: trainName,
	    Destination: destination,
	    Train_Time: trainTime,
 	   Frequency: frequency,
	
 	});
	
// retreival of data from Firebase

	database.ref('trainSchedule/index' + indexNumber).on('child_added', function(data){
	
	// push data to table	
	$("tbody").append('<tr><th scope="row">' + indexNumber + '</th><td>' + data.val().Train_Name + '</td><td>' + data.val().Destination + '</td><td>' + data.val().Frequency + '</td><td>#</td></tr>')
	console.log(data.val().Train_Time.split(':')[0]);
		console.log(moment().format('H'));
	
	//convert current time to minutes 
	timeinMin= parseInt((moment().format('H') * 60 )) + parseInt((moment().format('mm')));
	
	// convert time entered to minutes
	timeinMinTrain = parseInt((data.val().Train_Time.split(':')[0] * 60)) + parseInt((data.val().Train_Time.split(':')[1]));
	console.log(timeinMin);
	console.log(timeinMinTrain);
	
	});
	// clear input parameters
	
	$("#trainName").val("");
	$("#destination").val("");
	$("#trainTime").val("");
	$("#frequency").val("");
	
  	//set index in firebase
	
	database.ref('index').set({
   	   number: indexNumber
	  
	});
	
	//get index from firebase and increase index
	database.ref('index').on('value', function(snapshot){
	console.log("this "+ snapshot.val().number);

	indexNumber=snapshot.val().number;
	indexNumber++;
 	});
	
});

	

// code to convert the index and I to string and back to int (NOT USED)
	
//	 strkey = index.toString();
//	 strindex = 'data.val().index';
//	 checkindex = eval(strindex + strkey);
		

});  //closing



