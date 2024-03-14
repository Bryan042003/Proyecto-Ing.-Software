<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$audio = new Audio($db);

$id = $_GET['id']; // Por medio id

$audioObtenido = $audio->obtenerAudio($id);

if($audioObtenido){
    $audioData = array(
        "Titulo" => $audioObtenido['titulo'],
        "Autor" => $audioObtenido['autor'],
        "Comentarios" => $audioObtenido['comentarios'],
        "Ruta del audio" => $audioObtenido['ruta_audio'],
        "Ruta de la imagen" => $audioObtenido['ruta_imagen'],
        "Latitud" => $audioObtenido['latitud'],
        "Longitud" => $audioObtenido['longitud'],
        "Distrito" => $audioObtenido['distrito'],
        "Canton" => $audioObtenido['canton'],
        "Provincia" => $audioObtenido['provincia']
    );
    echo json_encode($audioData, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array("error" => "No se encontró el audio")
    );
}
?>