<?php

//require_once '../config/database.php';

class Historial{
    private $conn;
    private $tabla = "historial_admin_audios";

    public $titulo;
    public $autor;
    public $accion;
    public $motivo;
    public $fecha_acccion;

    public function __construct($db){
        $this->conn = $db;
    }
    
    public function obtenerHistorial(){
        $query = "SELECT * FROM " .  $this->tabla;
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->execute();
        return $stmt;
    }



}
?>