<?php
//Error evaluation for registration page and edit account page.
$q=$_GET["q"];
$err = "";

if (strlen($q) > 0)
  {
  if ($q == "first")
  {
	$err = "Please enter a first name.";
  }
  if ($q == "last")
  {	
	$err = "Please enter a last name.";
  }
  if ($q == "invalidemail")
  {	
	$err = "Please enter a valid e-mail address.";
  }
  if ($q == "usedemail")
  {	
	$err = "This e-mail address is in use. Please enter another.";
  }
  if ($q == "pass")
  {	
	$err = "Please enter a password name.";
  }
  if ($q == "postal")
  {	
	$err = "Please enter a valid postal code.";
  }
  if ($q == "login")
  {	
	$err = "Invalid username or password.";
  }
  
  }


$response=$err;

//output the response
echo $response;
?>