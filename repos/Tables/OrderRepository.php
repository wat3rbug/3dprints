<?php
class OrderRepository {

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

    function createOrder($spool, $vendor) {
        if (isset($spool) && isset($vendor)) {
            $sql = "INSERT INTO orders (spoolid, vendorid) VALUES(?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $spool);
            $statement->bindParam(2, $vendor);
            $statement->execute();
        }
    }

    function getIncompleteOrders() {
        $sql = "SELECT orders.*, vendors.name AS vendor, vendors.url AS url from orders JOIN vendors on vendorid = vendors.id WHERE shipped IS NULL or received IS NULL";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getAllOrders() {
        $sql = "SELECT spools.id, ordered, shipped, received, name AS vendor, color, spooltype,size from orders JOIN vendors on vendorid = vendors.id join spools ON orders.spoolid = spools.id JOIN spool_types ON spool_types.id = spools.type ORDER BY id DESC;";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function orderShipped($id) {
        if (isset($id)) {
            $sql = "UPDATE orders SET shipped = curtime() WHERE id= ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function orderReceived($id) {
        $sql = "UPDATE orders SET received = curtime() WHERE id= ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
    }

    function updateOrder($id, $spool, $vendor) {
        if (isset($id) && $id > 0 && isset($spool) && isset($vendor)) {
            $sql = "UPDATE orders SET spoolid = ?, vendorid = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $spool);
            $statement->bindParam(2, $vendor);
            $statement->bindParam(3, $id);
            $statement->execute();
        }
    }

    function deleteOrder($id) {
        if (isset($id) && $id > 0) {
            $sql = "DELETE FROM orders WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}