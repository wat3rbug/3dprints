<?php
require "Tables/VendorRepository.php";

$id = $_POST["id"];
$name = $_POST["name"];
$url = $_POST["url"];

if (isset($id) && isset($name)) {
    $db = new VendorRepository();
    $db->updateVendor($name, $url, $id);
}
