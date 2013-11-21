<?php
	require("accountDatabase/common.php");
	
	if(empty($_SESSION['user'])) 
	{ 
		echo '-1';
	} else 
	{
		//If logged in
		$id=$_GET["id"];
		$vote=$_GET["vote"];
		
		$query1 = "INSERT INTO votebills(bid, vdate, valid, email, vote) VALUES (:bid, :time, 1, :email,:v)";
		//$query3 = "SELECT vote FROM votebills WHERE bid=5138145";
		$query = "UPDATE votebills SET valid=0 WHERE bid=:bid AND email=:email AND valid=1";

		$query_params1 = array( 
		':bid' => $id,
		':email' => $_SESSION['user']['email'], // NOTE:Gets the email, not the users ID. 
		':v' => $vote,
		':time' => time(), //in ISO format cause I'm lazy like that. And it's easier.
		); 

		$query_params = array( 
		':bid' => $id,
		':email' => $_SESSION['user']['email'], // NOTE:Gets the email, not the users ID. 
		); 
		try 
		{ 
		// Execute the query
		$stmt = $db->prepare($query); 
		$result = $stmt->execute($query_params);

		$stmt1 = $db->prepare($query1); 
		$result1 = $stmt1->execute($query_params1);
		


		} 
		catch(PDOException $ex) 
		{ 
		echo $ex->getMessage();
		} 
	}
	
?>
