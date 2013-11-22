<?php 

require("accountDatabase/common.php");



if (empty($_SESSION))
{
	echo '-1';
} else {

	$billToFollow=$_GET["id"];
	$type=$_GET["f"];
	$userEmail = $_SESSION['user']['email'];

	//header("refresh:2;url=" . "http://" .  $_SERVER['SERVER_NAME'] . "/citizenbridge/www/main/bills.php?bill=" . $billToFollow);

	//check if user+billid is already in the DB. 
	try {
		$sth = $db->prepare('SELECT bid FROM fbills WHERE bid = :bid AND email = :email');
		$result = $sth->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
		
		if (! $result)
		{
			echo '-1';
		} else {

			$fetchResult = $sth->fetch();

			// check to see if you want to unfollow
			if ($type=='0')
			{
				// if true (I.e., if the bill-email pair is in the database) then remove it from the db
				if($fetchResult)
				{
					//Remove bid and date into db.
					$removeStatment = $db->prepare('DELETE FROM fbills WHERE bid = :bid AND email = :email');
					$result = $removeStatment->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
					echo '1';
				}
			}

			// if you want to follow
			else
			{
				//if false,  (I.e, if the bill is not present in our database) then insert the new bill into database.
				if($fetchResult == false)
				{
					//Follow
					
					//Insert bid and date into db.
					
					$insertStatment = $db->prepare('INSERT INTO fbills (bid, email) VALUES (:bid, :email)');
					$result = $insertStatment->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
					echo '1';
				}
			}
		}
	} catch (PDOException $ex) {
		echo '-1';
	}
}

?>