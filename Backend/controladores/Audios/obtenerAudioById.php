<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

//RUTA: localhost/sonidosPV/controladores/Audios/obtenerAudioById?id=1

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$audio = new Audio($db);

$id = $_GET['id']; // Por medio id

$audioObtenido = $audio->obtenerAudio($id);

if($audioObtenido){
    $audioData = array(
        "id" => $audioObtenido['audio_id'],
        "titulo" => $audioObtenido['titulo'],
        "autor" => $audioObtenido['autor'],
        "comentarios" => $audioObtenido['comentarios'],
        "ruta_audio" => $audioObtenido['ruta_audio'],
        "ruta_imagen" => $audioObtenido['ruta_imagen'],
        "latitud" => $audioObtenido['latitud'],
        "longitud" => $audioObtenido['longitud'],
        "canton" => $audioObtenido['nombre_canton'],
        "provincia" => $audioObtenido['nombre_provincia'],
        "fecha_registro" => $audioObtenido['fecha_registro']
    );
    echo json_encode($audioData, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array("error" => "No se encontró el audio")
    );
}
?>