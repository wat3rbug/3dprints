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
            $sql = "SELECT jobs.name, jobs.url, jobs.id, jobs.photo, jobs.status FROM jobs WHERE success = 0 AND jobs.id = ?";
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

    function getAllCompletedJobs() {
        $sql = "SELECT jobs.id, jobs.name, jobs.url, jobs.photo, count(comments.comment) as comments from jobs left join comments on jobs.id = comments.jobid where success = 1 group by jobs.id";
        $statement= $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getAllJobs() {
        $sql = "SELECT jobs.name, jobs.id, jobs.url, jobs.photo, status.status, count(comments.comment) AS comments FROM jobs JOIN status ON jobs.status = status.id LEFT JOIN comments ON jobs.id = comments.jobid WHERE success = 0 GROUP BY jobs.id ORDER BY status.id";
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

    function updateJob($id, $name, $photo, $status, $url) {
        if (isset($id) && isset($status) && isset($name)) {
            $sql = "UPDATE jobs SET jobs.url = ?, name = ?, photo = ?, jobs.status = ? WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $url);
            $statement->bindParam(2, $name);
            $statement->bindParam(3, $photo);
            $statement->bindParam(4, $status);
            $statement->bindParam(5, $id);
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

    function addJob($name, $photo, $url) {
        if (isset($name)) {
            $sql = "INSERT INTO jobs (url, name, photo, status) VALUES (?, ?, ?, 16)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $url);
            $statement->bindParam(2, $name);
            $statement->bindParam(3, $photo);
            $statement->execute();
        }
    }
}
?>