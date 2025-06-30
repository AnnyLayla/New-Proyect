<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $web = htmlspecialchars($_POST['web-site']);
    $telefono = htmlspecialchars($_POST['telefono']);
    $fechaHora = htmlspecialchars($_POST['fecha-hora-llegada']);
    $estadia = htmlspecialchars($_POST['estadia']);
    $estudios = htmlspecialchars($_POST['estudios']);

    $destinatario = "minoayelen133@gmail.com"; // Cambia esto a tu email
    $asunto = "Nueva Reserva de: $nombre";

    $mensaje = "
    
    <html>
    <head><title>Formulario de Reserva</title>
    </head>
    <body>
    
        <h2>Datos de la Reserva</h2>
        <p><strong>Nombre:</strong> $nombre</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Web:</strong> $web</p>
        <p><strong>Teléfono:</strong> $telefono</p>
        <p><strong>Fecha y hora de llegada:</strong> $fechaHora</p>
        <p><strong>Días de estadía:</strong> $estadia</p>
        <p><strong>Nivel de estudios:</strong> $estudios</p>
    </body>
    </html>";

    // Encabezados para que se envíe como HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";

    // Enviar correo
    if (mail($destinatario, $asunto, $mensaje, $headers)) {
        echo "Mensaje enviado con éxito.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Acceso denegado.";
}
?>

