<?php


$ctx = stream_context_create(array( 
    'http' => array( 
        'timeout' => 7   //time out is now set to 7 seconds. 
        ))); 

//Get data about all reps. This is used by the javascript below. 
$php_AllRepList = json_decode(file_get_contents("http://api.parliamentdata.ca/representatives/", 0, $ctx));
$php_AllBillList = json_decode(file_get_contents("http://api.parliamentdata.ca/bills/", 0, $ctx));


$php_singleRep = json_decode(file_get_contents("http://api.parliamentdata.ca/representatives/78554/all", 0, $ctx));


		
//get data about a specific rep 
// 		$json = file_get_contents("http://api.parliamentdata.ca/representatives/" . $rep . "/all");
// 		$json = json_decode($json);

?>

<!DOCTYPE html>
<html>
	<head>
		<title> citizenbridge Auto Test Page</title>
		<meta charset="UFT-8">
		<script src="js/jquery-1.10.2.js"></script>
		<link type="text/css" rel="stylesheet" href="autotest.css"/>

		
		<!-- Pie chart business -->
		<script src="frameworks/html5charts/Chart.js"></script>
		<meta name = "viewport" content = "initial-scale = 1, user-scalable = no">
		<style>
			canvas{
			}
		</style>
		
	</head>
	<body>
	
		<!-- Pie chart business -->
		<!-- TODO_minor put into a table if I have time -->
		<span style="color: #FF8000" > Not Implemented </span> <br>
		<span style="color: #80ff00" > Successes </span> <br>
		<span style="color: #ff0000"> Failures </span> <br>
		

		
		<canvas id="canvas" height="300" width="300"></canvas><br>
	
		
	
	
	
		<table border="1">
			<tr> <th> Test cases </th>   <th> Result</th>  <th> Test case data </th> </tr>
			<tr> <td> Example test </td> <td id="t1">In Progress </td> <td id="t1_data"></td> </tr> <!-- Copy & paste for additional test cases -->


			<tr> <td> <b> (User Story 1) Load Rep list </b> (this takes time) <br> 
				This test tests whether we are able to retrieve the<br> 
				list of representatives from the parliament website. <br>
				If this test fails than there is an issue accessing the api. <br>
				Note, the test auto-fails if the list is not retrieved within <b>7 seconds</b> <br>
				or if you are not connected to the internet during testing. <br>
				These test could fail if the API is overloaded or is unresponsive, <br>
				In this case sometimes some of the tests fail and others succeed </td> 
				<td id="t2"> In Progress </td>
				<td id="t2_data"></td> </tr>

			<tr> <td> <b> (U.S 6) Load Bills list </b> (this takes time) <br>
				This test tests whether we are able to retrieve the<br> 
				list of bills from the parliament website. <br>
				Details are the same as above </td> 
				<td id="t3"> In Progress </td>
				<td id="t3_data"></td> </tr>
				
				
			<tr> <td> <b> (2) Load induvidual Representative </b> <br> 
				Tests if we can aquire information about an induvidual<br>
				representative from the API. Details are the same as above.</td> 
				<td id="t4"> In Progress </td>
				<td id="t4_data"></td>
				
				</tr>

			<tr> <td> <b> (7) Load induvidual Bill </b> <br> 
				Tests if we can aquire information about an Bill<br>
				from the API. Details are the same as above.  </td> <td id="t5"> In Progress </td> </tr>

			<tr> <td> <b> (5) Test find rep near me </b> <br> 
					Given a user post code, this function should return the id of the<br>
					representatives that is the closes to my area  </td> <td id="t6"> In Progress </td> </tr>

			<tr> <td> <b> (3) List recent Rep activity </b> <br> 
					Aquire a list of his recent activity and present it on the site  </td> <td id="t7"> In Progress </td> </tr>

			<tr> <td> <b> (10) See Progress of a bill </b> <br> 
					Retrieve the status of an induviual bill  </td> <td id="t8"> In Progress </td> </tr>

			<tr> <td> <b> Test first index of Representatives </b> <br> 
					Download the rep list, and traverse the list from start to finish. </td> <td id="t9"> In Progress </td> </tr>

		</table>

	</body>
	
	<script type="text/javascript">

	//Load the downloaded list of reps into a global variable. Used by subsequent function calls
	var JS_AllRepList  = <?php echo json_encode($php_AllRepList)?>;
	var JS_AllBillList = <?php echo json_encode($php_AllBillList)?>;
	var JS_SingleRep   = <?php echo json_encode($php_singleRep)?>;
	
	
	</script>
	
	<script src="ParlData.js"> </script>
	<!-- LEO: NOTE, the autotest.js script should be placed at the very bottom of the document. All other script should go above it -->
	<script src="autotest.js"> </script>
</html>