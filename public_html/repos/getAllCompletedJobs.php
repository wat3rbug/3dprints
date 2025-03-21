<?php
require "Tables/JobRepository.php";

$db = new JobRepository();
$data = $db->getAllCompletedJobs();
header('Content-type: application/json');
echo json_encode($data);
?>