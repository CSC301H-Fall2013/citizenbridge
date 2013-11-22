<?php 
    // First we execute our common code to connection to the database and start the session 
    require("accountDatabase/common.php"); 
?> 

<!-- JIE: Login form -->
<?php

	$submitted_email = ''; 
	
	if(!empty($_POST)) 
	{ 
		// This query retreives the user's information from the database using 
		// their email. 
		$query = " 
			SELECT 
				id, 
				first,
				last,
				password, 
				salt, 
				email,
                postalcode
			FROM users 
			WHERE 
				email = :email AND activation IS NULL
		"; 
		 
		// The parameter values 
		$query_params = array( 
			':email' => $_POST['email'] 
		); 
		 
		try 
		{ 
			// Execute the query against the database 
			$stmt = $db->prepare($query); 
			$result = $stmt->execute($query_params); 
		} 
		catch(PDOException $ex) 
		{ 
			echo '<script type="text/javascript">alert("Database error. Please try again later.");</script>';
			echo '<script type="text/javascript">location.reload(true);</script>';
		} 
		 

		$login_ok = false; 
		 
		$row = $stmt->fetch(); 
		if($row) 
		{ 
			//Check password
			$check_password = hash('sha256', $_POST['password'] . $row['salt']); 
			for($round = 0; $round < 65536; $round++) 
			{ 
				$check_password = hash('sha256', $check_password . $row['salt']); 
			} 
			 
			if($check_password === $row['password']) 
			{ 
				//Login is successful
				$login_ok = true; 
			} 
		} 
		 
		
		if($login_ok) 
		{ 
			//Unset restricted information
			unset($row['salt']); 
			unset($row['password']); 
			 
			$_SESSION['user'] = $row; 
			
			echo '<script type="text/javascript">location.reload(true);</script>';

		} 
		else 
		{ 
			
		
			echo '<script type="text/javascript">
		
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp1=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp1=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp1.onreadystatechange=function()
			  {
			  if (xmlhttp1.readyState==4 && xmlhttp1.status==200)
				{
				document.getElementById("loginError").innerHTML=xmlhttp1.responseText;
				}
			  }
			xmlhttp1.open("GET","error.php?q="+"login",true);
			xmlhttp1.send();
			
			</script>';
			
			$submitted_email = htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8'); 
			
		} 
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
	<meta name="description" content="CitizenBridge" />
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
	
    <script type="text/javascript" src="script.js"></script>
    
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

						<li id="wb-skip1"><a href="#wb-cont">Skip to main content</a></li>
						<li id="wb-skip2"><a href="#wb-nav">Skip to footer</a></li>
					</ul>
				</div>

				<div id="wb-head"><div id="wb-head-in"><header>					
					<section>
						<div id="wet-fullhd">
						<div id="wet-fullhd-in">
								
								<ul>
									<li id="wet-fullhd-lang-current">English</li>
								</ul>
								
								<?php include 'accountDatabase/header.php'; ?>
						</div>
						</div>
					</section>
					


<!-- sh__Banner -->
<div id="wet-bnr" role="banner">
	<div id="wet-bnr-in">
		
		<div id="wet-title">
			<p id="wet-title-in">
				<a href="index.php" lang="en">
						<img src="CitizenBridgeLogo_notext.png" class="span-1" alt="" /> 
					<span> <br>
						<small>Bridging the gap between you and the government</small>
					</span>
				</a>
			</p>
		</div>
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
						<h1 id="wb-cont">Welcome to Citizen Bridge</h1>

						<!-- sh__Main_Body starts here -->
						<div class="span-8">

							<?php 
							
							if(empty($_SESSION['user'])) 
							{ 
								//If not logged in, show the login form
								include 'accountDatabase/login.php';				
								
							} else 
							{
								//If logged in show the user panel
								include 'accountDatabase/private.php';
								
							}
							?>

						</div>
						<div class="clear"></div>
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