<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$db = Database::getInstance();
$audio = new Audio($db);

$id = $_GET['id']; // Obtén el ID del audio desde la URL o la solicitud

$resultado = $audio->removerAudio($id);

if($resultado){
    echo json_encode(
        array("mensaje" => "Audio eliminado exitosamente")
    );
} else {
    echo json_encode(
        array("error" => "No se pudo eliminar el audio")
    );
}
?>