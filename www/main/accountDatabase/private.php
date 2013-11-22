

<div class='span-2' id="main" >
</div>
<div class='span-5'>
	<div class='wet-boew-tabbedinterface'> 
		<ul class='tabs'>
			<li><a href='#account'>My Profile</a></li>
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
