<?php

//require_once '../config/database.php';

class Audio{
    private $conn;
    private $vista = "vista_audio_ubicacion";

    public $titulo;
    public $autor;
    public $comentarios;
    public $ruta_audio;
    public $ruta_imagen;
    public $latitud;
    public $longitud;
    
    public $canton;
    public $provincia;

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
        $query = "SELECT * FROM " . $this->vista . " WHERE id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    //public function removerAudio($id_admin, $id_audio, $motivo){
    public function removerAudio($id){
        $query = "DELETE FROM " . $this->vista . " WHERE id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function agregarImagen($imagen) {
        $imagen_name = $_FILES["imagen"]["name"];
        $temp_imagen_name = $_FILES["imagen"]["tmp_name"];
        $folder = '../../imagenes/'. $imagen_name;
        //echo "IMAGEN_NAME: " . $imagen_name . " TEMPIMAGEN_NAME: " . $temp_imagen_name;
        $direccion = 'http://localhost/sonidosPV/imagenes/'. $imagen_name;
        if(move_uploaded_file($temp_imagen_name, $folder)){
            return $direccion;
            //echo "Se subió la imagen";
        } else {
            //echo "No se subió la imagen";
        }
    }

    // CALL InsertarAudioUbicacion('titulo audio', 'autor audio', 'comentarios del audio', 'rutaAudio.mp3', 'rutaimagen.jpg', 9.748917, -83.753428, 'Paraíso', 'Cartago');

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


    
    
    

    

}
?>