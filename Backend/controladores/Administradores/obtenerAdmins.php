<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Administrador.php';


$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$admin = new Administrador($db);


$stmt = $audio->obtenerAdmins();

$count = $stmt->rowCount();

if($count > 0){
    $admins = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $admin = array(
            "id" => $id,
            "nombre" => $nombre,
            "correo" => $correo,
            "password" => $password,
        );

        array_push($admins, $admin);
    }
    echo json_encode($admins_ JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode(
        array("message" => "No se encontraron administradores.")
    );
}

?>