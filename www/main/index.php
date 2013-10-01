<!DOCTYPE html>
<html>
	<head>
		<title> Hello World Title</title>
		<meta charset="UFT-8">
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

	</head>
	<body>
		<h1> My first heading </h1>
		<p> My first paragraph. </p>

 				<?php
				$homepage = file_get_contents('http://api.parliamentdata.ca/representatives/');

				$file = 'RepresentativeDownload.txt';
				// Open the file to get existing content
				//$current = file_get_contents($file);
				// Append a new person to the file
				//$current .= "John Smith\n";
				// Write the contents back to the file
				file_put_contents($file, $homepage);
				echo $homepage;
				?> 

				<script type="text/javascript">

				alert(homepage);

				</script>


	</body>
</html>
