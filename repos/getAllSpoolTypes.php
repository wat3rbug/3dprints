<?php
require "Tables/SpoolTypeRepository.php";

$db = new SpoolTypeRepository();
$data = $db->getAllSpoolTypes();
header('Content-type: application/json');
echo json_encode($data);
?>