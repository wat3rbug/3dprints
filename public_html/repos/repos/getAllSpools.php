<?php
require "Tables/SpoolRepository.php";

$db = new SpoolRepository();
$data = $db->getAllSpools();
header('Content-type: application/json');
echo json_encode($data);