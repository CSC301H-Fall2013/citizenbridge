<?php 

	//TODO : Change failures from die() to appropriate error message

	// First we execute our common code to connection to the database and start the session 
    require("accountDatabase/common.php"); 						 
	// This if statement checks to determine whether the registration form has been submitted 
	// If it has, then the registration code is run, otherwise the form is displayed 
	if(!empty($_POST)) 
	{ 
		// Ensure that the user has entered a non-empty username 
		if(empty($_POST['first'])) 
		{ 
			// Note that die() is generally a terrible way of handling user errors 
			// like this.  It is much better to display the error with the form 
			// and allow the user to correct their mistake.  However, that is an 
			// exercise for you to implement yourself. 
			die("Please enter a first name."); 
		}
		if(empty($_POST['last'])) 
		{ 
			// Note that die() is generally a terrible way of handling user errors 
			// like this.  It is much better to display the error with the form 
			// and allow the user to correct their mistake.  However, that is an 
			// exercise for you to implement yourself. 
			die("Please enter a last name."); 
		} 
		 
		// Ensure that the user has entered a non-empty password 
		if(empty($_POST['password'])) 
		{ 
			die("Please enter a password."); 
		}
		if(empty($_POST['postalcode'])) 
		{ 
			die("Please enter a postal code."); 
		}
		
		//Used to check for valid postal code
		$country_code="CA";
		
		$zip_postal= $_POST['postalcode'];
		 
		$ZIPREG=array(
			//"US"=>"^\d{5}([\-]?\d{4})?$",
			//"UK"=>"^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$",
			//"DE"=>"\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b",
			"CA"=>"^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$",
			//"FR"=>"^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$",
			//"IT"=>"^(V-|I-)?[0-9]{5}$",
			//"AU"=>"^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$",
			//"NL"=>"^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$",
			//"ES"=>"^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$",
			//"DK"=>"^([D-d][K-k])?( |-)?[1-9]{1}[0-9]{3}$",
			//"SE"=>"^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$",
			//"BE"=>"^[1-9]{1}[0-9]{3}$"
		);
		 
		if ($ZIPREG[$country_code]) {
			if (!preg_match("/".$ZIPREG[$country_code]."/i",$zip_postal)){
				//Validation failed, provided zip/postal code is not valid.
				echo $_POST['postalcode'];
				die("Please enter a valid postal code."); 
			}
		}
		 
		// Make sure the user entered a valid E-Mail address 
		// filter_var is a useful PHP function for validating form input, see: 
		// http://us.php.net/manual/en/function.filter-var.php 
		// http://us.php.net/manual/en/filter.filters.php 
		if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
		{ 
			die("Invalid E-Mail Address"); 
		} 
		 
		 
		// Now we perform the same type of check for the email address, in order 
		// to ensure that it is unique. 
		$query = " 
			SELECT 
				1 
			FROM users 
			WHERE 
				email = :email 
		"; 
		 
		$query_params = array( 
			':email' => $_POST['email'] 
		); 
		 
		try 
		{ 
			$stmt = $db->prepare($query); 
			$result = $stmt->execute($query_params); 
		} 
		catch(PDOException $ex) 
		{ 
			die("Failed to run query: " . $ex->getMessage()); 
		} 
		 
		$row = $stmt->fetch(); 
		 
		if($row) 
		{ 
			die("This email address is already registered"); 
		} 

		
		// An INSERT query is used to add new rows to a database table. 
		// Again, we are using special tokens (technically called parameters) to 
		// protect against SQL injection attacks. 
		$query = " 
			INSERT INTO users ( 
				first, 
				last,
				password, 
				salt, 
				email,
				postalcode
			) VALUES ( 
				:first, 
				:last,
				:password, 
				:salt, 
				:email,
				:postalcode
			) 
		"; 
		 
		// A salt is randomly generated here to protect again brute force attacks 
		// and rainbow table attacks.  The following statement generates a hex 
		// representation of an 8 byte salt.  Representing this in hex provides 
		// no additional security, but makes it easier for humans to read. 
		// For more information: 
		// http://en.wikipedia.org/wiki/Salt_%28cryptography%29 
		// http://en.wikipedia.org/wiki/Brute-force_attack 
		// http://en.wikipedia.org/wiki/Rainbow_table 
		$salt = dechex(mt_rand(0, 2147483647)) . dechex(mt_rand(0, 2147483647)); 
		 
		// This hashes the password with the salt so that it can be stored securely 
		// in your database.  The output of this next statement is a 64 byte hex 
		// string representing the 32 byte sha256 hash of the password.  The original 
		// password cannot be recovered from the hash.  For more information: 
		// http://en.wikipedia.org/wiki/Cryptographic_hash_function 
		$password = hash('sha256', $_POST['password'] . $salt); 
		 
		// Next we hash the hash value 65536 more times.  The purpose of this is to 
		// protect against brute force attacks.  Now an attacker must compute the hash 65537 
		// times for each guess they make against a password, whereas if the password 
		// were hashed only once the attacker would have been able to make 65537 different  
		// guesses in the same amount of time instead of only one. 
		for($round = 0; $round < 65536; $round++) 
		{ 
			$password = hash('sha256', $password . $salt); 
		} 
		 
		 
		$zip_postal=preg_replace('/\s+/', '', $zip_postal); 
		// Here we prepare our tokens for insertion into the SQL query.  We do not 
		// store the original password; only the hashed version of it.  We do store 
		// the salt (in its plaintext form; this is not a security risk). 
		$query_params = array( 
			':first' => $_POST['first'],
			':last' => $_POST['last'], 			
			':password' => $password, 
			':salt' => $salt, 
			':email' => $_POST['email'],
			':postalcode' => $zip_postal

		); 
		 
		try 
		{ 
			// Execute the query to create the user 
			$stmt = $db->prepare($query); 
			$result = $stmt->execute($query_params); 
		} 
		catch(PDOException $ex) 
		{ 
			// Note: On a production website, you should not output $ex->getMessage(). 
			// It may provide an attacker with helpful information about your code.  
			die("Failed to run query: " . $ex->getMessage()); 
		} 
		 
		// This redirects the user back to the index page after they register 
		header("Location: index.php"); 
		 
		// Calling die or exit after performing a redirect using the header function 
		// is critical.  The rest of your PHP script will continue to execute and 
		// will be sent to the user if you do not die or exit. 
		die("Redirecting to index.php"); 
	} 
	 
