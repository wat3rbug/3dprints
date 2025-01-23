<?php
require "Tables/OrderRepository.php";
$id = $_POST["id"];
$vendor = $_POST["vendor"];
$spool = $_POST["spool"];

if (isset($id) && isset($spool) && isset($vendor)) {
    $db = new OrderRepository();
    $db->updateOrder($id, $spool, $vendor);
}