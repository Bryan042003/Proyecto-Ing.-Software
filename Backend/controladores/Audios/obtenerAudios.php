<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$audio = new Audio($db);

$stmt = $audio->obtenerAudios();

$count = $stmt->rowCount();

if($count > 0){
    $audios = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){ 
        extract($row); 
        $p  = array( // Crea un objeto por cada fila
             "id" => $audio_id,
             "titulo" => $titulo,
             "autor" => $autor,
             "comentarios" => $comentarios,
             "ruta_audio" =>  $ruta_audio,
             "ruta_imagen" => $ruta_imagen,
             "latitud"  => $latitud,
             "longitud" => $longitud,
             "canton" => $nombre_canton,
             "provincia" => $nombre_provincia ,
             "fecha_registro" => $fecha_registro
        );
        array_push($audios, $p);
    }
    echo json_encode($audios, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array()
    );
}

?>
