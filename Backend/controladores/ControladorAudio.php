<?php
require_once '../config/database.php'; // Importa el archivo de configuración de la base de datos
require_once '../modelos/Audio.php'; // Importa el modelo de audio

class ControladorAudio {
    private $db;
    private $audio;

    public function __construct(){
        $this->db = Database::getInstance(); // Obtiene la instancia de la base de datos
        $this->audio = new Audio($this->db->getConnection()); // Instancia el modelo de audio
    }

    public function obtenerAudios(){
        $stmt = $this->audio->obtenerAudios(); // Obtiene los audios
        $audios = $stmt->fetchAll(PDO::FETCH_ASSOC); // Obtiene los audios como un arreglo asociativo
        return $audios;
    }
}
?>