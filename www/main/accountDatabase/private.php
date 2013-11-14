Name: <?php echo htmlentities($_SESSION['user']['first'], ENT_QUOTES, 'UTF-8'); ?> <?php echo htmlentities($_SESSION['user']['last'], ENT_QUOTES, 'UTF-8'); ?><br />
Email: <?php echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8'); ?> <br />
<?php $postalcode = htmlentities($_SESSION['user']['postalcode'], ENT_QUOTES, 'UTF-8'); ?>
Postal Code: <?php echo $postalcode; ?> <br />

<div id="main" >
</div>

<?php
// Access Open North Represent API to find the MP of the area specified by the user's postal code.
$json = file_get_contents("http://represent.opennorth.ca/postcodes/" . $postalcode);
$json = json_decode($json);
// Access Parliament Data's API to match representative found by Open North Represent API
$jsonrep = file_get_contents("http://api.parliamentdata.ca/representatives/");
$jsonrep = json_decode($jsonrep);
?>
<script type="text/javascript">
		//get the json data by encoding the php global variable then echoing it
		json = <?php echo json_encode($json)?>;
		jsonrep = <?php echo json_encode($jsonrep)?>;
		// Display the representative of user's area
        loadMyRep(json, jsonrep);
</script>
