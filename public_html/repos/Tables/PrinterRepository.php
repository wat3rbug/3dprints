<?php
class PrinterRepository {

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
    function getPrinterById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM printers  WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $results = array();
            while ($row = $statement->fetch()) {
                $results[] = $row;
            }
            return $results;
        }
    }

    function getAllPrinters() {
        $sql = "SELECT p.id, p.name, p.manufacturer, p.model, s.status, p.multicolor, p.pic FROM printers AS p JOIN printer_status AS s ON p.status = s.id";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $results = array();
        while ($row = $statement->fetch()) {
            $results[] = $row;
        }
        return $results;
    }

    function getAllPrinterStatus() {
        $sql = "SELECT * FROM printer_status";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $results = array();
        while ($row = $statement->fetch()) {
            $results[] = $row;
        }
        return $results;
    }

    function deletePrinter($id) {
        if (isset($id)) {
            $sql = "DELETE FROM printers WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function updatePrinter($dict) {
        $id = $dict["id"];
        $name = $dict['name'];
        $make = $dict["manufacturer"];
        $model = $dict['model'];
        $multicolor = $dict['multicolor'];
        $status = $dict['status'];
        $pic = $dict['pic'];
        if (isset($id) && isset($name) && isset($make) && isset($model) && isset($status)) {
            $sql = "UPDATE printers SET name = ?, manufacturer = ?, model = ?, status = ?, multicolor = ?, pic = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $make);
            $statement->bindParam(3, $model);
            $statement->bindParam(4, $status);
            $statement->bindParam(5, $multicolor);
            $statement->bindParam(6, $pic);
            $statement->bindParam(7, $id);
            $statement->execute();
        }
    }

    function addPrinter($dict) {
        $name = $dict['name'];
        $make = $dict["manufacturer"];
        $model = $dict['model'];
        $multicolor = $dict['multicolor'];
        $status = $dict['status'];
        $pic = $dict['pic'];
        if (isset($name) && isset($make) && isset($model) && isset($status)) {
            $sql = "INSERT INTO printers (name, manufacturer, model, status, multicolor, pic) values (?, ?, ?, ?, ?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $make);
            $statement->bindParam(3, $model);
            $statement->bindParam(4, $status);
            $statement->bindParam(5, $multicolor);
            $statement->bindParam(6, $pic);
            $statement->execute();
        }
    }
}