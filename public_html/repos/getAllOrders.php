<?php
require "Tables/OrderRepository.php";
$db = new OrderRepository();
$data = $db->getAllOrders();
header('Content-type: application/json');
echo json_encode($data);