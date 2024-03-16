<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
$db = Database::getInstance();
$audio = new Audio($db);

if (isset($_FILES["imagen"])) {
    // Crear una instancia de la clase Audio
    $audio = new Audio($db);
    $IMAGEN_NAME = $_FILES["imagen"]["name"];
    $TEMPIMAGEN_NAME = $_FILES["imagen"]["tmp_name"];
    $carpeta = 'ima/'. $IMAGEN_NAME;
    //echo "imagenNombre: " . $IMAGEN_NAME . " tepmNombre: " . $TEMPIMAGEN_NAME;
    $direccion = $audio->agregarImagen($_FILES["imagen"]);

    // Verifica si se devolvió una dirección de imagen válida
    if($direccion !== false) {
        // La imagen se subió correctamente, puedes usar la variable $direccion aquí
        echo json_encode(array("direccion" => $direccion));
    } else {
        // Hubo un error al subir la imagen
        echo json_encode(array("mensaje" => "Error al subir la imagen"));
    }

}
?>