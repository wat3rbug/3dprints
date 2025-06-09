<?php

class VendorRepository {

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

    function createVendor($name, $url) {
        if (isset($name)) {
            $sql = "INSERT INTO vendors (name, url) VALUES(?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $url);
            $statement->execute();
        }
    }

    function getVendorById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM vendors WHERE id = ?";
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

    function updateVendor($name, $url, $id) {
        if (isset($id) && $id > 0 && isset($name)) {
            $sql = "UPDATE vendors SET name = ?, url = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $url);
            $statement->bindParam(3, $id);
            $statement->execute();
        }
    }

    function deleteVendor($id) {
        if (isset($id) && $id > 0) {
            $sql = "DELETE FROM vendors WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function getAllVendors() {
        $sql = "SELECT * from vendors";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
            $output = array();
            while($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
    }
}