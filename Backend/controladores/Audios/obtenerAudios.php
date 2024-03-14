<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$audio = new Audio($db);

$stmt = $audio->obtenerAudios();

$count = $stmt->rowCount();

if($count > 0){
    $audios = array();
    $audios["body"] = array();
    $audios["count"] = $count;

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){ 
        extract($row); 
        $p  = array( // Crea un objeto por cada fila
             "Titulo: " => $titulo,
             "Autor: " => $autor,
             "Comentarios: " => $comentarios,
             "Ruta del audio: " =>  $ruta_audio,
             "Ruta de la imagen: " => $ruta_imagen,
             "Latitud: "  => $latitud,
             "Longitud: " => $longitud,
             "Distrito: " => $distrito,
             "Canton: " => $canton,
             "Provincia: " => $provincia 
        );
        array_push($audios["body"], $p);
    }
    echo json_encode($audios, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array("body" => array(), "count" => 0)
    );
}

?>
