<?php 

require("accountDatabase/common.php");

// echo var_dump($_POST) . "<br>";
// echo var_dump($_SESSION) . "<br>";


if (empty($_POST) || empty($_SESSION)) 
{
	echo "Please log in before following a bill";
};


$billToFollow = $_POST['billToFollow'];
$userEmail = $_SESSION['user']['email'];

header("refresh:2;url=" . "http://" .  $_SERVER['SERVER_NAME'] . "/citizenbridge/www/main/bills.php?bill=" . $billToFollow);

// echo $billToFollow . " " .  $userEmail . "<br>";

//check if user+billid is already in the DB. 
$sth = $db->prepare('SELECT bid FROM fbills WHERE bid = :bid AND email = :email');
$result = $sth->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
if (! $result)
{
	echo "Database access error";
	die;
}

$fetchResult = $sth->fetch();

// check to see if you want to unfollow
if (isset($_POST['unfollow']))
{
	// if true (I.e., if the bill-email pair is in the database) then remove it from the db
	if($fetchResult)
	{
		echo "You no longer follow the bill";
		//Remove bid and date into db.
		$removeStatment = $db->prepare('DELETE FROM fbills WHERE bid = :bid AND email = :email');
		$result = $removeStatment->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
	}
}

// if you want to follow
else
{
	//if false,  (I.e, if the bill is not present in our database) then insert the new bill into datbase.
	if($fetchResult == false)
	{
		echo "You're now following the bill";
		//Insert bid and date into db.
		$insertStatment = $db->prepare('INSERT INTO fbills (bid, email) VALUES (:bid, :email)');
		$result = $insertStatment->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
	}
}




?>