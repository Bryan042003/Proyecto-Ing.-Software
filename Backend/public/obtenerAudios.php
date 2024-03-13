<?php
require_once '../config/database.php';
require_once '../modelos/Audio.php';
require_once '../controladores/ControladorAudio.php';

//require_once('../index.php');
$db = Database::getInstance();
$audio = new Audio($db);

$resultado = $audio->obtenerAudios();

$audios = $resultado->fetchAll(PDO::FETCH_ASSOC);

if (count($audios) > 0) {
    foreach ($audios as $audio) {
        echo "Título: " . $audio['titulo'] . "<br>";
        echo "Autor: " . $audio['autor'] . "<br>";
        echo "Comentarios: " . $audio['comentarios'] . "<br>";
        echo "Ruta del audio: " . $audio['ruta_audio'] . "<br>";
        echo "Ruta de la imagen: " . $audio['ruta_imagen'] . "<br>";
        echo "Latitud: " . $audio['latitud'] . "<br>";
        echo "Longitud: " . $audio['longitud'] . "<br>";
        echo "Distrito: " . $audio['distrito'] . "<br>";
        echo "Cantón: " . $audio['canton'] . "<br>";
        echo "Provincia: " . $audio['provincia'] . "<br>";
        echo "<br>";
    }
} else {
    echo "No se encontraron audios.";
}


?>