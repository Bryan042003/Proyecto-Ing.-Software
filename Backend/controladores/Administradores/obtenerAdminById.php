<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Administrador.php';

//RUTA: localhost/sonidosPV/controladores/Audios/obtenerAudioById?id=1

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$admin = new Admin($db);

$id = $_GET['id']; // Por medio id

$adminObtenido = $admin->obtenerAdmin($id);

if($adminObtenido){
    $adminData = array(
        "id" => $adminObtenido['admin_id'],
        "nombre" => $adminObtenido['nombre'],
        "correo" => $adminObtenido['correo'],
        "password" => $adminObtenido['password'],

    );
    echo json_encode($adminData, JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array("error" => "No se encontró el admin")
    );
}
?>