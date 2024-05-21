<?php

class Administrador{
    private $conn;

    private $tabla = "Administrador";

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

    
    public function obtenerAdmins(){
        $query = "SELECT * FROM ". $this->tabla . ";";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function removerAdministrador($id){
        $query = "DELETE FROM " . $this->tabla . " WHERE id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function autenticarAdmin($correo, $password){
        $query = "SELECT * FROM " . $this->tabla . " WHERE correo = :correo";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        if($admin && password_verify($password, $admin['password'])){
            return $admin;
        }
        return false;
    }


}
?>