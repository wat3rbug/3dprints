<?php
require "Tables/OrderRepository.php";
$db = new OrderRepository();
$data = $db->getOnTimePercentage();

header('Content-type: application/json');
echo json_encode($data);
?>