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

    function createSpool($color, $type, $size) {
        if (isset($type) && isset($color) && isset($size)) {
            $sql = "INSERT INTO spools (color, type, size) VALUES (?, ?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $color);
            $statement->bindParam(2, $type);
            $statement->bindParam(3, $size);
            $statement->execute();
        }
    }

    function updateSpool($id, $color, $type, $size) {
        if (isset($id) && isset($type) && isset($color) && isset($size)) {
            $sql = "UPDATE spools SET color = ?, type = ?, size = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $color);
            $statement->bindParam(2, $type);
            $statement->bindParam(3, $size);
            $statement->bindParam(4, $id);
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
        $sql = "SELECT spools.*, spool_types.spooltype AS spooltype FROM spools JOIN spool_types ON spools.type = spool_types.id JOIN orders on spools.id = orders.spoolid WHERE orders.shipped IS NOT NULL";
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

    function getSpoolColorCounts() {
        $sql = "SELECT count(*) as count, color FROM spools JOIN orders ON spools.id = orders.spoolid WHERE orders.received IS NOT NULL GROUP BY color";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getSpoolSizeCounts() {
        $sql = "SELECT count(*) as count, size FROM spools GROUP BY size";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
    function getSpoolTypeCounts() {
        $sql = "SELECT count(*) AS count, spooltype FROM spools JOIN spool_types ON spools.type = spool_types.id JOIN orders ON spools.id = orders.spoolid WHERE orders.received IS NOT null GROUP BY spool_types.spooltype";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getLastSpool() {
        $sql = "SELECT * FROM spools ORDER BY id DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getSpoolCountByMonth() {
        $sql = "SELECT COUNT(*) AS count, year(ordered) AS year, month(ordered) as month FROM orders GROUP BY year, month ORDER BY year, month";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
}