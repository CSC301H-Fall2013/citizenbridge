<?php 
/*
 * FILE DOCUMENTATION
 * This file needs to run on the server on a regular basis. E.g once every 10 minutes or 30 minutes. 
 * Every time the file is ran, it checks if bills have been updated, and if they were, then it notifies the users.  
 * 
 */




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
			
			//get all emails that are following the bill
			$userStatement = $db->prepare('SELECT email FROM fbills WHERE bid = :bid');
			$result = $userStatement->execute(array(':bid' => $js['id']));
			

			
			$billTitle = $js['title']['EN']; 
			echo $billTitle;
			
			$message = "bill:" . $billTitle . "\n has been updated  \n";
			
			echo "<br>" . $_SERVER['SERVER_NAME'];
			$message .= "http://" .  $_SERVER['SERVER_NAME'] . "/citizenbridge/www/main/bills.php?bill=" . $js['id'];
			
			
			
			$subject = "Citizen Bridge Notification";
			// to-do get email address
			$from = "noreply@citezenbridge.com";
			
			//for each email associated with a bill send a notification message
			$fetchResult = $userStatement->fetch();
			while ($fetchResult) 
			{
				$to = $fetchResult['email'];
				$headers = "From:" . $from;
				mail($to,$subject,$message,$headers);
				echo "mail sent";
				$fetchResult = $userStatement->fetch();
			}
			
		}

			//if downloaded one is different, update 

	//else if not exist in database, insert id, updatedate, 0, 0 

	}
	catch(PDOException $ex) 
	{ 	
		die("Failed to run query: " . $ex->getMessage()); 
	}
}



?>
