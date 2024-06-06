<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../../config/database.php';
include_once '../../modelos/Audio.php';

$db = Database::getInstance();
$audio = new Audio($db);

if(isset($_GET["id"], $_GET["id_administrador"], $_GET["motivo"], $_GET["ruta_audio"], $_GET["ruta_imagen"])){
   
    $id = $_GET['id']; 
    $id_administrador = $_GET['id_administrador']; 
    $motivo = $_GET['motivo']; 
    $ruta_audio= $_GET['ruta_audio']; 
    $ruta_imagen = $_GET['ruta_imagen']; 

    $resultado = $audio->removerAudio($id, $id_administrador, $motivo);

    if($resultado){
        $pathImagen = parse_url($ruta_imagen, PHP_URL_PATH);
        $rutaImagenNueva = substr($pathImagen, strpos($pathImagen, '/imagenes'));

        $pathAudio = parse_url($ruta_audio, PHP_URL_PATH);
        $rutaAudioNueva = substr($pathAudio, strpos($pathAudio, '/audios'));

        $rutaBase = realpath(__DIR__ . '/../../../public');
        $rutaAudioCompleta = $rutaBase . $rutaAudioNueva;
        $rutaImagenCompleta = $rutaBase . $rutaImagenNueva;

        if(strpos($rutaImagenCompleta, 'Sin_foto4448.png') === false){
            if (unlink($rutaImagenCompleta)) { 
                if (unlink($rutaAudioCompleta)) {
                    echo json_encode(
                        array("mensaje" => "Audio eliminado exitosamente") 
                    );
                }
            }
        } else {
            if (unlink($rutaAudioCompleta)) {
                echo json_encode(
                    array("mensaje" => "Audio eliminado exitosamente") 
                );
            }
        }
    } else {
        echo json_encode(
            array("error" => "No se pudo eliminar el audio") 
        );
    }
} else {
    echo json_encode(
        array("error" => "No se recibieron los datos del formulario correctamente") 
    );
}
?>