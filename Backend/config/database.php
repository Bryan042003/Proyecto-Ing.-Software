<?php

require __DIR__ . '/../vendor/autoload.php';


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/..');
$dotenv->load();

class Database{

    private static $instance = null;
    private $conn;
    private $host;
    private $nameDB;
    private $username;
    private $password;
    
    private function __construct(){
        $this->host = $_ENV['DB_HOST'];
        $this->nameDB = $_ENV['DB_NAME'];
        $this->username = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASSWORD'];
        
        $this->conn = new PDO("mysql:host={$this->host};
        dbname={$this->nameDB}", 
        $this->username, $this->password);
    }

    public static function getInstance(){
        if(!self::$instance){
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection(){
        return $this->conn;
    }

    public function testConnection() {
        try {
            $this->conn->query("SELECT 1");
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}

?>