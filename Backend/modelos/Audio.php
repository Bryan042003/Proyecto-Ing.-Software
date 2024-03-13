<?php

require_once '../config/database.php';

class Audio{
    private $conn;
    private $vista = "audio";

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
    

}
?>