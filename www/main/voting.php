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
		
		//Only 1 valid vote at a time; set the rest to invalid
		$query = "UPDATE votebills SET valid=0 WHERE bid=:bid AND email=:email AND valid=1";
		
		//Insert a new valid vote
		$query1 = "INSERT INTO votebills(bid, vdate, valid, email, vote) VALUES (:bid, :time, 1, :email,:v)";
		
		
		$query_params = array( 
		':bid' => $id,
		':email' => $_SESSION['user']['email'] // NOTE:Gets the email, not the users ID. 
		); 
		
		$query_params1 = array( 
		':bid' => $id,
		':email' => $_SESSION['user']['email'], // NOTE:Gets the email, not the users ID. 
		':v' => $vote,
		':time' => time()
		); 

		
		try 
		{ 
		// Execute the query
		$stmt = $db->prepare($query); 
		$result = $stmt->execute($query_params);

		$stmt1 = $db->prepare($query1); 
		$result1 = $stmt1->execute($query_params1);
		
		echo '1';
		
		} 
		catch(PDOException $ex) 
		{ 
			echo '-1';
		} 
	}
	
?>
