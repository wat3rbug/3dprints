<?php
require "Tables/VendorRepository.php";

$id = $_POST["id"];
if (isset($id)) {
    $db = new VendorRepository();
    $data = $db->getVendorById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}