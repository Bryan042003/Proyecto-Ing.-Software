<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../../config/database.php';
include_once '../../modelos/Administrador.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

$db = Database::getInstance();
$response = array();

if (isset($_POST["nombre"], $_POST["correo"], $_POST["password"])) {
    $admin = new Administrador($db);

    $admin->nombre = $_POST["nombre"];
    $admin->correo = $_POST["correo"];
    $admin->password = password_hash($_POST["password"], PASSWORD_DEFAULT);

    if ($admin->agregarAdmin($admin)) {
        $response["mensaje"] = "Administrador agregado correctamente.";
    } else {
        $response["mensaje"] = "Error al agregar el administrador";
    }
} else {
    $response["mensaje"] = "No se recibieron los datos del formulario correctamente";
}
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>