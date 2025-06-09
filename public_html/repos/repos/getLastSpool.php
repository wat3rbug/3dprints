<?php
require "Tables/SpoolRepository.php";

$db = new SpoolRepository();
$data = $db->getLastSpool();
header('content-type: application/json');
echo json_encode($data);