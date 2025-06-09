<?php
require "Tables/SpoolRepository.php";

$db = new SpoolRepository();
$data = $db->getSpoolColorCounts();
header('Content-type: application/json');
echo json_encode($data);