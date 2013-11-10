<!--Email: <?php echo htmlentities($_SESSION['user']['email'], ENT_QUOTES, 'UTF-8'); ?><br>-->
PostalCode: <?php echo htmlentities($_SESSION['user']['postalcode'], ENT_QUOTES, 'UTF-8'); ?><br /> 

<!--
<a href="memberlist.php">Memberlist</a><br />
-->
<!--
<a href="edit_account.php">Edit Account</a><br /> 
-->
<a href="accountDatabase/logout.php">Logout</a>