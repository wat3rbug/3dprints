<?php
require "Tables/VendorRepository.php";

$id = $_POST["id"];

if (isset($id)) {
    $db = new VendorRepository();
    $db->deleteVendor($id);
}