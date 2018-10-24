<?php
if (count($_REQUEST) > 0) {
    $name = htmlspecialchars(trim($_REQUEST['name']));
    $email = htmlspecialchars(trim($_REQUEST['email']));
    $message = htmlspecialchars(trim($_REQUEST['message']));
    $send = "Имя: " . $name . "\n" .
        "Email: " . $email . "\n" .
        "Сообщение: " . $message;
    echo mail('soul.evans.15@gmail.com', 'Portfolio email', $send);
}