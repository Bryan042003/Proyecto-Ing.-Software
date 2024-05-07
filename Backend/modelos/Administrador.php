<?php

class Administrador{
    private $conn;

    public $nombre;
    public $correo;
    public $password;

    public function __construct($db){
        $this->conn = $db;
    }

    public function agregarAdmin($admin){
        $query = "CALL InsertarAdministrador(:nombre, :correo, :password)";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':nombre', $admin->nombre);
        $stmt->bindParam(':correo', $admin->correo);
        $stmt->bindParam(':password', $admin->password);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
}
?>