?>  

<!DOCTYPE html>
<!--[if IE 7]><html lang="en" class="no-js ie7"><![endif]-->
<!--[if IE 8]><html lang="en" class="no-js ie8"><![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->

<head>
	<meta charset="utf-8" />
	<!-- Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
	wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html -->
	<title> Citizenbridge </title>

	<link rel="shortcut icon" href="../dist/theme-wet-boew/images/favicon.ico" />
	<meta name="description" content="Web Experience Toolkit (WET) working examples." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<!--[if lte IE 8]>
	<script src="../dist/js/jquery-ie.min.js"></script>
	<script src="../dist/js/polyfills/html5shiv-min.js"></script>
	<link rel="stylesheet" href="../dist/grids/css/util-ie-min.css" />
	<link rel="stylesheet" href="../dist/js/css/pe-ap-ie-min.css" />
	<link rel="stylesheet" href="../dist/theme-wet-boew/css/theme-ie-min.css" />
	<noscript><link rel="stylesheet" href="../dist/theme-wet-boew/css/theme-ns-ie-min.css" /></noscript>
	<![endif]-->
	<!--[if gt IE 8]><!-->

	<script src="../dist/js/jquery.min.js"></script>
	<link rel="stylesheet" href="../dist/grids/css/util-min.css" />
	<link rel="stylesheet" href="../dist/js/css/pe-ap-min.css" />
	<link rel="stylesheet" href="../dist/theme-wet-boew/css/theme-min.css" />
	<noscript><link rel="stylesheet" href="../dist/theme-wet-boew/css/theme-ns-min.css" /></noscript>
	
	<!--<![endif]-->
	<!-- CustomCSSStart -->
	<!-- ATHA__Style_sheet  -->
	
	<style>
	#components td {vertical-align: middle;}
	</style>
	<!-- CustomCSSEnd -->
</head>

<!-- 
		888888  dP"Yb  88""Yb   88b 88    db    Yb    dP 88  dP""b8    db    888888 88  dP"Yb  88b 88 
		  88   dP   Yb 88__dP   88Yb88   dPYb    Yb  dP  88 dP   `"   dPYb     88   88 dP   Yb 88Yb88 
		  88   Yb   dP 88"""    88 Y88  dP__Yb    YbdP   88 Yb  "88  dP__Yb    88   88 Yb   dP 88 Y88 
		  88    YbodP  88       88  Y8 dP""""Yb    YP    88  YboodP dP""""Yb   88   88  YbodP  88  Y8 
		-->
		<!-- h__Body_start -->
		<body>
			<div id="wb-body">
				<div id="wb-skip">
					<ul id="wb-tphp">
						<!-- LEO: These are not shown, but are used for accessibility -->
						<li id="wb-skip1"><a href="#wb-cont">Skip to main content</a></li>
						<li id="wb-skip2"><a href="#wb-nav">Skip to footer</a></li>
					</ul>
				</div>

				<div id="wb-head"><div id="wb-head-in"><header>

					<!-- HeaderStart -->
					<!-- sh__Language_selection_top_left -->
					<!--LEO: DISABLING LANGUAGE SUPPORT FOR THE TIME BEING -->
					
					<section>
						<div id="wet-fullhd">
						<div id="wet-fullhd-in">
								<ul>
								
								<!-- <li id="wet-fullhd-lang-2"><a href="index-fr.html" lang="fr">Français</a></li> -->
								<li id="wet-fullhd-lang-current">English</li>
								</ul>
						</div>
						</div>
					</section>
					


<!-- sh__Banner -->
<div id="wet-bnr" role="banner">
	<div id="wet-bnr-in">
		
		<div id="wet-title">
			<p id="wet-title-in">
				<a href="index.php" lang="en">
					<object data="../dist/theme-wet-boew/images/logo.svg" role="img" tabindex="-1" type="image/svg+xml">

						<img src="../dist/theme-wet-boew/images/logo.png" alt="" /> 
					</object> 
					<span> Citizenbridge
						<small>Together, building tomorrow</small>
					</span>
				</a>
			</p>
		</div>

		<!-- sh__Search_box_and_Button -->
		<!-- LEO Disabling Search for the time being. -->
		<!--
 		<section role="search">
			<div id="wet-srchbx"><h2>Search</h2>
				<form action="#" method="post">
					<div id="wet-srchbx-in">
						<label for="wet-srch">Search website</label>
						<input id="wet-srch" name="wet-srch" type="search" value="" size="27" maxlength="150" />
						<input id="wet-srch-submit" name="wet-srch-submit" type="submit" value="Search" data-icon="search" class="button button-accent" />
					</div>
				</form>
			</div>
		</section> -->

	</div>
</div>

<!-- sh__Site_buttons -->


<nav role="navigation">
	<!-- sh__Main_Navigation_buttons -->
	<div id="wet-psnb"><h2>Site menu</h2><div id="wet-psnb-in"><div class="wet-boew-menubar mb-mega"><div>
		<ul class="mb-menu" data-ajax-replace="includes/projectmenu-en.txt">
			<!-- <li><div><a href="">Button 1</a></div></li>   LEO: thi sis seen if stuff is not replaced by AJAX -->
		</ul>
	</div></div></div>
	</div>

	<!-- sh__top_tree_navigation_links -->
	<!-- LEO- Disabling Bread crumbs for the time being. as our structure is flat.  -->
	<!-- 	<div id="wet-bc"><h2>Breadcrumb trail</h2>
		<div id="wet-bc-in">
			<ol>
				<li><a href="../index-en.html">Home</a></li>
				<li>main</li>
			</ol>
		</div>
	</div> -->
</nav>

<!-- HeaderEnd -->
</header></div></div>



<!--    8b    d8    db    88 88b 88   	88""Yb  dP"Yb  8888b.  Yb  dP 
		88b  d88   dPYb   88 88Yb88   	88__dP dP   Yb  8I  Yb  YbdP  
		88YbdP88  dP__Yb  88 88 Y88   	88""Yb Yb   dP  8I  dY   8P   
		88 YY 88 dP""""Yb 88 88  Y8   	88oodP  YbodP  8888Y"   dP    --> 

		<div id="wb-core">
			<div id="wb-core-in" class="equalize">
				<div id="wb-main" role="main">
					<div id="wb-main-in">

						<!-- MainContentStart -->
						<h1 id="wb-cont">Registration Form</h1>

						<!-- sh__Main_Body starts here -->
						<div class="span-8">
							<!-- JIE: Registration Form -->
							
							<form action="register.php" method="post"> 
								First Name:<br /> 
								<input type="text" name="first" value="" /> 
								<br /><br />
								Last Name:<br /> 
								<input type="text" name="last" value="" /> 
								<br /><br /> 								
								E-Mail:<br /> 
								<input type="text" name="email" value="" /> 
								<br /><br /> 
								Password:<br /> 
								<input type="password" name="password" value="" /> 
								<br /><br />
								Postal-Code:<br /> 
								<input type="text" name="postalcode" value="" /> 
								<br /><br /> 	
								<input type="submit" value="Register" /> 
							</form>
			
							</div>
							<div class="clear"></div>


						<!-- sh__date_Modified  LEO:Leaving out for now -->
<!-- 						<dl id="wet-date-mod" role="contentinfo">
							<dt>Date modified:</dt><dd><span><time>2013-09-28</time></span></dd>
						</dl> -->
						<div class="clear"></div>
						<!-- MainContentEnd -->
					</div>
				</div>
			</div>
		</div>



<!-- 	888888  dP"Yb   dP"Yb  888888 888888 88""Yb 
		88__   dP   Yb dP   Yb   88   88__   88__dP 
		88""   Yb   dP Yb   dP   88   88""   88"Yb  
		88      YbodP   YbodP    88   888888 88  Yb  -->

		<!-- sh__footer_section -->
		<div id="wb-foot"><div id="wb-foot-in">

			<footer><h2 id="wb-nav">Footer</h2>

				<!-- FooterStart -->
				<nav role="navigation"><div id="wet-sft"><h3>Site footer</h3><div id="wet-sft-in">

					<!-- e.g About -->
				 <!-- COPY & PASTE BELOW FOR MULTIPLE COLUMNS.
				<section>   
					<div class="span-2">
						<h4 class="wet-col-head">About</h4>
						<ul>
							<li><a href="">Vision</a></li>
						</ul>
					</div>
				</section> 
			-->

		</div></div></nav>
		<!-- FooterEnd -->
			</footer>
		</div>
		</div>

</div>

<!-- ScriptsStart -->
<script src="../dist/js/settings.js"></script>
<!--[if lte IE 8]>
<script src="../dist/theme-wet-boew/js/theme-ie-min.js"></script>
<script src="../dist/js/pe-ap-ie-min.js"></script>
<script src="../dist/js/jquerymobile/jquery.mobile-ie.min.js"></script>
<![endif]-->
<!--[if gt IE 8]><!-->
<script src="../dist/theme-wet-boew/js/theme-min.js"></script>
<script src="../dist/js/pe-ap-min.js"></script>
<script src="../dist/js/jquerymobile/jquery.mobile.min.js"></script>
<!--<![endif]-->
<!-- ScriptsEnd -->

<!-- CustomScriptsStart -->
<script src="js/index.js"></script>
<!-- CustomScriptsEnd -->
</body>
</html>