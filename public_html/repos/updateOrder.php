<?php
require "Tables/OrderRepository.php";
require "Tables/SpoolRepository.php";

// $id = $_POST["id"];
// $size = $_POST["size"];
// $type = $_POST["type"];
// $color = $_POST["color"];
// $eta = $_POST["eta"];
// $shipped = $POST["shipped"];
// $received = $_POST["received"];
// $vendor = $_POST["vendor"];
$id = "4";
$size = "2.2";
$type = "3";
$color = "Purple";
$eta = "2025-07-15";
$shipped = null;
$received = null;
$vendor = "4";

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
    $data = $db->updateOrder($cust_dict);
    return $data;
}