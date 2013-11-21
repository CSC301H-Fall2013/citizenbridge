<ul>
<li> 

<?php 
	if(empty($_SESSION['user'])) 
	{ 
		echo '<a href="register.php"> Register </a>';
	} else 
	{
		//If logged in
		echo '<a href="accountDatabase/logout.php"> Logout </a>';
	}
?> 

</li>
</ul>
