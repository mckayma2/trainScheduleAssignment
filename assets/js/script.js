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
	function func1() {
 	database.ref('trainSchedule/').remove();
 	database.ref('index').set({number: 0});
	}
	window.onload=func1();
	
	function time1() {
 	
	$("#time").html("<br>Time Now: " + moment().format('LTS'));
	
	}


	window.onload=setInterval(time1, 1000);
	
	
$(".btnadd").click(function() {
	
	trainName= $("#trainName").val();
	destination= $("#destination").val();
	trainTime= $("#trainTime").val();
	frequency = $("#frequency").val();
	//console.log(trainName + " " + destination + "  " + trainTime +  "  " + frequency);
	
	database.ref('trainSchedule/index' + indexNumber).push({
   
 	   Train_Name: trainName,
	    Destination: destination,
	    Train_Time: trainTime,
 	   Frequency: frequency,
	
 	});
	
	database.ref('trainSchedule/index' + indexNumber).on('child_added', function(data){
	
	$("tbody").append('<tr><th scope="row">' + indexNumber + '</th><td>' + data.val().Train_Name + '</td><td>' + data.val().Destination + '</td><td>' + data.val().Frequency + '</td><td>#</td></tr>')
	console.log(data.val().Train_Time.split(':')[0]);
		console.log(moment().format('H'));

	if(moment().format('H') >= data.val().Train_Time.split(':')[0]){
	hour= moment().format('H')- data.val().Train_Time.split(':')[0];
	}
	else	{
	hour= data.val().Train_Time.split(':')[0] - moment().format('H');
	}
	console.log(hour);
	if(moment().format('mm') >= data.val().Train_Time.split(':')[1]){
	minute= moment().format('mm')- data.val().Train_Time.split(':')[1];
	}
	else	{
	minute= data.val().Train_Time.split(':')[1] - moment().format('mm');
	}
	console.log(minute);
	
	});

	$("#trainName").val("");
	$("#destination").val("");
	$("#trainTime").val("");
	$("#frequency").val("");
	
  		
	database.ref('index').set({
   	   number: indexNumber
	  
	});
	
	database.ref('index').on('value', function(snapshot){
	console.log("this "+ snapshot.val().number);

	indexNumber=snapshot.val().number;
	indexNumber++;
 	});
	
});

	

// code to convert the index and I to string and back
	
//	 strkey = index.toString();
//	 strindex = 'data.val().index';
//	 checkindex = eval(strindex + strkey);
		

});  //closing



