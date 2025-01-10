<?php
class SpoolRepository {

    private $conn;

    function __construct() {
        include_once("DBConnection.php");
        $db = new DBConnection();
        $servername = $db->hostname;
        $username = $db->username;
        $password = $db->password;
        $charset = "utf8mb4";
        $database = $db->database;
        $dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => true,
        ];
        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    function addSpool($color, $type) {
        if (isset($type)) {
            $sql = "INSERT INTO spools (color, type) VALUES (?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $color);
            $statement->bindParam(2, $type);
            $statement->execute();
        }
    }

    function updateSpool($id, $color, $type) {
        if (isset($id) && isset($type)) {
            $sql = "UPDATE spools SET color = ?, type = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(2, $type);
            $statement->bindParam(3, $id);
            $statement->bindParam(1, $color);
            $statement->execute();
        }
    }

    function deleteSpool($id) {
        if (isset($id)) {
            $sql = "DELETE FROM spools WHERE id= ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function getAllSpools() {
        $sql = "SELECT * FROM spools";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getSpoolById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM spools WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }
}