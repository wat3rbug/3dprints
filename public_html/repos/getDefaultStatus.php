<?php
require "Tables/StatusRepository.php";

$db = new StatusRepository();
$data = $db->getDefaultStatus();
header('Content-type: application/json');
echo json_encode($data);
?>