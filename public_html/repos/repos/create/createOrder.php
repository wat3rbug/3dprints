<?php
require "../Tables/OrderRepository.php";
$spool = $_POST["spool"];
$vendor = $_POST["vendor"];

if (isset($spool) && isset($vendor)) {
    $db = new OrderRepository();
    $db->createOrder($spool, $vendor);
}