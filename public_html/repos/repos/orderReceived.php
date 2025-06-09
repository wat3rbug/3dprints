<?php
require "Tables/OrderRepository.php";
$id = $_POST["id"];

if (isset($id)) {
    $db = new OrderRepository();
    $db->orderReceived($id);
}