<?php
class CommentRepository {

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

    function getCommentsForId($id) {
        if (isset($id) && $id > 0) {
            $sql = "SELECT * FROM Comments WHERE jobid = ? ORDER BY id DESC";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        } else {
            return null;
        }
    }

    function addCommentToJob($comment, $jobid) {
        if (isset($jobid) && $jobid > 0 && isset($comment)) {
            $sql = "INSERT INTO comments (comment, jobid) VALUES (?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(2, $jobid);
            $statement->bindParam(1, $comment);
            $statement->execute();
        }
    }
}
?>