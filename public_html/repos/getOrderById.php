<?php
require "Tables/OrderRepository.php";
$id = $_POST["id"];
// $id = "55";

if(isset($id)) {
    $db = new OrderRepository();
    $data = $db->getOrderById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}