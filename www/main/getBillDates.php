<?php 
error_reporting(E_ALL);

    // First we execute our common code to connection to the database and start the session 
   require("accountDatabase/common.php"); 
?> 


<?php


//billsdown.txt
//http://api.parliamentdata.ca/bills/
$json = file_get_contents("billsdown.txt");
$json_decode = json_decode($json, true);

//var_dump($json);

echo "hello world<br>";


//var_dump($json_decode['results']['0']);

//2013-06-17T19:38:38



$query = "
		  SELECT bid, updatedate 
		  FROM vbills 
		  WHERE bid = :BID
		  ";

foreach ($json_decode['results'] as $js) 
{
	//echo $js['id'] . " " . $js['last_updated'] . "<br>";

	//do a query on id
	$query_params = array( 
		':BID' => $js['id'] 
	); 

	try 
	{ 
		$stmt = $db->prepare($query); 
		$result = $stmt->execute($query_params); 

		$count = $result->rowCount();
		echo $js['id'] . $count . "<br>";


	//if exists in database 

		//compare update status 

			//if downloaded one is different, update 

	//else if not exist in database, insert id, updatedate, 0, 0 

	}
	catch(PDOException $ex) 
	{ 	
		die("Failed to run query: " . $ex->getMessage()); 
	}


}



?>
