<?php
require "Tables/OrderRepository.php";
$id = $_POST["id"];
// $id = "3";
if (isset($id)) {
    $db = new OrderRepository();
    $db->orderShipped($id);
}