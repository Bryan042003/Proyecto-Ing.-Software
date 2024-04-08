<?php
header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

$db = Database::getInstance();

if (isset($_POST["titulo"], $_POST["autor"], $_POST["comentarios"], $_FILES["AudioFile"], $_FILES["imagen"], $_POST["latitud"], $_POST["longitud"], $_POST["canton"], $_POST["provincia"])) {

    $audio = new Audio($db);

    // imagen
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] == 0) {
        $imagen_name = $_FILES["imagen"]["name"];
        $temp_imagen_name = $_FILES["imagen"]["tmp_name"];
        $imagen_size = $_FILES["imagen"]["size"];
        $folder_imagen = '../../../public/imagenes/'. $imagen_name;
        $direccion_image = $_ENV['DIR_IMGS']. $imagen_name;

        $extension_image = strtolower(pathinfo($imagen_name, PATHINFO_EXTENSION));
        $extensions_image_allowed = array('png', 'gif', 'jpg', 'jpeg');

        if (in_array($extension_image, $extensions_image_allowed)) {
            move_uploaded_file($temp_imagen_name, $folder_imagen);
        } else {
            echo json_encode(array("ERROR" => "El tipo de archivo no está permitido. Formatos permitidos: PNG, GIF, JPG, JPEG."), JSON_UNESCAPED_UNICODE);
            return;
        }
        if ($imagen_size > 50000000) { // 50MB en bytes
            echo json_encode(array("ERROR" => "El tamaño del archivo es demasiado grande. Tamaño máximo permitido: 50MB."), JSON_UNESCAPED_UNICODE);
            return;
        }
    } else {
        
        $direccion_image = $_ENV['DIR_IMGS_NOPHOTO'];
        
    }
    

    // audio
    $audiofile_name = $_FILES["AudioFile"]["name"];
    $audiofile_type = $_FILES['AudioFile']['type'];
    $audio_size = $_FILES["AudioFile"]["size"];
    $temp_audiofile_name = $_FILES["AudioFile"]["tmp_name"];
    $folder_audio = '../../../public/audios/'. $audiofile_name;
    $direccion_audiofile = $_ENV['DIR_AUDIOS']. $audiofile_name;

    $extension_audio = strtolower(pathinfo($audiofile_name, PATHINFO_EXTENSION));
    $extensions_audio_allowed = array('mp3', 'wav', 'ogg', 'mp4');

    if (in_array($extension_audio, $extensions_audio_allowed)) {
        move_uploaded_file($temp_audiofile_name, $folder_audio);
    } else {
        echo json_encode(array("ERROR" => "El tipo de archivo no está permitido. Formatos permitidos: mp3, wav, ogg, mp4."), JSON_UNESCAPED_UNICODE);
        return;
    }
    if ($audio_size > 50000000) { // 50MB en bytes
        echo json_encode(array("ERROR" => "El tamaño del archivo es demasiado grande. Tamaño máximo permitido: 50MB."), JSON_UNESCAPED_UNICODE);
        return;
    }

    // audio data
    $audio->titulo = $_POST["titulo"];
    $audio->autor = $_POST["autor"];
    $audio->comentarios = $_POST["comentarios"];
    $audio->ruta_audio = $direccion_audiofile;
    $audio->ruta_imagen = $direccion_image;
    $audio->latitud = $_POST["latitud"];
    $audio->longitud = $_POST["longitud"];
    $audio->canton = $_POST["canton"];
    $audio->provincia = $_POST["provincia"];
    
    if ($audio->agregarAudio($audio)) {
        echo json_encode(array("mensaje" => "Audio agregado correctamente"));
    } else {
        echo json_encode(array("mensaje" => "Error al agregar el audio"));
    }
} else {
    echo json_encode(array("mensaje" => "No se recibieron los datos del formulario correctamente"));
}

?>
