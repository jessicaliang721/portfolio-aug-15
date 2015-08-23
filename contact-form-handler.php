<?php

$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$formcontent = "From: $name \n Subject: $subject \n Message: $message";
$recipient = "jessicapei93@gmail.com";
$mailheader = "From: $email \r\n";
header("Location: thanks.html");
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");

?>