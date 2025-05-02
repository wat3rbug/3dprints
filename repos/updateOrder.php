<?php
require "Tables/OrderRepository.php";
require "Tables/SpoolRepository.php";

$id = $_POST["id"];
$size = $_POST["size"];
$type = $_POST["type"];
$color = $_POST["color"];
$eta = $_POST["eta"];
$shipped = $POST["shipped"];
$received = $_POST["received"];
$vendor = $_POST["vendor"];

$cust_dict = array(
    "id" => $id,
    "size" => $size,
    "type" => $type,
    "color" => $color,
    "eta" => $eta,
    "shipped" => $shipped,
    "received" => $received,
    "vendor" => $vendor
);
if (isset($cust_dict)) {
    $db = new OrderRepository();
    $db->updateOrder($cust_dict);
    $data = $db->getSpoolIdFromOrderId($id);
    $custom_dict["spool"] = $data[0]["id"];
    $db = new SpoolRepository();
    $db->updateSpool($cust_dict);
}