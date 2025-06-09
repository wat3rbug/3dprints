<?php
require "Tables/JobRepository.php";

$id = $_POST['jobId'];
// $id = "6";
if (isset($id)) {
    $db = new JobRepository();
    $data = $db->getJobById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>
