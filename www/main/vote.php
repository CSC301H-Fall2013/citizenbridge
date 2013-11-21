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
		if ($vote) {
			//$query = "INSERT INTO votebills VALUES :id, asdjhkad, 0, 1234567890, 0";
			$query = "UPDATE vbills SET upvote=upvote+1 WHERE bid=:id";
		} else {
			$query = "UPDATE vbills SET downvote=downvote+1 WHERE bid=:id";
		}

		$query_params = array( 
		':id' => $id
		); 
		try 
		{ 
		// Execute the query
			$stmt = $db->prepare($query); 
			$result = $stmt->execute($query_params);
			echo '1';
		} 
		catch(PDOException $ex) 
		{ 
		echo '-1';
		} 
	}
	
?>
