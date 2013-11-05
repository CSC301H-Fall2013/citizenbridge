<?php 
    // First we execute our common code to connection to the database and start the session 
    require("accountDatabase/common.php"); 
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
								
								<ul>
								<li> 
								<!--
								<?php 
									//TODO : Fix when it loads
									//W.E.T Framework : This is part is not refreshed when page is refreshed
									if(empty($_SESSION['user'])) 
									{ 
										echo 'Not logged in';
									} else 
									{
										//If logged in show the user form (currently just shows email)
										echo 'Logged in As:';
										echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8');
									}
								?> 
								-->
								</li>
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
						<h1 id="wb-cont">Welcome to Citizen Bridge</h1>

						<!-- sh__Main_Body starts here -->
						<div class="span-8">
							
							<!-- JIE: Login form -->
							<?php
														// This variable will be used to re-display the user's e-mail to them in the 
								// login form if they fail to enter the correct password.  It is initialized here 
								// to an empty value, which will be shown if the user has not submitted the form. 
								$submitted_email = ''; 
								 
								// This if statement checks to determine whether the login form has been submitted 
								// If it has, then the login code is run, otherwise the form is displayed 
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
											email 
										FROM users 
										WHERE 
											email = :email 
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
										// Note: On a production website, you should not output $ex->getMessage(). 
										// It may provide an attacker with helpful information about your code.  
										// TODO :
										die("Failed to run query: " . $ex->getMessage()); 
									} 
									 
									// This variable tells us whether the user has successfully logged in or not. 
									// We initialize it to false, assuming they have not. 
									// If we determine that they have entered the right details, then we switch it to true. 
									$login_ok = false; 
									 
									// Retrieve the user data from the database.  If $row is false, then the email 
									// they entered is not registered. 
									$row = $stmt->fetch(); 
									if($row) 
									{ 
										// Using the password submitted by the user and the salt stored in the database, 
										// we now check to see whether the passwords match by hashing the submitted password 
										// and comparing it to the hashed version already stored in the database. 
										$check_password = hash('sha256', $_POST['password'] . $row['salt']); 
										for($round = 0; $round < 65536; $round++) 
										{ 
											$check_password = hash('sha256', $check_password . $row['salt']); 
										} 
										 
										if($check_password === $row['password']) 
										{ 
											// If they do, then we flip this to true 
											$login_ok = true; 
										} 
									} 
									 
									// If the user logged in successfully, then we refresh the page
									// Otherwise, we display a login failed message and refresh the page
									if($login_ok) 
									{ 
										// Here I am preparing to store the $row array into the $_SESSION by 
										// removing the salt and password values from it.  Although $_SESSION is 
										// stored on the server-side, there is no reason to store sensitive values 
										// in it unless you have to.  Thus, it is best practice to remove these 
										// sensitive values first. 
										unset($row['salt']); 
										unset($row['password']); 
										 
										// This stores the user's data into the session at the index 'user'. 
										// We will check this index on the private members-only page to determine whether 
										// or not the user is logged in.  We can also use it to retrieve 
										// the user's details. 
										$_SESSION['user'] = $row; 
										 
										// TODO : Refresh the page
										echo '<script type="text\javascript">location.reload(true);</script>';

									} 
									else 
									{ 
										//TODO : Fix failure message
										// Tell the user they failed and refresh the page
										echo '<script type="text\javascript">alert("Login Failed.");</script>';
										//echo '<script type="text\javascript">location.reload(forceGet);</script>';
										 
										// Show them their username again so all they have to do is enter a new 
										// password.  The use of htmlentities prevents XSS attacks.  You should 
										// always use htmlentities on user submitted values before displaying them 
										// to any users (including the user that submitted them).  For more information: 
										// http://en.wikipedia.org/wiki/XSS_attack 
										$submitted_email = htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8'); 
										
										
									} 
								} 
							?>
							
							
							
							<?php 
							
							if(empty($_SESSION['user'])) 
							{ 
								//If not logged in, show the login form
								include 'accountDatabase/login.php';
							} else 
							{
								//If logged in show the user form (currently just shows email)
								include 'accountDatabase/private.php';
							}
							?>

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