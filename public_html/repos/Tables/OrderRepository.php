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

    function createOrder($spool, $vendor, $eta) {
        if (isset($spool) && isset($vendor)) {
            $sql = "INSERT INTO orders (spoolid, vendorid, eta) VALUES(?, ?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $spool);
            $statement->bindParam(2, $vendor);
            $statement->bindParam(3, $eta);
            $statement->execute();
        }
    }

    function getOrderById($id) {
        if (isset($id)) {
            $sql = "SELECT eta, spools.id, ordered, shipped, received, vendors.id AS vendor, color, spool_types.id AS spooltype, size FROM orders JOIN vendors ON vendorid = vendors.id JOIN spools ON orders.spoolid = spools.id JOIN spool_types ON spool_types.id = spools.type where orders.id = ?";
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
        $sql = "SELECT eta, spools.id, ordered, shipped, received, name AS vendor, color, spooltype,size from orders JOIN vendors on vendorid = vendors.id join spools ON orders.spoolid = spools.id JOIN spool_types ON spool_types.id = spools.type ORDER BY id DESC;";
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

    function updateOrder($cust_dict) {
        $id = $cust_dict["id"];
        $size = $cust_dict["size"];
        $type = $cust_dict["type"];
        $color = $cust_dict["color"];
        $eta = $cust_dict["eta"];
        $shipped = $cust_dict["shipped"];
        $received = $cust_dict["received"];
        $vendor = $cust_dict["vendor"];
        if (isset($id) && $id > 0 && isset($spool) && isset($vendor)) {
            $sql = "SELECT spoolid FROM orders AS o JOIN spools AS s on o.spoolid = s.id WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $spoolid = array();
            while ($row = $statement->fetch()) {
                $spoolid[] = $row;
            }
            return $spoolid;
            // $sql = "UPDATE spools SET size = ?, color = ?, type = ? WHERE id = ?";
            // $statement = $this->conn->prepare($sql);
            // $statement->bindParam(1, $size);
            // $statement->bindParam(2, $color);
            // $statement->bindParam(3, $type);
            // $statement->bindParam(4, $spoolid[0]);
            // $statement->execute();
            // $sql = "UPDATE orders SET shipped = ?, received = ?, eta = ?, vendorid = ? WHERE id = ?";
            // $statement = $this->conn->prepare($sql);
            // if (empty(trim($shipped))) $shipped = null;
            // if (empty(trim($received))) $received = null;
            // if (empty(trim($eta))) $eta = null;
            // $statement->bindParam(1, $shipped, PDO::PARAM_STR);
            // $statement->bindParam(2, $received, PDO::PARAM_STR);
            // $statement->bindParam(3, $eta, PDO::PARAM_STR);
            // $statement->bindParam(4, $vendor);
            // $statement->bindParam(5, $id);
            // $statement->execute();
            
        }
    }

    function getSpoolIdFromOrderId($id) {
        if (isset($id)) {
            $sql ="SELECT spoolid FROM orders WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
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

    function getDeliveryStats() {
        $sql = "SELECT orders.id, ABS(Datediff(received, ordered)) AS 'day', vendors.name AS vendor FROM orders JOIN vendors ON orders.vendorid = vendors.id ORDER BY vendor, day ASC";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getOrdersPerYear() {
        $sql = "SELECT count(*) AS count, YEAR(received) AS `year` FROM orders GROUP BY year(received)";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getOnTimePercentage() {
        $sql = "SELECT COUNT(*) AS count, v.name AS vendor FROM orders AS o JOIN vendors AS v ON o.vendorid = v.id WHERE eta >= received GROUP BY vendorid ORDER BY count DESC";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        $sql = "SELECT COUNT(*) AS count, v.name AS vendor FROM orders AS o JOIN vendors AS v ON o.vendorid = v.id GROUP BY vendorid";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
}