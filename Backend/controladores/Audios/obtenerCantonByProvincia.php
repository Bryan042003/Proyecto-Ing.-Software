<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$audio = new Audio($db);

$id_provincia = $_GET['id_provincia']; 

$stmt = $audio->obtenerCantones($id_provincia);

$count = $stmt->rowCount();

if($count > 0){
    $cantones = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){ 
        extract($row); 
        $p  = array( 
             "id" => $id,
             "nombre" => $nombre,
             "id_provincia" => $id_provincia
        );
        array_push($cantones, $p);
    }
    echo json_encode($cantones, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array()
    );
}

?>