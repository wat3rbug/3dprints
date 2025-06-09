<?php
require "Tables/StatusRepository.php";

$db = new StatusRepository();
$data = $db->getAllStatus();
header('Content-type: application/json');
echo json_encode($data);
?>
