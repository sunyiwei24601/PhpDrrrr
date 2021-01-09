<?php

//create short variable names
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$feedback = trim($_POST['feedback']);

//set up some static information
$toaddress = "feedback@example.com";

$subject = "Feedback from web site";

$mailcontent = "Customer name: ".$name."\n".
    "Customer email: ".$email."\n".
    "Customer comments:\n".$feedback."\n";

$fromaddress = "From: webserver@example.com";

//invoke mail() function to send mail
mail($toaddress, $subject, $mailcontent, $fromaddress);

$text = "这是雪花";
if (strstr($text, '雪花')) {
    $text = '下雪啦！';
}

?>
<html>
<head>
    <title>Bob's Auto Parts - Feedback Submitted</title>
</head>
<body>
<h1>Feedback submitted</h1>
<p>Your feedback (shown below) has been sent.</p>
<p><?php echo nl2br($mailcontent);
    echo $text;
?>
</p>
</body>
</html>
