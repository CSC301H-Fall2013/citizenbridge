<?php 
require("accountDatabase/common.php");

// echo var_dump($_POST) . "<br>";
// echo var_dump($_SESSION) . "<br>";


if (empty($_POST) || empty($_SESSION)) 
{
	echo "Please log in before following a bill";
			//todo add re-direct to main page here.
};


$billToFollow = $_POST['billToFollow'];
$userEmail = $_SESSION['user']['email'];

echo $billToFollow . " " .  $userEmail . "<br>";

//check if user+billid is already in the DB. 
$sth = $db->prepare('SELECT bid FROM fbills WHERE bid = :bid AND email = :email');
$result = $sth->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
if (! $result)
{
	echo "Database access error";
	die;
}

$fetchResult = $sth->fetch();

//if false,  (I.e, if the bill is not present in our database) then insert the new bill into datbase.
if($fetchResult == false)
{
	echo "User will be inserted into the DB";
	//Insert bid and date into db.
 	$insertStatment = $db->prepare('INSERT INTO fbills (bid, email) VALUES (:bid, :email)');
 	$result = $insertStatment->execute(array(':bid' => $billToFollow, ':email' => $userEmail));
}
else 
{
	echo "User+bill already in the DB";
}



	//if so, write a message 
	
//else 

	//insert bill id & email into fbills. 

	//return the user back to where he came from
	




?>