<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../../config/database.php';
include_once '../../modelos/Administrador.php';
include_once '../../vendor/autoload.php'; // Incluye la librería de Firebase

use Firebase\JWT\JWT; 

$db = Database::getInstance();
$admin = new Administrador($db);
$response = array();

if(isset($_POST["correo"], $_POST["password"])){
    $correo = $_POST["correo"];
    $password = $_POST["password"];
    $admin = $admin->autenticarAdmin($correo, $password);
    if($admin){
        $secret_key = $_ENV['JWT_SECRET_KEY'];
        $payload = array( // Crea un token con los datos del usuario
            "id"=>$admin["id"],
            "nombre" => $admin["nombre"],
            "correo" => $admin["correo"],
            "iat" => time(), // Tiempo que inició el token
            "exp" => time() + (60*60) // Expira en una hora
        );
        $jwt = JWT::encode($payload, $secret_key, 'HS256'); // Codifica el token
        $response["mensaje"] = "Inicio de sesión exitoso";
        $response["jwt"] = $jwt;
    } else {
        http_response_code(401);
        $response["mensaje"] = "Correo o contraseña incorrectos";
    }
} else {
    http_response_code(400);
    $response["mensaje"] = "No se recibieron los datos del formulario correctamente";
}

echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>