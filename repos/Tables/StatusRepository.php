<?php
class StatusRepository {

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
            PDO::ATTR_ERRMODE			 => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE 		=> PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES 			=> true,
        ];
        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch (\PDOException $e) {    
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    function getStatusById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM status WHERE id = ?";
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

    function getDefaultStatus() {
        $sql = "SELECT status.status FROM status WHERE status like '%aitin%' ORDER BY ID DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getAllStatus() {
            $sql = "SELECT * FROM status";
            $statement = $this->conn->prepare($sql);
            $statement->execute();
            $output = array();
            while($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
    }

    function createStatus($status) {
        if (isset($status)) {
            $sql = "INSERT INTO status (status.status) VALUES(?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $status);
            $statement->execute();
        }
    }

    function updateStatus($status, $id) {
        if (isset($id) && $id > 0 && isset($status)) {
            $sql = "UPDATE status SET status = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $status);
            $statement->bindParam(2, $id);
            $statement->execute();
        }
    }

    function deleteStatus($id) {
        if (isset($id) && $id > 0) {
            $sql = "DELETE FROM status WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}

?>
