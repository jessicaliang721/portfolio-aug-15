<?php

    //only process POST requests
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //get form fields and remove whitespace
        $name = strip_tags(trim($_POST["name"]));
            $name = str_replace(array("\r","\n"), array(" "," "), $name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        //check that data was sent to mailer, nothing blank
        if (empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            //set 400 (bad request) and exit
            http_response_code(400);
            echo "There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        //set recipient email address
        $recipient = "jessicapei93@gmail.com";

        //set email subject
        $subject = trim($_POST['subject']);

        //build email content
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        //build email headers
        $email_headers = "From: $name <$email>";

        //send the email
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            //set 200 (okay) response code
            http_response_code(200);
            echo "Thank you! Your message has been sent.";
        }
        else {
            //set 500 (internal error) response code
            http_response_code(500);
            echo "Something went wrong and your message couldn't be sent.";
        }
    }
    //not a POST request, set 403 (forbidden) reponse code
    else {
        http_response_code(403);
        echo "There was a problem with your submission. Please try again.";
    }

?>
