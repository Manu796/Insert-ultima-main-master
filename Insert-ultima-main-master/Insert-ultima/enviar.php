<?php
$name = $_POST['firstname'];
$mail = $_POST['email'];
$phone = $_POST['phone'];
$localidad = $_POST['localidad'];
$message = $_POST['message'];

$header = 'From: ' . $mail . " \r\n";
$header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
$header .= "Mime-Version: 1.0 \r\n";
$header .= "Content-Type: text/plain";

$message = "Este mensaje fue enviado por: " . $name . " \r\n";
$message .= "Su e-mail es: " . $mail . " \r\n";
$message .= "Teléfono de contacto: " . $phone . " \r\n";
$message .= "Localidad: " .$localidad . "\r\n";
$message .= "Mensaje: " . $_POST['message'] . " \r\n";
$message .= "Enviado el: " . date('d/m/Y', time());

$para = 'adminsr@insert.com.ar';
$asunto = 'Mensaje desde formulario web.';

mail($para, $asunto, utf8_decode($message), $header);

header("Location:index.html");
?>