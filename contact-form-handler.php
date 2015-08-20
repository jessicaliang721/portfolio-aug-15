<? php

//validate the data

$errors = '';
$myemail = 'jessicapei93@gmail.com';
if(empty($_POSTS['name']) ||
	empty($_POSTS['email']) ||
	empty($_POSTS['message'])) {
	$errors .= "\n Error: Missing field.";
}
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];

if (!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", $email_address)) {
	$errors .= "\n Error: Invalid email address.";
}

//compose and send the email

if( empty($errors)) {
	$to = $myemail;

	$email_subject = $subject;

	$email_body = "You have received a new message.".
	" \n Name: $name \n ".
	"Email: $email_address\n Message \n $message";
	$headers = "From: $myemail\n";
	$headers .= "Reply-To: $email_address";
	mail($to,$email_subject,$email_body,$headers);

	//redirect to thank-you page <-- figure out with ajax
	header('Location: thanks.html');
	exit();
}

?>