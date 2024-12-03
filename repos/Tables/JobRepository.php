<?php
class JobRepository {

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

    function getJobById($id) {
        if (isset($id)) {
            $sql = "SELECT jobs.name, jobs.id, jobs.photo, status.status FROM jobs JOIN status on jobs.status = status.id WHERE success = 0 AND jobs.id = ?";
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

    function getAllJobs() {
        $sql = "SELECT jobs.name, jobs.id, jobs.photo, status.status FROM jobs JOIN status on jobs.status = status.id WHERE success = 0 ORDER BY jobs.Id DESC";
        $statement= $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function deleteJob($id) {
        if (isset($id) && $id > 0) {
            $sql = "DELETE FROM jobs WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function updateJob($id, $name, $photo, $status) {
        if (isset($id) && isset($status) && isset($name)) {
            $sql = "UPDATE JOBS SET name = ?, photo = ?, status =? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $name);
            $statement->bindParam(2, $photo);
            $statement->bindParam(3, $status);
            $statement->bindParam(4, $id);
            $statement->execute();
        }
    }

    function completeJob($id) {
        if (isset($id) && $id > 0) {
            $sql = "UPDATE jobs SET success = 1 WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}
?>