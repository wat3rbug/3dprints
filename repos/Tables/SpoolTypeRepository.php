<?php
class SpoolTypeRepository {

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

    function addSpoolType($type) {
        if (isset($type)) {
            $sql = "INSERT INTO spool_types (spooltype) VALUES (?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $type);
            $statement->execute();
        }
    }

    function updateSpoolType($id, $type) {
        if (isset($id) && isset($type)) {
            $sql = "UPDATE spool_types SET spooltype = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $type);
            $statement->bindParam(2, $id);
            $statement->execute();
        }
    }

    function deleteSpoolType($id) {
        if (isset($id)) {
            $sql = "DELETE FROM spool_types WHERE id= ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function getAllSpoolTypes() {
        $sql = "SELECT * FROM spool_types";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getSpoolTypeById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM spool_types WHERE id = ?";
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