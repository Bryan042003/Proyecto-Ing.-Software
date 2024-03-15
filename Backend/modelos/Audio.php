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
    public $distrito;
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
    

}
?>