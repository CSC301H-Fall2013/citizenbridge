

<div class='span-2' id="main" >
</div>
<div class='span-5'>
	<div class='wet-boew-tabbedinterface'> 
		<ul class='tabs'>
			<li><a href='#account'>My Profile</a></li>
			<li><a href='#fbills'>Followed Bills</a></li>
		</ul>
	<div class='tabs-panel'>
		<div id='account'>
			First Name: <?php echo htmlentities($_SESSION['user']['first'], ENT_QUOTES, 'UTF-8'); ?> 
			<br /><br />
			Last Name : <?php echo htmlentities($_SESSION['user']['last'], ENT_QUOTES, 'UTF-8'); ?>
			<br /><br />
			Email: <?php echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8'); ?>
			<?php $postalcode = htmlentities($_SESSION['user']['postalcode'], ENT_QUOTES, 'UTF-8'); ?>
			<br /><br />
			Postal Code: <?php echo htmlentities($_SESSION['user']['postalcode'], ENT_QUOTES, 'UTF-8'); ?>
		</div>
		<div id='fbills'>
	
		</div>
</div> </div>

<?php
// Access Open North Represent API to find the MP of the area specified by the user's postal code.
$fRep = "dRep.txt";

$json = file_get_contents("http://represent.opennorth.ca/postcodes/" . $postalcode);
$json = json_decode($json);
// Access Parliament Data's API to match representative found by Open North Represent API
$jsonrep = file_get_contents($fRep);
$jsonrep = json_decode($jsonrep);
?>
<script type="text/javascript">
		//get the json data by encoding the php global variable then echoing it
		json = <?php echo json_encode($json)?>;
		jsonrep = <?php echo json_encode($jsonrep)?>;
		// Display the representative of user's area
        loadMyRep(json, jsonrep);
</script>

<?php
	$lBill = "http://api.parliamentdata.ca/bills/";
	$fBill = "dBill.txt";
	$lRep = "http://api.parliamentdata.ca/representatives/";
	$fRep = "dRep.txt";


	$dbill = file_get_contents($fBill);
	$dbill = json_decode($dbill);
	$drep = file_get_contents($fRep);
	$drep = json_decode($drep);
	$email = $_SESSION['user']['email'];
	if (!empty($_SESSION))
	{
		$query = "SELECT bid FROM fbills WHERE email=:email";
		$query_params = array( 
			':email' => $email
		);

		try 
		{ 
			// Execute the query
			$stmt = $db->prepare($query); 
			$stmt->execute($query_params);
			
			$ids = $stmt->fetchAll();
			//echo json_encode($ids);
			
		} 
		catch(PDOException $ex) 
		{ 
			echo '<script type="text/javascript">alert("Database error. Please try again later.");</script>';
			echo '<script type="text/javascript">location.reload(true);</script>';
		} 
	}
?>
			
<script type="text/javascript">
	dbill = <?php echo json_encode($dbill)?>;
	drep = <?php echo json_encode($drep)?>;
	ids = <?php echo json_encode($ids)?>;
	loadMyBill(dbill, drep, ids);
	//loadBillList(dbill, drep);
	
</script>
