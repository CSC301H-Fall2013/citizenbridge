<ul>
<li> 

<?php 
	if(empty($_SESSION['user'])) 
	{ 
		echo '<a href="index.php"> Login </a>';
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
		echo '<a href="index.php#account"> Account Settings </a>';
	}
?> 

</li>
</ul>