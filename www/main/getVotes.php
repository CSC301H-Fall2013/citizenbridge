<?php
	require("accountDatabase/common.php");
	

		//If logged in
		$id=$_GET["id"];

		$queryup = "SELECT email FROM votebills";//WHERE bid=:id AND vote=1 AND valid=1";
		$querydown = "SELECT email FROM votebills WHERE bid=:id AND vote=0 AND valid=1";
		$query_params = array( 
		':id' => $id,
		); 

		try 
		{ 
		// Execute the query
		$stmt = $db->prepare($queryup); 
		$result = $stmt->fetch($query_params);
		$stmt2 = $db->prepare($querydown);
		$result2 = $stmt2->execute($query_params);

		//$l = $result->store_result();
		echo "$result";
		} 
		catch(PDOException $ex) 
		{ 
		echo $ex->getMessage();
		} 
	
	
?>
