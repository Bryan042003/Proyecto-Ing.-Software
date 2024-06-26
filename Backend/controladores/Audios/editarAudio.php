<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");

$db = Database::getInstance();
$id_unico = uniqid();
$response = array();

if (isset($_POST["id_audio"],$_POST["titulo"], $_POST["autor"], $_POST["comentarios"], $_POST["latitud"], $_POST["longitud"], $_POST["canton"], $_POST["provincia"], $_POST["id_administrador"], $_POST["motivo"])) {
    $audio = new Audio($db);
   
    if (isset($_FILES["imagen"]) && $_FILES["imagen"]["error"] == 0) {
        
        $imagen_name = $_FILES["imagen"]["name"];
        $temp_imagen_name = $_FILES["imagen"]["tmp_name"];
        $imagen_size = $_FILES["imagen"]["size"];
        $imagen_unica=$id_unico. $imagen_name;
        $folder_imagen = '../../../public/imagenes/'. $imagen_unica;

        $direccion_image = $_ENV['DIR_IMGS']. $imagen_unica;
        $extension_image = strtolower(pathinfo($imagen_name, PATHINFO_EXTENSION));
        $extensions_image_allowed = array('png', 'gif', 'jpg', 'jpeg');

        if (in_array($extension_image, $extensions_image_allowed)) {
            if ($imagen_size > 50000000) { // 50MB en bytes
                echo json_encode(array("ERROR" => "El tamaño del archivo es demasiado grande. Tamaño máximo permitido: 50MB."), JSON_UNESCAPED_UNICODE);
                //$response["mensaje"] = "El tamaño del archivo es demasiado grande. Tamaño máximo permitido: 50MB.";
                return;
            } else {
                move_uploaded_file($temp_imagen_name, $folder_imagen);
            }
        } else {
            echo json_encode(array("ERROR" => "El tipo de archivo no está permitido. Formatos permitidos: PNG, GIF, JPG, JPEG."), JSON_UNESCAPED_UNICODE);
           // $response["mensaje"] = "El tipo de archivo no está permitido. Formatos permitidos: PNG, GIF, JPG, JPEG.";
            return;
        }

    } else {
        if($_POST['rutaImagen']==''){
            $direccion_image = $_ENV['DIR_IMGS_NOPHOTO'];
        }else{
            $direccion_image = $_POST['rutaImagen'];
        }
        // $direccion_image = $_ENV['DIR_IMGS_NOPHOTO'];
       // move_uploaded_file($temp_imagen_name, $folder_imagen);
        
    }
    

    // audio

    // echo $_POST["rutaAudio"];
    if(isset($_FILES["AudioFile"]) && $_FILES["AudioFile"]["error"] == 0){
        $audiofile_name = $_FILES["AudioFile"]["name"];
        $audiofile_type = $_FILES['AudioFile']['type'];
        $audio_size = $_FILES["AudioFile"]["size"];
        $temp_audiofile_name = $_FILES["AudioFile"]["tmp_name"];
        $audio_unico = $id_unico. $audiofile_name;
        $folder_audio = '../../../public/audios/'. $audio_unico;
    
        $direccion_audiofile = $_ENV['DIR_AUDIOS']. $audio_unico;
    
        $extension_audio = strtolower(pathinfo($audiofile_name, PATHINFO_EXTENSION));
        $extensions_audio_allowed = array('mp3', 'wav', 'ogg', 'mp4','m4a');
    
        if (in_array($extension_audio, $extensions_audio_allowed)) {
            if ($audio_size > 50000000) { // 50MB en bytes
                echo json_encode(array("ERROR" => "El tamaño del archivo es demasiado grande. Tamaño máximo permitido: 50MB."), JSON_UNESCAPED_UNICODE);
                return;
            } else {
                move_uploaded_file($temp_audiofile_name, $folder_audio);
            }
        } else {
            echo json_encode(array("ERROR" => "El tipo de archivo no está permitido. Formatos permitidos: mp3, wav, ogg, mp4."), JSON_UNESCAPED_UNICODE);
            return;
        }
    }
    else{
       
        $direccion_audiofile = $_POST['rutaAudio'];
   }



    // audio data
    $audio->id_audio = $_POST["id_audio"];
    $audio->titulo = $_POST["titulo"];
    $audio->autor = $_POST["autor"];
    $audio->comentarios = $_POST["comentarios"];
    $audio->ruta_audio = $direccion_audiofile;
    $audio->ruta_imagen = $direccion_image;
    $audio->latitud = $_POST["latitud"];
    $audio->longitud = $_POST["longitud"];
    $audio->canton = $_POST["canton"];
    $audio->provincia = $_POST["provincia"];
    $audio->id_administrador = $_POST["id_administrador"];
    $audio->motivo = $_POST["motivo"];

    
    if ($audio->editarAudio($audio)) {
        //echo json_encode(array("mensaje" => "Audio agregado correctamente."));
        $response["mensaje"] = "Audio editado correctamente.";
    } else {
        //echo json_encode(array("mensaje" => "Error al agregar el audio. Inténtelo de nuevo."));
        $response["mensaje"] = "Error al editar el audio. Inténtelo de nuevo.";
    }
} else {
    $response["mensaje"] = "No se recibieron los datos del formulario correctamente";

}
echo json_encode($response, JSON_UNESCAPED_UNICODE);
?>
