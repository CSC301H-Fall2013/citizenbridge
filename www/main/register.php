<?php 

    require("accountDatabase/common.php"); 						 

	$s_first = '';
	$s_last = '';
	$s_email = '';
	$s_postalcode = '';
	if(!empty($_POST)) 
	{ 

		$cont=0;
		
		// Ensure that the user has entered a non-empty first and last name 
		if(empty($_POST['first'])) 
		{ 
			$cont=1;
			//Error message
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
				document.getElementById("firstError").innerHTML=xmlhttp1.responseText;
				}
			  }
			xmlhttp1.open("GET","error.php?q="+"first",true);
			xmlhttp1.send();
			
			</script>';
			
		}
		if(empty($_POST['last'])) 
		{ 
			$cont=1;

			echo '<script type="text/javascript">
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp2=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp2.onreadystatechange=function()
			  {
			  if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
				{
				document.getElementById("lastError").innerHTML=xmlhttp2.responseText;
				}
			  }
			xmlhttp2.open("GET","error.php?q="+"last",true);
			xmlhttp2.send();
			</script>';
			
		} 
		 
		// Ensure that the user has entered a non-empty password 
		if(empty($_POST['password'])) 
		{ 
			$cont=1;
			echo '<script type="text/javascript">
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp3=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp3=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp3.onreadystatechange=function()
			  {
			  if (xmlhttp3.readyState==4 && xmlhttp3.status==200)
				{
				document.getElementById("passError").innerHTML=xmlhttp3.responseText;
				}
			  }
			xmlhttp3.open("GET","error.php?q="+"pass",true);
			xmlhttp3.send();
			</script>';

		}
		// Ensure non-empty postal code
		if(empty($_POST['postalcode'])) 
		{ 
			$cont=1;
			echo '<script type="text/javascript">
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp4=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp4=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp4.onreadystatechange=function()
			  {
			  if (xmlhttp4.readyState==4 && xmlhttp4.status==200)
				{
				document.getElementById("postalError").innerHTML=xmlhttp4.responseText;
				}
			  }
			xmlhttp4.open("GET","error.php?q="+"postal",true);
			xmlhttp4.send();
			</script>';
		}
		
		//Used to check for valid postal code
		$country_code="CA";
		
		$zip_postal= $_POST['postalcode'];
		 
		$ZIPREG=array(
			"CA"=>"^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$",
		);
		 
		if ($ZIPREG[$country_code]) {
			if (!preg_match("/".$ZIPREG[$country_code]."/i",$zip_postal)){
				//Validation failed, provided zip/postal code is not valid.
				//echo $_POST['postalcode'];
				$cont=1;
				echo '<script type="text/javascript">
				if (window.XMLHttpRequest)
				  {// code for IE7+, Firefox, Chrome, Opera, Safari
				  xmlhttp5=new XMLHttpRequest();
				  }
				else
				  {// code for IE6, IE5
				  xmlhttp5=new ActiveXObject("Microsoft.XMLHTTP");
				  }
				xmlhttp5.onreadystatechange=function()
				  {
				  if (xmlhttp5.readyState==4 && xmlhttp5.status==200)
					{
					document.getElementById("postalError").innerHTML=xmlhttp5.responseText;
					}
				  }
				xmlhttp5.open("GET","error.php?q="+"postal",true);
				xmlhttp5.send();
				</script>';

			}
		}
		 
		// Make sure the user entered a valid E-Mail address 
		if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) 
		{ 
			$cont=1;
			echo '<script type="text/javascript">
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp6=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp6=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp6.onreadystatechange=function()
			  {
			  if (xmlhttp6.readyState==4 && xmlhttp6.status==200)
				{
				document.getElementById("emailError").innerHTML=xmlhttp6.responseText;
				}
			  }
			xmlhttp6.open("GET","error.php?q="+"invalidemail",true);
			xmlhttp6.send();
			</script>';

		} 
		 
		
			
		// Check for unique email
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
			echo '<script type="text/javascript">alert("Database error. Please try again later.");</script>';
			echo '<script type="text/javascript">location.reload(true);</script>';
		} 
		 
		$row = $stmt->fetch(); 
		 
		if($row) 
		{ 
			$cont=1;
			echo '<script type="text/javascript">
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp7=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp7=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp7.onreadystatechange=function()
			  {
			  if (xmlhttp7.readyState==4 && xmlhttp7.status==200)
				{
				document.getElementById("emailError").innerHTML=xmlhttp7.responseText;
				}
			  }
			xmlhttp7.open("GET","error.php?q="+"usedemail",true);
			xmlhttp7.send();
			</script>';

		} 
		
		//if no errors have occurred we continue
		if($cont==0) {
			$query = " 
				INSERT INTO users ( 
					first, 
					last,
					password, 
					salt, 
					email,
					postalcode,
					activation
				) VALUES ( 
					:first, 
					:last,
					:password, 
					:salt, 
					:email,
					:postalcode,
					:activation
				) 
			"; 
			 
			//Salt and hash the password
			$salt = dechex(mt_rand(0, 2147483647)) . dechex(mt_rand(0, 2147483647)); 
			$password = hash('sha256', $_POST['password'] . $salt); 
			 
			for($round = 0; $round < 65536; $round++) 
			{ 
				$password = hash('sha256', $password . $salt); 
			} 
			
			//Unique activation code
			$activation = md5(uniqid(rand(), true));
			 
			//Fix postal code into standard format
			$zip_postal=preg_replace('/\s+/', '', $zip_postal); 
			$zip_postal=strtoupper($zip_postal);
			
			$query_params = array( 
				':first' => $_POST['first'],
				':last' => $_POST['last'], 			
				':password' => $password, 
				':salt' => $salt, 
				':email' => $_POST['email'],
				':postalcode' => $zip_postal,
				':activation' => $activation
			); 
			 
			try 
			{ 
				// Execute the query to create the user 
				$stmt = $db->prepare($query); 
				$result = $stmt->execute($query_params); 
			} 
			catch(PDOException $ex) 
			{ 
				echo '<script type="text/javascript">alert("Database error. Please try again later.");</script>';
				echo '<script type="text/javascript">location.reload(true);</script>';
			} 
			
			//Send activation email
			$email = $_POST['email'];
			$message = "To activate your account, please click on this link:\n\n";
			$message .= $website . '/activate.php?email=' . urlencode($email) . "&key=$activation";

			require 'PHPMailer-Master/PHPMailerAutoload.php';

			$mail = new PHPMailer;

			$mail->isSMTP();                                      // Set mailer to use SMTP
			$mail->Host = 'smtp.gmail.com;';
			$mail->SMTPAuth = true;                               // Enable SMTP authentication
			$mail->Username = $hostemail;                            // SMTP username
			$mail->Password = $hostpassword;                           // SMTP password
			$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

			$mail->From = 'noreply.athabasca.cb@gmail.com';
			$mail->FromName = 'Citizen Bridge Athabasca';

			$mail->addAddress($email); 

			$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
			$mail->isHTML(true);                                  // Set email format to HTML
			$mail->Subject = 'CitizenBridge Validation';
			$mail->Body    = $message;
			$mail->AltBody = $message;

			if(!$mail->send()) {
				die($mail->ErrorInfo); 
			} else {
				header("Location: success.php"); 
				die("Redirecting to success.php"); 
			}
			
		}

		//If error occurred we set the fields to what the user entered
		$s_first = htmlentities($_POST['first'], ENT_QUOTES, 'UTF-8');
		$s_last = htmlentities($_POST['last'], ENT_QUOTES, 'UTF-8'); 	
		$s_email = htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8'); 	
		$s_postalcode = htmlentities($_POST['postalcode'], ENT_QUOTES, 'UTF-8'); 			
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
					<object data="../dist/theme-wet-boew/images/logo.svg" role="img" tabindex="-1" type="image/svg+xml">

						<img src="../dist/theme-wet-boew/images/logo.png" alt="" /> 
					</object> 
					<span> Citizenbridge
						<small>Together, building tomorrow</small>
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
								<input type="text" name="first" value="<?php echo $s_first; ?>" maxlength="50"/> <span id="firstError"></span>
								<br /><br />
								Last Name:<br /> 
								<input type="text" name="last" value="<?php echo $s_last; ?>" maxlength="50"/> <span id="lastError"></span>
								<br /><br /> 								
								E-Mail:<br /> 
								<input type="text" name="email" value="<?php echo $s_email; ?>" maxlength="50"/> <span id="emailError"></span>
								<br /><br /> 
								Password:<br /> 
								<input type="password" name="password" value="" maxlength="30"/> <span id="passError"></span>
								<br /><br />
								Postal-Code:<br /> 
								<input type="text" name="postalcode" value="<?php echo $s_postalcode; ?>" maxlength="6"/> <span id="postalError"></span>
								<br /><br /> 	
								<input type="submit" value="Register" /> 
							</form>
			
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