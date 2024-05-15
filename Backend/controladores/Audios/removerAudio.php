<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$db = Database::getInstance();
$audio = new Audio($db);

$id = $_GET['id']; 
$id_administrador = $_GET['id_administrador']; 
$motivo = $_GET['motivo']; 

$resultado = $audio->removerAudio($id, $id_administrador, $motivo);

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