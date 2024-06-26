<?php

//require_once '../config/database.php';

class Audio{
    private $conn;
    private $vista = "vista_audio_ubicacion";
    private $tabla = "Audio";

    public $titulo;
    public $autor;
    public $comentarios;
    public $ruta_audio;
    public $ruta_imagen;
    public $latitud;
    public $longitud;
    
    public $canton;
    public $provincia;

    public $id_audio;
    public $id_administrador;
    public $motivo;

    public function __construct($db){
        $this->conn = $db;
    }

    public function obtenerAudios(){
        $query = "SELECT * FROM " . $this->vista;
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function obtenerAudio($id){
        $query = "SELECT * FROM " . $this->vista . " WHERE audio_id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }


    public function removerAudio($id_audio, $id_administrador, $motivo){
        $query = "CALL EliminarAudioUbicacion(:id_audio, :id_administrador, :motivo)";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id_audio', $id_audio);
        $stmt->bindParam(':id_administrador', $id_administrador);
        $stmt->bindParam(':motivo', $motivo);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function agregarAudio($audio){
        $query = "CALL InsertarAudioUbicacion(:titulo, :autor, :comentarios, :ruta_audio, :ruta_imagen, :latitud, :longitud, :canton, :provincia)";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':titulo', $audio->titulo);
        $stmt->bindParam(':autor', $audio->autor);
        $stmt->bindParam(':comentarios', $audio->comentarios);
        $stmt->bindParam(':ruta_audio', $audio->ruta_audio);
        $stmt->bindParam(':ruta_imagen', $audio->ruta_imagen);
        $stmt->bindParam(':latitud', $audio->latitud);
        $stmt->bindParam(':longitud', $audio->longitud);
        $stmt->bindParam(':canton', $audio->canton);
        $stmt->bindParam(':provincia', $audio->provincia);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function obtenerCantones($id_provincia) {
        $query = "SELECT * FROM canton WHERE id_provincia = :id_provincia";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id_provincia', $id_provincia); 
        $stmt->execute();
        return $stmt; 
    }

    public function editarAudio($audio) {
        $query = "CALL ActualizarAudioUbicacion(:id_audio,:titulo, :autor, :comentarios, :ruta_audio, :ruta_imagen, :latitud, :longitud, :canton, :provincia, :id_administrador, :motivo)";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id_audio', $audio->id_audio);
        $stmt->bindParam(':titulo', $audio->titulo);
        $stmt->bindParam(':autor', $audio->autor);
        $stmt->bindParam(':comentarios', $audio->comentarios);
        $stmt->bindParam(':ruta_audio', $audio->ruta_audio);
        $stmt->bindParam(':ruta_imagen', $audio->ruta_imagen);
        $stmt->bindParam(':latitud', $audio->latitud);
        $stmt->bindParam(':longitud', $audio->longitud);
        $stmt->bindParam(':canton', $audio->canton);
        $stmt->bindParam(':provincia', $audio->provincia);
        $stmt->bindParam(':id_administrador', $audio->id_administrador);
        $stmt->bindParam(':motivo', $audio->motivo);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }



}
?>