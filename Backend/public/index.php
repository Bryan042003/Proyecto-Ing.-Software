<?php

require_once '../config/database.php';
require_once '../modelos/Audio.php';
require_once '../controladores/ControladorAudio.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

$db = Database::getInstance(); // Obtiene la instancia de la base de datos

//localhost/sonidosPV/controladores/carpetaNombre/funcion/(parametro en caso)


$response = array(
    "status" => "success",
    "message" => "Bienvenido a mi API"
);

echo json_encode($response); // Codifica la respuesta como JSON