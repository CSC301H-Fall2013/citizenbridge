<?php
	require("accountDatabase/common.php");
	
	if(empty($_SESSION['user'])) 
	{ 
		echo '-1';
	} else 
	{
		//If logged in
		$id=$_GET["id"];
		$queryupvote = "SELECT upvote FROM vbills WHERE bid=:id";
		$querydownvote = "SELECT downvote FROM vbills WHERE bid=:id";
		$query_params = array( 
		':id' => $id
		); 
		try 
		{ 
		// Execute the query
		$stmt = $db->prepare($queryupvote); 
		$stmt2 = $db->prepare($querydownvote);
		$result = $stmt->execute($query_params);
		$result2 = $stmt2->execute($query_params);
		
		$sresult = "";
		$sresult = "1234.143";
		echo '1';
		} 
		catch(PDOException $ex) 
		{ 
		echo '-1';
		} 
	}
	
?>
