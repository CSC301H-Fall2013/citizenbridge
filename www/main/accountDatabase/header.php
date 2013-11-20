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
<ul>
<li> 

<?php 
	if(empty($_SESSION['user'])) 
	{

	} else
	{
		//TODO:
		echo '<a href="index.php?1=0#account"> Account Settings </a>';
	}
?> 

</li>
</ul>