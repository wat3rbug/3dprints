<?php
require "Tables/OrderRepository.php";
require "Tables/SpoolRepository.php";

$color = $_POST["color"];
$vendor = $_POST["vendor"];
$spooltype = $_POST["type"];
$size = $_POST["size"];
$eta = $_POST["eta"];

// $color = "blue";
// $vendor = "4";
// $spooltype = "5";
// $size = "2.2";
// $eta = "2025-04-25";

if (isset($color) && isset($vendor) 
        && isset($spooltype) && isset($size)) {
    $db = new SpoolRepository();
    $db->createSpool($color, $spooltype, $size);
    $data = $db->getlastSpool();
    $db2 = new OrderRepository();
    $db2->createOrder($data[0][0], $vendor, $eta);
}