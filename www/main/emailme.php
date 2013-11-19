<?php
$to = "leospostbox@gmail.com";
$subject = "Test mail";
$message = "Hello! This is a simple email message.";
$from ="noreply@localhost";
$headers = "From:" . $from;
mail($to,$subject,$message,$headers);
echo "Mail Sent.";
?>