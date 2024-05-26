<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");


include_once '../../config/database.php';
include_once '../../modelos/Administrador.php';

$db = Database::getInstance();
$admin = new Administrador($db);

$id = $_GET['id'];

$resultado = $admin->removerAdministrador($id);

if($resultado){
    echo json_encode(
        array("mensaje" => "Administrador eliminado exitosamente")
    );
} else {
    echo json_encode(
        array("error" => "No se pudo eliminar el administrador")
    );
}
?>