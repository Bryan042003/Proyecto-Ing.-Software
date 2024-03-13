<?php

require_once '../config/database.php';
require_once '../modelos/Audio.php';
require_once '../controladores/ControladorAudio.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

$db = Database::getInstance(); // Obtiene la instancia de la base de datos

//localhost/sonidosPV/public/X

switch($uri[3]){
    case 'audios': //localhost/sonidosPV/audios
        $controlador = new ControladorAudio();
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        //echo $uri[3];
        exit('Page not foundss');
        break;

}
header("Content-Type: application/json"); // Establece el tipo de contenido a JSON

if(null !== $uri[4] && method_exists($controlador, $uri[4])){
    $result = $controlador->{$uri[4]}();
    echo json_encode($result);

}
else{
    $response = array(
        "status" => "error",
        "message" => "No se encontró el recurso"
    );
    echo json_encode($response);
    exit();

}


$response = array(
    "status" => "success",
    "message" => "Bienvenido a mi API"
);

echo json_encode($response); // Codifica la respuesta como JSON