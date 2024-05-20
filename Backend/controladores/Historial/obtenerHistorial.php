<?php
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
include_once '../../config/database.php';
include_once '../../modelos/Historial.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$historial = new Historial($db);

$stmt = $historial->obtenerHistorial();

$count = $stmt->rowCount();

if($count > 0){
    $historial = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){ 
        extract($row); 
        $p  = array( // Crea un objeto por cada fila
             "id" => $id,
             "id_administrador" => $id_administrador,
             "id_audio" => $id_audio,
             "titulo" => $titulo,
             "autor" =>  $autor,
             "accion" => $accion,
             "motivo"  => $motivo,
             "fecha_accion" => $fecha_accion,
        );
        array_push($historial, $p);
    }
    echo json_encode($historial, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array()
    );
}

?>
