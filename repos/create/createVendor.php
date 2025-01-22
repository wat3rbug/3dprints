<?php
require "Tables/VendorRepository.php";

$name = $_POST["name"];
$url = $_POST["url"];
if (isset($name)) {
    $db = new VendorRepository();
    $db->createVendor($name, $url);
}