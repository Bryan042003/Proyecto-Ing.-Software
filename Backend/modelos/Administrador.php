<?php

class Administrador{
    private $conn;

    private $tabla = "administrador";

    public $id;
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

    public function obtenerAdmin($id){
        $query = "SELECT * FROM " . $this->vista . " WHERE admin_id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
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

    public function editarAdmiNombrePerfil(){
        $query = "UPDATE " . $this->tabla . " SET nombre = :nombre WHERE id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':nombre', $this->nombre);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function editarAdmiContraPerfil() {
        $query = "UPDATE " . $this->tabla . " SET password = :password WHERE id = :id";
        $stmt = $this->conn->getConnection()->prepare($query);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }




}
?>