<h3>Login</h3> 
<form action="index.php" method="post"> 
    Email:<br /> 
    <input type="text" name="email" value="<?php echo $submitted_email; ?>" /> 
    <br /><br /> 
    Password:<br /> 
    <input type="password" name="password" value="" /> 
    <br /><br /> 
    <input type="submit" value="Login" /> 
</form> 
<a href="register.php">Register</a>