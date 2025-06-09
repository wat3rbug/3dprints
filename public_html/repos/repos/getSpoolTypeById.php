<?php
require "Tables/SpoolTypeRepository.php";

// $id = "5";
$id = $_POST['id'];

if(isset($id)) {
    $db = new SpoolTypeRepository();
    $data = $db->getSpoolTypeById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}