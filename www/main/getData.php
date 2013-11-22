
<?php
	//Run this every once in a while on the server
	//5 minutes?
	
	
	//Downloads bills and reps data into the given text file
	$fBill = "dBill.txt";
	$dBill = file_get_contents("http://api.parliamentdata.ca/bills/");
	file_put_contents($fBill, $dBill);
	
	$fRep = "dRep.txt";
	$dRep = file_get_contents("http://api.parliamentdata.ca/representatives/");
	file_put_contents($fRep, $dRep);
?>