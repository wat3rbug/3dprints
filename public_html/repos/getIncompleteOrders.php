<?php
require "Tables/OrderRepository.php";

$db = new OrderRepository();
$data = $db->getIncompleteOrders();
header('Content-type: appliation/json');
echo json_encode($data);