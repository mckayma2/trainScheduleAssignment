// A $( document ).ready() block.
//=================================================================
$( document ).ready(function() {
    //console.log( "ready!" ); // Document ready test
	
 // Initialize Firebase
//=================================================================
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
//=================================================================
	
	database.ref('trainSchedule/index' + indexNumber).push({
   
 	   Train_Name: trainName,
	    Destination: destination,
	    Train_Time: trainTime,
 	   Frequency: frequency,
	
 	});
	
// retreival of data from Firebase
//=================================================================

	database.ref('trainSchedule/index' + indexNumber).on('child_added', function(data){
	
	
	console.log(data.val().Train_Time.split(':')[0]);
		console.log(moment().format('H'));
	
	//convert current time to minutes 
	//================================
	timeinMin= parseInt((moment().format('H') * 60 )) + parseInt((moment().format('mm')));
	
	// convert time entered to minutes
	//================================
	timeinMinTrain = parseInt((data.val().Train_Time.split(':')[0] * 60)) + parseInt((data.val().Train_Time.split(':')[1]));
	console.log(timeinMin);
	console.log(timeinMinTrain);
		if(timeinMin >= timeinMinTrain){
			for(var e=timeinMinTrain; e<=timeinMin; e+= data.val().Frequency){
				console.log("E" + e + "Time: " +timeinMin);
				if((timeinMin - e)<60){ 
				minutesAway = (((timeinMin - e ) - data.val().Frequency)*-1);
				}
				if((timeinMin - e)>=60){ 
				console.log("2nd if E" + e + "Time: " +timeinMin);
				minutesAway = ((((timeinMin - e)% 60) - data.val().Frequency)*-1);
				}
			}
				
		}
		
		if(timeinMin < timeinMinTrain){
			
				
				if((timeinMinTrain - timeinMin )<60){ 
				console.log("E" + e + "Time: " +timeinMin);
				minutesAway = (timeinMinTrain - timeinMin);
				
				}
				if((timeinMinTrain - timeinMin)>=60){ 
				console.log("2nd if E" + e + "Time: " +timeinMin);
				var calcInt = parseInt((timeinMinTrain - timeinMin)/60);
				var calcRemainder = ((timeinMinTrain - timeinMin) % 60);
				console.log(calcInt);
				console.log(calcRemainder);
				
				//minutesAway = (calcInt + ":" + calcRemainder);
				minutesAway = (timeinMinTrain - timeinMin);
				}
			
		}
	// Minutes away and next arrival calculation
	//=================================================================
			
			//for anytime before current time
			//=================================
			
			if(timeinMin > timeinMinTrain){
				
				if(minutesAway < 1){
				minutesAway = (parseInt(minutesAway) + parseInt(data.val().Frequency));
				}
				nextArrival= timeinMin + minutesAway;
				console.log('nextArrival: ' + nextArrival);
				var temp = parseInt(nextArrival / 60);
				var temp2 = nextArrival % 60;
				console.log ("temp" + temp);
				console.log ("temp2" + temp2);
				nextArrival = moment().hour(temp).minutes(temp2).format("h:mm");
				console.log('nextArrival' + nextArrival);
			}
			//for future time after current time
			//===================================
			
			if(timeinMin < timeinMinTrain){
				if(minutesAway < 1){
				minutesAway = (parseInt(minutesAway) + parseInt(data.val().Frequency));
				}
				nextArrival= timeinMinTrain;
				console.log('if 2 nextArrival: ' + nextArrival);
				console.log();
				var temp = parseInt(nextArrival / 60);
				var temp2 = nextArrival % 60;
				nextArrival = moment().hour(temp).minutes(temp2).format("h:mm");
				console.log('nextArrival' + nextArrival);
				
			}
	
	// push data to table	
	//=================================================================
	
	$("tbody").append('<tr><th scope="row">' + indexNumber + '</th><td>' + data.val().Train_Name + '</td><td>' + data.val().Destination + '</td><td>' + data.val().Frequency + '</td><td>' + nextArrival + '</td><td>' + minutesAway + '</td></tr>')
	
	});
	// clear input parameters
	//=================================================================
	
	$("#trainName").val("");
	$("#destination").val("");
	$("#trainTime").val("");
	$("#frequency").val("");
	
  	//set index in firebase
	//=================================================================
	
	database.ref('index').set({
   	   number: indexNumber
	  
	});
	
	//get index from firebase and increase index
	//=================================================================

	database.ref('index').on('value', function(snapshot){
	console.log("this "+ snapshot.val().number);

	indexNumber=snapshot.val().number;
	indexNumber++;
 	});
	
});

	

// code to convert the index and I to string and back to int (NOT USED)
//=====================================================================
	
//	 strkey = index.toString();
//	 strindex = 'data.val().index';
//	 checkindex = eval(strindex + strkey);
		

});  //closing



