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




foreach ($json_decode['results'] as $js) 
{

	try 
	{ 
	

		//if exists in database
		$sth = $db->prepare('SELECT bid, updatedate FROM vbills WHERE bid = :bid');
		$result = $sth->execute(array(':bid' => $js['id']));
		if (! $result) 
		{
			echo "Database access error";
			die; 
		}
		
		$fetchResult = $sth->fetch();
		
		
		//if false,  (I.e, if the bill is not present in our database) then insert the new bill into datbase. 
		if($fetchResult == false)
		{
			//Insert bid and date into db. 
			$insertStatment = $db->prepare('INSERT INTO vbills (bid, updatedate) VALUES (:bid, :last_updated)');
			$result = $insertStatment->execute(array(':bid' => $js['id'], ':last_updated' => $js['last_updated']));
		}
	
		
		//compare update status 
		if ($fetchResult['updatedate'] != $js['last_updated'])
		{
			//if old db entry is out of date, update it with the new one
			$updateStatement = $db->prepare("UPDATE vbills SET updatedate=:updatedate WHERE bid=:bid");
			$result = $updateStatement->execute(array(':bid' => $js['id'], ':updatedate' => $js['last_updated']));
			
			//todo -- send email to all users who signed up for email notifications for this bill
			
		}

			//if downloaded one is different, update 

	//else if not exist in database, insert id, updatedate, 0, 0 

	}
	catch(PDOException $ex) 
	{ 	
		die("Failed to run query: " . $ex->getMessage()); 
	}

	echo "Database was updated <br>";
}



?>
