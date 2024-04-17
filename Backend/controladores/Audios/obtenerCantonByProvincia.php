<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();

$audio = new Audio($db);

$id_provincia = $_GET['id_provincia']; 
$cantonesObtenidos = $audio->obtenerCantones($id_provincia);

if($cantonesObtenidos){
    echo json_encode($cantonesObtenidos, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array("error" => "No se encontraron cantones para la provincia seleccionada")
    );
}
?>